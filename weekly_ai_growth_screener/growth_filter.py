"""Growth filtering and scoring logic."""

from __future__ import annotations

import math
from typing import Any

import pandas as pd


def _as_float(value: Any) -> float | None:
    try:
        if value is None or pd.isna(value):
            return None
        return float(value)
    except (TypeError, ValueError):
        return None


def calculate_price_momentum(price_history: pd.DataFrame) -> tuple[float | None, float | None]:
    """Return approximate 6-month and 12-month price returns from close prices."""
    if price_history is None or price_history.empty or "Close" not in price_history:
        return None, None

    close = price_history["Close"].dropna()
    if close.empty:
        return None, None

    latest = close.iloc[-1]
    if latest <= 0:
        return None, None

    def _return_from_index(days: int) -> float | None:
        if len(close) <= days:
            return None
        start = close.iloc[-days]
        if start <= 0:
            return None
        return float((latest / start) - 1)

    return _return_from_index(126), _return_from_index(252)


def calculate_moving_average(price_history: pd.DataFrame, window: int = 200) -> float | None:
    """Calculate a moving average from close prices."""
    if price_history is None or price_history.empty or "Close" not in price_history:
        return None

    close = price_history["Close"].dropna()
    if len(close) < window:
        return None
    return float(close.rolling(window=window).mean().iloc[-1])


def enrich_growth_metrics(stock_data: dict[str, Any], price_history: pd.DataFrame) -> dict[str, Any]:
    """Attach momentum and moving-average metrics to a stock data dictionary."""
    momentum_6m, momentum_12m = calculate_price_momentum(price_history)
    moving_average_200d = calculate_moving_average(price_history, window=200)

    if stock_data.get("current_price") is None and price_history is not None and not price_history.empty:
        close = price_history.get("Close")
        if close is not None and not close.dropna().empty:
            stock_data["current_price"] = float(close.dropna().iloc[-1])

    stock_data["price_return_6m"] = momentum_6m
    stock_data["price_return_12m"] = momentum_12m
    stock_data["moving_average_200d"] = moving_average_200d
    return stock_data


def is_growth_stock(
    stock_data: dict[str, Any],
    min_market_cap: float = 2_000_000_000,
    min_revenue_growth: float = 0.10,
    min_price_momentum_6m: float = 0,
) -> bool:
    """Apply hard MVP growth filters."""
    market_cap = _as_float(stock_data.get("market_cap"))
    revenue_growth = _as_float(stock_data.get("revenue_growth"))
    price_return_6m = _as_float(stock_data.get("price_return_6m"))
    current_price = _as_float(stock_data.get("current_price"))
    moving_average_200d = _as_float(stock_data.get("moving_average_200d"))

    if market_cap is None or market_cap <= min_market_cap:
        return False
    if revenue_growth is None or revenue_growth <= min_revenue_growth:
        return False
    if price_return_6m is None or price_return_6m <= min_price_momentum_6m:
        return False
    if current_price is None or moving_average_200d is None or current_price <= moving_average_200d:
        return False
    return True


def calculate_growth_score(stock_data: dict[str, Any]) -> float:
    """Calculate a 0-100 growth score.

    Scoring weights:
    - Revenue Growth: 30 points
    - 6M Price Momentum: 20 points
    - 12M Price Momentum: 15 points
    - Gross Margin: 15 points
    - Free Cash Flow: 10 points
    - Price Above 200D MA: 10 points
    """
    score = 0.0

    revenue_growth = _as_float(stock_data.get("revenue_growth"))
    if revenue_growth is not None:
        # Full credit at 50%+ revenue growth; proportional credit below that.
        score += min(max(revenue_growth, 0) / 0.50, 1) * 30

    price_return_6m = _as_float(stock_data.get("price_return_6m"))
    if price_return_6m is not None:
        # Full credit at 50%+ 6-month return.
        score += min(max(price_return_6m, 0) / 0.50, 1) * 20

    price_return_12m = _as_float(stock_data.get("price_return_12m"))
    if price_return_12m is not None:
        # Full credit at 80%+ 12-month return.
        score += min(max(price_return_12m, 0) / 0.80, 1) * 15

    gross_margin = _as_float(stock_data.get("gross_margins"))
    if gross_margin is not None:
        # No hard elimination for lower or missing gross margins; score rewards quality.
        score += min(max(gross_margin, 0) / 0.60, 1) * 15

    free_cash_flow = _as_float(stock_data.get("free_cash_flow"))
    if free_cash_flow is not None and free_cash_flow > 0:
        # Positive FCF earns the core 10 points. Magnitude is intentionally not overfit in MVP.
        score += 10

    current_price = _as_float(stock_data.get("current_price"))
    moving_average_200d = _as_float(stock_data.get("moving_average_200d"))
    if current_price is not None and moving_average_200d is not None and moving_average_200d > 0:
        premium = (current_price / moving_average_200d) - 1
        if premium > 0:
            # Full credit when price is 20%+ above 200D MA.
            score += min(premium / 0.20, 1) * 10

    return float(round(min(score, 100), 2)) if math.isfinite(score) else 0.0

"""Data loading helpers for stock universe, yfinance profiles, and prices."""

from __future__ import annotations

import logging
from typing import Any

import pandas as pd
import yfinance as yf

LOGGER = logging.getLogger(__name__)

FALLBACK_SP500_TICKERS = [
    "AAPL",
    "MSFT",
    "NVDA",
    "AMZN",
    "META",
    "GOOGL",
    "GOOG",
    "AVGO",
    "TSLA",
    "LLY",
    "JPM",
    "V",
    "UNH",
    "XOM",
    "MA",
    "COST",
    "HD",
    "PG",
    "NFLX",
    "AMD",
    "CRM",
    "ADBE",
    "ORCL",
    "CSCO",
    "ACN",
    "NOW",
    "INTC",
    "QCOM",
    "TXN",
    "AMAT",
    "LRCX",
]

FALLBACK_NASDAQ100_TICKERS = [
    "AAPL",
    "MSFT",
    "NVDA",
    "AMZN",
    "META",
    "GOOGL",
    "GOOG",
    "AVGO",
    "TSLA",
    "COST",
    "NFLX",
    "AMD",
    "ADBE",
    "CSCO",
    "PEP",
    "TMUS",
    "INTU",
    "QCOM",
    "AMAT",
    "TXN",
    "MU",
    "PANW",
    "CRWD",
    "MRVL",
    "SNPS",
    "CDNS",
    "KLAC",
    "LRCX",
    "ASML",
]


def _normalize_ticker(ticker: Any) -> str:
    """Convert tickers to yfinance-friendly symbols."""
    return str(ticker).strip().replace(".", "-").upper()


def get_sp500_tickers() -> list[str]:
    """Fetch current S&P 500 tickers from Wikipedia, falling back to a seed list."""
    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    try:
        tables = pd.read_html(url)
        tickers = [_normalize_ticker(ticker) for ticker in tables[0]["Symbol"].dropna()]
        LOGGER.info("Loaded %s S&P 500 tickers", len(tickers))
        return tickers
    except Exception as exc:
        LOGGER.warning("Failed to fetch S&P 500 tickers, using fallback list: %s", exc)
        return FALLBACK_SP500_TICKERS.copy()


def get_nasdaq100_tickers() -> list[str]:
    """Fetch current Nasdaq 100 tickers from Wikipedia, falling back to a seed list."""
    url = "https://en.wikipedia.org/wiki/Nasdaq-100"
    try:
        tables = pd.read_html(url)
        for table in tables:
            if "Ticker" in table.columns:
                tickers = [_normalize_ticker(ticker) for ticker in table["Ticker"].dropna()]
                LOGGER.info("Loaded %s Nasdaq 100 tickers", len(tickers))
                return tickers
            if "Symbol" in table.columns:
                tickers = [_normalize_ticker(ticker) for ticker in table["Symbol"].dropna()]
                LOGGER.info("Loaded %s Nasdaq 100 tickers", len(tickers))
                return tickers
        raise ValueError("Could not find Ticker or Symbol column on Nasdaq 100 page")
    except Exception as exc:
        LOGGER.warning("Failed to fetch Nasdaq 100 tickers, using fallback list: %s", exc)
        return FALLBACK_NASDAQ100_TICKERS.copy()


def get_stock_universe() -> list[str]:
    """Return a de-duplicated universe containing S&P 500 and Nasdaq 100 tickers."""
    tickers = sorted(set(get_sp500_tickers()) | set(get_nasdaq100_tickers()))
    LOGGER.info("Stock universe contains %s unique tickers", len(tickers))
    return tickers


def get_price_history(ticker: str, period: str = "1y") -> pd.DataFrame:
    """Fetch historical price data for one ticker. Returns an empty frame on failure."""
    try:
        history = yf.Ticker(ticker).history(period=period, auto_adjust=False)
        if history.empty:
            LOGGER.warning("%s returned empty price history", ticker)
        return history
    except Exception as exc:
        LOGGER.warning("Failed to fetch price history for %s: %s", ticker, exc)
        return pd.DataFrame()


def get_financial_data(ticker: str) -> dict[str, Any]:
    """Fetch selected financial statements from yfinance where available."""
    try:
        stock = yf.Ticker(ticker)
        cashflow = stock.cashflow
        free_cash_flow = None

        if cashflow is not None and not cashflow.empty:
            for row_name in ("Free Cash Flow", "FreeCashFlow"):
                if row_name in cashflow.index:
                    free_cash_flow = cashflow.loc[row_name].dropna().iloc[0]
                    break

        return {"free_cash_flow": free_cash_flow}
    except Exception as exc:
        LOGGER.warning("Failed to fetch financial data for %s: %s", ticker, exc)
        return {"free_cash_flow": None}


def get_stock_info(ticker: str) -> dict[str, Any] | None:
    """Fetch profile and quote data for one ticker. Returns None on unrecoverable failure."""
    try:
        stock = yf.Ticker(ticker)
        info = stock.info or {}
        if not info:
            LOGGER.warning("%s returned empty stock info", ticker)
            return None

        current_price = (
            info.get("currentPrice")
            or info.get("regularMarketPrice")
            or info.get("previousClose")
        )

        return {
            "ticker": ticker,
            "company_name": info.get("longName") or info.get("shortName") or ticker,
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "market_cap": info.get("marketCap"),
            "trailing_pe": info.get("trailingPE"),
            "forward_pe": info.get("forwardPE"),
            "revenue_growth": info.get("revenueGrowth"),
            "gross_margins": info.get("grossMargins"),
            "profit_margins": info.get("profitMargins"),
            "free_cash_flow": info.get("freeCashflow"),
            "long_business_summary": info.get("longBusinessSummary"),
            "current_price": current_price,
        }
    except Exception as exc:
        LOGGER.warning("Failed to fetch stock info for %s: %s", ticker, exc)
        return None

"""Application configuration loaded from environment variables."""

from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv


def _get_float(name: str, default: float) -> float:
    raw_value = os.getenv(name)
    if raw_value in (None, ""):
        return default
    try:
        return float(raw_value)
    except ValueError:
        raise ValueError(f"Environment variable {name} must be a number, got {raw_value!r}")


def _get_int(name: str, default: int) -> int:
    raw_value = os.getenv(name)
    if raw_value in (None, ""):
        return default
    try:
        return int(raw_value)
    except ValueError:
        raise ValueError(f"Environment variable {name} must be an integer, got {raw_value!r}")


@dataclass(frozen=True)
class Config:
    email_user: str
    email_app_password: str
    email_to: str
    smtp_server: str
    smtp_port: int
    min_market_cap: float
    min_revenue_growth: float
    min_price_momentum_6m: float
    min_final_score: float
    output_dir: str = "output"


def load_config() -> Config:
    """Load configuration from .env and process environment variables."""
    load_dotenv()

    return Config(
        email_user=os.getenv("EMAIL_USER", ""),
        email_app_password=os.getenv("EMAIL_APP_PASSWORD", ""),
        email_to=os.getenv("EMAIL_TO", ""),
        smtp_server=os.getenv("SMTP_SERVER", "smtp.gmail.com"),
        smtp_port=_get_int("SMTP_PORT", 587),
        min_market_cap=_get_float("MIN_MARKET_CAP", 2_000_000_000),
        min_revenue_growth=_get_float("MIN_REVENUE_GROWTH", 0.10),
        min_price_momentum_6m=_get_float("MIN_PRICE_MOMENTUM_6M", 0),
        min_final_score=_get_float("MIN_FINAL_SCORE", 70),
    )

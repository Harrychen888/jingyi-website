"""Weekly AI Growth Stock Screener entry point."""

from __future__ import annotations

import logging
from datetime import date
from pathlib import Path

from ai_matcher import calculate_ai_match_score, get_ai_match_reasons
from config import Config, load_config
from data_loader import get_financial_data, get_price_history, get_stock_info, get_stock_universe
from email_sender import send_email
from growth_filter import calculate_growth_score, enrich_growth_metrics, is_growth_stock
from report_generator import generate_csv_report, generate_html_report, write_html_report
from scoring import calculate_final_score, rank_stocks

LOGGER = logging.getLogger(__name__)


def setup_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )


def process_ticker(ticker: str, config: Config) -> dict | None:
    """Fetch, enrich, score, and filter one ticker."""
    stock_data = get_stock_info(ticker)
    if not stock_data:
        return None

    price_history = get_price_history(ticker, period="1y")
    stock_data = enrich_growth_metrics(stock_data, price_history)

    financial_data = get_financial_data(ticker)
    if stock_data.get("free_cash_flow") is None:
        stock_data["free_cash_flow"] = financial_data.get("free_cash_flow")

    growth_score = calculate_growth_score(stock_data)
    ai_match_score = calculate_ai_match_score(stock_data)
    final_score = calculate_final_score(growth_score, ai_match_score)

    stock_data["growth_score"] = growth_score
    stock_data["ai_match_score"] = ai_match_score
    stock_data["final_score"] = final_score
    stock_data["ai_match_reasons"] = get_ai_match_reasons(stock_data)

    passes_growth_filter = is_growth_stock(
        stock_data,
        min_market_cap=config.min_market_cap,
        min_revenue_growth=config.min_revenue_growth,
        min_price_momentum_6m=config.min_price_momentum_6m,
    )

    if not passes_growth_filter:
        LOGGER.debug("%s failed hard growth filters", ticker)
        return None

    if growth_score < 60:
        LOGGER.debug("%s failed Growth Score threshold: %.2f", ticker, growth_score)
        return None
    if ai_match_score < 50:
        LOGGER.debug("%s failed AI Match Score threshold: %.2f", ticker, ai_match_score)
        return None
    if final_score < config.min_final_score:
        LOGGER.debug("%s failed Final Score threshold: %.2f", ticker, final_score)
        return None

    return stock_data


def run() -> dict[str, int | bool | str]:
    """Run the full weekly screening workflow."""
    setup_logging()
    config = load_config()
    output_dir = Path(config.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    LOGGER.info("Starting Weekly AI Growth Stock Screener")
    tickers = get_stock_universe()
    total_scanned = len(tickers)
    successful_count = 0
    selected: list[dict] = []

    for index, ticker in enumerate(tickers, start=1):
        LOGGER.info("Processing %s/%s: %s", index, total_scanned, ticker)
        try:
            stock_info = get_stock_info(ticker)
            if not stock_info:
                continue
            successful_count += 1

            price_history = get_price_history(ticker, period="1y")
            stock_data = enrich_growth_metrics(stock_info, price_history)
            financial_data = get_financial_data(ticker)
            if stock_data.get("free_cash_flow") is None:
                stock_data["free_cash_flow"] = financial_data.get("free_cash_flow")

            growth_score = calculate_growth_score(stock_data)
            ai_match_score = calculate_ai_match_score(stock_data)
            final_score = calculate_final_score(growth_score, ai_match_score)

            stock_data["growth_score"] = growth_score
            stock_data["ai_match_score"] = ai_match_score
            stock_data["final_score"] = final_score
            stock_data["ai_match_reasons"] = get_ai_match_reasons(stock_data)

            if not is_growth_stock(
                stock_data,
                min_market_cap=config.min_market_cap,
                min_revenue_growth=config.min_revenue_growth,
                min_price_momentum_6m=config.min_price_momentum_6m,
            ):
                continue

            if growth_score >= 60 and ai_match_score >= 50 and final_score >= config.min_final_score:
                selected.append(stock_data)
                LOGGER.info(
                    "%s selected: growth=%.2f ai=%.2f final=%.2f",
                    ticker,
                    growth_score,
                    ai_match_score,
                    final_score,
                )
        except Exception as exc:
            LOGGER.exception("Unexpected failure while processing %s: %s", ticker, exc)

    ranked_results = rank_stocks(selected)
    csv_path = generate_csv_report(ranked_results, output_dir / "weekly_report.csv")
    html_body = generate_html_report(
        ranked_results,
        total_scanned=total_scanned,
        successful_count=successful_count,
    )
    html_path = write_html_report(html_body, output_dir / "weekly_report.html")

    subject = f"Weekly AI Growth Stock Screening Report - {date.today().isoformat()}"
    email_sent = False
    try:
        email_sent = send_email(subject, html_body, attachment_path=csv_path, config=config)
    except Exception as exc:
        LOGGER.exception("Failed to send email: %s", exc)

    LOGGER.info("Scan complete")
    LOGGER.info("Total scanned: %s", total_scanned)
    LOGGER.info("Successfully loaded: %s", successful_count)
    LOGGER.info("Selected stocks: %s", len(ranked_results))
    LOGGER.info("CSV report: %s", csv_path)
    LOGGER.info("HTML report: %s", html_path)
    LOGGER.info("Email sent: %s", email_sent)

    return {
        "total_scanned": total_scanned,
        "successful_count": successful_count,
        "selected_count": len(ranked_results),
        "csv_path": str(csv_path),
        "html_path": str(html_path),
        "email_sent": email_sent,
    }


if __name__ == "__main__":
    run()

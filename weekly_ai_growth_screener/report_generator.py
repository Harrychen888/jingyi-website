"""CSV and HTML report generation."""

from __future__ import annotations

import html
from datetime import date
from pathlib import Path
from typing import Any

import pandas as pd

DISCLAIMER = (
    "This report is generated automatically for informational and research purposes only. "
    "It is not financial advice, investment advice, or a recommendation to buy or sell any securities."
)


def _fmt_percent(value: Any) -> str:
    if value is None or pd.isna(value):
        return "N/A"
    return f"{float(value) * 100:.2f}%"


def _fmt_money(value: Any) -> str:
    if value is None or pd.isna(value):
        return "N/A"
    value = float(value)
    if abs(value) >= 1_000_000_000:
        return f"${value / 1_000_000_000:.2f}B"
    if abs(value) >= 1_000_000:
        return f"${value / 1_000_000:.2f}M"
    return f"${value:,.0f}"


def _fmt_number(value: Any) -> str:
    if value is None or pd.isna(value):
        return "N/A"
    return f"{float(value):.2f}"


def _report_rows(results: list[dict]) -> list[dict]:
    rows = []
    for item in results:
        rows.append(
            {
                "Rank": item.get("rank"),
                "Ticker": item.get("ticker"),
                "Company Name": item.get("company_name"),
                "Sector": item.get("sector"),
                "Industry": item.get("industry"),
                "Market Cap": item.get("market_cap"),
                "Revenue Growth": item.get("revenue_growth"),
                "Gross Margin": item.get("gross_margins"),
                "Free Cash Flow": item.get("free_cash_flow"),
                "6M Return": item.get("price_return_6m"),
                "12M Return": item.get("price_return_12m"),
                "Current Price": item.get("current_price"),
                "200D Moving Average": item.get("moving_average_200d"),
                "Growth Score": item.get("growth_score"),
                "AI Match Score": item.get("ai_match_score"),
                "Final Score": item.get("final_score"),
                "AI Match Reasons": "; ".join(item.get("ai_match_reasons", [])),
            }
        )
    return rows


def generate_csv_report(results: list[dict], output_path: str | Path) -> Path:
    """Write the screening result CSV. Empty result sets still produce a header-only file."""
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    columns = [
        "Rank",
        "Ticker",
        "Company Name",
        "Sector",
        "Industry",
        "Market Cap",
        "Revenue Growth",
        "Gross Margin",
        "Free Cash Flow",
        "6M Return",
        "12M Return",
        "Current Price",
        "200D Moving Average",
        "Growth Score",
        "AI Match Score",
        "Final Score",
        "AI Match Reasons",
    ]
    pd.DataFrame(_report_rows(results), columns=columns).to_csv(path, index=False)
    return path


def generate_html_report(results: list[dict], total_scanned: int = 0, successful_count: int = 0) -> str:
    """Generate the HTML body used for email and archived report output."""
    report_date = date.today().isoformat()
    top_results = results[:10]

    if top_results:
        table_rows = "\n".join(
            f"""
            <tr>
                <td>{item.get("rank")}</td>
                <td><strong>{html.escape(str(item.get("ticker", "")))}</strong></td>
                <td>{html.escape(str(item.get("company_name", "")))}</td>
                <td>{html.escape(str(item.get("sector", "")))}</td>
                <td>{html.escape(str(item.get("industry", "")))}</td>
                <td>{_fmt_percent(item.get("revenue_growth"))}</td>
                <td>{_fmt_percent(item.get("price_return_6m"))}</td>
                <td>{_fmt_number(item.get("growth_score"))}</td>
                <td>{_fmt_number(item.get("ai_match_score"))}</td>
                <td>{_fmt_number(item.get("final_score"))}</td>
            </tr>
            """
            for item in top_results
        )
        reasons_html = "\n".join(
            f"<li><strong>{html.escape(str(item.get('ticker', '')))}</strong>: "
            f"{html.escape('; '.join(item.get('ai_match_reasons', [])))}</li>"
            for item in top_results
        )
    else:
        table_rows = """
            <tr>
                <td colspan="10">No stocks matched this week's growth and AI screening criteria.</td>
            </tr>
        """
        reasons_html = "<li>No AI match reasons this week because no stocks passed all filters.</li>"

    return f"""
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; color: #1f2933; line-height: 1.5; }}
            table {{ border-collapse: collapse; width: 100%; margin: 16px 0; }}
            th, td {{ border: 1px solid #d9e2ec; padding: 8px; text-align: left; font-size: 13px; }}
            th {{ background: #f0f4f8; }}
            .summary {{ margin: 12px 0; }}
            .risk {{ background: #fff8e6; border-left: 4px solid #f0b429; padding: 10px 12px; }}
            .disclaimer {{ color: #52606d; font-size: 12px; margin-top: 24px; }}
        </style>
    </head>
    <body>
        <h2>Weekly AI Growth Stock Screening Report - {report_date}</h2>
        <div class="summary">
            <p>Total scanned stocks: <strong>{total_scanned}</strong></p>
            <p>Successfully loaded stocks: <strong>{successful_count}</strong></p>
            <p>Matched stocks: <strong>{len(results)}</strong></p>
        </div>
        <h3>Top 10 Stocks</h3>
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Ticker</th>
                    <th>Company</th>
                    <th>Sector</th>
                    <th>Industry</th>
                    <th>Revenue Growth</th>
                    <th>6M Return</th>
                    <th>Growth</th>
                    <th>AI Match</th>
                    <th>Final</th>
                </tr>
            </thead>
            <tbody>{table_rows}</tbody>
        </table>
        <h3>AI Match Reasons</h3>
        <ul>{reasons_html}</ul>
        <div class="risk">
            <strong>Risk Notice:</strong> Screening output can contain stale, missing, or inaccurate market data.
            Always verify fundamentals, valuation, liquidity, business risk, and current news before making decisions.
        </div>
        <p class="disclaimer">{DISCLAIMER}</p>
    </body>
    </html>
    """


def write_html_report(html_body: str, output_path: str | Path) -> Path:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html_body, encoding="utf-8")
    return path

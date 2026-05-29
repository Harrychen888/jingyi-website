# Weekly AI Growth Stock Screener

Weekly AI Growth Stock Screener is a Python MVP that scans the Nasdaq 100 and S&P 500, finds companies with growth momentum, checks whether they are related to AI themes, generates CSV and HTML reports, and sends the result by email.

This first version favors stability and clear structure over complicated modeling. It uses public data from `yfinance` and Wikipedia ticker lists, with fallback ticker lists when live ticker fetching fails.

## Features

- Fetches S&P 500 and Nasdaq 100 ticker lists.
- Loads company profile, sector, industry, market cap, margins, revenue growth, free cash flow, price history, 6-month return, 12-month return, and 200-day moving average.
- Scores each stock with Growth Score, AI Match Score, and Final Score.
- Generates `output/weekly_report.csv` and `output/weekly_report.html`.
- Sends an HTML email with the CSV attached.
- Handles missing yfinance fields and per-ticker failures without stopping the whole run.
- Supports local weekly scheduling with `schedule`, cron, or GitHub Actions.

## Installation

```bash
cd weekly_ai_growth_screener
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Environment Variables

Copy the example file and fill in your settings:

```bash
cp .env.example .env
```

Required email variables:

```bash
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
EMAIL_TO=recipient@example.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

Optional screening variables:

```bash
MIN_MARKET_CAP=2000000000
MIN_REVENUE_GROWTH=0.10
MIN_PRICE_MOMENTUM_6M=0
MIN_FINAL_SCORE=70
```

If email variables are missing, the script still generates local reports but skips email delivery.

## Run Once

```bash
python main.py
```

The run outputs:

- `output/weekly_report.csv`
- `output/weekly_report.html`

## Gmail App Password

To use Gmail SMTP:

1. Enable 2-Step Verification on your Google account.
2. Go to Google Account settings.
3. Open Security.
4. Create an App Password for Mail.
5. Put that generated password in `EMAIL_APP_PASSWORD`.

Do not use your normal Gmail login password.

## Weekly Scheduling

### Option 1: Cron

Run after the US market closes on Fridays. For example, on a machine using Eastern time:

```cron
0 18 * * 5 cd /path/to/weekly_ai_growth_screener && /path/to/weekly_ai_growth_screener/.venv/bin/python main.py
```

If your machine is not in New York/Eastern time, adjust the cron time accordingly.

### Option 2: Local Python Scheduler

```bash
python scheduler.py
```

This runs every Friday at 18:00 in the local machine timezone. For production, cron or GitHub Actions is usually more reliable.

### Option 3: GitHub Actions

This repo includes `.github/workflows/weekly_screener.yml`. Add these GitHub repository secrets:

- `EMAIL_USER`
- `EMAIL_APP_PASSWORD`
- `EMAIL_TO`

The workflow is scheduled for Friday after the US market close.

## Screening Logic

Hard growth filters:

- Market cap greater than `$2B`.
- Revenue growth greater than `10%`.
- 6-month price return greater than `0%`.
- Current price above the 200-day moving average.

Growth Score, max 100:

- Revenue Growth: 30 points.
- 6M Price Momentum: 20 points.
- 12M Price Momentum: 15 points.
- Gross Margin: 15 points.
- Free Cash Flow: 10 points.
- Price Above 200D MA: 10 points.

Missing gross margin or free cash flow does not automatically eliminate a stock, but it lowers the score.

AI Match Score, max 100:

- AI-related industry: 40 points.
- AI keywords in company description: up to 40 points.
- Technology or Communication Services sector: 10 points.
- High-value AI infrastructure keywords: 10 points.

Final Score:

```text
Final Score = Growth Score * 0.6 + AI Match Score * 0.4
```

Final selection thresholds:

- Growth Score >= 60.
- AI Match Score >= 50.
- Final Score >= 70.

## Data Quality Notes

`yfinance` is convenient for an MVP, but it can return missing, delayed, stale, or inconsistent values. The code catches per-ticker errors so a single failure does not stop the whole scan.

Future upgrades can add Financial Modeling Prep, Alpha Vantage, Polygon.io, SEC filings, earnings call text analysis, valuation filters, analyst estimates, and backtesting.

## Risk Notice and Disclaimer

This screener is a research tool. It is not a trading system and does not evaluate every risk that matters, including valuation, dilution, competitive risk, earnings quality, liquidity, current news, and macro conditions.

This report is generated automatically for informational and research purposes only. It is not financial advice, investment advice, or a recommendation to buy or sell any securities.

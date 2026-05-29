"""Local weekly scheduler entry point."""

from __future__ import annotations

import logging
import time

import schedule

from main import run

LOGGER = logging.getLogger(__name__)


def run_weekly_scheduler() -> None:
    """Run the screener every Friday at 18:00 local machine time."""
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s - %(message)s")
    schedule.every().friday.at("18:00").do(run)
    LOGGER.info("Scheduler started. Job runs every Friday at 18:00 local time.")

    while True:
        schedule.run_pending()
        time.sleep(60)


if __name__ == "__main__":
    run_weekly_scheduler()

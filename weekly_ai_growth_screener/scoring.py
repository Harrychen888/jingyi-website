"""Final scoring and ranking helpers."""

from __future__ import annotations


def calculate_final_score(growth_score: float, ai_match_score: float) -> float:
    """Blend growth and AI relevance into one final score."""
    return round((growth_score * 0.6) + (ai_match_score * 0.4), 2)


def rank_stocks(results: list[dict]) -> list[dict]:
    """Sort selected stocks by Final Score descending and attach ranks."""
    ranked = sorted(results, key=lambda item: item.get("final_score", 0), reverse=True)
    for index, item in enumerate(ranked, start=1):
        item["rank"] = index
    return ranked

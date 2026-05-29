"""AI industry and keyword matching."""

from __future__ import annotations

import re
from typing import Any

AI_CORE_INDUSTRIES = {
    "semiconductors",
    "semiconductor equipment & materials",
    "software - infrastructure",
    "software - application",
    "information technology services",
    "communication equipment",
    "electronic components",
    "computer hardware",
    "cloud infrastructure",
    "data center",
    "cybersecurity",
    "robotics",
    "automation",
}

AI_KEYWORDS = [
    "artificial intelligence",
    "AI",
    "machine learning",
    "generative AI",
    "large language model",
    "LLM",
    "data center",
    "GPU",
    "accelerator",
    "semiconductor",
    "chip",
    "cloud computing",
    "automation",
    "robotics",
    "neural network",
    "inference",
    "training",
    "AI infrastructure",
    "enterprise AI",
    "computer vision",
    "natural language processing",
    "cybersecurity",
    "edge computing",
]

HIGH_VALUE_KEYWORDS = [
    "data center",
    "GPU",
    "semiconductor",
    "cloud",
    "automation",
    "generative AI",
    "LLM",
    "AI infrastructure",
]

TECH_SECTORS = {"technology", "communication services"}


def _text(stock_data: dict[str, Any]) -> str:
    fields = [
        stock_data.get("sector"),
        stock_data.get("industry"),
        stock_data.get("long_business_summary"),
    ]
    return " ".join(str(field) for field in fields if field).strip()


def _contains_keyword(text: str, keyword: str) -> bool:
    if keyword.lower() == "ai":
        return bool(re.search(r"\bAI\b|\bai\b", text))
    return keyword.lower() in text.lower()


def _matched_keywords(stock_data: dict[str, Any], keywords: list[str]) -> list[str]:
    text = _text(stock_data)
    return [keyword for keyword in keywords if _contains_keyword(text, keyword)]


def _industry_matches(industry: str | None) -> bool:
    if not industry:
        return False
    industry_lower = industry.lower()
    return any(core in industry_lower for core in AI_CORE_INDUSTRIES)


def calculate_ai_match_score(stock_data: dict[str, Any]) -> float:
    """Calculate a 0-100 score for AI relevance."""
    score = 0.0
    industry = stock_data.get("industry")
    sector = stock_data.get("sector")

    if _industry_matches(industry):
        score += 40

    matched_keywords = _matched_keywords(stock_data, AI_KEYWORDS)
    # Keyword evidence is capped at 40 points to prevent very long summaries from dominating.
    score += min(len(matched_keywords) * 8, 40)

    if sector and sector.lower() in TECH_SECTORS:
        score += 10

    high_value_matches = _matched_keywords(stock_data, HIGH_VALUE_KEYWORDS)
    if high_value_matches:
        score += 10

    return round(min(score, 100), 2)


def get_ai_match_reasons(stock_data: dict[str, Any]) -> list[str]:
    """Return human-readable reasons for AI classification."""
    reasons: list[str] = []
    industry = stock_data.get("industry")
    sector = stock_data.get("sector")

    if _industry_matches(industry):
        reasons.append(f"Industry matched: {industry}")

    matched_keywords = _matched_keywords(stock_data, AI_KEYWORDS)
    if matched_keywords:
        reasons.append(f"Keyword matched: {', '.join(sorted(set(matched_keywords)))}")

    if sector and sector.lower() in TECH_SECTORS:
        reasons.append(f"Sector matched: {sector}")

    high_value_matches = _matched_keywords(stock_data, HIGH_VALUE_KEYWORDS)
    if high_value_matches:
        reasons.append(f"High-value keyword matched: {', '.join(sorted(set(high_value_matches)))}")

    return reasons

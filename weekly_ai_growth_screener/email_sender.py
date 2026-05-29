"""SMTP email sender for HTML reports and optional CSV attachments."""

from __future__ import annotations

import logging
import mimetypes
import smtplib
from email.message import EmailMessage
from pathlib import Path

from config import Config

LOGGER = logging.getLogger(__name__)


def send_email(
    subject: str,
    html_body: str,
    attachment_path: str | Path | None = None,
    config: Config | None = None,
) -> bool:
    """Send an HTML email with an optional attachment.

    Returns False when email credentials are missing so local report generation can still succeed.
    """
    if config is None:
        from config import load_config

        config = load_config()

    if not config.email_user or not config.email_app_password or not config.email_to:
        LOGGER.warning(
            "Email credentials are incomplete. Skipping email send. "
            "Set EMAIL_USER, EMAIL_APP_PASSWORD, and EMAIL_TO to enable delivery."
        )
        return False

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = config.email_user
    message["To"] = config.email_to
    message.set_content("This email contains an HTML report. Please view it in an HTML-capable email client.")
    message.add_alternative(html_body, subtype="html")

    if attachment_path:
        path = Path(attachment_path)
        if path.exists():
            content_type, _ = mimetypes.guess_type(path)
            maintype, subtype = (content_type or "application/octet-stream").split("/", 1)
            message.add_attachment(
                path.read_bytes(),
                maintype=maintype,
                subtype=subtype,
                filename=path.name,
            )
        else:
            LOGGER.warning("Attachment path does not exist: %s", path)

    with smtplib.SMTP(config.smtp_server, config.smtp_port) as smtp:
        smtp.starttls()
        smtp.login(config.email_user, config.email_app_password)
        smtp.send_message(message)

    LOGGER.info("Email sent to %s", config.email_to)
    return True

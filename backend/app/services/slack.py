import logging
import os

import httpx

from app.models.contact import ContactRequest

logger = logging.getLogger(__name__)


async def send_slack_notification(data: ContactRequest) -> None:
    """Slack 웹훅으로 상담 신청 알림을 전송한다. URL 미설정 시 skip."""
    webhook_url = os.getenv("SLACK_WEBHOOK_URL", "")
    if not webhook_url:
        logger.debug("SLACK_WEBHOOK_URL 미설정 — Slack 알림 생략")
        return

    fields = [
        f"*이름:* {data.name}",
        f"*연락처:* {data.phone}",
    ]
    if data.email:
        fields.append(f"*이메일:* {data.email}")
    if data.location:
        fields.append(f"*지역:* {data.location}")
    if data.propertyType:
        fields.append(f"*숙소 유형:* {data.propertyType}")
    if data.rooms:
        fields.append(f"*객실 수:* {data.rooms}")
    if data.service:
        fields.append(f"*관심 서비스:* {data.service}")
    if data.message:
        fields.append(f"*메시지:* {data.message}")

    payload = {
        "text": ":bell: *새 상담 신청이 접수되었습니다!*",
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "새 상담 신청이 접수되었습니다!",
                    "emoji": True,
                },
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "\n".join(fields),
                },
            },
        ],
    }

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(webhook_url, json=payload)
        resp.raise_for_status()

    logger.info("Slack 알림 전송 완료")

import asyncio
import json
import logging
import os
from datetime import datetime

from fastapi import APIRouter

from app.models.contact import ContactRequest, ContactResponse
from app.services.email import send_confirmation_email
from app.services.google_sheets import append_to_sheet
from app.services.slack import send_slack_notification

logger = logging.getLogger(__name__)

router = APIRouter()

CONTACT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "contacts")


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactRequest) -> ContactResponse:
    """상담 신청 접수 API"""
    # 1) JSON 파일 저장 (백업)
    os.makedirs(CONTACT_DIR, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{data.name}.json"
    filepath = os.path.join(CONTACT_DIR, filename)

    record = {
        "name": data.name,
        "phone": data.phone,
        "email": data.email,
        "location": data.location,
        "property_type": data.propertyType,
        "rooms": data.rooms,
        "service": data.service,
        "message": data.message,
        "submitted_at": datetime.now().isoformat(),
    }

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(record, f, ensure_ascii=False, indent=2)

    # 2) Slack 알림 + Google Sheets 기록 (비동기 병렬, 실패해도 응답에 영향 없음)
    async def _safe_slack() -> None:
        try:
            await send_slack_notification(data)
        except Exception:
            logger.exception("Slack 알림 전송 실패")

    async def _safe_sheets() -> None:
        try:
            await append_to_sheet(data)
        except Exception:
            logger.exception("Google Sheets 기록 실패")

    async def _safe_email() -> None:
        try:
            await send_confirmation_email(data)
        except Exception:
            logger.exception("이메일 발송 실패")

    await asyncio.gather(_safe_slack(), _safe_sheets(), _safe_email())

    return ContactResponse(success=True, message="상담 신청이 접수되었습니다.")

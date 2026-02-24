import logging
import os
from datetime import datetime

import gspread

from app.models.contact import ContactRequest

logger = logging.getLogger(__name__)

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "..")

HEADERS = [
    "접수일시",
    "이름",
    "연락처",
    "이메일",
    "지역",
    "숙소 유형",
    "객실 수",
    "관심 서비스",
    "메시지",
]


def _get_worksheet() -> gspread.Worksheet | None:
    """Google Sheets 워크시트를 반환한다. 설정 미완료 시 None."""
    sheets_id = os.getenv("GOOGLE_SHEETS_ID", "")
    if not sheets_id:
        logger.debug("GOOGLE_SHEETS_ID 미설정 — Sheets 기록 생략")
        return None

    credentials_path = os.path.join(BACKEND_DIR, "credentials.json")
    authorized_user_path = os.path.join(BACKEND_DIR, "authorized_user.json")

    if not os.path.isfile(credentials_path):
        logger.warning("credentials.json 없음 — Sheets 기록 생략")
        return None

    gc = gspread.oauth(
        credentials_filename=credentials_path,
        authorized_user_filename=authorized_user_path,
    )
    spreadsheet = gc.open_by_key(sheets_id)
    return spreadsheet.sheet1


async def append_to_sheet(data: ContactRequest) -> None:
    """Google Sheets에 상담 신청 데이터를 추가한다. 미설정 시 skip."""
    ws = _get_worksheet()
    if ws is None:
        return

    # 첫 행이 비어 있으면 헤더 삽입
    if not ws.row_values(1):
        ws.append_row(HEADERS)

    row = [
        datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        data.name,
        data.phone,
        data.email,
        data.location,
        data.propertyType,
        data.rooms,
        data.service,
        data.message,
    ]
    ws.append_row(row)
    logger.info("Google Sheets 기록 완료")

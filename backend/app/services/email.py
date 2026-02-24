import base64
import json
import logging
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from app.models.contact import ContactRequest

logger = logging.getLogger(__name__)

BACKEND_DIR = os.path.join(os.path.dirname(__file__), "..", "..")
CREDENTIALS_PATH = os.path.join(BACKEND_DIR, "credentials.json")
GMAIL_TOKEN_PATH = os.path.join(BACKEND_DIR, "gmail_token.json")
SCOPES = ["https://www.googleapis.com/auth/gmail.send"]


def _get_gmail_service():
    """Gmail API 서비스 객체를 반환한다. 환경변수 우선, 파일 폴백."""
    creds = None

    # 1) 환경변수에서 토큰 로드 (배포 환경)
    token_json = os.getenv("GMAIL_TOKEN_JSON")
    if token_json:
        info = json.loads(token_json)
        creds = Credentials.from_authorized_user_info(info, SCOPES)
    # 2) 파일에서 토큰 로드 (로컬 환경)
    elif os.path.isfile(GMAIL_TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(GMAIL_TOKEN_PATH, SCOPES)

    if not creds:
        logger.warning("Gmail 토큰 없음 — 이메일 발송 생략")
        return None

    if not creds.valid:
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            # 파일 기반이면 갱신된 토큰 저장
            if not token_json and os.path.isfile(GMAIL_TOKEN_PATH):
                with open(GMAIL_TOKEN_PATH, "w") as f:
                    f.write(creds.to_json())
        else:
            logger.warning("Gmail 토큰 만료 — 재인증 필요")
            return None

    return build("gmail", "v1", credentials=creds)


def _build_customer_html(data: ContactRequest) -> str:
    return f"""\
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#d9c4ad;font-family:-apple-system,'Apple SD Gothic Neo','Noto Sans KR',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#d9c4ad;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06);">

        <!-- Logo Header (dark strip) -->
        <tr>
          <td style="background:#0a0a0a;padding:28px 40px;text-align:center;">
            <span style="color:#b8845f;font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">TONO OPERATION</span>
          </td>
        </tr>

        <!-- Main Content -->
        <tr>
          <td style="padding:44px 40px 36px;">
            <h1 style="margin:0 0 6px;font-size:21px;font-weight:800;color:#1a1815;letter-spacing:-0.5px;">
              상담 신청이 접수되었습니다
            </h1>
            <p style="margin:0 0 32px;font-size:14px;color:#6b6560;line-height:1.7;">
              {data.name}님, 감사합니다. 담당자가 확인 후 <span style="color:#b8845f;font-weight:600;">24시간 내</span> 연락드리겠습니다.
            </p>

            <!-- 신청자 정보 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border:1px solid #e8e4de;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="padding:18px 22px 6px;">
                  <span style="font-size:10px;color:#b8845f;letter-spacing:2px;text-transform:uppercase;font-weight:600;">신청자 정보</span>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 22px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;border-bottom:1px solid #e8e4de;">이름</td>
                      <td style="padding:9px 0;font-size:13px;color:#1a1815;font-weight:600;border-bottom:1px solid #e8e4de;">{data.name}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;border-bottom:1px solid #e8e4de;">연락처</td>
                      <td style="padding:9px 0;font-size:13px;color:#1a1815;border-bottom:1px solid #e8e4de;">{data.phone}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;">이메일</td>
                      <td style="padding:9px 0;font-size:13px;color:#1a1815;">{data.email}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- 신청 내역 -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border:1px solid #e8e4de;border-radius:10px;overflow:hidden;margin-top:16px;">
              <tr>
                <td style="padding:18px 22px 6px;">
                  <span style="font-size:10px;color:#b8845f;letter-spacing:2px;text-transform:uppercase;font-weight:600;">신청 내역</span>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 22px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;border-bottom:1px solid #e8e4de;">숙소 위치</td>
                      <td style="padding:9px 0;font-size:13px;color:#1a1815;border-bottom:1px solid #e8e4de;">{data.location or '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;border-bottom:1px solid #e8e4de;">숙소 유형</td>
                      <td style="padding:9px 0;font-size:13px;color:#1a1815;border-bottom:1px solid #e8e4de;">{data.propertyType or '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;border-bottom:1px solid #e8e4de;">객실 수</td>
                      <td style="padding:9px 0;font-size:13px;color:#1a1815;border-bottom:1px solid #e8e4de;">{data.rooms or '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;border-bottom:1px solid #e8e4de;">관심 서비스</td>
                      <td style="padding:9px 0;font-size:13px;color:#1a1815;border-bottom:1px solid #e8e4de;">{data.service or '-'}</td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;font-size:13px;color:#9e978e;width:90px;vertical-align:top;">문의 내용</td>
                      <td style="padding:9px 0;font-size:13px;color:#6b6560;line-height:1.6;">{data.message or '-'}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Contact Info -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td style="padding:18px 0;border-top:1px solid #e8e4de;">
                  <p style="margin:0;font-size:12px;color:#9e978e;line-height:1.8;">
                    문의사항이 있으시면 언제든 연락해 주세요.
                  </p>
                  <table cellpadding="0" cellspacing="0" style="margin-top:10px;">
                    <tr>
                      <td style="padding:3px 0;font-size:12px;color:#6b6560;">
                        <span style="color:#b8845f;margin-right:6px;">&#9742;</span> 064-763-9500
                        <span style="color:#d8d3cb;margin:0 8px;">|</span>
                        09:00 ~ 21:00 연중무휴
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:3px 0;font-size:12px;color:#6b6560;">
                        <span style="color:#b8845f;margin-right:6px;">&#9993;</span> contact@tono-operation.com
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:22px 40px;background:#faf8f5;text-align:center;border-top:1px solid #e8e4de;">
            <span style="font-size:10px;color:#9e978e;letter-spacing:1px;">
              Beyond Operation, Tone the Space.
            </span>
            <br>
            <span style="font-size:10px;color:#d8d3cb;margin-top:4px;display:inline-block;">
              &copy; TONO OPERATION. All rights reserved.
            </span>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""


def _build_admin_html(data: ContactRequest) -> str:
    return f"""\
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,'Noto Sans KR',monospace,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:24px 32px;border-bottom:1px solid #1e1c18;">
            <span style="font-size:10px;color:#b8845f;letter-spacing:3px;text-transform:uppercase;font-weight:700;">NEW CONSULTATION</span>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <h2 style="margin:0 0 24px;font-size:18px;color:#f0ede8;font-weight:700;">{data.name}님의 상담 신청</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#141311;border:1px solid #1e1c18;border-radius:10px;">
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;border-bottom:1px solid #1e1c18;width:80px;">이름</td><td style="padding:14px 20px;font-size:13px;color:#f0ede8;border-bottom:1px solid #1e1c18;font-weight:600;">{data.name}</td></tr>
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;border-bottom:1px solid #1e1c18;">연락처</td><td style="padding:14px 20px;font-size:13px;color:#f0ede8;border-bottom:1px solid #1e1c18;">{data.phone}</td></tr>
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;border-bottom:1px solid #1e1c18;">이메일</td><td style="padding:14px 20px;font-size:13px;color:#d4a07a;border-bottom:1px solid #1e1c18;">{data.email}</td></tr>
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;border-bottom:1px solid #1e1c18;">위치</td><td style="padding:14px 20px;font-size:13px;color:#f0ede8;border-bottom:1px solid #1e1c18;">{data.location or '-'}</td></tr>
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;border-bottom:1px solid #1e1c18;">유형</td><td style="padding:14px 20px;font-size:13px;color:#f0ede8;border-bottom:1px solid #1e1c18;">{data.propertyType or '-'}</td></tr>
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;border-bottom:1px solid #1e1c18;">객실 수</td><td style="padding:14px 20px;font-size:13px;color:#f0ede8;border-bottom:1px solid #1e1c18;">{data.rooms or '-'}</td></tr>
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;border-bottom:1px solid #1e1c18;">서비스</td><td style="padding:14px 20px;font-size:13px;color:#f0ede8;border-bottom:1px solid #1e1c18;">{data.service or '-'}</td></tr>
              <tr><td style="padding:14px 20px;font-size:12px;color:#5a564e;vertical-align:top;">메시지</td><td style="padding:14px 20px;font-size:13px;color:#908a80;line-height:1.6;">{data.message or '-'}</td></tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


def _create_message(sender: str, to: str, subject: str, html: str) -> dict:
    msg = MIMEMultipart("alternative")
    msg["From"] = sender
    msg["To"] = to
    msg["Subject"] = subject
    msg.attach(MIMEText(html, "html", "utf-8"))
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    return {"raw": raw}


async def send_confirmation_email(data: ContactRequest) -> None:
    """Gmail API로 상담 접수 확인 이메일 발송 (고객 + 관리자)"""
    service = _get_gmail_service()
    if service is None:
        return

    sender_email = os.getenv("GMAIL_SENDER", "contact@tono-operation.com")
    admin_email = os.getenv("ADMIN_EMAIL", "contact@tono-operation.com")
    sender = f"TONO OPERATION <{sender_email}>"

    # 1) 고객 접수 확인
    customer_msg = _create_message(
        sender=sender,
        to=data.email,
        subject=f"[TONO] {data.name}님, 상담 신청이 접수되었습니다",
        html=_build_customer_html(data),
    )
    service.users().messages().send(userId="me", body=customer_msg).execute()

    # 2) 관리자 알림
    admin_msg = _create_message(
        sender=sender,
        to=admin_email,
        subject=f"[상담신청] {data.name} / {data.location} / {data.propertyType}",
        html=_build_admin_html(data),
    )
    service.users().messages().send(userId="me", body=admin_msg).execute()

    logger.info("Gmail API 이메일 발송 완료 — 고객: %s, 관리자: %s", data.email, admin_email)

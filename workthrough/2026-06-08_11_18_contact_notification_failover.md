# 상담신청 알림 실패 처리 개선

## 개요
상담신청 접수 시 Slack/Gmail 알림이 실패해도 성공으로 처리되던 문제를 수정했습니다. 추가 확인 결과 배포본에서 `/api/contact`가 Vercel 함수에 닿지 않는 라우팅 문제도 확인되어, 파일 기반 함수 엔트리를 추가했습니다.

## 주요 변경사항
- 수정한 것: Slack/Gmail 미설정 또는 전송 실패를 `200 OK`로 숨기지 않도록 변경
- 개선한 것: 관리자 이메일을 고객 확인 이메일보다 먼저 전송
- 개선한 것: API 실패 시 프론트에서 자동 완료 처리 대신 이메일 앱 연결 안내 표시
- 수정한 것: Vercel의 `/api/contact`, `/api/health` 파일 기반 함수 엔트리 추가 및 깨지는 API rewrite 제거

## 결과
- 파이썬 문법 검사 통과
- 프론트엔드 프로덕션 빌드 통과
- 환경변수 없는 API 호출이 `503`을 반환하는 것 확인
- 알림 채널 하나가 성공하면 `200 OK`를 반환하는 것 확인
- 새 `/api/contact` 엔트리 import 및 `/api/health` 응답 확인

## 다음 단계
- Vercel 환경변수 `SLACK_WEBHOOK_URL`, `GMAIL_TOKEN_JSON`, `GMAIL_SENDER`, `ADMIN_EMAIL` 값 확인
- 실제 배포 후 `/api/contact` 함수 로그에서 Slack/Gmail 전송 성공 여부 확인

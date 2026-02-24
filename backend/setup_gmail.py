"""
Gmail API 최초 인증 스크립트
한 번만 실행하면 gmail_token.json이 생성됩니다.

실행: python setup_gmail.py
"""
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ["https://www.googleapis.com/auth/gmail.send"]

flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
creds = flow.run_local_server(port=0)

with open("gmail_token.json", "w") as f:
    f.write(creds.to_json())

print("gmail_token.json 생성 완료!")
print("이제 이메일 발송이 가능합니다.")

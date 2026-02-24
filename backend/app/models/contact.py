import re

from pydantic import BaseModel, field_validator


class ContactRequest(BaseModel):
    name: str
    phone: str
    email: str
    location: str = ""
    propertyType: str = ""
    rooms: str = ""
    service: str = ""
    message: str = ""

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not re.match(r"^01[016789]-?\d{3,4}-?\d{4}$", v):
            raise ValueError("올바른 연락처를 입력해주세요")
        return v

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", v):
            raise ValueError("올바른 이메일을 입력해주세요")
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str

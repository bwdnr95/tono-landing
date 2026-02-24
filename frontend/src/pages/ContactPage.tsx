import { useState } from 'react'
import type { FormEvent } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation.ts'
import SectionTag from '../components/ui/SectionTag.tsx'
import SectionTitle from '../components/ui/SectionTitle.tsx'

interface FormData {
  name: string
  phone: string
  email: string
  location: string
  propertyType: string
  rooms: string
  service: string
  message: string
}

const initialForm: FormData = {
  name: '',
  phone: '',
  email: '',
  location: '',
  propertyType: '',
  rooms: '',
  service: '',
  message: '',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 18px',
  background: 'var(--bg-card)',
  border: '1px solid var(--bd)',
  borderRadius: '10px',
  color: 'var(--tx)',
  fontSize: '0.9rem',
  fontFamily: "'Noto Sans KR', sans-serif",
  outline: 'none',
  transition: 'border-color 0.3s',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23908a80' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 500,
  color: 'var(--tx-s)',
  marginBottom: '8px',
}

export default function ContactPage() {
  const ref = useScrollAnimation()
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = '올바른 연락처를 입력해주세요 (예: 010-1234-5678)'
    }
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = '올바른 이메일을 입력해주세요 (예: email@example.com)'
    }
    if (!form.location) {
      newErrors.location = '숙소 위치를 선택해주세요'
    }
    if (!form.propertyType) {
      newErrors.propertyType = '숙소 유형을 선택해주세요'
    }
    if (!form.rooms) {
      newErrors.rooms = '객실 수를 선택해주세요'
    }
    if (!form.service) {
      newErrors.service = '관심 서비스를 선택해주세요'
    }
    if (!form.message.trim()) {
      newErrors.message = '문의 내용을 입력해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        // Fallback: mailto
        const subject = encodeURIComponent(`[상담신청] ${form.name}`)
        const body = encodeURIComponent(
          `이름: ${form.name}\n연락처: ${form.phone}\n이메일: ${form.email}\n숙소 위치: ${form.location}\n숙소 유형: ${form.propertyType}\n객실 수: ${form.rooms}\n관심 서비스: ${form.service}\n\n문의 내용:\n${form.message}`
        )
        window.location.href = `mailto:contact@tono-operation.com?subject=${subject}&body=${body}`
        setSubmitted(true)
      }
    } catch {
      // Fallback: mailto
      const subject = encodeURIComponent(`[상담신청] ${form.name}`)
      const body = encodeURIComponent(
        `이름: ${form.name}\n연락처: ${form.phone}\n이메일: ${form.email}\n숙소 위치: ${form.location}\n숙소 유형: ${form.propertyType}\n객실 수: ${form.rooms}\n관심 서비스: ${form.service}\n\n문의 내용:\n${form.message}`
      )
      window.location.href = `mailto:contact@tono-operation.com?subject=${subject}&body=${body}`
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div ref={ref}>
      {/* Hero */}
      <section style={{ paddingTop: '160px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="anim">
          <SectionTag>CONTACT</SectionTag>
          <SectionTitle center>운영 상담 신청</SectionTitle>
          <p style={{ fontSize: '1rem', color: 'var(--tx-s)', lineHeight: 1.7, maxWidth: '560px', fontWeight: 300, margin: '0 auto' }}>
            숙소 규모와 현황에 맞는 최적 운영 구조를 제안합니다.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '40px' }}>
        <div className="contact-layout" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', alignItems: 'start' }}>
          {/* Form */}
          <div className="anim">
            {submitted ? (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(106,171,115,0.3)',
                  borderRadius: '16px',
                  padding: '60px 40px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✓</div>
                <h3 className="font-outfit" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
                  상담 신청이 완료되었습니다
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--tx-s)', fontWeight: 300 }}>
                  담당자가 확인 후 24시간 내 회신드립니다.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--bd)',
                  borderRadius: '16px',
                  padding: '44px 40px',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>이름 <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="홍길동"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--ac)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--bd)' }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>연락처 <span style={{ color: 'var(--red)' }}>*</span></label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => { handleChange('phone', e.target.value); setErrors((prev) => ({ ...prev, phone: undefined })) }}
                      placeholder="010-0000-0000"
                      style={{ ...inputStyle, ...(errors.phone ? { borderColor: 'var(--red)' } : {}) }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = errors.phone ? 'var(--red)' : 'var(--ac)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = errors.phone ? 'var(--red)' : 'var(--bd)' }}
                    />
                    {errors.phone && <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: '6px' }}>{errors.phone}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>이메일 <span style={{ color: 'var(--red)' }}>*</span></label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => { handleChange('email', e.target.value); setErrors((prev) => ({ ...prev, email: undefined })) }}
                    placeholder="email@example.com"
                    style={{ ...inputStyle, ...(errors.email ? { borderColor: 'var(--red)' } : {}) }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = errors.email ? 'var(--red)' : 'var(--ac)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.email ? 'var(--red)' : 'var(--bd)' }}
                  />
                  {errors.email && <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: '6px' }}>{errors.email}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>숙소 위치 <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select value={form.location} onChange={(e) => { handleChange('location', e.target.value); setErrors((prev) => ({ ...prev, location: undefined })) }} style={{ ...selectStyle, ...(errors.location ? { borderColor: 'var(--red)' } : {}) }}>
                      <option value="">선택해주세요</option>
                      <option value="서울">서울</option>
                      <option value="경기/인천">경기/인천</option>
                      <option value="강원">강원</option>
                      <option value="충청/대전/세종">충청/대전/세종</option>
                      <option value="전라/광주">전라/광주</option>
                      <option value="경북/대구">경북/대구</option>
                      <option value="경남/부산/울산">경남/부산/울산</option>
                      <option value="제주">제주</option>
                      <option value="기타">기타</option>
                    </select>
                    {errors.location && <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: '6px' }}>{errors.location}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>숙소 유형 <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select value={form.propertyType} onChange={(e) => { handleChange('propertyType', e.target.value); setErrors((prev) => ({ ...prev, propertyType: undefined })) }} style={{ ...selectStyle, ...(errors.propertyType ? { borderColor: 'var(--red)' } : {}) }}>
                      <option value="">선택해주세요</option>
                      <option value="펜션/독채">펜션/독채</option>
                      <option value="게스트하우스">게스트하우스</option>
                      <option value="호텔">호텔</option>
                      <option value="기타">기타</option>
                    </select>
                    {errors.propertyType && <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: '6px' }}>{errors.propertyType}</p>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>객실 수 <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select value={form.rooms} onChange={(e) => { handleChange('rooms', e.target.value); setErrors((prev) => ({ ...prev, rooms: undefined })) }} style={{ ...selectStyle, ...(errors.rooms ? { borderColor: 'var(--red)' } : {}) }}>
                      <option value="">선택해주세요</option>
                      <option value="독채">독채</option>
                      <option value="2~10개">2~10개</option>
                      <option value="11~20개">11~20개</option>
                      <option value="21개 이상">21개 이상</option>
                    </select>
                    {errors.rooms && <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: '6px' }}>{errors.rooms}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>관심 서비스 <span style={{ color: 'var(--red)' }}>*</span></label>
                    <select value={form.service} onChange={(e) => { handleChange('service', e.target.value); setErrors((prev) => ({ ...prev, service: undefined })) }} style={{ ...selectStyle, ...(errors.service ? { borderColor: 'var(--red)' } : {}) }}>
                      <option value="">선택해주세요</option>
                      <option value="SaaS 구독">SaaS 구독</option>
                      <option value="부분 위탁">부분 위탁</option>
                      <option value="전체 위탁">전체 위탁</option>
                      <option value="아직 모르겠어요">아직 모르겠어요</option>
                    </select>
                    {errors.service && <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: '6px' }}>{errors.service}</p>}
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>문의 내용 <span style={{ color: 'var(--red)' }}>*</span></label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => { handleChange('message', e.target.value); setErrors((prev) => ({ ...prev, message: undefined })) }}
                    placeholder="궁금하신 내용을 자유롭게 작성해주세요."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', ...(errors.message ? { borderColor: 'var(--red)' } : {}) }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = errors.message ? 'var(--red)' : 'var(--ac)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = errors.message ? 'var(--red)' : 'var(--bd)' }}
                  />
                  {errors.message && <p style={{ fontSize: '0.75rem', color: 'var(--red)', marginTop: '6px' }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '17px',
                    background: submitting ? 'var(--ac-d)' : 'var(--ac)',
                    color: 'var(--bg)',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.currentTarget.style.background = 'var(--ac-l)'
                      e.currentTarget.style.boxShadow = '0 0 36px var(--ac-glow)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = submitting ? 'var(--ac-d)' : 'var(--ac)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {submitting ? '전송 중...' : '상담 신청하기'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="anim" style={{ position: 'sticky', top: '100px' }}>
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--bd)',
                borderRadius: '16px',
                padding: '36px 28px',
              }}
            >
              <h3 className="font-outfit" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px' }}>직접 연락하기</h3>

              <div style={{ marginBottom: '20px' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ac)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                  PHONE
                </span>
                <a href="tel:064-763-9500" style={{ fontSize: '0.95rem', color: 'var(--tx)', fontWeight: 500 }}>
                  064-763-9500
                </a>
                <p style={{ fontSize: '0.78rem', color: 'var(--tx-d)', marginTop: '4px', fontWeight: 300 }}>
                  09:00~21:00 연중무휴
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ac)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                  EMAIL
                </span>
                <a href="mailto:contact@tono-operation.com" style={{ fontSize: '0.95rem', color: 'var(--tx)', fontWeight: 500 }}>
                  contact@tono-operation.com
                </a>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ac)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                  ADDRESS
                </span>
                <p style={{ fontSize: '0.88rem', color: 'var(--tx-s)', fontWeight: 300, lineHeight: 1.6 }}>
                  제주특별자치도 서귀포시
                  <br />
                  동홍북로 27-11 3층
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: 'rgba(184,132,95,0.06)',
                  border: '1px solid rgba(184,132,95,0.12)',
                  borderRadius: '10px',
                }}
              >
                <p style={{ fontSize: '0.82rem', color: 'var(--tx-s)', fontWeight: 300, lineHeight: 1.6 }}>
                  담당자가 확인 후
                  <br />
                  <strong style={{ color: 'var(--ac-l)', fontWeight: 600 }}>24시간 내 회신</strong>드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
          .contact-layout > div:last-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  )
}

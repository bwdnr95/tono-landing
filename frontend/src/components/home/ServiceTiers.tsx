import { useNavigate } from 'react-router-dom'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const tiers = [
  {
    num: 'ⅰ',
    name: 'SaaS 구독',
    sub: 'Self-operated',
    desc: '직접 운영을 유지하면서 운영 체계를 정비하고 싶은 운영자를 위한 소프트웨어 서비스입니다.',
    features: [
      'TONO 운영 소프트웨어 제공',
      '시스템 교육 및 초기 세팅 지원',
      '예약 · 정산 · 운영 데이터 관리',
      '자동 메세지 기능',
    ],
    tag: '운영 구조를 정비하고 싶은 분',
    featured: false,
  },
  {
    num: 'ⅱ',
    name: '부분 위탁',
    sub: 'Part Service',
    desc: '응대와 예약 관리를 분리하고, 현장 운영에만 집중하고 싶은 운영자를 위한 구조입니다.',
    features: [
      'SaaS 기능 전체 포함',
      '예약 관리 및 1차 고객 응대 대행',
      'OTA 리스팅 최적화',
      '데이터 기반 가격 최적화',
    ],
    tag: '응대 부담을 줄이고 싶은 분',
    featured: true,
  },
  {
    num: 'ⅲ',
    name: '전체 위탁',
    sub: 'Full Service',
    desc: '운영을 전면 위탁하고 자산 관리와 의사결정에만 집중하고 싶은 소유주를 위한 완전 위탁 서비스입니다.',
    features: [
      '부분 위탁 서비스 전체 포함',
      '청소 · 린넨 · 시설 유지보수',
      '셀프체크인 장비 설치 및 관리',
      '월간 운영 리포트 및 수익 분석',
      '전문 촬영 · 콘텐츠 제작',
    ],
    tag: '완전 위탁을 원하시는 분',
    featured: false,
  },
]

export default function ServiceTiers() {
  const ref = useScrollAnimation()
  const navigate = useNavigate()

  return (
    <section id="service" ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="anim" style={{ textAlign: 'center' }}>
          <SectionTag>SERVICE</SectionTag>
          <SectionTitle center>운영 상황에 따라 선택합니다</SectionTitle>
          <p style={{ fontSize: '1rem', color: 'var(--tx-s)', lineHeight: 1.7, maxWidth: '560px', fontWeight: 300, margin: '0 auto' }}>
            하나의 방식만을 강요하지 않습니다. 숙소 규모와 관여 수준에 따라 최적 구조를 선택하세요.
          </p>
        </div>

        <div className="tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginTop: '56px' }}>
          {tiers.map((t, i) => (
            <div
              key={i}
              className="anim"
              style={{
                background: t.featured
                  ? 'linear-gradient(180deg, rgba(184,132,95,0.04), var(--bg-card))'
                  : 'var(--bg-card)',
                border: t.featured
                  ? '1px solid rgba(184,132,95,0.3)'
                  : '1px solid var(--bd)',
                borderRadius: '16px',
                padding: '40px 30px',
                transition: 'all 0.4s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'rgba(184,132,95,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = t.featured ? 'rgba(184,132,95,0.3)' : 'var(--bd)'
              }}
            >
              <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ac)', letterSpacing: '2px', marginBottom: '12px', display: 'block' }}>
                {t.num}
              </span>
              <h3 className="font-outfit" style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>
                {t.name}
              </h3>
              <div className="font-outfit" style={{ fontSize: '0.82rem', color: 'var(--tx-d)', marginBottom: '18px' }}>
                {t.sub}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--tx-s)', lineHeight: 1.6, fontWeight: 300, marginBottom: '22px', minHeight: '60px' }}>
                {t.desc}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0, listStyle: 'none' }}>
                {t.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '0.83rem', color: 'var(--tx-s)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 300 }}>
                    <span style={{ color: 'var(--ac)', fontWeight: 700, fontSize: '0.75rem' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: 'inline-block',
                  marginTop: '22px',
                  padding: '6px 14px',
                  background: 'rgba(184,132,95,0.08)',
                  border: '1px solid rgba(184,132,95,0.18)',
                  borderRadius: '100px',
                  fontSize: '0.73rem',
                  color: 'var(--ac)',
                  fontWeight: 500,
                }}
              >
                {t.tag}
              </div>
              <div style={{ marginTop: '18px' }}>
                <button
                  onClick={() => navigate('/service')}
                  className="font-outfit"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--ac)',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ac-l)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ac)' }}
                >
                  자세히 보기 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tier-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

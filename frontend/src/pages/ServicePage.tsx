import { useNavigate } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation.ts'
import SectionTag from '../components/ui/SectionTag.tsx'
import SectionTitle from '../components/ui/SectionTitle.tsx'

const services = [
  {
    num: 'ⅰ',
    name: 'TONIFY Lite',
    sub: 'Self-operated',
    desc: '숙소를 직접 운영하는 운영자를 위해 설계된 소프트웨어 기반 운영 관리 서비스입니다. 예약 관리, 고객 응대, 정산, 운영 데이터 분석까지 핵심 기능을 하나의 시스템으로 제공합니다.',
    features: [
      '예약 관리 시스템',
      '고객 응대 관리 (자동 메세지 기능 포함)',
      '체크인·체크아웃 안내 관리',
      '정산 관리 및 매출 정리',
      '운영 데이터 분석 및 리포트',
      '운영자·실무자 계정 분리 관리',
    ],
    target: '직접 운영을 유지하려는 운영자 / 운영 체계를 정비하려는 소·중규모 숙소',
    summary: '운영을 대신하지 않되, 흔들리지 않는 기준과 구조를 만들어드립니다.',
  },
  {
    num: 'ⅱ',
    name: 'TONIFY Pro',
    sub: 'Part Service',
    desc: '현장 관리는 직접 진행하면서, 고객 소통과 예약 관리 업무를 분리하고 싶은 운영자를 위한 서비스입니다.',
    features: [
      'SaaS 전체 기능 포함',
      '예약 관리 및 1차 고객 응대 대행',
      'OTA 리스팅 최적화',
      '데이터 기반 가격 최적화',
    ],
    target: '응대 부담을 분리하려는 운영자 / 현장에 집중하려는 운영자',
    summary: '운영을 넘기는 것이 아닌, 소유주의 시간과 집중력을 회복하는 구조입니다.',
  },
  {
    num: 'ⅲ',
    name: 'TONIFY Enterprise',
    sub: 'Full Service',
    desc: '숙소 운영 전반을 통합 관리하는 전체 위탁운영 서비스입니다. 운영자는 큰 방향과 의사결정에 집중하고, 실제 운영은 TONO OPERATION이 구조적으로 관리합니다.',
    features: [
      'SaaS + 부분 위탁 전체 포함',
      '정산·매출 관리·운영 데이터 분석',
      '청소·린넨 협력사 운영 및 품질 관리',
      '셀프체크인 장비 설치 및 현장 관리',
      '시설 유지보수 (경미 보수 즉시 대응)',
      '법정 안전점검·소방 일정 관리',
      '전문 촬영·콘텐츠 제작·OTA 마케팅',
      '월간 운영 리포트 및 수익 분석',
    ],
    target: '운영에서 완전히 손을 떼려는 소유주 / 다수 숙소 보유 자산가',
    summary: '소유주의 체력에 의존하지 않는 구조로, 숙소를 지속 가능한 수익 자산으로 전환합니다.',
  },
]

const comparisonFeatures = [
  { name: '운영 소프트웨어', saas: true, part: true, full: true },
  { name: '예약 관리 시스템', saas: true, part: true, full: true },
  { name: '자동 메세지 기능', saas: true, part: true, full: true },
  { name: '정산 관리', saas: true, part: true, full: true },
  { name: '운영 데이터 분석', saas: true, part: true, full: true },
  { name: '예약 관리 대행', saas: false, part: true, full: true },
  { name: '1차 고객 응대 대행', saas: false, part: true, full: true },
  { name: 'OTA 리스팅 최적화', saas: false, part: true, full: true },
  { name: '데이터 기반 가격 최적화', saas: false, part: true, full: true },
  { name: '청소·린넨 관리', saas: false, part: false, full: true },
  { name: '셀프체크인 장비 설치', saas: false, part: false, full: true },
  { name: '시설 유지보수', saas: false, part: false, full: true },
  { name: '전문 촬영·콘텐츠 제작', saas: false, part: false, full: true },
  { name: '월간 운영 리포트', saas: false, part: false, full: true },
]

export default function ServicePage() {
  const ref = useScrollAnimation()
  const navigate = useNavigate()

  return (
    <div ref={ref}>
      {/* Hero */}
      <section style={{ paddingTop: '160px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="anim">
          <SectionTag>SERVICE</SectionTag>
          <SectionTitle center>운영 상황에 따른 최적 서비스 구조</SectionTitle>
          <p style={{ fontSize: '1rem', color: 'var(--tx-s)', lineHeight: 1.7, maxWidth: '560px', fontWeight: 300, margin: '0 auto' }}>
            숙소의 규모와 운영자의 개입 수준에 따라 3단계 서비스 구조를 제공합니다.
          </p>
        </div>
      </section>

      {/* Service Details */}
      {services.map((s, i) => (
        <section key={i} style={{ background: i % 2 === 0 ? 'var(--bg-warm)' : undefined }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              className="anim"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--bd)',
                borderRadius: '20px',
                padding: '56px 48px',
              }}
            >
              <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ac)', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
                {s.num}
              </span>
              <h2 className="font-outfit" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '4px' }}>
                {s.name}
              </h2>
              <div className="font-outfit" style={{ fontSize: '0.9rem', color: 'var(--tx-d)', marginBottom: '24px' }}>
                {s.sub}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--tx-s)', lineHeight: 1.75, fontWeight: 300, maxWidth: '700px', marginBottom: '32px' }}>
                {s.desc}
              </p>

              <h4 className="font-outfit" style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', color: 'var(--ac)' }}>
                제공 기능
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '32px' }}>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.87rem', color: 'var(--tx-s)', fontWeight: 300 }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '0.8rem' }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ac)', letterSpacing: '1px', display: 'block', marginBottom: '6px' }}>
                    대상
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--tx-s)', fontWeight: 300 }}>{s.target}</p>
                </div>
              </div>

              <div
                style={{
                  padding: '16px 20px',
                  background: 'rgba(184,132,95,0.06)',
                  border: '1px solid rgba(184,132,95,0.15)',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  color: 'var(--ac-l)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                "{s.summary}"
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table */}
      <section>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="anim" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <SectionTag>COMPARISON</SectionTag>
            <SectionTitle center>서비스 기능 비교</SectionTitle>
          </div>

          <div className="anim" style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'var(--bg-card)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--bd)',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--bd)' }}>
                  <th style={{ padding: '20px 24px', textAlign: 'left', fontSize: '0.85rem', fontWeight: 600, color: 'var(--tx)' }}>기능</th>
                  <th className="font-outfit" style={{ padding: '20px 24px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--tx)' }}>TONIFY Lite</th>
                  <th className="font-outfit" style={{ padding: '20px 24px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--ac)' }}>TONIFY Pro</th>
                  <th className="font-outfit" style={{ padding: '20px 24px', textAlign: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--tx)' }}>TONIFY Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((f, i) => (
                  <tr key={i} style={{ borderBottom: i < comparisonFeatures.length - 1 ? '1px solid var(--bd)' : undefined }}>
                    <td style={{ padding: '14px 24px', fontSize: '0.84rem', color: 'var(--tx-s)', fontWeight: 300 }}>{f.name}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.9rem' }}>
                      {f.saas ? <span style={{ color: 'var(--green)' }}>✓</span> : <span style={{ color: 'var(--tx-d)' }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.9rem' }}>
                      {f.part ? <span style={{ color: 'var(--green)' }}>✓</span> : <span style={{ color: 'var(--tx-d)' }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: '0.9rem' }}>
                      {f.full ? <span style={{ color: 'var(--green)' }}>✓</span> : <span style={{ color: 'var(--tx-d)' }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section>
        <div
          className="anim"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(184,132,95,0.06), rgba(122,155,181,0.03))',
            border: '1px solid rgba(184,132,95,0.15)',
            borderRadius: '24px',
            padding: '80px 60px',
          }}
        >
          <h2 className="font-outfit" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '14px' }}>
            어떤 서비스가 맞을지 모르겠다면,
            <br />
            상담부터 시작하세요.
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--tx-s)', marginBottom: '32px', fontWeight: 300 }}>
            숙소 상황에 맞는 최적 구조를 제안해드립니다.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="font-body"
            style={{
              fontSize: '1rem',
              padding: '17px 44px',
              background: 'var(--ac)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--ac-l)'
              e.currentTarget.style.boxShadow = '0 0 36px var(--ac-glow)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--ac)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            무료 운영 상담 신청 →
          </button>
        </div>
      </section>
    </div>
  )
}

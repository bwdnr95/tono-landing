import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const solutions = [
  {
    icon: '💬',
    title: '4개국어 자동 응대',
    desc: '한/영/중/일 24시간 게스트 문의 자동 처리. 숙소별 시설 정보와 운영 규칙을 반영하여, 현장 매니저 수준의 응대를 제공합니다.',
    badge: '게스트 문의 80% 자동 해결',
  },
  {
    icon: '📊',
    title: '데이터 기반 가격 최적화',
    desc: '경쟁사 가격, 시즌, 수요 패턴을 매일 분석하여 숙소별 최적 요금을 산출합니다. 감이 아닌 데이터가 객단가를 결정합니다.',
    badge: '평일 점유율 30%↑',
  },
  {
    icon: '🏠',
    title: '통합 운영 관리',
    desc: '멀티채널 OTA 통합, 예약 관리, 체크인 자동화, 정산까지. 하나의 대시보드에서 숙소 운영 전체 현황을 실시간으로 파악합니다.',
    badge: '운영 자동화율 90%',
  },
  {
    icon: '🧹',
    title: '청소 · 시설 관리',
    desc: '자회사 직영 청소팀이 체크아웃 스케줄에 맞춰 최적 동선으로 운영합니다. 시설 유지보수와 법정 안전점검까지 체계적으로 관리합니다.',
    badge: '자회사 직영 운영',
  },
  {
    icon: '📸',
    title: '콘텐츠 · 마케팅',
    desc: '전문 촬영, OTA 리스팅 최적화, 리뷰 관리까지. 숙소의 첫인상부터 재방문까지 이어지는 마케팅 구조를 설계합니다.',
    badge: '전환율 최적화',
  },
  {
    icon: '📋',
    title: '월간 운영 리포트',
    desc: '매출, 점유율, 경쟁사 비교, 개선 방향까지. 매월 데이터 기반 보고서를 제공하여 자산 가치를 투명하게 관리합니다.',
    badge: '데이터 기반 의사결정',
  },
]

export default function Solution() {
  const ref = useScrollAnimation()

  return (
    <section id="solution" style={{ background: 'var(--bg-warm)' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="anim">
          <SectionTag>SOLUTION</SectionTag>
          <SectionTitle>숙박 전문가의 운영 노하우, 시스템으로 만들었습니다</SectionTitle>
          <p style={{ fontSize: '1rem', color: 'var(--tx-s)', lineHeight: 1.7, maxWidth: '560px', fontWeight: 300 }}>
            수천 건의 운영 경험에서 검증된 프로세스를 자동화 시스템에 담았습니다.
          </p>
        </div>

        <div className="sol-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginTop: '56px' }}>
          {solutions.map((s, i) => (
            <div
              key={i}
              className="anim"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--bd)',
                borderRadius: '14px',
                padding: '36px 28px',
                transition: 'all 0.4s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(184,132,95,0.3)'
                e.currentTarget.style.background = 'var(--bg-card-h)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--bd)'
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '22px',
                  background: 'rgba(184,132,95,0.08)',
                }}
              >
                {s.icon}
              </div>
              <h3 className="font-outfit" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '10px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.87rem', color: 'var(--tx-s)', lineHeight: 1.65, fontWeight: 300 }}>
                {s.desc}
              </p>
              <div
                className="font-mono"
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  padding: '5px 12px',
                  background: 'rgba(106,171,115,0.08)',
                  border: '1px solid rgba(106,171,115,0.2)',
                  borderRadius: '100px',
                  fontSize: '0.67rem',
                  color: 'var(--green)',
                  letterSpacing: '0.4px',
                }}
              >
                {s.badge}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sol-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

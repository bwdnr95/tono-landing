import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const pains = [
  {
    icon: '⏰',
    title: '운영에 묶인 시간',
    desc: '숙소는 365일 돌아갑니다. 예약 확인, 게스트 문의, 체크인 안내, 청소 관리 — 직접 하려면 내 시간 전부를 바쳐야 합니다. 여행은커녕 주말도 없습니다.',
  },
  {
    icon: '🤷',
    title: '맡기고 싶지만 믿을 곳이 없다',
    desc: '운영 대행 업체는 많지만, 내 숙소를 내 수준으로 관리해줄 곳을 찾기 어렵습니다. 맡겼다가 리뷰 떨어지고, 매출 줄고, 결국 다시 직접 하게 됩니다.',
  },
  {
    icon: '📉',
    title: '비수기 공실, 성수기 놓친 매출',
    desc: '비수기엔 텅 비고, 성수기엔 너무 낮은 가격에 팔렸습니다. 적정 가격을 찾으려면 매일 경쟁사를 모니터링해야 하는데, 그럴 여유가 없습니다.',
  },
  {
    icon: '🏝️',
    title: '현장에 상주할 수 없는 현실',
    desc: '제주에 숙소가 있지만 서울에 삽니다. 부산에 호텔이 있지만 매번 내려갈 수 없습니다. 원격으로 운영하려면 체계가 필요한데, 어디서부터 시작해야 할지 모르겠습니다.',
  },
]

export default function PainPoints() {
  const ref = useScrollAnimation()

  return (
    <section id="pain" style={{ background: 'var(--bg-warm)' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="anim">
          <SectionTag>WHY TONO</SectionTag>
          <SectionTitle>자산은 있는데, 운영이 문제입니다</SectionTitle>
          <p style={{ fontSize: '1rem', color: 'var(--tx-s)', lineHeight: 1.7, maxWidth: '560px', fontWeight: 300 }}>
            숙소를 소유하고 계신 분들이 공통적으로 겪는 구조적 한계입니다.
          </p>
        </div>

        <div className="pain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px', marginTop: '56px' }}>
          {pains.map((p, i) => (
            <div
              key={i}
              className="anim"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--bd)',
                borderRadius: '14px',
                padding: '32px 28px',
                display: 'flex',
                gap: '18px',
                alignItems: 'flex-start',
                transition: 'all 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(192,86,79,0.15)'
                e.currentTarget.style.background = 'var(--bg-card-h)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--bd)'
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(192,86,79,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>
              <div>
                <h4 className="font-outfit" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--tx-s)', lineHeight: 1.6, fontWeight: 300 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pain-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

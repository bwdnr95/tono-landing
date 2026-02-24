import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const cases = [
  {
    label: '제주 독채 A',
    type: '독채 펜션 · 1실 · ADR 22만',
    before: { occupancy: '60%', revenue: '396만' },
    after: { occupancy: '87%', revenue: '572만' },
  },
  {
    label: '제주 풀빌라 B',
    type: '풀빌라 · 2실 · ADR 30만',
    before: { occupancy: '50%', revenue: '900만' },
    after: { occupancy: '84%', revenue: '1,500만' },
  },
  {
    label: '부산 기장 C',
    type: '호텔 · 38객실',
    before: { occupancy: '55%', revenue: '6,700만' },
    after: { occupancy: '93.22%', revenue: '1억 1,200만' },
  },
]

export default function Results() {
  const ref = useScrollAnimation()

  return (
    <section ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="anim" style={{ textAlign: 'center' }}>
          <SectionTag>RESULTS</SectionTag>
          <SectionTitle center>실제 운영 성과</SectionTitle>
          <p style={{
            fontSize: '0.95rem', color: 'var(--tx-s)', lineHeight: 1.75,
            maxWidth: '480px', margin: '16px auto 0', fontWeight: 300,
          }}>
            TONO 위탁 운영 전후 평균 데이터입니다.
          </p>
        </div>

        <div className="results-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginTop: '56px',
        }}>
          {cases.map((c, i) => (
            <div
              key={i}
              className="anim"
              style={{
                borderRadius: '14px',
                border: '1px solid var(--bd)',
                background: 'var(--bg-card)',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(184,132,95,0.25)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--bd)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Header */}
              <div style={{
                padding: '24px 28px 16px',
                borderBottom: '1px solid var(--bd)',
              }}>
                <h4 className="font-outfit" style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  {c.label}
                </h4>
                <span style={{ fontSize: '0.76rem', color: 'var(--tx-d)', fontWeight: 300 }}>
                  {c.type}
                </span>
              </div>

              {/* Before / After rows */}
              <div style={{ padding: '20px 28px' }}>
                {/* Before */}
                <div style={{ marginBottom: '20px' }}>
                  <span className="font-mono" style={{
                    fontSize: '0.65rem', letterSpacing: '1.5px',
                    color: 'var(--tx-d)', textTransform: 'uppercase',
                  }}>
                    Before
                  </span>
                  <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                    <div>
                      <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--tx-d)' }}>
                        {c.before.occupancy}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--tx-d)', marginTop: '2px' }}>점유율</div>
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--tx-d)' }}>
                        {c.before.revenue}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--tx-d)', marginTop: '2px' }}>월 매출</div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  textAlign: 'center', color: 'var(--ac)', fontSize: '1rem',
                  padding: '4px 0',
                }}>
                  ↓
                </div>

                {/* After */}
                <div style={{ marginTop: '12px' }}>
                  <span className="font-mono" style={{
                    fontSize: '0.65rem', letterSpacing: '1.5px',
                    color: 'var(--ac)', textTransform: 'uppercase',
                  }}>
                    After — TONO
                  </span>
                  <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                    <div>
                      <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--ac-l)' }}>
                        {c.after.occupancy}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--tx-s)', marginTop: '2px' }}>점유율</div>
                    </div>
                    <div>
                      <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--ac-l)' }}>
                        {c.after.revenue}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--tx-s)', marginTop: '2px' }}>월 매출</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

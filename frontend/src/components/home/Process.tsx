import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const steps = [
  {
    num: 'STEP 01',
    icon: '📞',
    title: '상담 · 현장 확인',
    desc: '시설 현황 파악, 운영 목표 협의, 맞춤 운영 전략을 제안합니다.',
  },
  {
    num: 'STEP 02',
    icon: '⚙️',
    title: '시스템 세팅',
    desc: 'OTA 채널 연동, 자동 응대 설정, 셀프체크인 장비를 구성합니다.',
  },
  {
    num: 'STEP 03',
    icon: '🚀',
    title: '운영 시작',
    desc: '2주 시범 운영 후 정식 전환. 데이터를 분석하며 지속 최적화합니다.',
  },
]

export default function Process() {
  const ref = useScrollAnimation()

  return (
    <>
      <section style={{ background: 'var(--bg-warm)' }} ref={ref}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="anim" style={{ textAlign: 'center' }}>
            <SectionTag>PROCESS</SectionTag>
            <SectionTitle center>상담부터 운영까지 3주 이내</SectionTitle>
            <p style={{ fontSize: '1rem', color: 'var(--tx-s)', lineHeight: 1.7, maxWidth: '560px', fontWeight: 300, margin: '0 auto' }}>
              숙소의 공백 기간을 최소화합니다.
            </p>
          </div>

          <div className="how-flow anim" style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  textAlign: 'center',
                  border: '1px solid var(--bd)',
                  background: 'var(--bg-card)',
                  position: 'relative',
                  borderRadius:
                    i === 0
                      ? '14px 0 0 14px'
                      : i === steps.length - 1
                        ? '0 14px 14px 0'
                        : undefined,
                }}
              >
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--ac)', letterSpacing: '2px', marginBottom: '18px', display: 'block' }}>
                  {s.num}
                </span>
                <span style={{ fontSize: '2rem', marginBottom: '16px', display: 'block' }}>{s.icon}</span>
                <h4 className="font-outfit" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--tx-s)', lineHeight: 1.6, fontWeight: 300 }}>
                  {s.desc}
                </p>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <span
                    className="how-arrow"
                    style={{
                      position: 'absolute',
                      right: '-13px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--ac)',
                      zIndex: 2,
                      background: 'var(--bg-warm)',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: '1px solid var(--bd)',
                      fontSize: '1rem',
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .how-flow {
            grid-template-columns: 1fr !important;
          }
          .how-flow > div {
            border-radius: 0 !important;
          }
          .how-flow > div:first-child {
            border-radius: 14px 14px 0 0 !important;
          }
          .how-flow > div:last-child {
            border-radius: 0 0 14px 14px !important;
          }
          .how-arrow {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

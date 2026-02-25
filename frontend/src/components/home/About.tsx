import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const values = [
  { num: '1', title: 'Tone', desc: '공간의 고유한 감도와 결을 발견하고, 그 감각에서 시작합니다.' },
  { num: '2', title: 'Harmony', desc: '사람과 공간, 그리고 시스템이 자연스럽게 이어지는 흐름을 만듭니다.' },
  { num: '3', title: 'Warmth', desc: '공간이 사람에게 전하는 온기를 잃지 않도록, 경험 속에 따뜻함을 남깁니다.' },
  { num: '4', title: 'Simplicity', desc: '복잡한 과정을 덜어내고 본질에 집중하여, 가장 순수한 운영을 지향합니다.' },
  { num: '5', title: 'Sustainability', desc: '감정과 경험이 일회성이 아닌 기억으로 이어지도록, 지속 가능한 리듬을 설계합니다.' },
]

export default function About() {
  const ref = useScrollAnimation()

  return (
    <section id="about" style={{ background: 'var(--bg-warm)' }} ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="anim">
          <SectionTag>ABOUT US</SectionTag>
          <SectionTitle>TONO OPERATION은 숙박 운영의 모든 것을 담은 STAYTECH 기업입니다.</SectionTitle>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginTop: '56px', alignItems: 'start' }}>
          <div className="anim">
            <p style={{ fontSize: '0.95rem', color: 'var(--tx-s)', lineHeight: 1.85, fontWeight: 300, marginBottom: '20px' }}>
              TONO OPERATION은 제주 호텔 현장에서 1,000객실 이상을 직접 운영해온 팀이 만들었습니다. 인력이 부족해 서비스가 무너지고, 운영의 질이 사람에 의해 흔들리는 상황을 수없이 목격했습니다. TONO는 이 한계를 구조로 바꾸기 위해 출발했습니다.
            </p>
            <p style={{ fontSize: '0.95rem', color: 'var(--tx-s)', lineHeight: 1.85, fontWeight: 300, marginBottom: '20px' }}>
              객실 운영, 레버뉴 매니지먼트, 호텔 브랜딩과 리브랜딩까지 — 7년간 숙박업의 전 과정을 직접 설계하고 운영하면서 하나의 질문이 시작점이 되었습니다. "대형 호텔에서는 당연한 전문 운영 체계가, 왜 중·소규모 숙소에는 없는가?"
            </p>
            <div
              style={{
                fontSize: '1.05rem',
                color: 'var(--ac-l)',
                fontWeight: 400,
                fontStyle: 'italic',
                padding: '20px 0',
                borderTop: '1px solid var(--bd)',
                borderBottom: '1px solid var(--bd)',
                margin: '28px 0',
              }}
            >
              "인력난 속에서도 전문가 수준의 운영을, 가격 경쟁이 아닌 서비스 품질로 승부할 수 있도록."
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--tx-s)', lineHeight: 1.85, fontWeight: 300 }}>
              전문 인력의 부재는 서비스 품질 저하로 이어져 관광객의 재방문율을 떨어뜨리고, 이는 숙박업주의 수익을 다시 악화시키는 악순환을 만듭니다. TONO는 이 악순환을 끊기 위해 만들어졌습니다. 대형 호텔에서만 가능했던 체계적 운영을 중·소규모 숙소에도 적용할 수 있도록 경험을 시스템으로 만들었습니다. 제주와 부산을 중심으로 빠르게 성장하고 있습니다.
            </p>
          </div>

          <div className="anim" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {values.map((v) => (
              <div
                key={v.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--bd)',
                  borderRadius: '10px',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(184,132,95,0.2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--bd)' }}
              >
                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--ac)', fontWeight: 700, width: '20px', flexShrink: 0 }}>
                  {v.num}
                </span>
                <div>
                  <h4 className="font-outfit" style={{ fontSize: '0.92rem', fontWeight: 600 }}>{v.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--tx-s)', fontWeight: 300, marginTop: '2px', lineHeight: 1.5 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

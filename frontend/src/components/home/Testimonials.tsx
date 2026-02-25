import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const testimonials = [
  {
    quote: '직접 운영할 때는 새벽 문의에도 답해야 했는데, 위탁 후엔 월 보고서만 확인합니다. 매출은 오히려 올랐고요.',
    author: '제주 독채 펜션 소유주',
    tag: 'A님',
  },
  {
    quote: '가격을 언제 올리고 내려야 할지 항상 감으로 했었는데, 데이터 기반으로 운영하니까 비수기 매출이 확 달라졌어요.',
    author: '부산 해운대 숙소 소유주',
    tag: 'B님',
  },
  {
    quote: '건물은 제 자산인데 운영은 전문가한테 맡기는 거잖아요. 투자 수익률 관점에서 가장 합리적인 판단이었습니다.',
    author: '제주 중문 호텔 소유주',
    tag: 'C님',
  },
]

export default function Testimonials() {
  const ref = useScrollAnimation()

  return (
    <section ref={ref} style={{ background: 'var(--bg-warm)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="anim" style={{ textAlign: 'center' }}>
          <SectionTag>TESTIMONIALS</SectionTag>
          <SectionTitle center>파트너 소유주의 이야기</SectionTitle>
        </div>

        <div className="testimonial-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginTop: '56px',
        }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="anim"
              style={{
                padding: '36px 30px',
                borderRadius: '14px',
                background: 'var(--bg-card)',
                border: '1px solid var(--bd)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
              {/* Quote mark */}
              <div>
                <span className="font-outfit" style={{
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  color: 'var(--ac)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '16px',
                  opacity: 0.6,
                }}>
                  &ldquo;
                </span>
                <p style={{
                  fontSize: '0.92rem',
                  color: 'var(--tx-s)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}>
                  {t.quote}
                </p>
              </div>

              {/* Author */}
              <div style={{
                marginTop: '28px',
                paddingTop: '20px',
                borderTop: '1px solid var(--bd)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--ac), var(--ac-d))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {t.tag}
                </div>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--tx-d)',
                  fontWeight: 400,
                }}>
                  {t.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

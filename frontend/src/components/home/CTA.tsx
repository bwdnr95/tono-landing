import { useNavigate } from 'react-router-dom'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'

export default function CTA() {
  const ref = useScrollAnimation()
  const navigate = useNavigate()

  return (
    <section id="contact" ref={ref}>
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at center, rgba(184,132,95,0.04), transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <h2
          className="font-outfit"
          style={{
            fontSize: 'clamp(1.7rem, 3vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: '14px',
            position: 'relative',
          }}
        >
          숙소 운영, 구조부터
          <br />
          다시 설계할 때입니다
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--tx-s)', marginBottom: '12px', fontWeight: 300, position: 'relative' }}>
          숙소에 맞는 최적 운영 구조를 제안해드립니다.
        </p>
        <div className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--tx-d)', marginBottom: '36px', position: 'relative' }}>
          <a href="tel:064-763-9500">📞 064-763-9500</a> ·{' '}
          <a href="mailto:contact@tono-operation.com">✉ contact@tono-operation.com</a>
        </div>
        <button
          onClick={() => navigate('/contact')}
          className="font-body"
          style={{
            position: 'relative',
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

      <style>{`
        @media (max-width: 768px) {
          .anim > div:first-child + h2,
          section > div {
            padding: 56px 28px !important;
          }
        }
      `}</style>
    </section>
  )
}

import { useNavigate } from 'react-router-dom'

const stats = [
  { num: '169+', label: 'TONO와 함께하는 숙소' },
  { num: '88%', label: '월평균 점유율 · 제주 평균 대비 +25%p' },
  { num: '80%', label: '게스트 문의 AI 자동 처리' },
  { num: '24/7', label: '무중단 운영' },
]

export default function Hero() {
  const navigate = useNavigate()

  return (
    <>
      <section
        className="hero-section"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '140px 48px 100px',
        }}
      >
        {/* Background Orbs */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            filter: 'blur(140px)',
            pointerEvents: 'none',
            top: '15%',
            left: '15%',
            background: 'var(--ac)',
            opacity: 0.06,
            animation: 'orbFloat 12s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            filter: 'blur(140px)',
            pointerEvents: 'none',
            bottom: '15%',
            right: '10%',
            background: '#7a9bb5',
            opacity: 0.04,
            animation: 'orbFloat 12s ease-in-out infinite reverse',
          }}
        />

        {/* Tagline */}
        <div
          className="font-outfit"
          style={{
            fontSize: '0.82rem',
            color: 'var(--ac)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '32px',
            opacity: 0,
            animation: 'fadeUp 0.8s ease-out 0.1s forwards',
          }}
        >
          Beyond Operation, Tone the Space.
        </div>

        {/* Main Heading */}
        <h1
          className="font-outfit"
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '24px',
            opacity: 0,
            animation: 'fadeUp 0.8s ease-out 0.2s forwards',
          }}
        >
          숙소는 소유주의 것,
          <br />
          <span
            style={{
              fontStyle: 'normal',
              background: 'linear-gradient(135deg, var(--ac-l), var(--ac))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            운영은 전문가의 것
          </span>
        </h1>

        {/* Sub copy */}
        <p
          style={{
            fontSize: '1.1rem',
            color: 'var(--tx-s)',
            lineHeight: 1.75,
            maxWidth: '560px',
            fontWeight: 300,
            marginBottom: '20px',
            opacity: 0,
            animation: 'fadeUp 0.8s ease-out 0.3s forwards',
          }}
        >
          숙소를 TONIFY하면, 운영이 시작됩니다.
        </p>

        {/* Detail */}
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--tx-s)',
            lineHeight: 1.7,
            maxWidth: '480px',
            marginBottom: '48px',
            opacity: 0,
            animation: 'fadeUp 0.8s ease-out 0.35s forwards',
          }}
        >
          소유주는 자산의 가치에 집중하세요.
          <br />
          나머지는 TONO가 구조로 만듭니다.
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-actions"
          style={{
            display: 'flex',
            gap: '14px',
            marginBottom: '72px',
            opacity: 0,
            animation: 'fadeUp 0.8s ease-out 0.4s forwards',
          }}
        >
          <button
            onClick={() => navigate('/contact')}
            className="font-body"
            style={{
              padding: '15px 34px',
              background: 'var(--ac)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.92rem',
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
            무료 운영 상담 →
          </button>
          <button
            onClick={() => {
              const el = document.querySelector('#solution')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            className="font-body"
            style={{
              padding: '15px 34px',
              background: 'transparent',
              color: 'var(--tx)',
              border: '1px solid var(--bd-l)',
              borderRadius: '8px',
              fontWeight: 500,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--ac)'
              e.currentTarget.style.color = 'var(--ac-l)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--bd-l)'
              e.currentTarget.style.color = 'var(--tx)'
            }}
          >
            서비스 둘러보기
          </button>
        </div>

        {/* Stats */}
        <div
          className="stats-bar"
          style={{
            display: 'flex',
            gap: '1px',
            opacity: 0,
            animation: 'fadeUp 0.8s ease-out 0.5s forwards',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '28px 44px',
                background: 'var(--bg-card)',
                border: '1px solid var(--bd)',
                textAlign: 'center',
                borderRadius:
                  i === 0
                    ? '12px 0 0 12px'
                    : i === stats.length - 1
                      ? '0 12px 12px 0'
                      : undefined,
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--ac-l)',
                  letterSpacing: '-1px',
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--tx-s)', marginTop: '5px', letterSpacing: '0.5px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 20px 80px !important;
          }
          .hero-actions {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-actions button {
            width: 100% !important;
            text-align: center !important;
          }
          .stats-bar {
            flex-direction: column !important;
            width: 100% !important;
          }
          .stats-bar > div {
            border-radius: 0 !important;
            padding: 20px 28px !important;
          }
          .stats-bar > div:first-child {
            border-radius: 12px 12px 0 0 !important;
          }
          .stats-bar > div:last-child {
            border-radius: 0 0 12px 12px !important;
          }
        }
      `}</style>
    </>
  )
}

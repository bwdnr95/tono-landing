import { useState, useCallback } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation.ts'
import SectionTag from '../components/ui/SectionTag.tsx'
import SectionTitle from '../components/ui/SectionTitle.tsx'

/* ──────────────────────────────────────────────
   사진 목록 — /portfolio/ 폴더에 이미지를 넣고 여기에 경로 추가
   ────────────────────────────────────────────── */
const images = [
  '/portfolio/1.jpg',
  '/portfolio/2.jpg',
  '/portfolio/2-1.jpg',
  '/portfolio/2-2.jpg',
  '/portfolio/3.jpg',
  '/portfolio/4.jpg',
  '/portfolio/5.jpg',
  '/portfolio/5-1.jpg',
  '/portfolio/5-2.jpg',
  '/portfolio/5-3.jpg',
  '/portfolio/6.jpg',
  '/portfolio/7.jpg',
  '/portfolio/8.jpg',
  '/portfolio/9.jpg',
  '/portfolio/10.jpg',
  '/portfolio/11.jpg',
  '/portfolio/12.jpg',
  '/portfolio/13.jpg',
  '/portfolio/14.jpg',
  '/portfolio/15.jpg',
  '/portfolio/16.jpg',
  '/portfolio/17.jpg',
  '/portfolio/18.jpg',
  '/portfolio/19.jpg',
  '/portfolio/20.jpg',
  '/portfolio/21.jpg',
  '/portfolio/22.jpg',
  '/portfolio/23.jpg',
  '/portfolio/24.jpg',
  '/portfolio/25.jpg',
  '/portfolio/26.jpg',
  '/portfolio/27.jpg',
  '/portfolio/28.jpg',
  '/portfolio/29.jpg',
  '/portfolio/30.jpg',
]

function PortfolioImage({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = useCallback(() => setLoaded(true), [])
  const handleError = useCallback(() => setError(true), [])

  return (
    <div
      onClick={onClick}
      style={{
        breakInside: 'avoid',
        marginBottom: '16px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'zoom-in',
        border: '1px solid var(--bd)',
        transition: 'all 0.4s',
        // 로드 전 고정 높이로 레이아웃 잡기
        ...(!loaded && !error ? { aspectRatio: '4/3', background: 'var(--bg-card)' } : {}),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(184,132,95,0.3)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(184,132,95,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--bd)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {error ? (
        <div style={{
          aspectRatio: '4/3',
          background: 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ color: 'var(--tx-d)', fontSize: '0.75rem', letterSpacing: '2px', fontFamily: 'monospace' }}>
            PHOTO
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt=""
          loading={index < 6 ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            width: '100%',
            display: 'block',
            transition: 'transform 0.5s, opacity 0.5s',
            opacity: loaded ? 1 : 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        />
      )}
    </div>
  )
}

export default function PortfolioPage() {
  const ref = useScrollAnimation()
  const [lightbox, setLightbox] = useState<number | null>(null)

  const goPrev = () => setLightbox((i) => (i !== null && i > 0 ? i - 1 : i))
  const goNext = () => setLightbox((i) => (i !== null && i < images.length - 1 ? i + 1 : i))

  return (
    <>
      {/* Hero */}
      <section
        style={{
          minHeight: '44vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '160px 48px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
          filter: 'blur(160px)', background: 'var(--ac)', opacity: 0.05,
          top: '10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none',
        }} />

        <div ref={ref}>
          <div className="anim">
            <SectionTag>PORTFOLIO</SectionTag>
            <SectionTitle>운영 중인 공간들</SectionTitle>
            <p style={{
              fontSize: '1rem', color: 'var(--tx-s)', lineHeight: 1.75,
              maxWidth: '520px', margin: '20px auto 0', fontWeight: 300,
            }}>
              TONO가 직접 운영하며 감도를 설계하고 있는 공간들입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section style={{ padding: '0 48px 120px' }}>
        <div className="portfolio-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          columns: '3',
          gap: '16px',
        }}>
          {images.map((src, i) => (
            <PortfolioImage
              key={src}
              src={src}
              index={i}
              onClick={() => setLightbox(i)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '40px',
          }}
        >
          {/* Prev */}
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              style={{
                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              ‹
            </button>
          )}

          <img
            src={images[lightbox]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%', maxHeight: '85vh',
              borderRadius: '12px', objectFit: 'contain',
              cursor: 'default',
            }}
          />

          {/* Next */}
          {lightbox < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '1.2rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              ›
            </button>
          )}

          {/* Counter */}
          <div className="font-mono" style={{
            position: 'absolute', bottom: '28px',
            color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem',
            letterSpacing: '2px',
          }}>
            {lightbox + 1} / {images.length}
          </div>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '20px', right: '24px',
              background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.5)', fontSize: '1.6rem',
              cursor: 'pointer', transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .portfolio-grid { columns: 2 !important; }
        }
        @media (max-width: 768px) {
          .portfolio-grid { columns: 2 !important; gap: 10px !important; }
          .portfolio-grid > div { margin-bottom: 10px !important; }
        }
        @media (max-width: 480px) {
          .portfolio-grid { columns: 1 !important; }
        }
      `}</style>
    </>
  )
}

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleHashLink = (hash: string) => {
    setMobileOpen(false)
    if (location.pathname === '/') {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    navigate('/' + hash)
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(24px)',
          background: 'var(--nav-bg)',
          borderBottom: '1px solid var(--bd)',
        }}
      >
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src="/tono-logo.png"
            alt="TONO OPERATION"
            style={{ height: '34px', opacity: 0.9 }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.9' }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links-desktop" style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}>
          <a
            href="#pain"
            onClick={(e) => { e.preventDefault(); handleHashLink('#pain') }}
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '0.84rem', fontWeight: 500, letterSpacing: '0.3px', transition: 'color 0.3s', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ac-l)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--tx-s)' }}
          >
            왜 필요한가요
          </a>
          <Link
            to="/service"
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '0.84rem', fontWeight: 500, letterSpacing: '0.3px', transition: 'color 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ac-l)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--tx-s)' }}
          >
            서비스
          </Link>
          <Link
            to="/portfolio"
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '0.84rem', fontWeight: 500, letterSpacing: '0.3px', transition: 'color 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ac-l)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--tx-s)' }}
          >
            포트폴리오
          </Link>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); handleHashLink('#about') }}
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '0.84rem', fontWeight: 500, letterSpacing: '0.3px', transition: 'color 0.3s', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ac-l)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--tx-s)' }}
          >
            회사소개
          </a>
          <Link
            to="/contact"
            className="font-outfit"
            style={{
              padding: '10px 22px',
              background: 'var(--ac)',
              color: 'var(--bg)',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.84rem',
              letterSpacing: '0.3px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--ac-l)'
              e.currentTarget.style.boxShadow = '0 0 24px var(--ac-glow)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--ac)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            상담 신청
          </Link>
        </div>

        {/* Theme Toggle + Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: '1px solid var(--bd)',
              background: 'transparent',
              color: 'var(--tx-s)',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--ac)'
              e.currentTarget.style.borderColor = 'var(--ac)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--tx-s)'
              e.currentTarget.style.borderColor = 'var(--bd)'
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--tx)', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--tx)', transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--tx)', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="nav-mobile-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: 'var(--mobile-overlay-bg)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          <a
            href="#pain"
            onClick={(e) => { e.preventDefault(); handleHashLink('#pain') }}
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '1.2rem', fontWeight: 500 }}
          >
            왜 필요한가요
          </a>
          <Link
            to="/service"
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '1.2rem', fontWeight: 500 }}
            onClick={() => setMobileOpen(false)}
          >
            서비스
          </Link>
          <Link
            to="/portfolio"
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '1.2rem', fontWeight: 500 }}
            onClick={() => setMobileOpen(false)}
          >
            포트폴리오
          </Link>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); handleHashLink('#about') }}
            className="font-outfit"
            style={{ color: 'var(--tx-s)', fontSize: '1.2rem', fontWeight: 500 }}
          >
            회사소개
          </a>
          <Link
            to="/contact"
            className="font-outfit"
            style={{
              padding: '14px 36px',
              background: 'var(--ac)',
              color: 'var(--bg)',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
            }}
            onClick={() => setMobileOpen(false)}
          >
            상담 신청
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 14px 20px !important; }
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

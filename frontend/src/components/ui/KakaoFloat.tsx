import { useState } from 'react'

/* ─────────────────────────────────────────
   카카오톡 채널 URL을 아래에 입력하세요
   ───────────────────────────────────────── */
const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_XWJxkn/chat'

export default function KakaoFloat() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={KAKAO_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: hovered ? '10px' : '0px',
        padding: '14px 18px',
        borderRadius: '100px',
        background: '#FEE500',
        color: '#191919',
        fontWeight: 700,
        fontSize: '0.88rem',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.2)'
          : '0 4px 16px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Kakao icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#191919">
        <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.725 1.792 5.112 4.488 6.457-.168.607-.611 2.197-.7 2.537-.11.42.154.414.324.301.133-.089 2.117-1.44 2.975-2.026.589.084 1.196.128 1.813.128h.1c5.523 0 10-3.463 10-7.691v-.015C21 6.463 17.523 3 12 3z"/>
      </svg>
      <span style={{
        maxWidth: hovered ? '120px' : '0px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        transition: 'max-width 0.3s',
        fontFamily: "'Noto Sans KR', sans-serif",
      }}>
        카톡 상담
      </span>
    </a>
  )
}

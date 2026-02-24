import type { CSSProperties } from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  type?: 'button' | 'submit'
  style?: CSSProperties
}

export default function Button({ children, variant = 'primary', onClick, type = 'button', style }: ButtonProps) {
  const base: CSSProperties = {
    padding: '15px 34px',
    borderRadius: '8px',
    fontWeight: variant === 'primary' ? 700 : 500,
    fontSize: '0.92rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontFamily: "'Noto Sans KR', sans-serif",
  }

  const variants: Record<string, CSSProperties> = {
    primary: {
      ...base,
      background: 'var(--ac)',
      color: 'var(--bg)',
      border: 'none',
    },
    secondary: {
      ...base,
      background: 'transparent',
      color: 'var(--tx)',
      border: '1px solid var(--bd-l)',
    },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...variants[variant], ...style }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        if (variant === 'primary') {
          el.style.background = 'var(--ac-l)'
          el.style.boxShadow = '0 0 36px var(--ac-glow)'
          el.style.transform = 'translateY(-2px)'
        } else {
          el.style.borderColor = 'var(--ac)'
          el.style.color = 'var(--ac-l)'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        if (variant === 'primary') {
          el.style.background = 'var(--ac)'
          el.style.boxShadow = 'none'
          el.style.transform = 'translateY(0)'
        } else {
          el.style.borderColor = 'var(--bd-l)'
          el.style.color = 'var(--tx)'
        }
      }}
    >
      {children}
    </button>
  )
}

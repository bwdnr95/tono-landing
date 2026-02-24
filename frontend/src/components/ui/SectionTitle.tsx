interface SectionTitleProps {
  children: React.ReactNode
  center?: boolean
}

export default function SectionTitle({ children, center }: SectionTitleProps) {
  return (
    <div
      className="font-outfit"
      style={{
        fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
        fontWeight: 800,
        letterSpacing: '-1.5px',
        lineHeight: 1.15,
        marginBottom: '18px',
        textAlign: center ? 'center' : undefined,
      }}
    >
      {children}
    </div>
  )
}

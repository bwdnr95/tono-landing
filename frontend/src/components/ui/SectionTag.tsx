interface SectionTagProps {
  children: React.ReactNode
}

export default function SectionTag({ children }: SectionTagProps) {
  return (
    <div
      className="font-mono"
      style={{
        fontSize: '0.7rem',
        color: 'var(--ac)',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        marginBottom: '14px',
      }}
    >
      {children}
    </div>
  )
}

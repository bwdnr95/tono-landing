export default function Footer() {
  return (
    <>
      <footer
        style={{
          padding: '44px 48px',
          borderTop: '1px solid var(--bd)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <img src="/tono-logo.png" alt="TONO OPERATION" style={{ height: '26px', opacity: 0.5 }} />
          <p style={{ fontSize: '0.72rem', color: 'var(--tx-d)', marginTop: '8px', fontWeight: 300 }}>
            STAYTECH가 숙소 운영을 바꿉니다. 숙소를 TONIFY 하세요.
          </p>
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--tx-d)',
            textAlign: 'right',
            lineHeight: 1.7,
          }}
        >
          TONO OPERATION · 제주특별자치도 서귀포시 동홍북로 27-11 3층
          <br />
          <a href="tel:064-763-9500">064-763-9500</a> ·{' '}
          <a href="mailto:contact@tono-operation.com">contact@tono-operation.com</a> · 09:00~21:00 연중무휴
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          footer {
            flex-direction: column !important;
            gap: 16px !important;
            text-align: center !important;
            padding: 32px 20px !important;
          }
          footer > div:last-child {
            text-align: center !important;
          }
        }
      `}</style>
    </>
  )
}

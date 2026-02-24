import { useScrollAnimation } from '../../hooks/useScrollAnimation.ts'
import SectionTag from '../ui/SectionTag.tsx'
import SectionTitle from '../ui/SectionTitle.tsx'

const beforeItems = [
  '직접 운영 시 소유주의 시간 자산이 잠식됨',
  '인력 고용 시 고정비 증가 및 채용 리스크',
  '수동 운영 체계로 인한 수익 최적화 불가',
  '24시간 응대 부재로 예약 이탈 발생',
  '비수기 공실률 증가 → 연간 수익 변동성 확대',
]

const afterItems = [
  '전문 운영팀이 예약·응대·현장 전담',
  '숙박 전문가의 노하우가 담긴 자동 응대 시스템',
  '5개 OTA 채널 동시 통합, 노출 극대화',
  '데이터 기반 가격 최적화 — 감이 아닌 구조',
  '소유주는 월간 보고서 확인만으로 자산 관리',
]

export default function BeforeAfter() {
  const ref = useScrollAnimation()

  return (
    <section ref={ref}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="anim" style={{ textAlign: 'center' }}>
          <SectionTag>BEFORE / AFTER</SectionTag>
          <SectionTitle center>자산의 수익화, 구조가 답입니다</SectionTitle>
        </div>

        <div className="ba-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '56px' }}>
          {/* Before */}
          <div
            className="anim"
            style={{
              borderRadius: '16px',
              padding: '44px 36px',
              background: 'var(--bg-card)',
              border: '1px solid var(--bd)',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.68rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '20px',
                display: 'block',
                color: 'var(--tx-d)',
              }}
            >
              소유주가 직면한 한계
            </span>
            <h3 className="font-outfit" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px' }}>
              운영에 소모되는 일상
            </h3>
            {beforeItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', fontSize: '0.9rem', color: 'var(--tx-s)', fontWeight: 300 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, color: 'var(--red)' }}>✗</span>
                {item}
              </div>
            ))}
          </div>

          {/* After */}
          <div
            className="anim"
            style={{
              borderRadius: '16px',
              padding: '44px 36px',
              background: 'linear-gradient(135deg, rgba(184,132,95,0.08), rgba(184,132,95,0.03))',
              border: '1px solid rgba(184,132,95,0.2)',
            }}
          >
            <span
              className="font-mono"
              style={{
                fontSize: '0.68rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '20px',
                display: 'block',
                color: 'var(--ac)',
              }}
            >
              TONO 위탁 이후
            </span>
            <h3 className="font-outfit" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px' }}>
              구조가 운영하는 숙소
            </h3>
            {afterItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', fontSize: '0.9rem', color: 'var(--tx-s)', fontWeight: 300 }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, color: 'var(--green)' }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ba-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')
const SITE = 'https://www.tono-operation.com'
const OG_IMAGE = `${SITE}/tono-logo.png`

const KEYWORDS_BASE =
  '토노오퍼레이션,TONO OPERATION,제주 숙소 위탁운영,제주 숙박 위탁운영,숙박위탁운영,에어비앤비 대행 제주,펜션 관리대행,숙소 운영대행,제주 펜션 관리,부산 숙소 위탁운영,TONIFY,STAYTECH,제주 숙소 관리대행,숙소 위탁운영 비용,에어비앤비 운영대행,제주 풀빌라 관리,제주 독채 운영대행'

const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TONO OPERATION',
  alternateName: '토노오퍼레이션',
  description: '제주·부산 AI 기반 숙소 위탁운영 전문 기업',
  url: SITE,
  telephone: '064-763-9500',
  email: 'contact@tono-operation.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '동홍북로 27-11 3층',
    addressLocality: '서귀포시',
    addressRegion: '제주특별자치도',
    addressCountry: 'KR',
  },
  areaServed: ['제주특별자치도', '부산광역시'],
  serviceType: ['숙소 위탁운영', '에어비앤비 대행', '펜션 관리대행', '동적 가격 최적화'],
  brand: { '@type': 'Brand', name: 'TONIFY' },
  openingHours: 'Mo-Su 09:00-21:00',
  sameAs: [],
}

const routes = [
  {
    path: '/',
    title: '토노오퍼레이션 | 제주·부산 AI 숙소 위탁운영 — TONIFY',
    description:
      'TONO OPERATION은 제주·부산 기반 AI 숙소 위탁운영(STAYTECH) 전문 기업입니다. 37개 숙소 192객실 운영. 동적 가격 최적화, 자동 게스트 응대, OTA 채널 동기화.',
    ogTitle: '토노오퍼레이션 | 제주·부산 AI 숙소 위탁운영',
    ogDescription:
      'AI 기반 원격 숙소 위탁운영. 37개 숙소 192객실. Beyond Operation, Tone the Space.',
    jsonLd: [ORG_LD],
  },
  {
    path: '/service',
    title: 'TONIFY 서비스 — Lite / Pro / Enterprise | 숙소 위탁운영',
    description:
      '숙소 규모와 운영 개입 수준에 맞춘 3단계 위탁운영 — TONIFY Lite(SaaS 구독), Pro(부분 위탁), Enterprise(전체 위탁). 제주·부산 AI 숙소 운영 솔루션.',
    ogTitle: 'TONIFY 서비스 3단계 — Lite · Pro · Enterprise',
    ogDescription:
      '운영 상황에 맞는 위탁운영 구조. SaaS 구독부터 풀서비스 위탁까지 3단계로 제공.',
    jsonLd: [
      ORG_LD,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: '숙소 위탁운영',
        provider: { '@type': 'Organization', name: 'TONO OPERATION', url: SITE },
        areaServed: ['제주특별자치도', '부산광역시'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'TONIFY 위탁운영 서비스',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'TONIFY Lite',
                description:
                  '직접 운영하는 운영자를 위한 SaaS 기반 운영 관리. 예약·정산·데이터 분석.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'TONIFY Pro',
                description:
                  '예약 관리·1차 고객 응대·OTA 리스팅 최적화·가격 최적화 부분 위탁.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'TONIFY Enterprise',
                description:
                  '청소·시설·정산·콘텐츠 제작까지 운영 전반을 통합 관리하는 전체 위탁.',
              },
            },
          ],
        },
      },
    ],
  },
  {
    path: '/portfolio',
    title: '운영 중인 공간들 — 포트폴리오 | TONO OPERATION',
    description:
      'TONO OPERATION이 직접 운영하며 감도를 설계 중인 35+ 숙소 포트폴리오. 제주·부산 풀빌라, 독채, 펜션, 게스트하우스.',
    ogTitle: '운영 중인 공간들 — TONO OPERATION 포트폴리오',
    ogDescription: '제주·부산 35+ 숙소 운영 사례. 풀빌라·독채·펜션·게스트하우스.',
    jsonLd: [
      ORG_LD,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'TONO OPERATION 포트폴리오',
        description: '제주·부산 위탁운영 숙소 사례',
        url: `${SITE}/portfolio`,
      },
    ],
  },
  {
    path: '/contact',
    title: '운영 상담 신청 | TONO OPERATION',
    description:
      '숙소 규모와 현황에 맞는 위탁운영 구조 무료 상담. 064-763-9500 · contact@tono-operation.com · 24시간 내 회신.',
    ogTitle: '운영 상담 신청 — TONO OPERATION',
    ogDescription: '숙소 위탁운영 무료 상담. 24시간 내 회신.',
    jsonLd: [
      ORG_LD,
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '운영 상담 신청',
        url: `${SITE}/contact`,
      },
    ],
  },
]

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildHead(route) {
  const canonical = route.path === '/' ? `${SITE}/` : `${SITE}${route.path}`
  const ldBlocks = route.jsonLd
    .map(
      (obj) =>
        `<script type="application/ld+json">${JSON.stringify(obj)}</script>`
    )
    .join('\n    ')

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
    `<meta name="keywords" content="${escapeAttr(KEYWORDS_BASE)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${canonical}" />`,
    ``,
    `<!-- Open Graph -->`,
    `<meta property="og:title" content="${escapeAttr(route.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(route.ogDescription)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:site_name" content="TONO OPERATION" />`,
    ``,
    `<!-- Twitter Card -->`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(route.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(route.ogDescription)}" />`,
    ``,
    `<!-- JSON-LD -->`,
    ldBlocks,
  ].join('\n    ')
}

async function prerender() {
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      rollupOptions: { output: { format: 'es' } },
    },
    logLevel: 'warn',
  })

  const ssrPath = path.resolve(__dirname, 'dist-ssr/entry-server.js')
  const { render } = await import(
    new URL(`file:///${ssrPath.replace(/\\/g, '/')}`).href
  )

  const template = fs.readFileSync(
    path.resolve(distDir, 'index.html'),
    'utf-8'
  )

  const headRegex = /<!--SSR_HEAD_START-->[\s\S]*?<!--SSR_HEAD_END-->/

  if (!headRegex.test(template)) {
    throw new Error(
      'SSR_HEAD markers not found in dist/index.html template — check frontend/index.html'
    )
  }

  for (const route of routes) {
    const appHtml = render(route.path)
    const html = template
      .replace(headRegex, buildHead(route))
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

    const filePath =
      route.path === '/'
        ? path.resolve(distDir, 'index.html')
        : path.resolve(distDir, `${route.path.slice(1)}/index.html`)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, html)
    console.log(`  Prerendered: ${route.path}`)
  }

  fs.rmSync(path.resolve(__dirname, 'dist-ssr'), {
    recursive: true,
    force: true,
  })

  console.log('Prerender complete!')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})

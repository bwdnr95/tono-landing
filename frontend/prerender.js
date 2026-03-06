import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')
const routes = ['/', '/service', '/portfolio', '/contact']

async function prerender() {
  // Build SSR bundle
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      rollupOptions: {
        output: { format: 'es' },
      },
    },
    logLevel: 'warn',
  })

  // Load SSR module (use file:// URL for Windows compatibility)
  const ssrPath = path.resolve(__dirname, 'dist-ssr/entry-server.js')
  const { render } = await import(
    new URL(`file:///${ssrPath.replace(/\\/g, '/')}`).href
  )

  // Read client-built template
  const template = fs.readFileSync(
    path.resolve(distDir, 'index.html'),
    'utf-8'
  )

  for (const route of routes) {
    const appHtml = render(route)
    const html = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )

    const filePath =
      route === '/'
        ? path.resolve(distDir, 'index.html')
        : path.resolve(distDir, `${route.slice(1)}/index.html`)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, html)
    console.log(`  Prerendered: ${route}`)
  }

  // Clean up SSR build
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

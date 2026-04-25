import fs from 'fs'
const gems = JSON.parse(fs.readFileSync('./src/data/gems.json', 'utf8'))

const urls = [
  '/',
  '/about',
  '/contact',
  '/wishlist',
  '/compare',
  ...gems.map(g => `/gem/${g.id}`)
]

// Update package.json reactSnap urls
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
pkg.reactSnap.include = urls
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2))

// Generate sitemap.xml
const baseUrl = 'https://cgt.onl'

const staticUrls = [
  { path: '/',        changefreq: 'weekly',  priority: '1.0' },
  { path: '/about',   changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.6' },
]

const gemUrls = gems.map(g => ({
  path: `/gem/${g.id}`,
  changefreq: 'monthly',
  priority: '0.8'
}))

const allUrls = [...staticUrls, ...gemUrls]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${baseUrl}${u.path}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

fs.writeFileSync('./public/sitemap.xml', sitemap)

console.log(`✅ Generated ${urls.length} URLs for react-snap`)
console.log(`✅ Generated sitemap.xml with ${allUrls.length} entries`)
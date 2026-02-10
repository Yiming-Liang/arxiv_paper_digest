import { defineConfig } from 'vitepress'
import { readdirSync, statSync } from 'fs'
import { resolve, extname } from 'path'

const SRC_DIR = './docs'

function generateNavAndSidebar() {
  const files = readdirSync(SRC_DIR)
    .filter(f => extname(f) === '.md' && f !== 'index.md')
    .map(f => {
      const stat = statSync(resolve(SRC_DIR, f))
      const name = f.replace('.md', '')
      // 格式化显示名称
      let displayName = name
      if (/^\d{8}_/.test(name)) {
        const year = name.slice(0, 4)
        const month = name.slice(4, 6)
        const day = name.slice(6, 8)
        const rest = name.slice(9).replace(/_/g, ' ')
        const formattedRest = rest ? ' ' + rest.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : ''
        displayName = `${year}-${month}-${day}${formattedRest}`
      }
      return { name, displayName, mtime: stat.mtimeMs, link: '/' + name }
    })
    .sort((a, b) => b.mtime - a.mtime)

  const nav = [
    { text: '🏠 Home', link: '/' },
    ...files.slice(0, 5).map(f => ({ text: f.displayName, link: f.link }))
  ]

  const sidebar = [
    {
      text: '📁 所有文档',
      items: [
        { text: '🏠 Home', link: '/' },
        ...files.map(f => ({ text: `📄 ${f.displayName}`, link: f.link }))
      ]
    }
  ]

  return { nav, sidebar }
}

const { nav, sidebar } = generateNavAndSidebar()

export default defineConfig({
  title: 'Paper Digest',
  description: '每日 ArXiv Agent Memory 论文速览',
  base: '/arxiv_paper_digest/',
  
  themeConfig: {
    nav,
    sidebar,
    
    outline: {
      level: 'deep',
      label: '📑 本页目录'
    },
    
    footer: {
      message: '📚 Paper Digest - ArXiv Agent Memory Research',
      copyright: 'Copyright © 2026'
    },
    
    search: {
      provider: 'local'
    }
  },
  
  markdown: {
    lineNumbers: true
  },
  
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true
})

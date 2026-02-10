import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Paper Digest',
  description: '每日 ArXiv Agent Memory 论文速览',
  
  themeConfig: {
    nav: [
      { text: '🏠 Home', link: '/' }
    ],
    
    sidebar: [
      {
        text: '📁 文档',
        items: [
          { text: '🏠 Home', link: '/' }
        ]
      }
    ],
    
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
  lastUpdated: true
})

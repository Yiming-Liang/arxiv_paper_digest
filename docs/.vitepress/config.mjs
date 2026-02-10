import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { generateNavAndSidebar } from './generateConfig.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 文档源目录
const SRC_DIR = resolve('/Users/eamonliang/paper-digest/docs')

// 动态生成配置
const { nav, sidebar } = generateNavAndSidebar()

export default defineConfig({
  // 指定源文档目录
  srcDir: SRC_DIR,
  
  // 站点配置
  title: 'Paper Digest',
  description: '每日 ArXiv Agent Memory 论文速览',
  base: '/',
  outDir: resolve(__dirname, '../dist'),
  cacheDir: resolve(__dirname, '../.cache'),
  
  // 忽略临时文件
  srcExclude: ['**/.DS_Store'],
  
  // 开发服务器配置
  vite: {
    server: {
      host: '0.0.0.0',
      port: 5173
    }
  },
  
  themeConfig: {
    // 顶部导航（动态生成）
    nav,
    
    // 左侧边栏（动态生成）
    sidebar,
    
    // 右侧目录大纲
    outline: {
      level: 'deep',
      label: '📑 本页目录'
    },
    
    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    
    footer: {
      message: '📚 Paper Digest - ArXiv Agent Memory Research',
      copyright: 'Copyright © 2026'
    },
    
    // 搜索配置
    search: {
      provider: 'local'
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  },
  
  markdown: {
    lineNumbers: true
  },
  
  // 清理 URL（去掉 .html 后缀）
  cleanUrls: true,
  
  // 最后更新时间
  lastUpdated: true
})

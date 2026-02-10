/**
 * 动态生成 VitePress 导航和侧边栏配置
 * 扫描 docs 目录，自动生成文件列表
 */
import { readdirSync, statSync, readFileSync } from 'fs'
import { resolve, extname, basename } from 'path'

const SRC_DIR = '/Users/eamonliang/paper-digest/docs'

/**
 * 从文件内容提取标题（第一个 # 开头的行）
 */
function extractTitle(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)$/m)
    return match ? match[1].trim() : null
  } catch {
    return null
  }
}

/**
 * 格式化文件名用于显示
 * 优先使用文件名格式化，如：2026-02-09 Agent Research Weekly
 * 20260210_agent_memory.md → 02-10 Agent Memory
 * 20260209_agent_research_weekly.md → 02-09 Agent Research Weekly
 */
function formatDisplayName(filename, title) {
  const name = basename(filename, '.md')
  
  // 处理 20260210_xxx 格式 (YYYYMMDD_name)
  if (/^\d{8}_/.test(name)) {
    const year = name.slice(0, 4)
    const month = name.slice(4, 6)
    const day = name.slice(6, 8)
    const rest = name.slice(9).replace(/_/g, ' ')
    // 返回格式：2026-02-09 Agent Research Weekly（每个单词首字母大写）
    const formattedRest = rest
      ? ' ' + rest.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : ''
    return `${year}-${month}-${day}${formattedRest}`
  }
  
  // 处理 2026-02-08 格式
  if (/^\d{4}-\d{2}-\d{2}$/.test(name)) {
    return name // 返回完整日期 2026-02-08
  }
  
  // 默认：替换下划线/连字符为空格，首字母大写
  return name.replace(/_/g, ' ').replace(/-/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * 生成 nav 和 sidebar 配置
 */
export function generateNavAndSidebar() {
  const files = readdirSync(SRC_DIR)
    .filter(f => extname(f) === '.md' && f !== 'index.md')
    .map(f => {
      const filePath = resolve(SRC_DIR, f)
      const stat = statSync(filePath)
      const title = extractTitle(filePath)
      const name = basename(f, '.md')
      const displayName = formatDisplayName(f, title)
      
      return {
        filename: f,
        name,
        displayName,
        title,
        mtime: stat.mtimeMs,
        link: '/' + name
      }
    })
    // 按修改时间倒序排列（最新的在前）
    .sort((a, b) => b.mtime - a.mtime)

  // 生成 nav（顶部导航，最多显示 5 个最新的）
  const nav = [
    { text: '🏠 Home', link: '/' },
    ...files.slice(0, 5).map(f => ({
      text: f.displayName,
      link: f.link
    }))
  ]

  // 生成 sidebar（左侧边栏，显示所有文件）
  const sidebar = [
    {
      text: '📁 所有文档',
      items: [
        { text: '🏠 Home', link: '/' },
        ...files.map(f => ({
          text: `📄 ${f.displayName}`,
          link: f.link
        }))
      ]
    }
  ]

  return { nav, sidebar, files }
}

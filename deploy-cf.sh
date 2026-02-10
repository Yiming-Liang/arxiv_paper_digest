#!/bin/bash
# 一键部署 Paper Digest 到 Cloudflare Pages
# 需要提前配置 CLOUDFLARE_API_TOKEN 和 CLOUDFLARE_ACCOUNT_ID

set -e

echo "🚀 开始部署 Paper Digest 到 Cloudflare Pages..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查 wrangler 是否安装
if ! command -v wrangler &> /dev/null; then
    echo "📦 安装 wrangler CLI..."
    npm install -g wrangler
fi

# 检查是否登录
if ! wrangler whoami &> /dev/null; then
    echo "🔑 请先登录 Cloudflare:"
    wrangler login
fi

# 构建
echo "🔨 构建站点..."
npm run docs:build

# 部署
echo "📤 部署到 Cloudflare Pages..."
wrangler pages deploy docs/.vitepress/dist --project-name=paper-digest

echo ""
echo "✅ 部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "临时访问地址: https://paper-digest.pages.dev"
echo ""
echo "📝 下一步：绑定自定义域名 easyresearchagent.cn"
echo "1. 登录 https://dash.cloudflare.com"
echo "2. 找到 paper-digest 项目"
echo "3. Custom domains → 添加 easyresearchagent.cn"
echo "4. 阿里云 DNS 添加 CNAME 记录指向你的 Pages 域名"

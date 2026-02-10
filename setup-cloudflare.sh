#!/bin/bash
# Cloudflare Pages 自动配置脚本
# 使用方式: ./setup-cloudflare.sh

set -e

echo "🚀 Cloudflare Pages 配置向导"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ wrangler 未安装，正在安装..."
    npm install -g wrangler
fi

echo "📋 配置步骤："
echo ""
echo "1️⃣  登录 Cloudflare"
echo "   执行: wrangler login"
echo "   会打开浏览器，点击授权即可"
echo ""
echo "2️⃣  创建 Pages 项目"
echo "   执行: wrangler pages project create arxiv-paper-digest"
echo ""
echo "3️⃣  部署站点"
echo "   执行: npm run docs:build"
echo "   执行: wrangler pages deploy docs/.vitepress/dist --project-name=arxiv-paper-digest"
echo ""
echo "4️⃣  绑定域名"
echo "   访问: https://dash.cloudflare.com"
echo "   Pages → arxiv-paper-digest → Custom domains"
echo "   添加: easyresearchagent.cn"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "是否现在开始步骤 1 (wrangler login)? [y/N]"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "🔑 正在登录 Cloudflare..."
    wrangler login
    
    echo ""
    echo "✅ 登录完成！"
    echo ""
    echo "现在执行步骤 2 创建项目..."
    wrangler pages project create arxiv-paper-digest --production-branch=main
    
    echo ""
    echo "🔨 构建并部署..."
    npm run docs:build
    wrangler pages deploy docs/.vitepress/dist --project-name=arxiv-paper-digest
    
    echo ""
    echo "🎉 部署完成！"
    echo "临时访问地址: https://arxiv-paper-digest.pages.dev"
    echo ""
    echo "下一步：访问 https://dash.cloudflare.com"
    echo "Pages → arxiv-paper-digest → Custom domains"
    echo "添加域名: easyresearchagent.cn"
fi

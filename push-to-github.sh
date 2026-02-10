#!/bin/bash
# 一键推送代码到 GitHub
# 使用方法: ./push-to-github.sh <你的GitHub用户名>

set -e

if [ -z "$1" ]; then
    echo "❌ 请提供 GitHub 用户名"
    echo "用法: ./push-to-github.sh your-username"
    exit 1
fi

USERNAME=$1
REPO_NAME="paper-digest"

echo "🚀 准备推送到 GitHub..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查是否有远程仓库
if git remote | grep -q "origin"; then
    echo "📝 更新远程仓库地址..."
    git remote set-url origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
else
    echo "🔗 添加远程仓库..."
    git remote add origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
fi

# 推送
echo "📤 推送到 GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ 推送完成！"
echo "仓库地址: https://github.com/${USERNAME}/${REPO_NAME}"

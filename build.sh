#!/bin/bash
# 构建静态站点

cd "$(dirname "$0")"
echo "🔨 构建 Paper Digest..."
npx vitepress build docs
echo "✅ 构建完成！输出目录: ./dist"

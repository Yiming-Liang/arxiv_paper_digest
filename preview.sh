#!/bin/bash
# 本地预览构建后的站点（用于测试）

cd "$(dirname "$0")"
echo "👁️  预览构建后的站点..."
echo "📡 局域网访问: http://$(ifconfig en0 2>/dev/null | awk '/inet / {print $2}' || hostname -I | awk '{print $1}'):4173"
npx vitepress preview docs --host 0.0.0.0 --port 4173

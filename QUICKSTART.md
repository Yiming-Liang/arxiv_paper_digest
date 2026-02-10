# 🚀 快速参考卡

## 创建 GitHub 仓库
🔗 https://github.com/new
- Repository name: `paper-digest`
- Public ✓

## 推送代码
```bash
cd /Users/eamonliang/vitepress
./push-to-github.sh 你的GitHub用户名
```

## 获取 Cloudflare Token
🔗 https://dash.cloudflare.com/profile/api-tokens
- Create Token → "Edit Cloudflare Workers" 模板
- 复制 Token

## 获取 Account ID
🔗 https://dash.cloudflare.com
- 右侧边栏 Account ID

## 添加 GitHub Secrets
🔗 https://github.com/你的用户名/paper-digest/settings/secrets/actions
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 触发部署
🔗 https://github.com/你的用户名/paper-digest/actions
- Run workflow

## 阿里云 DNS 配置
🔗 https://dns.console.aliyun.com
- CNAME @ → 你的Pages域名.pages.dev
- CNAME www → 你的Pages域名.pages.dev

## 访问地址
- 临时: `https://xxx.pages.dev`
- 正式: `https://easyresearchagent.cn`

---

## 本地开发
```bash
./dev.sh          # 启动开发服务器
./build.sh        # 构建站点
./preview.sh      # 预览构建结果
```

## 目录结构
```
paper-digest/
├── docs/               # 实际文档（独立目录）
│   ├── index.md        # Home 页
│   ├── 20260210_agent_memory.md
│   └── ...
│
vitepress/            # VitePress 配置
├── docs/.vitepress/
│   ├── config.mjs      # 主配置
│   └── generateConfig.mjs  # 动态生成脚本
├── .github/workflows/
│   └── cloudflare-pages.yml  # 自动部署
├── dev.sh              # 开发脚本
├── deploy-cf.sh        # Cloudflare 部署
└── SETUP.md            # 完整操作指南
```

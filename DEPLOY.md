# Cloudflare Pages 部署指南

## 前置条件

1. Cloudflare 账号（免费注册）
2. GitHub 账号（代码托管）
3. 域名 `easyresearchagent.cn` 已购买

---

## 步骤一：推送代码到 GitHub

```bash
cd /Users/eamonliang/vitepress

# 初始化 git（如未初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: 初始化 Paper Digest 站点"

# 添加远程仓库（替换为你的用户名）
git remote add origin https://github.com/你的用户名/paper-digest.git

# 推送
git branch -M main
git push -u origin main
```

---

## 步骤二：Cloudflare Pages 部署

### 1. 登录 Cloudflare Dashboard
- 访问 https://dash.cloudflare.com
- 登录你的账号

### 2. 创建 Pages 项目
- 点击左侧菜单 **"Pages"**
- 点击 **"Create a project"**
- 选择 **"Connect to Git"**
- 授权 GitHub，选择 `paper-digest` 仓库
- 点击 **"Begin setup"**

### 3. 构建设置
填写以下信息：

| 设置项 | 值 |
|--------|-----|
| **Project name** | `paper-digest`（或你喜欢的名称）|
| **Production branch** | `main` |
| **Framework preset** | `VitePress` |
| **Build command** | `npm run docs:build` |
| **Build output directory** | `docs/.vitepress/dist` |

点击 **"Save and Deploy"**

等待 1-2 分钟，部署完成后会获得一个临时域名：
```
https://paper-digest-xxx.pages.dev
```

---

## 步骤三：绑定自定义域名

### 1. 添加自定义域名
- 在 Pages 项目页面，点击 **"Custom domains"**
- 点击 **"Set up a custom domain"**
- 输入：`easyresearchagent.cn`
- 点击 **"Continue"**

### 2. 添加 DNS 记录

Cloudflare 会提示你添加 DNS 记录：

**方式 A：使用 Cloudflare DNS（推荐）**

如果你的域名已经在 Cloudflare 管理：
- Cloudflare 会自动添加必要的 DNS 记录
- 等待几分钟即可生效

**方式 B：阿里云 DNS 配置**

如果你的域名在阿里云解析：

1. 登录阿里云控制台 → 域名解析
2. 添加以下记录：

| 类型 | 主机记录 | 解析值 | TTL |
|------|----------|--------|-----|
| CNAME | @ | `paper-digest-xxx.pages.dev` | 10分钟 |
| CNAME | www | `paper-digest-xxx.pages.dev` | 10分钟 |

> 注意：`paper-digest-xxx.pages.dev` 换成你的实际 Pages 域名

3. 返回 Cloudflare，点击 **"Check DNS records"**
4. 等待 DNS 生效（通常 5-30 分钟）

### 3. 启用 HTTPS

Cloudflare 会自动为你的域名颁发 SSL 证书：
- 在 Custom domains 页面等待状态变为 **"Active"**
- 证书自动配置，无需手动操作

完成后即可通过 `https://easyresearchagent.cn` 访问！

---

## 自动更新设置

Cloudflare Pages 会自动在每次 push 到 main 分支时重新部署。

如需定时自动更新（每天拉取新论文后自动部署），可以在 GitHub 仓库添加定时触发：

编辑 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  schedule:
    # 每天北京时间 08:00 自动部署
    - cron: '0 0 * * *'
  workflow_dispatch:  # 支持手动触发

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run docs:build
        
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: paper-digest
          directory: docs/.vitepress/dist
```

然后添加 Secrets：
1. 获取 Cloudflare API Token：
   - Cloudflare 主页 → 右侧 "API Tokens" → "Create Token"
   - 使用 "Edit Cloudflare Workers" 模板
   - 权限：Zone:Read, Page Rules:Edit, Cloudflare Pages:Edit
   
2. 获取 Account ID：
   - Cloudflare 主页右侧查看

3. 添加到 GitHub 仓库：
   - Settings → Secrets → Actions → New repository secret
   - 添加 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`

---

## 备选方案

### 方案 B：阿里云 OSS + CDN（国内访问最快）

1. 创建阿里云 OSS Bucket
2. 开启静态网站托管
3. 构建后上传 `docs/.vitepress/dist` 到 OSS
4. 绑定自定义域名
5. 配置 CDN 加速

成本：OSS 存储 + CDN 流量（约 ¥10-50/月）

### 方案 C：Vercel + 阿里云 DNS

1. 部署到 Vercel
2. 阿里云 DNS 添加 CNAME 指向 Vercel
3. Vercel 添加自定义域名

优点：部署简单，免费
缺点：国内访问一般

---

## 推荐选择

| 方案 | 费用 | 国内速度 | 部署难度 | 推荐度 |
|------|------|----------|----------|--------|
| Cloudflare Pages | 免费 | ⭐⭐⭐ | 简单 | ⭐⭐⭐⭐⭐ |
| 阿里云 OSS | 低 | ⭐⭐⭐⭐⭐ | 中等 | ⭐⭐⭐⭐ |
| Vercel | 免费 | ⭐⭐ | 简单 | ⭐⭐⭐ |

**建议**：先用 Cloudflare Pages，如果国内访问不满意再迁移到阿里云 OSS。

# 🚀 绑定 easyresearchagent.cn 完整操作指南

> 本文档帮你将 Paper Digest 部署到 Cloudflare Pages 并绑定自定义域名

---

## ✅ 我已完成的配置

- ✅ 动态导航/侧边栏生成脚本
- ✅ Home 页面
- ✅ VitePress 配置
- ✅ Cloudflare Pages 部署配置
- ✅ Git 仓库初始化
- ✅ 所有代码已提交

---

## 📋 你需要执行的 4 个步骤

### 步骤 1：创建 GitHub 仓库（2分钟）

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `paper-digest`
   - **Description**: ArXiv Agent Memory 论文追踪站点
   - **Public** ✓ （选中）
   - **Add a README**: ❌ （不选，已有）
3. 点击 **"Create repository"**

---

### 步骤 2：推送代码到 GitHub（1分钟）

在终端执行：

```bash
cd /Users/eamonliang/vitepress
./push-to-github.sh 你的GitHub用户名
```

例如：
```bash
./push-to-github.sh eamonliang
```

如果提示输入密码，使用 GitHub Personal Access Token：
- 访问 https://github.com/settings/tokens
- 点击 "Generate new token (classic)"
- 勾选 `repo` 权限
- 复制 token 作为密码输入

---

### 步骤 3：部署到 Cloudflare Pages（3分钟）

#### 3.1 获取 Cloudflare API Token

1. 访问 https://dash.cloudflare.com/profile/api-tokens
2. 点击 **"Create Token"**
3. 使用模板 **"Edit Cloudflare Workers"**
4. 权限保持默认，点击 **"Continue to summary"**
5. 点击 **"Create token"**
6. **复制并保存这个 Token**（只显示一次！）

#### 3.2 获取 Account ID

1. 访问 https://dash.cloudflare.com
2. 右侧边栏找到 **"Account ID"**
3. **复制保存**

#### 3.3 添加到 GitHub Secrets

1. 打开 GitHub 仓库 → Settings → Secrets and variables → Actions
2. 点击 **"New repository secret"**
3. 添加两个 secret：

| Name | Value |
|------|-------|
| `CLOUDFLARE_API_TOKEN` | 步骤 3.1 复制的 Token |
| `CLOUDFLARE_ACCOUNT_ID` | 步骤 3.2 复制的 Account ID |

#### 3.4 触发部署

1. 访问仓库 → Actions → "Deploy to Cloudflare Pages"
2. 点击 **"Run workflow"**
3. 等待 2-3 分钟完成

部署成功后，会获得临时域名如：
```
https://paper-digest-xxx.pages.dev
```

---

### 步骤 4：绑定 easyresearchagent.cn（5分钟）

#### 4.1 在 Cloudflare 添加域名

1. 访问 https://dash.cloudflare.com
2. 点击 Pages → 你的项目
3. 点击 **"Custom domains"**
4. 点击 **"Set up a custom domain"**
5. 输入域名：`easyresearchagent.cn`
6. 点击 **"Continue"**

Cloudflare 会提示你添加 DNS 记录，记下需要的 CNAME 值。

#### 4.2 在阿里云配置 DNS

1. 登录阿里云控制台 https://dns.console.aliyun.com
2. 找到域名 `easyresearchagent.cn`
3. 点击 **"解析设置"**
4. 删除现有记录（如有冲突）
5. 添加两条记录：

| 记录类型 | 主机记录 | 解析值 | TTL |
|----------|----------|--------|-----|
| CNAME | @ | 你的Pages域名.pages.dev | 10分钟 |
| CNAME | www | 你的Pages域名.pages.dev | 10分钟 |

> 例如：`paper-digest-abc123.pages.dev`

6. 点击 **"确认"**

#### 4.3 验证 DNS

1. 返回 Cloudflare Pages 控制台
2. 点击 **"Check DNS records"**
3. 等待状态变为 **"Active"**（通常 5-30 分钟）

---

## 🎉 完成！

访问 https://easyresearchagent.cn 查看效果！

---

## 🔧 常见问题

### Q: GitHub push 失败？

```bash
# 检查远程仓库
git remote -v

# 重新设置远程仓库（替换用户名）
git remote set-url origin https://github.com/你的用户名/paper-digest.git
git push -u origin main
```

### Q: Cloudflare 部署失败？

检查 GitHub Secrets 是否正确设置：
- `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`
- 去 Actions 页面查看详细错误日志

### Q: DNS 验证不通过？

1. 阿里云 DNS 记录可能还在生效中，等待 30 分钟
2. 检查 CNAME 值是否完全正确
3. 使用命令检查：
   ```bash
   nslookup easyresearchagent.cn
   ```

### Q: 域名无法访问？

1. 确保阿里云 DNS 已生效
2. Cloudflare Pages 显示 "Active"
3. 浏览器强制刷新：Ctrl+Shift+R (Cmd+Shift+R)

---

## 📱 日常更新

网站已配置自动更新：
- 每天北京时间 **08:00** 自动重新部署
- 推送新代码到 main 分支自动触发部署
- 手动触发：GitHub → Actions → Run workflow

---

## 🆘 需要帮助？

如果任何步骤遇到问题，告诉我错误信息，我帮你排查！

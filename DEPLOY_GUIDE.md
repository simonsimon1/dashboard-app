# 看板部署指南

## 第一步：上传到 GitHub

### 1.1 在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 输入仓库名称（例如：`dashboard-app`）
3. 选择公开（Public）或私有（Private）
4. 不要初始化 README（因为项目已有）
5. 点击 "Create repository"

### 1.2 初始化本地 Git 仓库并推送

在项目根目录打开命令行，执行：

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件到暂存区
git add .

# 3. 提交更改
git commit -m "Initial commit: Dashboard app"

# 4. 添加远程仓库（替换 YOUR_USERNAME 和 REPO_NAME）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## 第二步：在 Cloudflare Pages 部署

### 方法一：通过 Cloudflare Dashboard（推荐）

1. **访问 Cloudflare Pages**
   - 打开 https://dash.cloudflare.com/
   - 登录你的 Cloudflare 账号
   - 点击左侧菜单 "Pages"

2. **创建新项目**
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 授权 Cloudflare 访问你的 GitHub 账号
   - 选择你刚创建的仓库

3. **配置构建设置**
   
   | 配置项 | 值 |
   |--------|-----|
   | Framework preset | `Vite` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` |

4. **添加环境变量（可选）**
   - 如果有需要的环境变量，在 "Environment variables" 中添加

5. **保存并部署**
   - 点击 "Save and Deploy"
   - 等待构建完成（通常 1-2 分钟）

6. **获取访问链接**
   - 部署完成后，Cloudflare 会提供一个 `*.pages.dev` 的链接
   - 你可以点击链接查看你的看板
   - 也可以绑定自定义域名

### 方法二：使用 Wrangler CLI（高级用户）

```bash
# 安装 Wrangler
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
cd dist
wrangler pages deploy .
```

---

## 常见问题

### Q1: 部署后页面空白？
请确保 `vite.config.ts` 中的 `base` 配置正确：
- 如果使用自定义域名：`base: '/'`
- 如果使用 `*.pages.dev` 子域名：`base: './'`（已配置）

### Q2: 如何更新网站？
每次推送代码到 GitHub main 分支，Cloudflare 会自动重新构建和部署。

### Q3: 如何绑定自定义域名？
1. 在 Cloudflare Pages 项目设置中点击 "Custom domains"
2. 添加你的域名
3. 按照提示添加 DNS 记录

---

## 快速检查清单

- [ ] GitHub 仓库已创建
- [ ] 代码已推送到 GitHub
- [ ] Cloudflare Pages 项目已创建
- [ ] 构建设置正确（Build command: `npm run build`, Output directory: `dist`）
- [ ] 网站可以正常访问

# 🚀 Cloudflare Pages 部署指南

本项目已配置好部署到 Cloudflare Pages。选择以下任一方式部署：

---

## 📋 前置准备

1. **Cloudflare 账号**
   - 注册：https://dash.cloudflare.com/sign-up
   - 免费账号即可

2. **GitHub 仓库**（方案1需要）
   - 确保代码已推送到 GitHub

3. **Wrangler CLI**（方案2、3需要）
   ```bash
   npm install -g wrangler
   wrangler login
   ```

---

## 🎯 方案 1：通过 Cloudflare Dashboard 部署（推荐）

### 步骤：

1. **登录 Cloudflare Dashboard**
   - 访问：https://dash.cloudflare.com

2. **创建新项目**
   - 点击左侧 `Workers & Pages`
   - 点击 `Create application`
   - 选择 `Pages` 标签
   - 点击 `Connect to Git`

3. **连接 GitHub 仓库**
   - 授权 Cloudflare 访问你的 GitHub
   - 选择 `polypredict-code` 仓库

4. **配置构建设置**
   ```
   项目名称: polypredict (或自定义)
   生产分支: main
   框架预设: Next.js (Static HTML Export)
   
   构建命令: npm run build
   构建输出目录: out
   
   环境变量: (暂无需要)
   Node.js 版本: 22
   ```

5. **部署**
   - 点击 `Save and Deploy`
   - 等待构建完成（约 2-5 分钟）

6. **访问网站**
   - 部署完成后会获得一个 `*.pages.dev` 域名
   - 例如：`https://polypredict.pages.dev`

### 自动部署
- 之后每次推送到 `main` 分支，Cloudflare 会自动重新部署
- 其他分支会创建预览部署

---

## ⚡ 方案 2：使用 Wrangler CLI 部署

### 步骤：

1. **安装 Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **构建项目**
   ```bash
   npm run build
   ```

4. **部署到 Cloudflare Pages**
   ```bash
   wrangler pages deploy out --project-name=polypredict
   ```

5. **访问网站**
   - 命令行会显示部署的 URL

### 后续部署
每次更新代码后：
```bash
npm run build
wrangler pages deploy out --project-name=polypredict
```

---

## 📦 方案 3：Direct Upload（本地构建）

适合不想连接 Git 的场景。

### 步骤：

1. **构建项目**
   ```bash
   npm install
   npm run build
   ```

2. **上传到 Cloudflare**
   ```bash
   # 首次部署
   wrangler pages deploy out --project-name=polypredict

   # 后续部署
   wrangler pages deploy out
   ```

---

## 🌐 自定义域名（可选）

### 在 Cloudflare Dashboard 中：

1. 进入你的 Pages 项目
2. 点击 `Custom domains`
3. 点击 `Set up a custom domain`
4. 输入你的域名（例如：polypredict.com）
5. 按照提示配置 DNS 记录

### 优势：
- 自动 HTTPS
- 全球 CDN 加速
- DDoS 防护

---

## 🔧 构建配置说明

### Next.js 配置 (`next.config.js`)
```javascript
{
  output: 'export',        // 静态导出
  reactStrictMode: true,   // 严格模式
  trailingSlash: true,     // URL 末尾加斜杠
  images: {
    unoptimized: true      // 禁用图片优化（静态导出需要）
  }
}
```

### 构建输出
- 输出目录：`out/`
- 包含：HTML、CSS、JS、资源文件
- 完全静态，无需服务器

---

## 📊 性能优化

Cloudflare Pages 自动提供：
- ✅ 全球 CDN（300+ 数据中心）
- ✅ 自动 HTTPS/SSL
- ✅ HTTP/2 & HTTP/3
- ✅ Brotli 压缩
- ✅ 自动缓存优化
- ✅ DDoS 防护

---

## 🐛 常见问题

### 1. 构建失败
**检查 Node.js 版本：**
```bash
node --version  # 应该是 v22.x
```

**清理缓存重试：**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 2. 页面显示 404
- 确保 `output: 'export'` 已配置
- 确保构建输出目录是 `out`
- 检查 `trailingSlash: true` 是否设置

### 3. 图片不显示
- 确保 `images.unoptimized: true` 已配置
- 静态导出不支持 Next.js Image Optimization

### 4. 路由不工作
- 静态导出使用文件系统路由
- 确保生成了对应的 HTML 文件

---

## 📝 部署检查清单

- [ ] 代码已推送到 GitHub（方案1）
- [ ] `next.config.js` 配置正确
- [ ] 本地构建测试通过 (`npm run build`)
- [ ] Wrangler 已安装并登录（方案2、3）
- [ ] 选择部署方案并执行
- [ ] 访问 `*.pages.dev` 域名验证
- [ ] （可选）配置自定义域名

---

## 🆘 获取帮助

- **Cloudflare Pages 文档**：https://developers.cloudflare.com/pages
- **Next.js 静态导出**：https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Wrangler CLI**：https://developers.cloudflare.com/workers/wrangler

---

## 🎉 快速开始

**最快速的方式（推荐）：**
```bash
# 1. 确保代码已提交
git add .
git commit -m "配置 Cloudflare Pages 部署"
git push origin main

# 2. 访问 Cloudflare Dashboard
# https://dash.cloudflare.com

# 3. Workers & Pages > Create > Pages > Connect to Git

# 4. 选择仓库 > 保存并部署

# 完成！🎊
```

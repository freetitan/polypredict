#!/bin/bash

# Cloudflare Pages 部署脚本 (Bash)

echo "🚀 开始部署到 Cloudflare Pages..."

# 检查 wrangler 是否安装
echo ""
echo "📦 检查 Wrangler CLI..."
if ! command -v wrangler &> /dev/null; then
    echo "❌ 未检测到 Wrangler CLI"
    echo "请运行: npm install -g wrangler"
    exit 1
fi

echo "✅ Wrangler CLI 已安装"

# 构建项目
echo ""
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功"

# 部署到 Cloudflare Pages
echo ""
echo "🌐 部署到 Cloudflare Pages..."

read -p "请输入项目名称（默认: polypredict）: " projectName
projectName=${projectName:-polypredict}

wrangler pages deploy out --project-name=$projectName

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！🎉"
    echo "访问: https://$projectName.pages.dev"
else
    echo ""
    echo "❌ 部署失败"
    exit 1
fi

# Cloudflare Pages 部署脚本 (PowerShell)

Write-Host "🚀 开始部署到 Cloudflare Pages..." -ForegroundColor Cyan

# 检查 wrangler 是否安装
Write-Host "`n📦 检查 Wrangler CLI..." -ForegroundColor Yellow
$wranglerInstalled = Get-Command wrangler -ErrorAction SilentlyContinue

if (-not $wranglerInstalled) {
    Write-Host "❌ 未检测到 Wrangler CLI" -ForegroundColor Red
    Write-Host "请运行: npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Wrangler CLI 已安装" -ForegroundColor Green

# 构建项目
Write-Host "`n🔨 构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败" -ForegroundColor Red
    exit 1
}

Write-Host "✅ 构建成功" -ForegroundColor Green

# 部署到 Cloudflare Pages
Write-Host "`n🌐 部署到 Cloudflare Pages..." -ForegroundColor Yellow

$projectName = Read-Host "请输入项目名称（默认: polypredict）"
if ([string]::IsNullOrWhiteSpace($projectName)) {
    $projectName = "polypredict"
}

wrangler pages deploy out --project-name=$projectName

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ 部署成功！🎉" -ForegroundColor Green
    Write-Host "访问: https://$projectName.pages.dev" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ 部署失败" -ForegroundColor Red
    exit 1
}

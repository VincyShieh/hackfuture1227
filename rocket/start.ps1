# 小火箭手 - 游戏启动器 (PowerShell 版本)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "小火箭手 - 游戏启动器" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 pnpm 是否已安装
Write-Host "[1/3] 检查 pnpm..." -ForegroundColor Yellow
$pnpmInstalled = Get-Command pnpm -ErrorAction SilentlyContinue

if (-not $pnpmInstalled) {
    Write-Host "正在安装 pnpm..." -ForegroundColor Yellow
    npm install -g pnpm

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "❌ pnpm 安装失败！" -ForegroundColor Red
        Write-Host "请手动运行: npm install -g pnpm" -ForegroundColor Yellow
        Read-Host "按任意键退出"
        exit 1
    }
    Write-Host "✅ pnpm 安装成功！" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[1/3] pnpm 已安装 ✓" -ForegroundColor Green
    Write-Host ""
}

# 进入项目目录
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# 安装依赖
Write-Host "[2/3] 正在安装项目依赖..." -ForegroundColor Yellow
Write-Host "(这可能需要几分钟，请耐心等待...)" -ForegroundColor Gray
Write-Host ""

pnpm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ 依赖安装失败！" -ForegroundColor Red
    Read-Host "按任意键退出"
    exit 1
}

Write-Host ""
Write-Host "✅ 依赖安装成功！" -ForegroundColor Green
Write-Host ""

# 启动开发服务器
Write-Host "[3/3] 正在启动开发服务器..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 游戏即将在浏览器中打开..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

pnpm run dev

Read-Host "按任意键退出"

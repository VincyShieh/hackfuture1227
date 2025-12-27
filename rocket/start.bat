@echo off
chcp 65001 >nul
echo ========================================
echo 小火箭手 - 游戏启动器
echo ========================================
echo.

REM 检查 pnpm 是否已安装
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo [1/3] 正在安装 pnpm...
    call npm install -g pnpm
    if %errorlevel% neq 0 (
        echo.
        echo ❌ pnpm 安装失败！
        echo 请手动运行: npm install -g pnpm
        pause
        exit /b 1
    )
    echo ✅ pnpm 安装成功！
    echo.
) else (
    echo [1/3] pnpm 已安装 ✓
    echo.
)

REM 进入项目目录
cd /d "%~dp0"

echo [2/3] 正在安装项目依赖...
echo (这可能需要几分钟，请耐心等待...)
echo.
call pnpm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ 依赖安装失败！
    pause
    exit /b 1
)
echo.
echo ✅ 依赖安装成功！
echo.

echo [3/3] 正在启动开发服务器...
echo.
echo 🚀 游戏即将在浏览器中打开...
echo ========================================
echo.
call pnpm run dev

pause

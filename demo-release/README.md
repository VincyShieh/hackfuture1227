# 星际建造师 - 游戏Demo

一款面向6-12岁儿童的教育游戏，通过三个互动关卡激发科学兴趣，体验航天探索的乐趣。

## 技术栈

- **前端框架**: React 19.2.1 + TypeScript
- **构建工具**: Vite 5.4.21
- **样式方案**: 原生CSS + Tailwind CSS + CSS Modules
- **动画技术**: CSS3 Animations + Framer Motion
- **部署方式**: 零依赖静态文件（IIFE打包），支持双击运行

## 使用方法

### 方法一：使用Live Server（推荐）

1. 安装 Live Server（如果你还没有）：
   ```bash
   npm install -g live-server
   ```

2. 在demo-release目录下运行：
   ```bash
   live-server
   ```

3. 打开浏览器访问：`http://localhost:5500`

### 方法二：直接用浏览器打开

双击 `index.html` 文件即可在浏览器中打开。

**注意**：所有关卡已优化为支持直接打开，无需服务器。

## 游戏关卡

- 第一关：星星的邀约（star/dist/index.html）
- 第二关：启航研究室（rocket-game/index.html）
- 第三关：宇宙漫游（pilot/game.html）

## 游戏特色

✨ 三关完整串联，可体验完整的游戏流程
🎯 寓教于乐，激发对科学的兴趣
🚀 互动性强，操作简单易懂
💡 激励导向，培养自信心

## 技术说明

- 第一关和第三关：纯HTML/CSS/JavaScript实现
- 第二关：React + Vite构建，打包为静态文件
- 无需npm/node.js即可运行（构建版本）

## 系统要求

- 现代浏览器（Chrome、Firefox、Edge、Safari）
- 支持HTML5和CSS3
- 推荐分辨率：1920x1080或更高

---

**祝游戏愉快！🎮✨**

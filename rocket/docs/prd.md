# 儿童火箭拼装游戏需求文档

## 1. 游戏概述

### 1.1 游戏名称
小火箭手

### 1.2 游戏描述
一款专为6-12岁儿童设计的火箭拼装和发射互动游戏，通过拖拽装配火箭部件，体验航天探索的乐趣。\n
### 1.3 目标用户
6-12岁儿童及其家长

## 2. 游戏功能

### 2.1 核心玩法
- 拖拽火箭部件到装配区进行拼装
- 完成拼装后发射火箭执行太空任务
- 查看任务完成情况和火箭配置
- 分享自己的火箭设计

### 2.2 游戏页面
1. **首页**：游戏介绍和开始按钮
2. **装配车间**：火箭部件拖拽装配区域
3. **发射动画**：8秒火箭发射完整动画
4. **任务报告**：显示任务结果和火箭缩略图

### 2.3 技术要求
- 纯HTML/CSS/JavaScript实现，无需框架
- 响应式布局适配平板和桌面
- 使用CSS Grid/Flexbox布局
- 原生JS实现所有交互
- SVG或几何图形图标，无外部图片

## 3. 功能详细说明

### 3.1 装配车间
- **左侧部件列表**：箭体、整流罩、尾翼等可拖拽部件（div表示）\n- **中央装配区**：垂直火箭装配区域（绝对定位容器）\n- **自动吸附**：尾翼到底部、整流罩到顶部
- **拖拽效果**：半透明预览显示
- **拖放交互**：使用HTML5 Drag and Drop API
- **音效支持**：Web Audio API或audio标签播放简单音效

### 3.2 发射动画
- **动画时长**：8秒
- **飞行轨迹**：从地面垂直飞向顶部
- **背景变化**：蓝天渐变到星空
- **火焰效果**：火箭尾部动态粒子效果（CSS animation）\n- **助推器分离**：第3秒左右助推器淡出并向外飞
- **整流罩打开**：第5秒整流罩打开并消失
- **任务完成**：显示“Mission Success!”弹窗

### 3.3 任务报告页面
- **火箭缩略图**：SVG动态生成，基于用户选择的部件配置
- **随机任务故事**：从预设数组中随机选择
- **Play Again按钮**：返回装配页面
- **Share按钮**：生成当前火箭配置的URL参数
- **配置还原**：页面加载时解析URL参数还原火箭
- **本地存储**：使用localStorage保存最近一次配置

## 4. 技术实现

### 4.1 文件结构
```\nproject/\n├── index.html
├── styles.css
├── script.js
├── components/\n│   ├── header.html
│   ├── footer.html
│   └── modal.html
└── assets/\n    └── sounds/\n        ├── drag.mp3
        ├── drop.mp3
        └── launch.mp3
```\n
### 4.2 index.html骨架
```html
<!DOCTYPE html>\n<html lang=zh">\n<head>\n  <meta charset=UTF-8">\n  <meta name=viewport content=width=device-width, initial-scale=1.0">\n  <title>小火箭手</title>\n  <link rel=stylesheet href=styles.css">\n</head>\n<body>\n  <header></header>\n  <main class=page-container"></main>\n  <footer></footer>\n  <script src=script.js"></script>\n</body>\n</html>\n```\n
### 4.3 火箭装配区代码片段
```html
<div class=workspace">\n  <aside class=part-list">\n    <div draggable=true data-part=body">箭体</div>\n    <div draggable=true data-part=nosecone">整流罩</div>\n    <div draggable=true data-part=fins">尾翼</div>\n  </aside>\n  <div class=assembly-area"></div>\n</div>\n```\n
```css
.workspace {\n  display: flex;\n  height: 100vh;\n}\n.part-list {\n  width: 20%;\n  background: #f8f9fa;\n}\n.assembly-area {\n  position: relative;\n  width: 60%;\n  background: #e9ecef;\n}\n```\n
```javascript
const parts = document.querySelectorAll('[draggable]');\nparts.forEach(part => {\n  part.addEventListener('dragstart', (e) => {\n    e.dataTransfer.setData('text/plain', part.dataset.part);\n  });\n});\n
const assemblyArea = document.querySelector('.assembly-area');\nassemblyArea.addEventListener('drop', (e) => {\n  const partType = e.dataTransfer.getData('text/plain');\n  // 处理部件放置逻辑
});\n```\n
## 5. 设计风格

### 5.1 配色方案
主色调：宇宙蓝（#1a3648）搭配活力橙（#ff6b35），营造科技感与童趣并存的航天氛围

### 5.2 视觉细节
圆角设计增强亲和力，柔和阴影营造层次感，SVG图标采用几何风格保持简洁

### 5.3 整体布局
采用卡片式布局结合绝对定位，确保儿童用户操作简便，界面元素间距适中便于小手点击
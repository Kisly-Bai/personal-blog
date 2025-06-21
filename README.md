# 个人博客网站

一个现代化的个人博客网站，采用蓝色主色调和UIins风格的简约精美设计。

## 🎨 设计特色

- **蓝色主色调** - 采用现代化的蓝色配色方案，专业且优雅
- **UIins风格** - 简约、精美、平滑的过渡效果
- **响应式设计** - 完美适配桌面、平板和手机设备
- **平滑动画** - 使用Framer Motion实现优雅的动画效果

## ✨ 功能特性

- 🏠 **首页展示** - 英雄区域、精选文章、关于我
- 📝 **博客系统** - 文章列表、分类筛选、搜索功能
- 🏷️ **分类管理** - 技术、生活、教程、思考等分类
- 🔍 **搜索功能** - 支持标题、内容和标签搜索
- 📱 **响应式布局** - 完美适配各种设备
- ⚡ **高性能** - 基于Next.js 14构建，快速加载
- 🎯 **SEO友好** - 优化的元数据和结构化数据

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **字体**: Inter + Merriweather

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React组件
│   ├── Header.tsx         # 头部导航
│   ├── Hero.tsx           # 英雄区域
│   ├── FeaturedPosts.tsx  # 精选文章
│   ├── About.tsx          # 关于我
│   └── Footer.tsx         # 页脚
├── public/                # 静态资源
└── package.json           # 项目配置
```

## 🎨 页面说明

### 首页 (/)
- 英雄区域展示博客介绍
- 精选文章展示
- 关于我部分

### 博客列表 (/blog)
- 文章列表展示
- 搜索和分类筛选
- 标签系统

### 关于页面 (/about)
- 个人介绍
- 技能展示
- 联系方式

## 🎯 自定义配置

### 修改主题色

在 `tailwind.config.ts` 中修改 `primary` 颜色：

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... 其他色阶
  }
}
```

### 添加新文章

在相应的页面组件中添加文章数据，或集成CMS系统。

## 🌐 部署

支持部署到 Vercel、Netlify 等平台：

```bash
# Vercel
vercel

# Netlify
netlify deploy
```

## 📝 开发说明

### 添加新页面

1. 在 `app/` 目录下创建新的页面文件
2. 在 `components/` 目录下创建对应的组件
3. 更新导航菜单

### 样式定制

- 使用 Tailwind CSS 类名进行样式定制
- 在 `app/globals.css` 中添加自定义样式
- 在 `tailwind.config.ts` 中扩展主题配置

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**享受您的博客之旅！** 🚀 
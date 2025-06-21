# 快速部署指南

## 准备工作

1. 确保您有一个 GitHub 账户
2. 确保您的项目代码已经推送到 GitHub 仓库

## 部署步骤

### 方法一：使用 GitHub 登录（推荐）

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择你刚创建的 GitHub 仓库
5. 保持默认设置：
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. 点击 "Deploy"

### 方法二：使用邮箱注册

1. 访问 https://vercel.com
2. 点击 "Sign Up" 或 "Get Started"
3. 选择 "Continue with Email"
4. 填写邮箱地址和密码，完成注册
5. 登录后，点击 "New Project"
6. 选择 "Import Git Repository"
7. 如果您的 GitHub 仓库没有显示，点击 "Configure GitHub App" 或 "Connect GitHub"
8. 授权 Vercel 访问您的 GitHub 账户
9. 选择您要部署的 GitHub 仓库
10. 保持默认设置：
    - Framework Preset: Next.js
    - Build Command: `npm run build`
    - Output Directory: `.next`
    - Install Command: `npm install`
11. 点击 "Deploy"

## 部署后

1. 等待构建完成（通常需要 1-3 分钟）
2. 部署成功后，Vercel 会提供一个域名（如：your-project.vercel.app）
3. 您可以点击域名访问您的博客网站
4. 在项目设置中可以配置自定义域名

## 自动部署

- 每次您推送代码到 GitHub 仓库的 main 分支时，Vercel 会自动重新部署
- 您可以在 Vercel 仪表板中查看部署历史和状态

## 故障排除

如果遇到问题：
1. 检查 GitHub 仓库是否为公开仓库
2. 确保 package.json 文件在仓库根目录
3. 检查构建日志中的错误信息
4. 确保所有依赖都已正确安装 
# 第一步：最小可用上线指南

## 目标
将你的个人博客部署到 Vercel，实现最小可用版本（MVP）。

## 当前状态检查
✅ 项目构建成功  
✅ 开发服务器运行正常  
✅ 基础功能完整（博客展示、文章管理、用户系统）

## 第一步：准备部署

### 1.1 创建 GitHub 仓库
```bash
# 在项目根目录执行
git init
git add .
git commit -m "Initial commit: Personal blog with admin system"
```

### 1.2 创建 .gitignore 文件
```bash
# 确保以下内容在 .gitignore 中
node_modules/
.next/
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 1.3 推送到 GitHub
1. 在 GitHub 创建新仓库
2. 执行以下命令：
```bash
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

## 第二步：Vercel 部署

### 2.1 注册 Vercel
1. 访问 https://vercel.com
2. 使用 GitHub 账号注册
3. 导入你的 GitHub 仓库

### 2.2 配置部署设置
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2.3 环境变量配置
在 Vercel 项目设置中添加以下环境变量：
```
NODE_ENV=production
```

## 第三步：验证部署

### 3.1 检查部署状态
- 访问 Vercel 仪表板
- 确认部署成功（绿色状态）
- 记录你的域名（例如：your-blog.vercel.app）

### 3.2 功能测试
1. **首页访问**: 确认网站首页正常加载
2. **博客页面**: 测试博客列表页面
3. **管理后台**: 访问 `/admin` 路径
4. **用户注册**: 测试用户注册功能
5. **文章发布**: 测试发布新文章

## 第四步：基础优化

### 4.1 修复元数据警告
创建 `app/viewport.ts` 文件：
```typescript
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}
```

### 4.2 添加自定义域名（可选）
1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 记录
3. 等待 DNS 传播

## 第五步：监控和备份

### 5.1 设置监控
- 启用 Vercel Analytics
- 配置错误监控
- 设置性能监控

### 5.2 数据备份
- 定期导出用户数据
- 备份文章内容
- 保存配置文件

## 常见问题解决

### 问题1：构建失败
**解决方案**：
```bash
# 清理缓存
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### 问题2：环境变量错误
**解决方案**：
- 检查 Vercel 环境变量设置
- 确保所有必需的环境变量都已配置

### 问题3：API 路由错误
**解决方案**：
- 检查 API 路由语法
- 确保返回正确的响应格式

## 下一步计划

完成第一步后，我们将继续：
1. **数据库集成** - 替换内存存储为真实数据库
2. **密码加密** - 实现安全的密码存储
3. **文件上传** - 添加图片上传功能
4. **邮件系统** - 实现邮件通知
5. **性能优化** - 添加缓存和优化

## 成功标准

✅ 网站可以正常访问  
✅ 所有基础功能正常工作  
✅ 没有严重错误  
✅ 响应时间合理（<3秒）  
✅ 移动端适配正常  

---

**注意**: 这是最小可用版本，使用内存存储。数据会在服务器重启后丢失。在下一步中我们将集成真实数据库。 
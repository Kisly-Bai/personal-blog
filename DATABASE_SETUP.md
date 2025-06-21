# 🗄️ 数据库设置指南

## 概述

本指南将帮助您设置 MongoDB Atlas 数据库并配置应用程序使用真实数据库。

## 第一步：创建 MongoDB Atlas 账户

### 1. 注册账户
1. 访问 [MongoDB Atlas](https://www.mongodb.com/atlas)
2. 点击 "Try Free" 注册免费账户
3. 选择 "Free" 计划（M0）

### 2. 创建集群
1. 选择云提供商（推荐 AWS）
2. 选择地区（推荐离您最近的地区）
3. 选择 "M0 Sandbox" 免费套餐
4. 点击 "Create"

### 3. 配置数据库访问
1. 在左侧菜单点击 "Database Access"
2. 点击 "Add New Database User"
3. 创建用户名和密码（请记住这些信息）
4. 选择 "Read and write to any database"
5. 点击 "Add User"

### 4. 配置网络访问
1. 在左侧菜单点击 "Network Access"
2. 点击 "Add IP Address"
3. 选择 "Allow Access from Anywhere"（0.0.0.0/0）
4. 点击 "Confirm"

### 5. 获取连接字符串
1. 在左侧菜单点击 "Database"
2. 点击 "Connect"
3. 选择 "Connect your application"
4. 复制连接字符串

## 第二步：配置环境变量

### 1. 创建 .env 文件
在项目根目录创建 `.env` 文件：

```bash
# 数据库配置
DATABASE_URL="mongodb+srv://your-username:your-password@your-cluster.mongodb.net/blog?retryWrites=true&w=majority"

# 应用配置
NODE_ENV=development
```

### 2. 替换连接字符串
将 `your-username`、`your-password`、`your-cluster` 替换为您的实际值。

## 第三步：设置数据库

### 1. 生成 Prisma 客户端
```bash
npm run db:generate
```

### 2. 推送数据库架构
```bash
npm run db:push
```

### 3. 初始化数据库数据
```bash
npm run db:init
```

## 第四步：测试数据库连接

### 1. 启动开发服务器
```bash
npm run dev
```

### 2. 测试功能
- 访问 http://localhost:3000
- 尝试注册新用户
- 尝试登录
- 检查数据是否保存到数据库

## 第五步：部署到生产环境

### Netlify 部署

1. **设置环境变量**
   - 在 Netlify 仪表板中进入项目设置
   - 点击 "Environment variables"
   - 添加 `DATABASE_URL` 变量

2. **重新部署**
   - 推送代码到 GitHub
   - Netlify 会自动重新部署

### Vercel 部署

1. **设置环境变量**
   - 在 Vercel 仪表板中进入项目设置
   - 点击 "Environment Variables"
   - 添加 `DATABASE_URL` 变量

2. **重新部署**
   - 推送代码到 GitHub
   - Vercel 会自动重新部署

## 数据库管理

### 查看数据库
```bash
npm run db:studio
```
这会打开 Prisma Studio，一个可视化的数据库管理界面。

### 重置数据库
```bash
# 删除所有数据
npx prisma db push --force-reset

# 重新初始化
npm run db:init
```

## 默认账户

初始化后，系统会创建以下默认账户：

- **管理员账户**
  - 用户名：`admin`
  - 密码：`admin123`
  - 角色：管理员

## 故障排除

### 常见问题

1. **连接失败**
   - 检查 DATABASE_URL 是否正确
   - 确认网络访问设置
   - 检查用户名和密码

2. **权限错误**
   - 确认数据库用户有读写权限
   - 检查 IP 白名单设置

3. **架构同步失败**
   - 运行 `npm run db:generate`
   - 然后运行 `npm run db:push`

### 获取帮助

如果遇到问题：
1. 检查 MongoDB Atlas 日志
2. 查看 Prisma 错误信息
3. 确认环境变量设置正确

## 安全建议

1. **生产环境**
   - 使用强密码
   - 限制 IP 访问
   - 定期备份数据

2. **环境变量**
   - 不要在代码中硬编码数据库连接信息
   - 使用环境变量管理敏感信息

3. **数据库用户**
   - 为不同环境创建不同的数据库用户
   - 定期轮换密码

---

## 🎉 完成！

设置完成后，您的博客将具有：
- ✅ 真实的用户注册和登录
- ✅ 数据持久化存储
- ✅ 文章管理系统
- ✅ 评论系统
- ✅ 分类管理

现在可以开始使用真实的数据库了！ 
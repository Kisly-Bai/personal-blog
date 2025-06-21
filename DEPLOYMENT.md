# 🚀 博客网站部署指南

## 快速部署方案

### 1. Vercel 部署（推荐）

#### 步骤：
1. **准备代码**
   ```bash
   # 确保代码已提交到Git仓库
   git add .
   git commit -m "准备部署"
   git push origin main
   ```

2. **部署到Vercel**
   ```bash
   # 安装Vercel CLI
   npm install -g vercel
   
   # 登录Vercel
   vercel login
   
   # 部署项目
   vercel
   
   # 设置生产环境
   vercel --prod
   ```

3. **配置域名**
   - 在Vercel控制台添加自定义域名
   - 配置DNS记录指向Vercel

### 2. Netlify 部署

#### 步骤：
1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署**
   - 将项目拖拽到Netlify
   - 或连接Git仓库自动部署

### 3. 云服务器部署

#### 阿里云/腾讯云部署步骤：

1. **购买服务器**
   - 推荐配置：2核4G内存
   - 系统：Ubuntu 20.04

2. **安装环境**
   ```bash
   # 更新系统
   sudo apt update && sudo apt upgrade -y
   
   # 安装Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # 安装Nginx
   sudo apt install nginx -y
   
   # 安装PM2
   sudo npm install -g pm2
   ```

3. **部署项目**
   ```bash
   # 克隆项目
   git clone <your-repo-url>
   cd your-project
   
   # 安装依赖
   npm install
   
   # 构建项目
   npm run build
   
   # 启动应用
   pm2 start npm --name "blog" -- start
   pm2 save
   pm2 startup
   ```

4. **配置Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **配置SSL证书**
   ```bash
   # 安装Certbot
   sudo apt install certbot python3-certbot-nginx -y
   
   # 获取SSL证书
   sudo certbot --nginx -d your-domain.com
   ```

## 数据库配置

### 当前使用内存数据库（开发环境）

生产环境建议使用以下数据库：

1. **MongoDB Atlas**（推荐）
   ```bash
   npm install mongodb
   ```

2. **PostgreSQL**
   ```bash
   npm install pg
   ```

3. **MySQL**
   ```bash
   npm install mysql2
   ```

## 环境变量配置

创建 `.env.local` 文件：
```env
# 数据库配置
DATABASE_URL=your-database-url

# 认证配置
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com

# 图片上传配置
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 性能优化

1. **图片优化**
   - 使用Next.js Image组件
   - 配置图片CDN

2. **缓存策略**
   - 配置Redis缓存
   - 使用CDN加速

3. **SEO优化**
   - 配置meta标签
   - 生成sitemap
   - 配置robots.txt

## 监控和维护

1. **日志监控**
   ```bash
   # 查看PM2日志
   pm2 logs blog
   
   # 查看Nginx日志
   sudo tail -f /var/log/nginx/access.log
   ```

2. **性能监控**
   - 使用Vercel Analytics
   - 配置Google Analytics

3. **备份策略**
   - 定期备份数据库
   - 备份代码仓库

## 安全配置

1. **HTTPS强制**
2. **CORS配置**
3. **API限流**
4. **输入验证**
5. **SQL注入防护**

## 常见问题

### 1. 部署后样式不显示
- 检查Tailwind CSS配置
- 确保构建成功

### 2. API路由不工作
- 检查Vercel函数配置
- 确认路由路径正确

### 3. 数据库连接失败
- 检查环境变量
- 确认数据库服务正常

## 联系支持

如遇到部署问题，请：
1. 查看Vercel/Netlify日志
2. 检查控制台错误
3. 参考官方文档 
#!/bin/bash

echo "🚀 开始部署个人博客..."

# 检查 Git 是否初始化
if [ ! -d ".git" ]; then
    echo "📁 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: Personal blog with admin system"
    echo "✅ Git 仓库初始化完成"
else
    echo "📝 提交最新更改..."
    git add .
    git commit -m "Update: Prepare for deployment"
fi

# 检查是否有远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  请先添加远程仓库:"
    echo "   git remote add origin https://github.com/你的用户名/你的仓库名.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
else
    echo "📤 推送到远程仓库..."
    git push origin main
fi

echo ""
echo "🎉 本地部署准备完成！"
echo ""
echo "📋 下一步操作："
echo "1. 访问 https://vercel.com"
echo "2. 使用 GitHub 账号登录"
echo "3. 点击 'New Project'"
echo "4. 导入你的 GitHub 仓库"
echo "5. 配置部署设置"
echo "6. 点击 'Deploy'"
echo ""
echo "🔗 部署完成后，你将获得一个类似 https://your-blog.vercel.app 的域名" 
Write-Host "🚀 开始部署个人博客..." -ForegroundColor Green

# 检查 Git 是否初始化
if (-not (Test-Path ".git")) {
    Write-Host "📁 初始化 Git 仓库..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Personal blog with admin system"
    Write-Host "✅ Git 仓库初始化完成" -ForegroundColor Green
} else {
    Write-Host "📝 提交最新更改..." -ForegroundColor Yellow
    git add .
    git commit -m "Update: Prepare for deployment"
}

# 检查是否有远程仓库
try {
    $remoteUrl = git remote get-url origin 2>$null
    if ($remoteUrl) {
        Write-Host "📤 推送到远程仓库..." -ForegroundColor Yellow
        git push origin main
    } else {
        Write-Host "⚠️  请先添加远程仓库:" -ForegroundColor Red
        Write-Host "   git remote add origin https://github.com/你的用户名/你的仓库名.git" -ForegroundColor Cyan
        Write-Host "   git branch -M main" -ForegroundColor Cyan
        Write-Host "   git push -u origin main" -ForegroundColor Cyan
    }
} catch {
    Write-Host "⚠️  请先添加远程仓库:" -ForegroundColor Red
    Write-Host "   git remote add origin https://github.com/你的用户名/你的仓库名.git" -ForegroundColor Cyan
    Write-Host "   git branch -M main" -ForegroundColor Cyan
    Write-Host "   git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "🎉 本地部署准备完成！" -ForegroundColor Green
Write-Host ""
Write-Host "📋 下一步操作：" -ForegroundColor Yellow
Write-Host "1. 访问 https://vercel.com" -ForegroundColor Cyan
Write-Host "2. 使用 GitHub 账号登录" -ForegroundColor Cyan
Write-Host "3. 点击 'New Project'" -ForegroundColor Cyan
Write-Host "4. 导入你的 GitHub 仓库" -ForegroundColor Cyan
Write-Host "5. 配置部署设置" -ForegroundColor Cyan
Write-Host "6. 点击 'Deploy'" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 部署完成后，你将获得一个类似 https://your-blog.vercel.app 的域名" -ForegroundColor Green 
# 性能优化部署脚本
Write-Host "🚀 开始性能优化部署..." -ForegroundColor Green

# 1. 清理缓存
Write-Host "📦 清理缓存..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ 清理完成" -ForegroundColor Green
}

if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ node_modules 清理完成" -ForegroundColor Green
}

# 2. 重新安装依赖
Write-Host "📥 安装依赖..." -ForegroundColor Yellow
try {
    & npm install --production=false
    Write-Host "✅ 依赖安装完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 依赖安装失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 3. 构建项目
Write-Host "🔨 构建项目..." -ForegroundColor Yellow
try {
    & npm run build
    Write-Host "✅ 构建完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 构建失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 4. 性能检查
Write-Host "📊 性能检查..." -ForegroundColor Yellow
try {
    $buildSize = (Get-ChildItem ".next" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "📦 构建大小: $([math]::Round($buildSize, 2)) MB" -ForegroundColor Cyan
    
    if ($buildSize -gt 50) {
        Write-Host "⚠️  构建大小较大，建议优化" -ForegroundColor Yellow
    } else {
        Write-Host "✅ 构建大小正常" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  无法检查构建大小" -ForegroundColor Yellow
}

# 5. 提交到 Git
Write-Host "📝 提交更改..." -ForegroundColor Yellow
try {
    & git add .
    & git commit -m "Performance optimization: Client-side data loading and caching improvements"
    Write-Host "✅ 提交完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 提交失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 6. 推送到 GitHub
Write-Host "🚀 推送到 GitHub..." -ForegroundColor Yellow
try {
    & git push origin main
    Write-Host "✅ 推送完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 推送失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 性能优化部署完成！" -ForegroundColor Green
Write-Host "📈 优化内容:" -ForegroundColor Cyan
Write-Host "   • 客户端数据加载，减少服务器端渲染延迟" -ForegroundColor White
Write-Host "   • 添加加载状态和骨架屏" -ForegroundColor White
Write-Host "   • 优化缓存策略" -ForegroundColor White
Write-Host "   • 压缩静态资源" -ForegroundColor White
Write-Host "   • 减少 API 超时时间" -ForegroundColor White

Write-Host "⏱️  预计 Vercel 将在 2-3 分钟内完成部署" -ForegroundColor Yellow
Write-Host "🔗 部署完成后访问: https://personal-blog-lovat-chi-84.vercel.app" -ForegroundColor Cyan 
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('开始初始化数据库...')

  // 创建管理员用户
  const adminPassword = await hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      displayName: '管理员',
      role: 'ADMIN',
      bio: '网站管理员'
    }
  })
  console.log('✅ 管理员用户创建成功:', admin.username)

  // 创建默认分类
  const categories = [
    {
      name: '技术分享',
      description: '技术相关的文章和教程',
      color: '#3B82F6'
    },
    {
      name: '生活随笔',
      description: '日常生活和感悟',
      color: '#10B981'
    },
    {
      name: '学习笔记',
      description: '学习过程中的记录',
      color: '#F59E0B'
    },
    {
      name: '项目展示',
      description: '个人项目展示',
      color: '#8B5CF6'
    }
  ]

  for (const categoryData of categories) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {},
      create: categoryData
    })
    console.log('✅ 分类创建成功:', category.name)
  }

  // 创建示例文章
  const samplePost = await prisma.post.upsert({
    where: { title: '欢迎来到我的博客' },
    update: {},
    create: {
      title: '欢迎来到我的博客',
      excerpt: '这是我的第一篇博客文章，欢迎大家的关注和支持。',
      content: `# 欢迎来到我的博客

这是我的第一篇博客文章，在这里我将分享我的技术学习心得、生活感悟和项目经验。

## 关于我

我是一名热爱技术的开发者，喜欢探索新技术，分享学习经验。

## 博客内容

这个博客将包含以下内容：
- 技术分享
- 学习笔记
- 项目展示
- 生活随笔

感谢您的访问！`,
      category: '生活随笔',
      tags: ['博客', '介绍'],
      status: 'PUBLISHED',
      author: '管理员',
      authorId: admin.id,
      publishDate: new Date('2024-01-15'),
      views: 0
    }
  })
  console.log('✅ 示例文章创建成功:', samplePost.title)

  console.log('🎉 数据库初始化完成！')
}

main()
  .catch((e) => {
    console.error('❌ 数据库初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
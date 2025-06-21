import { NextRequest, NextResponse } from 'next/server'
import { postDB } from '@/lib/db'

// GET /api/posts - 获取所有文章
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let posts = postDB.getAll()

    // 按状态筛选
    if (status === 'published') {
      posts = postDB.getPublished()
    }

    // 按分类筛选
    if (category) {
      posts = postDB.getByCategory(category)
    }

    // 搜索
    if (search) {
      posts = postDB.search(search)
    }

    return NextResponse.json({ posts })
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
}

// POST /api/posts - 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, tags, featuredImage, status, author, authorId } = body

    // 验证必填字段
    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      )
    }

    const newPost = postDB.create({
      title,
      excerpt: excerpt || '',
      content,
      category,
      tags: tags || [],
      featuredImage,
      status: status || 'draft',
      author,
      authorId: authorId || '1',
      publishDate: status === 'published' ? new Date().toISOString().split('T')[0] : ''
    })

    return NextResponse.json({ post: newPost }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
} 
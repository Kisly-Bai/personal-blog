import { NextRequest, NextResponse } from 'next/server'
import { postDB } from '@/lib/db'

// GET /api/posts/[id] - 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = postDB.getById(params.id)
    
    if (!post) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      )
    }

    // 增加浏览量
    postDB.incrementViews(params.id)

    return NextResponse.json({ post })
  } catch (error) {
    return NextResponse.json(
      { error: '获取文章失败' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[id] - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, excerpt, content, category, tags, featuredImage, status } = body

    const updatedPost = postDB.update(params.id, {
      title,
      excerpt,
      content,
      category,
      tags,
      featuredImage,
      status,
      publishDate: status === 'published' ? new Date().toISOString().split('T')[0] : ''
    })

    if (!updatedPost) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = postDB.delete(params.id)
    
    if (!success) {
      return NextResponse.json(
        { error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '文章删除成功' })
  } catch (error) {
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    )
  }
} 
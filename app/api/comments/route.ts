import { NextRequest, NextResponse } from 'next/server'
import { commentDB } from '@/lib/db'

// GET /api/comments?postId=xxx 获取某篇文章的评论
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postId = searchParams.get('postId')
  if (!postId) return NextResponse.json({ comments: [] })
  return NextResponse.json({ comments: commentDB.getByPost(postId) })
}

// POST /api/comments 新增评论
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { postId, author, content, authorId } = body
  if (!postId || !author || !content) {
    return NextResponse.json({ error: '缺少字段' }, { status: 400 })
  }
  const comment = commentDB.create({ postId, author, content, authorId: authorId || 'anonymous' })
  return NextResponse.json({ comment })
} 
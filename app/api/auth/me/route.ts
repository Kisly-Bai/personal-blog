import { NextRequest, NextResponse } from 'next/server'
import { sessionDB, userDB } from '@/lib/db'

// 强制动态渲染，避免静态化
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: '未登录' },
        { status: 401 }
      )
    }

    const session = sessionDB.getByToken(token)
    if (!session) {
      return NextResponse.json(
        { error: '会话已过期' },
        { status: 401 }
      )
    }

    const user = userDB.getById(session.userId)
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        lastLoginAt: user.lastLoginAt
      }
    })
  } catch (error) {
    console.error('获取用户信息错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 
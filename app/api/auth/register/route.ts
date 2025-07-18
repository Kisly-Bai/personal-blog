import { NextRequest, NextResponse } from 'next/server'
import { userService, sessionService } from '@/lib/database'

// 强制动态渲染，避免静态化
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, displayName } = await request.json()

    // 验证输入
    if (!username || !email || !password || !displayName) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      )
    }

    // 检查用户名是否已存在
    const existingUser = await userService.getByUsername(username)
    if (existingUser) {
      return NextResponse.json(
        { error: '用户名已存在' },
        { status: 409 }
      )
    }

    // 检查邮箱是否已存在
    const existingEmail = await userService.getByEmail(email)
    if (existingEmail) {
      return NextResponse.json(
        { error: '邮箱已被注册' },
        { status: 409 }
      )
    }

    // 创建用户
    const user = await userService.create({
      username,
      email,
      password,
      displayName,
      role: 'USER'
    })

    // 创建会话
    const session = await sessionService.create(user.id)

    const response = NextResponse.json({
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        role: user.role
      }
    })

    // 设置认证 cookie
    response.cookies.set('auth-token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7天
    })

    return response
  } catch (error) {
    console.error('注册错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 
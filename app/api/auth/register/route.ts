import { NextRequest, NextResponse } from 'next/server'
import { userDB, sessionDB } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, displayName } = await request.json()

    // 验证必填字段
    if (!username || !email || !password || !displayName) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      )
    }

    // 验证用户名长度
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: '用户名长度必须在3-20个字符之间' },
        { status: 400 }
      )
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少6个字符' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    // 检查用户名是否已存在
    if (userDB.getByUsername(username)) {
      return NextResponse.json(
        { error: '用户名已存在' },
        { status: 409 }
      )
    }

    // 检查邮箱是否已存在
    if (userDB.getByEmail(email)) {
      return NextResponse.json(
        { error: '邮箱已被注册' },
        { status: 409 }
      )
    }

    // 创建新用户
    const newUser = userDB.create({
      username,
      email,
      password, // 实际应用中应该加密存储
      displayName,
      role: 'user', // 默认角色为普通用户
      bio: ''
    })

    // 创建会话
    const session = sessionDB.create(newUser.id)

    // 设置cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        displayName: newUser.displayName,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      }
    })

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
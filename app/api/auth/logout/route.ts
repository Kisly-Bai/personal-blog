import { NextRequest, NextResponse } from 'next/server'
import { sessionDB } from '@/lib/db'

// 强制动态渲染，避免静态化
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (token) {
      sessionDB.delete(token)
    }

    const response = NextResponse.json({ message: '退出成功' })
    response.cookies.delete('auth-token')
    
    return response
  } catch (error) {
    console.error('退出登录错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 
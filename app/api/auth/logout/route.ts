import { NextRequest, NextResponse } from 'next/server'
import { sessionDB } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (token) {
      sessionDB.delete(token)
    }

    const response = NextResponse.json({ success: true })
    response.cookies.delete('auth-token')

    return response
  } catch (error) {
    console.error('登出错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
} 
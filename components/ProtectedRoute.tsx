'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './AuthContext'
import { motion } from 'framer-motion'
import { Loader2, Shield } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'admin' | 'author' | 'user'
}

export default function ProtectedRoute({ children, requiredRole = 'user' }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // 检查用户权限
  const hasPermission = () => {
    if (!user) return false
    
    const roleHierarchy = {
      'user': 1,
      'author': 2,
      'admin': 3
    }
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-secondary-600">加载中...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">需要登录</h2>
          <p className="text-secondary-600 mb-4">请先登录以访问此页面</p>
          <button
            onClick={() => router.push('/login')}
            className="btn-primary"
          >
            前往登录
          </button>
        </motion.div>
      </div>
    )
  }

  if (!hasPermission()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">权限不足</h2>
          <p className="text-secondary-600 mb-4">您没有权限访问此页面</p>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            返回首页
          </button>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
} 
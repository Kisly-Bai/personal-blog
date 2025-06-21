'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/components/AuthContext'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const menuItems = [
    { name: '仪表板', href: '/admin', icon: LayoutDashboard },
    { name: '文章管理', href: '/admin/posts', icon: FileText },
    { name: '分类管理', href: '/admin/categories', icon: FolderOpen },
    { name: '用户管理', href: '/admin/users', icon: Users },
    { name: '系统设置', href: '/admin/settings', icon: Settings },
  ]

  const handleLogout = async () => {
    await logout()
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-secondary-50 flex">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.div
          initial={{ x: -288 }}
          animate={{ x: sidebarOpen ? 0 : -288 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-lg lg:shadow-none lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h1 className="text-xl font-bold text-gradient">博客管理后台</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600 shadow-sm'
                        : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 hover:shadow-sm'
                    }`}
                  >
                    <item.icon size={20} className="mr-3 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-secondary-200">
              <div className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 text-secondary-600 hover:text-secondary-900 rounded-lg transition-colors duration-200 hover:bg-secondary-100"
                >
                  <Home size={20} className="mr-3 flex-shrink-0" />
                  <span className="font-medium">返回前台</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <LogOut size={20} className="mr-3 flex-shrink-0" />
                  <span className="font-medium">退出登录</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <div className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center space-x-4 ml-auto">
                {user && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700">
                        {user.displayName.charAt(0)}
                      </span>
                    </div>
                    <div className="text-sm text-secondary-600">
                      <div className="font-medium">{user.displayName}</div>
                      <div className="text-xs">{user.role}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AdminLayout 
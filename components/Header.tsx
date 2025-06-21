'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from './AuthContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const navItems = [
    { name: '首页', href: '/' },
    { name: '博客', href: '/blog' },
    { name: '分类', href: '/categories' },
    { name: '关于', href: '/about' },
    { name: '联系', href: '/contact' },
  ]

  const handleLogout = async () => {
    await logout()
    setIsUserMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold text-gradient">
              我的博客
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-secondary-600 hover:text-primary-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-primary-50"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {user.displayName.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{user.displayName}</span>
                  <ChevronDown size={16} />
                </button>

                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 py-2"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} className="mr-3" />
                      个人资料
                    </Link>
                    <Link
                      href="/admin"
                      className="flex items-center px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings size={16} className="mr-3" />
                      管理后台
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      <LogOut size={16} className="mr-3" />
                      退出登录
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                <User size={16} className="mr-2" />
                登录
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-2">
                {user ? (
                  <>
                    <Link
                      href="/admin"
                      className="flex-1 btn-secondary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      管理后台
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex-1 btn-primary"
                    >
                      <LogOut size={16} className="mr-2" />
                      退出
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="flex-1 btn-primary">
                    <User size={16} className="mr-2" />
                    登录
                  </Link>
                )}
                <button className="p-2 text-secondary-600 hover:text-primary-600 transition-colors duration-200">
                  <Search size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header 
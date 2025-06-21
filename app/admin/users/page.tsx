'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  User,
  Shield,
  Mail,
  Calendar
} from 'lucide-react'
import { User as UserType } from '@/lib/db'

const UsersManagement = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟获取用户数据
    const mockUsers: UserType[] = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123',
        displayName: '管理员',
        role: 'admin',
        bio: '网站管理员',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        lastLoginAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        username: 'author1',
        email: 'author1@example.com',
        password: 'password123',
        displayName: '作者小王',
        role: 'author',
        bio: '技术博主',
        createdAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
        lastLoginAt: '2024-01-14T15:20:00Z'
      },
      {
        id: '3',
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        displayName: '普通用户',
        role: 'user',
        bio: '博客读者',
        createdAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
        lastLoginAt: '2024-01-13T09:15:00Z'
      }
    ]
    setUsers(mockUsers)
    setLoading(false)
  }, [])

  const roleOptions = [
    { value: 'all', label: '全部角色' },
    { value: 'admin', label: '管理员' },
    { value: 'author', label: '作者' },
    { value: 'user', label: '用户' },
  ]

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: '管理员', color: 'bg-red-100 text-red-800' },
      author: { label: '作者', color: 'bg-blue-100 text-blue-800' },
      user: { label: '用户', color: 'bg-green-100 text-green-800' },
    }
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.user
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-secondary-500">加载中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">用户管理</h1>
          <p className="text-secondary-600 mt-2">管理系统中的所有用户账户</p>
        </div>
        <button className="btn-primary inline-flex items-center mt-4 sm:mt-0">
          <Plus size={20} className="mr-2" />
          添加用户
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-secondary-400" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {roleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">用户</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">角色</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">邮箱</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">注册时间</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">最后登录</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-primary-700">
                            {user.displayName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-secondary-900">{user.displayName}</h3>
                          <p className="text-sm text-secondary-600">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-secondary-900">
                        <Mail size={16} className="mr-2 text-secondary-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-secondary-900">
                        <Calendar size={16} className="mr-2 text-secondary-400" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-secondary-900">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : '从未登录'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
                          <Edit size={16} />
                        </button>
                        {user.role !== 'admin' && (
                          <button className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-secondary-500">
                      <User size={48} className="mx-auto mb-4 text-secondary-300" />
                      <p className="text-lg font-medium mb-2">没有找到用户</p>
                      <p className="text-sm">尝试调整搜索条件</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersManagement 
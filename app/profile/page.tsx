'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Shield,
  FileText
} from 'lucide-react'
import { useAuth } from '@/components/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    bio: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName,
        email: user.email,
        bio: user.bio || ''
      })
    }
  }, [user])

  const handleSave = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      // 这里可以添加更新用户信息的API调用
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage('个人信息更新成功！')
      setIsEditing(false)
    } catch (error) {
      setMessage('更新失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || '',
      email: user?.email || '',
      bio: user?.bio || ''
    })
    setIsEditing(false)
    setMessage('')
  }

  if (!user) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-secondary-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* 页面标题 */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-secondary-900">个人资料</h1>
              <p className="text-secondary-600 mt-2">管理您的个人信息和账户设置</p>
            </div>

            {/* 消息提示 */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  message.includes('成功') 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {message}
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧：头像和基本信息 */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
                  {/* 头像 */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary-700">
                          {user.displayName.charAt(0)}
                        </span>
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
                        <Camera size={16} />
                      </button>
                    </div>
                    <h2 className="text-xl font-semibold text-secondary-900">{user.displayName}</h2>
                    <p className="text-secondary-600">@{user.username}</p>
                  </div>

                  {/* 角色信息 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center">
                        <Shield size={20} className="text-secondary-400 mr-3" />
                        <span className="text-sm font-medium text-secondary-700">角色</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user.role === 'author' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'admin' ? '管理员' : 
                         user.role === 'author' ? '作者' : '用户'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar size={20} className="text-secondary-400 mr-3" />
                        <span className="text-sm font-medium text-secondary-700">注册时间</span>
                      </div>
                      <span className="text-sm text-secondary-600">
                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : '未知'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧：详细信息 */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
                  <div className="p-6 border-b border-secondary-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-secondary-900">基本信息</h3>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="btn-secondary inline-flex items-center"
                        >
                          <Edit3 size={16} className="mr-2" />
                          编辑
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSave}
                            disabled={loading}
                            className="btn-primary inline-flex items-center"
                          >
                            {loading ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                              <Save size={16} className="mr-2" />
                            )}
                            保存
                          </button>
                          <button
                            onClick={handleCancel}
                            className="btn-secondary inline-flex items-center"
                          >
                            <X size={16} className="mr-2" />
                            取消
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* 显示名称 */}
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        显示名称
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.displayName}
                          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                          className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                          <User size={20} className="text-secondary-400 mr-3" />
                          <span className="text-secondary-900">{user.displayName}</span>
                        </div>
                      )}
                    </div>

                    {/* 用户名 */}
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        用户名
                      </label>
                      <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                        <User size={20} className="text-secondary-400 mr-3" />
                        <span className="text-secondary-900">@{user.username}</span>
                      </div>
                      <p className="text-xs text-secondary-500 mt-1">用户名不可修改</p>
                    </div>

                    {/* 邮箱 */}
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        邮箱地址
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-secondary-50 rounded-lg">
                          <Mail size={20} className="text-secondary-400 mr-3" />
                          <span className="text-secondary-900">{user.email}</span>
                        </div>
                      )}
                    </div>

                    {/* 个人简介 */}
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        个人简介
                      </label>
                      {isEditing ? (
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="写点什么介绍自己..."
                        />
                      ) : (
                        <div className="flex items-start p-3 bg-secondary-50 rounded-lg">
                          <FileText size={20} className="text-secondary-400 mr-3 mt-0.5" />
                          <span className="text-secondary-900">
                            {user.bio || '还没有填写个人简介'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 
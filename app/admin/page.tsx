'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  Eye, 
  Users, 
  FolderOpen, 
  TrendingUp, 
  Calendar,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

const AdminDashboard = () => {
  const stats = [
    {
      title: '总文章数',
      value: '0',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+0%',
      changeColor: 'text-green-600'
    },
    {
      title: '总浏览量',
      value: '0',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+0%',
      changeColor: 'text-green-600'
    },
    {
      title: '用户数量',
      value: '1',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+100%',
      changeColor: 'text-green-600'
    },
    {
      title: '分类数量',
      value: '4',
      icon: FolderOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      change: '+0%',
      changeColor: 'text-green-600'
    },
  ]

  const recentActivities = [
    {
      type: '文章',
      action: '创建',
      title: '欢迎来到我的博客',
      time: '刚刚',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      type: '分类',
      action: '添加',
      title: '技术分享',
      time: '1小时前',
      icon: FolderOpen,
      color: 'text-green-600'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-secondary-900">仪表板</h1>
            <p className="text-secondary-600 mt-2">欢迎来到博客管理后台，这里是您的数据概览</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/admin/posts/new"
              className="btn-primary inline-flex items-center"
            >
              <FileText size={20} className="mr-2" />
              创建新文章
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className={`text-sm font-medium ${stat.changeColor}`}>
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-600 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-secondary-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-secondary-200"
        >
          <div className="p-6 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">最近活动</h2>
              <Calendar size={20} className="text-secondary-400" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors duration-200">
                  <div className={`p-2 rounded-lg bg-white ${activity.color} bg-opacity-10`}>
                    <activity.icon size={16} className={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900">
                      {activity.type} - {activity.action}
                    </p>
                    <p className="text-sm text-secondary-600 mt-1">{activity.title}</p>
                  </div>
                  <span className="text-xs text-secondary-500 flex-shrink-0">{activity.time}</span>
                </div>
              ))}
              
              {recentActivities.length === 0 && (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto mb-4 text-secondary-300" />
                  <p className="text-secondary-500">暂无活动记录</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-secondary-200"
        >
          <div className="p-6 border-b border-secondary-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-secondary-900">快速操作</h2>
              <BarChart3 size={20} className="text-secondary-400" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <Link
                href="/admin/posts/new"
                className="w-full flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <FileText size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-primary-700">创建新文章</span>
                    <p className="text-sm text-primary-600">开始编写您的博客文章</p>
                  </div>
                </div>
                <TrendingUp size={16} className="text-primary-600" />
              </Link>
              
              <Link
                href="/admin/categories"
                className="w-full flex items-center justify-between p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary-100 rounded-lg">
                    <FolderOpen size={20} className="text-secondary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-secondary-700">管理分类</span>
                    <p className="text-sm text-secondary-600">组织您的文章分类</p>
                  </div>
                </div>
                <TrendingUp size={16} className="text-secondary-600" />
              </Link>
              
              <Link
                href="/admin/users"
                className="w-full flex items-center justify-between p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary-100 rounded-lg">
                    <Users size={20} className="text-secondary-600" />
                  </div>
                  <div>
                    <span className="font-medium text-secondary-700">用户管理</span>
                    <p className="text-sm text-secondary-600">管理用户和权限</p>
                  </div>
                </div>
                <TrendingUp size={16} className="text-secondary-600" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard 
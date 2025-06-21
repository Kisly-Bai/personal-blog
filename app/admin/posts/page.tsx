'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { Post } from '@/lib/db'

const PostsManagement = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('获取文章失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('确定要删除这个文章吗？')) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setPosts(posts.filter(post => post.id !== id))
        } else {
          alert('删除失败')
        }
      } catch (error) {
        console.error('删除文章失败:', error)
        alert('删除失败')
      }
    }
  }

  const statusOptions = [
    { value: 'all', label: '全部状态' },
    { value: 'published', label: '已发布' },
    { value: 'draft', label: '草稿' },
    { value: 'archived', label: '已归档' },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: '已发布', color: 'bg-green-100 text-green-800' },
      draft: { label: '草稿', color: 'bg-yellow-100 text-yellow-800' },
      archived: { label: '已归档', color: 'bg-gray-100 text-gray-800' },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus
    return matchesSearch && matchesStatus
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
          <h1 className="text-3xl font-bold text-secondary-900">文章管理</h1>
          <p className="text-secondary-600 mt-2">管理您的所有博客文章</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="btn-primary inline-flex items-center mt-4 sm:mt-0"
        >
          <Plus size={20} className="mr-2" />
          创建文章
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
            <input
              type="text"
              placeholder="搜索文章..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-secondary-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">标题</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">分类</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">状态</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">作者</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">发布日期</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">浏览量</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-secondary-900">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-secondary-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="text-sm font-medium text-secondary-900">{post.title}</h3>
                        <p className="text-sm text-secondary-600 mt-1 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary-900">{post.author}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary-900">{post.publishDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-secondary-900">{post.views}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                        >
                          <Edit size={16} />
                        </Link>
                        <Link
                          href={`/blog/${post.id}`}
                          className="p-2 text-secondary-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        >
                          <Eye size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="text-secondary-500">
                      <FileText size={48} className="mx-auto mb-4 text-secondary-300" />
                      <p className="text-lg font-medium mb-2">还没有文章</p>
                      <p className="text-sm">开始创建您的第一篇文章吧！</p>
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

export default PostsManagement 
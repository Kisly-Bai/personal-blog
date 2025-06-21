'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  Eye, 
  ArrowLeft,
  Upload,
  X
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NewPost = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft'
  })

  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    '技术分享',
    '生活随笔', 
    '学习笔记',
    '项目展示'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          author: '管理员'
        }),
      })

      if (response.ok) {
        const result = await response.json()
        alert('文章保存成功！')
        router.push('/admin/posts')
      } else {
        const error = await response.json()
        alert(`保存失败: ${error.error}`)
      }
    } catch (error) {
      console.error('保存文章失败:', error)
      alert('保存失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 这里处理图片上传逻辑
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          featuredImage: e.target?.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: ''
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/posts"
            className="p-2 text-secondary-600 hover:text-secondary-900 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">创建新文章</h1>
            <p className="text-secondary-600 mt-2">编写您的博客文章</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="btn-secondary inline-flex items-center"
          >
            <Eye size={20} className="mr-2" />
            {isPreview ? '编辑' : '预览'}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary inline-flex items-center"
          >
            <Save size={20} className="mr-2" />
            {isSubmitting ? '保存中...' : '保存文章'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              文章标题
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="输入文章标题..."
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              文章内容
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="开始编写您的文章内容..."
              rows={20}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              特色图片
            </label>
            
            {formData.featuredImage ? (
              <div className="relative">
                <img
                  src={formData.featuredImage}
                  alt="Featured"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center">
                <Upload size={32} className="mx-auto mb-2 text-secondary-400" />
                <p className="text-sm text-secondary-600 mb-2">点击上传图片</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="btn-secondary inline-flex items-center cursor-pointer"
                >
                  <Upload size={16} className="mr-2" />
                  选择图片
                </label>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              文章摘要
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="输入文章摘要..."
              rows={4}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              分类
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">选择分类</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              标签
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="输入标签，用逗号分隔..."
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
            <label className="block text-sm font-medium text-secondary-900 mb-2">
              发布状态
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="draft">草稿</option>
              <option value="published">发布</option>
              <option value="archived">归档</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost 
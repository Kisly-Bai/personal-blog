'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FolderOpen,
  FileText
} from 'lucide-react'

const CategoriesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  })

  const categories = [
    {
      id: 1,
      name: '技术分享',
      description: '技术相关的文章和教程',
      postCount: 0,
      color: '#3B82F6'
    },
    {
      id: 2,
      name: '生活随笔',
      description: '日常生活和感悟',
      postCount: 0,
      color: '#10B981'
    },
    {
      id: 3,
      name: '学习笔记',
      description: '学习过程中的记录',
      postCount: 0,
      color: '#F59E0B'
    },
    {
      id: 4,
      name: '项目展示',
      description: '个人项目展示',
      postCount: 0,
      color: '#8B5CF6'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingCategory) {
      // 编辑分类
      console.log('编辑分类:', editingCategory, formData)
    } else {
      // 添加分类
      console.log('添加分类:', formData)
    }
    setShowAddForm(false)
    setEditingCategory(null)
    setFormData({ name: '', description: '', color: '#3B82F6' })
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category.id)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color
    })
    setShowAddForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('确定要删除这个分类吗？')) {
      console.log('删除分类:', id)
    }
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">分类管理</h1>
          <p className="text-secondary-600 mt-2">管理您的博客分类</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true)
            setEditingCategory(null)
            setFormData({ name: '', description: '', color: '#3B82F6' })
          }}
          className="btn-primary inline-flex items-center mt-4 sm:mt-0"
        >
          <Plus size={20} className="mr-2" />
          添加分类
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
          <input
            type="text"
            placeholder="搜索分类..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200"
        >
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">
            {editingCategory ? '编辑分类' : '添加新分类'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  分类名称
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="输入分类名称..."
                  className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-900 mb-2">
                  颜色
                </label>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full h-12 border border-secondary-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                描述
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="输入分类描述..."
                rows={3}
                className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button type="submit" className="btn-primary">
                {editingCategory ? '更新分类' : '添加分类'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingCategory(null)
                  setFormData({ name: '', description: '', color: '#3B82F6' })
                }}
                className="btn-secondary"
              >
                取消
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-secondary-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h3 className="text-lg font-semibold text-secondary-900">{category.name}</h3>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-secondary-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-secondary-600 mb-4">{category.description}</p>
              
              <div className="flex items-center text-sm text-secondary-500">
                <FileText size={16} className="mr-2" />
                {category.postCount} 篇文章
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FolderOpen size={48} className="mx-auto mb-4 text-secondary-300" />
            <p className="text-lg font-medium text-secondary-500 mb-2">没有找到分类</p>
            <p className="text-sm text-secondary-400">尝试调整搜索条件或添加新分类</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoriesManagement 
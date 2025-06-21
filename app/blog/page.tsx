'use client'

import { motion } from 'framer-motion'
import { Search, Filter, BookOpen, Plus } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BlogPage = () => {
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'tech', name: '技术' },
    { id: 'life', name: '生活' },
    { id: 'tutorial', name: '教程' },
    { id: 'thoughts', name: '思考' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              博客文章
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              分享技术见解、生活感悟和有趣的故事
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
                <input
                  type="text"
                  placeholder="搜索文章..."
                  className="w-full pl-10 pr-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-secondary-400" />
                <select className="px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 max-w-2xl mx-auto">
              <BookOpen size={64} className="sm:w-20 sm:h-20 text-primary-600 mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold text-secondary-900 mb-3 sm:mb-4">
                还没有文章
              </h3>
              <p className="text-secondary-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                开始创作您的第一篇文章，分享您的想法、经验和见解。
                这里将是您展示才华和连接读者的地方。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 inline-flex items-center justify-center">
                  <Plus size={18} className="sm:w-5 sm:h-5 mr-2" />
                  创建文章
                </button>
                <Link href="/" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 inline-flex items-center justify-center">
                  返回首页
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Categories Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
              文章分类
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(1).map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="card p-6 text-center group"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-200">
                    <BookOpen size={32} className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    0 篇文章
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BlogPage 
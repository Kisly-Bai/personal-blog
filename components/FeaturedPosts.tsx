'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Eye, Tag } from 'lucide-react'
import Link from 'next/link'
import { Post, Category } from '@/lib/db'

interface FeaturedPostsProps {
  posts: Post[]
  categories: Category[]
}

const FeaturedPosts = ({ posts, categories }: FeaturedPostsProps) => {
  const featuredPosts = posts.slice(0, 3)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">精选文章</h2>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            分享我的技术学习心得、生活感悟和项目经验
          </p>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {post.featuredImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span 
                      className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: categories.find(c => c.name === post.category)?.color + '20',
                        color: categories.find(c => c.name === post.category)?.color
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary-600 transition-colors duration-200">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-secondary-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-secondary-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {post.publishDate}
                      </div>
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {post.views}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-secondary-400 mb-4">
              <Tag size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">还没有文章</h3>
            <p className="text-secondary-600 mb-6">开始创建您的第一篇文章吧！</p>
            <Link
              href="/admin/posts/new"
              className="btn-primary inline-flex items-center"
            >
              开始写作
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        )}

        {featuredPosts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="btn-secondary inline-flex items-center"
            >
              查看所有文章
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedPosts 
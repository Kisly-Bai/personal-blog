'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Heart, Coffee } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 mb-6">
              欢迎来到我的
              <span className="text-gradient"> 个人博客</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl mx-auto">
              在这里分享技术见解、生活感悟和有趣的故事
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12"
          >
            <Link href="/blog" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 inline-flex items-center justify-center">
              开始探索
              <ArrowRight size={18} className="sm:w-5 sm:h-5 ml-2" />
            </Link>
            <Link href="/about" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 inline-flex items-center justify-center">
              了解更多
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="card p-6 text-center">
              <BookOpen size={32} className="text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                技术分享
              </h3>
              <p className="text-secondary-600">
                分享最新的技术趋势和开发经验
              </p>
            </div>
            <div className="card p-6 text-center">
              <Heart size={32} className="text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                生活感悟
              </h3>
              <p className="text-secondary-600">
                记录生活中的美好时刻和思考
              </p>
            </div>
            <div className="card p-6 text-center">
              <Coffee size={32} className="text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                轻松时光
              </h3>
              <p className="text-secondary-600">
                分享有趣的故事和轻松的话题
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 
'use client'

import { useEffect, useState } from 'react'
import { postService, categoryService } from '@/lib/database'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 在客户端加载数据，避免服务器端渲染延迟
    const loadData = async () => {
      try {
        const [publishedPosts, allCategories] = await Promise.all([
          postService.getPublished(),
          categoryService.getAll()
        ])
        setPosts(publishedPosts)
        setCategories(allCategories)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    // 添加小延迟确保组件完全挂载
    const timer = setTimeout(loadData, 100)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16">
          <Hero />
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
          <About />
          <Footer />
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <Hero />
        <FeaturedPosts posts={posts} categories={categories} />
        <About />
        <Footer />
      </main>
    </>
  )
} 
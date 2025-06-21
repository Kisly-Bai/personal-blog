import { postDB, categoryDB } from '@/lib/db'
import Hero from '@/components/Hero'
import FeaturedPosts from '@/components/FeaturedPosts'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  // 获取已发布的文章
  const publishedPosts = postDB.getPublished()
  const categories = categoryDB.getAll()

  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedPosts posts={publishedPosts} categories={categories} />
      <About />
      <Footer />
    </main>
  )
} 
'use client'

import { notFound } from 'next/navigation'
import { postDB } from '@/lib/db'
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'

function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => setComments(data.comments))
      .finally(() => setLoading(false))
  }, [postId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    
    setSubmitting(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          postId, 
          author: user?.displayName || '匿名用户',
          authorId: user?.id || 'anonymous',
          content 
        })
      })
      
      if (res.ok) {
        setContent('')
        const data = await res.json()
        setComments([...comments, data.comment])
      }
    } catch (error) {
      console.error('提交评论失败:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold mb-4">评论区</h3>
      
      {/* 评论表单 */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-6 space-y-2">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="写下你的评论..."
            className="border border-secondary-200 rounded px-3 py-2 w-full min-h-[80px]"
            required
            disabled={submitting}
          />
          <button 
            type="submit" 
            className="btn-primary"
            disabled={submitting || !content.trim()}
          >
            {submitting ? '提交中...' : '提交评论'}
          </button>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm">
            请 <a href="/login" className="underline font-medium">登录</a> 后发表评论
          </p>
        </div>
      )}

      {/* 评论列表 */}
      {loading ? (
        <div className="text-secondary-500">加载中...</div>
      ) : (
        <ul className="space-y-4">
          {comments.length === 0 && <li className="text-secondary-400">暂无评论</li>}
          {comments.map(c => (
            <li key={c.id} className="bg-secondary-50 rounded p-3">
              <b className="text-primary-700 mr-2">{c.author}</b>
              <span className="text-secondary-700">{c.content}</span>
              <div className="text-xs text-secondary-400 mt-1">{new Date(c.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundPost = postDB.getById(params.id)
    if (foundPost) {
      setPost(foundPost)
      // 增加浏览量
      postDB.incrementViews(params.id)
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return <div className="max-w-3xl mx-auto py-12 px-4">加载中...</div>
  }

  if (!post) {
    return notFound()
  }
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-secondary-600 mb-6">{post.publishDate} | {post.category} | {post.author}</div>
      <div className="prose prose-blue mb-8" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
      <Comments postId={post.id} />
    </div>
  )
} 
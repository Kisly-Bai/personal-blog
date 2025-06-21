// 简单的内存数据库（生产环境建议使用真实数据库）
export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featuredImage?: string
  status: 'draft' | 'published' | 'archived'
  author: string
  authorId: string // 添加作者ID
  publishDate: string
  views: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description: string
  color: string
  postCount: number
}

export interface Comment {
  id: string
  postId: string
  author: string
  authorId: string // 添加评论者ID
  content: string
  createdAt: string
}

// 新增用户接口
export interface User {
  id: string
  username: string
  email: string
  password: string // 实际应用中应该加密存储
  displayName: string
  avatar?: string
  role: 'admin' | 'author' | 'user'
  bio?: string
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

// 新增会话接口
export interface Session {
  id: string
  userId: string
  token: string
  expiresAt: string
  createdAt: string
}

// 内存存储
let posts: Post[] = [
  {
    id: '1',
    title: '欢迎来到我的博客',
    excerpt: '这是我的第一篇博客文章，欢迎大家的关注和支持。',
    content: `# 欢迎来到我的博客

这是我的第一篇博客文章，在这里我将分享我的技术学习心得、生活感悟和项目经验。

## 关于我

我是一名热爱技术的开发者，喜欢探索新技术，分享学习经验。

## 博客内容

这个博客将包含以下内容：
- 技术分享
- 学习笔记
- 项目展示
- 生活随笔

感谢您的访问！`,
    category: '生活随笔',
    tags: ['博客', '介绍'],
    status: 'published',
    author: '管理员',
    authorId: '1',
    publishDate: '2024-01-15',
    views: 0,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
]

let categories: Category[] = [
  {
    id: '1',
    name: '技术分享',
    description: '技术相关的文章和教程',
    color: '#3B82F6',
    postCount: 0
  },
  {
    id: '2',
    name: '生活随笔',
    description: '日常生活和感悟',
    color: '#10B981',
    postCount: 1
  },
  {
    id: '3',
    name: '学习笔记',
    description: '学习过程中的记录',
    color: '#F59E0B',
    postCount: 0
  },
  {
    id: '4',
    name: '项目展示',
    description: '个人项目展示',
    color: '#8B5CF6',
    postCount: 0
  }
]

let comments: Comment[] = []

// 新增用户数据
let users: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123', // 实际应用中应该使用加密密码
    displayName: '管理员',
    role: 'admin',
    bio: '网站管理员',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

let sessions: Session[] = []

// 文章相关操作
export const postDB = {
  // 获取所有文章
  getAll: (): Post[] => {
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  },

  // 获取已发布的文章
  getPublished: (): Post[] => {
    return posts.filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  },

  // 根据ID获取文章
  getById: (id: string): Post | undefined => {
    return posts.find(post => post.id === id)
  },

  // 创建文章
  create: (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Post => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    posts.push(newPost)
    return newPost
  },

  // 更新文章
  update: (id: string, updates: Partial<Post>): Post | null => {
    const index = posts.findIndex(post => post.id === id)
    if (index === -1) return null
    
    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return posts[index]
  },

  // 删除文章
  delete: (id: string): boolean => {
    const index = posts.findIndex(post => post.id === id)
    if (index === -1) return false
    
    posts.splice(index, 1)
    return true
  },

  // 增加浏览量
  incrementViews: (id: string): void => {
    const post = posts.find(post => post.id === id)
    if (post) {
      post.views++
    }
  },

  // 搜索文章
  search: (query: string): Post[] => {
    const lowercaseQuery = query.toLowerCase()
    return posts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  },

  // 按分类获取文章
  getByCategory: (category: string): Post[] => {
    return posts.filter(post => post.category === category && post.status === 'published')
  }
}

// 分类相关操作
export const categoryDB = {
  // 获取所有分类
  getAll: (): Category[] => {
    return categories
  },

  // 根据ID获取分类
  getById: (id: string): Category | undefined => {
    return categories.find(category => category.id === id)
  },

  // 创建分类
  create: (categoryData: Omit<Category, 'id' | 'postCount'>): Category => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      postCount: 0
    }
    categories.push(newCategory)
    return newCategory
  },

  // 更新分类
  update: (id: string, updates: Partial<Category>): Category | null => {
    const index = categories.findIndex(category => category.id === id)
    if (index === -1) return null
    
    categories[index] = {
      ...categories[index],
      ...updates
    }
    return categories[index]
  },

  // 删除分类
  delete: (id: string): boolean => {
    const index = categories.findIndex(category => category.id === id)
    if (index === -1) return false
    
    categories.splice(index, 1)
    return true
  }
} 

export const commentDB = {
  getByPost: (postId: string): Comment[] => comments.filter(c => c.postId === postId),
  create: (data: Omit<Comment, 'id' | 'createdAt'>): Comment => {
    const newComment: Comment = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    comments.push(newComment)
    return newComment
  }
}

// 用户相关操作
export const userDB = {
  // 获取所有用户
  getAll: (): User[] => {
    return users
  },

  // 根据ID获取用户
  getById: (id: string): User | undefined => {
    return users.find(user => user.id === id)
  },

  // 根据用户名获取用户
  getByUsername: (username: string): User | undefined => {
    return users.find(user => user.username === username)
  },

  // 根据邮箱获取用户
  getByEmail: (email: string): User | undefined => {
    return users.find(user => user.email === email)
  },

  // 创建用户
  create: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    users.push(newUser)
    return newUser
  },

  // 更新用户
  update: (id: string, updates: Partial<User>): User | null => {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return null
    
    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return users[index]
  },

  // 删除用户
  delete: (id: string): boolean => {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return false
    
    users.splice(index, 1)
    return true
  },

  // 验证用户登录
  authenticate: (username: string, password: string): User | null => {
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      // 更新最后登录时间
      user.lastLoginAt = new Date().toISOString()
      return user
    }
    return null
  }
}

// 会话相关操作
export const sessionDB = {
  // 创建会话
  create: (userId: string): Session => {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7天过期
    
    const session: Session = {
      id: Date.now().toString(),
      userId,
      token,
      expiresAt,
      createdAt: new Date().toISOString()
    }
    
    sessions.push(session)
    return session
  },

  // 根据token获取会话
  getByToken: (token: string): Session | undefined => {
    const session = sessions.find(s => s.token === token)
    if (session && new Date(session.expiresAt) > new Date()) {
      return session
    }
    return undefined
  },

  // 删除会话
  delete: (token: string): boolean => {
    const index = sessions.findIndex(s => s.token === token)
    if (index === -1) return false
    
    sessions.splice(index, 1)
    return true
  },

  // 清理过期会话
  cleanup: (): void => {
    const now = new Date()
    sessions = sessions.filter(s => new Date(s.expiresAt) > now)
  }
} 
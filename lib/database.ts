import { prisma } from './prisma'
import { hash, compare } from 'bcryptjs'
import { randomBytes } from 'crypto'

// 用户相关操作
export const userService = {
  // 创建用户
  async create(data: {
    username: string
    email: string
    password: string
    displayName: string
    role?: 'ADMIN' | 'AUTHOR' | 'USER'
    bio?: string
  }) {
    const hashedPassword = await hash(data.password, 12)
    
    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: data.role || 'USER'
      }
    })
  },

  // 根据ID获取用户
  async getById(id: string) {
    return await prisma.user.findUnique({
      where: { id }
    })
  },

  // 根据用户名获取用户
  async getByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username }
    })
  },

  // 根据邮箱获取用户
  async getByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  },

  // 验证用户登录
  async authenticate(username: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username }
        ]
      }
    })

    if (!user) return null

    const isValid = await compare(password, user.password)
    if (!isValid) return null

    // 更新最后登录时间
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    return user
  },

  // 更新用户
  async update(id: string, data: any) {
    return await prisma.user.update({
      where: { id },
      data
    })
  },

  // 删除用户
  async delete(id: string) {
    return await prisma.user.delete({
      where: { id }
    })
  }
}

// 文章相关操作
export const postService = {
  // 创建文章
  async create(data: {
    title: string
    excerpt: string
    content: string
    category: string
    tags: string[]
    featuredImage?: string
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    author: string
    authorId: string
    publishDate?: Date
  }) {
    return await prisma.post.create({
      data: {
        ...data,
        status: data.status || 'DRAFT',
        publishDate: data.publishDate || new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      }
    })
  },

  // 获取所有文章
  async getAll() {
    return await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  // 获取已发布的文章
  async getPublished() {
    return await prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      },
      orderBy: { publishDate: 'desc' }
    })
  },

  // 根据ID获取文章
  async getById(id: string) {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
  },

  // 更新文章
  async update(id: string, data: any) {
    return await prisma.post.update({
      where: { id },
      data
    })
  },

  // 删除文章
  async delete(id: string) {
    return await prisma.post.delete({
      where: { id }
    })
  },

  // 增加浏览量
  async incrementViews(id: string) {
    return await prisma.post.update({
      where: { id },
      data: {
        views: {
          increment: 1
        }
      }
    })
  },

  // 搜索文章
  async search(query: string) {
    return await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: [query] } }
        ],
        status: 'PUBLISHED'
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      },
      orderBy: { publishDate: 'desc' }
    })
  },

  // 按分类获取文章
  async getByCategory(category: string) {
    return await prisma.post.findMany({
      where: {
        category,
        status: 'PUBLISHED'
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      },
      orderBy: { publishDate: 'desc' }
    })
  }
}

// 分类相关操作
export const categoryService = {
  // 创建分类
  async create(data: {
    name: string
    description: string
    color: string
  }) {
    return await prisma.category.create({
      data
    })
  },

  // 获取所有分类
  async getAll() {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
  },

  // 根据ID获取分类
  async getById(id: string) {
    return await prisma.category.findUnique({
      where: { id }
    })
  },

  // 更新分类
  async update(id: string, data: any) {
    return await prisma.category.update({
      where: { id },
      data
    })
  },

  // 删除分类
  async delete(id: string) {
    return await prisma.category.delete({
      where: { id }
    })
  }
}

// 评论相关操作
export const commentService = {
  // 创建评论
  async create(data: {
    postId: string
    author: string
    authorId: string
    content: string
  }) {
    return await prisma.comment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      }
    })
  },

  // 获取文章评论
  async getByPost(postId: string) {
    return await prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}

// 会话相关操作
export const sessionService = {
  // 创建会话
  async create(userId: string) {
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7天

    return await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt
      }
    })
  },

  // 根据token获取会话
  async getByToken(token: string) {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!session) return null

    // 检查是否过期
    if (session.expiresAt < new Date()) {
      await this.delete(token)
      return null
    }

    return session
  },

  // 删除会话
  async delete(token: string) {
    return await prisma.session.delete({
      where: { token }
    })
  },

  // 清理过期会话
  async cleanup() {
    return await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })
  }
} 
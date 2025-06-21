'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  Settings,
  Globe,
  Palette,
  Shield,
  Mail,
  Database
} from 'lucide-react'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    // 基本设置
    siteName: '我的博客',
    siteDescription: '分享技术与生活的个人博客',
    siteUrl: 'https://myblog.com',
    adminEmail: 'admin@myblog.com',
    
    // 外观设置
    primaryColor: '#3B82F6',
    enableDarkMode: false,
    showAuthorInfo: true,
    
    // 内容设置
    postsPerPage: 10,
    enableComments: true,
    moderateComments: true,
    
    // SEO设置
    enableSEO: true,
    metaDescription: '我的个人博客，分享技术文章和生活感悟',
    googleAnalytics: '',
    
    // 邮件设置
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    enableEmailNotifications: false
  })

  const tabs = [
    { id: 'general', name: '基本设置', icon: Settings },
    { id: 'appearance', name: '外观设置', icon: Palette },
    { id: 'content', name: '内容设置', icon: Database },
    { id: 'seo', name: 'SEO设置', icon: Globe },
    { id: 'email', name: '邮件设置', icon: Mail },
    { id: 'security', name: '安全设置', icon: Shield },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('保存设置:', settings)
    // 这里处理设置保存逻辑
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-900 mb-2">
            网站名称
          </label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-secondary-900 mb-2">
            网站URL
          </label>
          <input
            type="url"
            name="siteUrl"
            value={settings.siteUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-secondary-900 mb-2">
          网站描述
        </label>
        <textarea
          name="siteDescription"
          value={settings.siteDescription}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-secondary-900 mb-2">
          管理员邮箱
        </label>
        <input
          type="email"
          name="adminEmail"
          value={settings.adminEmail}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-900 mb-2">
          主色调
        </label>
        <input
          type="color"
          name="primaryColor"
          value={settings.primaryColor}
          onChange={handleInputChange}
          className="w-full h-12 border border-secondary-200 rounded-lg cursor-pointer"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-secondary-900">启用深色模式</h3>
            <p className="text-sm text-secondary-600">允许用户切换深色主题</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="enableDarkMode"
              checked={settings.enableDarkMode}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-secondary-900">显示作者信息</h3>
            <p className="text-sm text-secondary-600">在文章页面显示作者信息</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="showAuthorInfo"
              checked={settings.showAuthorInfo}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderContentSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-900 mb-2">
          每页显示文章数
        </label>
        <select
          name="postsPerPage"
          value={settings.postsPerPage}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value={5}>5 篇</option>
          <option value={10}>10 篇</option>
          <option value={15}>15 篇</option>
          <option value={20}>20 篇</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-secondary-900">启用评论</h3>
            <p className="text-sm text-secondary-600">允许读者在文章下发表评论</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="enableComments"
              checked={settings.enableComments}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-secondary-900">评论审核</h3>
            <p className="text-sm text-secondary-600">评论需要管理员审核后才能显示</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="moderateComments"
              checked={settings.moderateComments}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-secondary-900">启用SEO优化</h3>
          <p className="text-sm text-secondary-600">自动生成SEO友好的元标签</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="enableSEO"
            checked={settings.enableSEO}
            onChange={handleInputChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-secondary-900 mb-2">
          默认Meta描述
        </label>
        <textarea
          name="metaDescription"
          value={settings.metaDescription}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-secondary-900 mb-2">
          Google Analytics ID
        </label>
        <input
          type="text"
          name="googleAnalytics"
          value={settings.googleAnalytics}
          onChange={handleInputChange}
          placeholder="G-XXXXXXXXXX"
          className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-900 mb-2">
            SMTP服务器
          </label>
          <input
            type="text"
            name="smtpHost"
            value={settings.smtpHost}
            onChange={handleInputChange}
            placeholder="smtp.gmail.com"
            className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-secondary-900 mb-2">
            SMTP端口
          </label>
          <input
            type="number"
            name="smtpPort"
            value={settings.smtpPort}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-secondary-900 mb-2">
            SMTP用户名
          </label>
          <input
            type="text"
            name="smtpUser"
            value={settings.smtpUser}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-secondary-900 mb-2">
            SMTP密码
          </label>
          <input
            type="password"
            name="smtpPassword"
            value={settings.smtpPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-secondary-900">启用邮件通知</h3>
          <p className="text-sm text-secondary-600">发送新评论和系统通知邮件</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="enableEmailNotifications"
            checked={settings.enableEmailNotifications}
            onChange={handleInputChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">安全提醒</h3>
        <p className="text-sm text-yellow-700">
          定期更新密码，启用双因素认证，保持系统和插件的最新版本。
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-secondary-900 mb-4">安全设置</h3>
        <div className="space-y-4">
          <button className="btn-secondary w-full">
            更改管理员密码
          </button>
          <button className="btn-secondary w-full">
            备份数据库
          </button>
          <button className="btn-secondary w-full">
            查看登录日志
          </button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'appearance':
        return renderAppearanceSettings()
      case 'content':
        return renderContentSettings()
      case 'seo':
        return renderSEOSettings()
      case 'email':
        return renderEmailSettings()
      case 'security':
        return renderSecuritySettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">系统设置</h1>
        <p className="text-secondary-600 mt-2">配置您的博客系统</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                  }`}
                >
                  <tab.icon size={20} className="mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
              {renderTabContent()}
            </div>
            
            <div className="flex justify-end">
              <button type="submit" className="btn-primary inline-flex items-center">
                <Save size={20} className="mr-2" />
                保存设置
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage 
'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const About = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ]

  const skills = [
    { name: '前端开发', description: 'React, Vue, TypeScript' },
    { name: 'UI/UX 设计', description: '用户体验设计' },
    { name: '后端开发', description: 'Node.js, Python' },
    { name: '项目管理', description: '敏捷开发, 团队协作' },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
              关于我
            </h2>
            <p className="text-lg text-secondary-600 mb-6">
              你好！我是一名热爱技术的开发者，专注于前端开发和用户体验设计。
              我喜欢分享技术见解、记录生活感悟，也喜欢探索新的事物。
            </p>
            <p className="text-lg text-secondary-600 mb-8">
              这个博客是我思考和分享的地方，希望能与志同道合的朋友交流学习，
              一起在技术的道路上不断进步。
            </p>
            
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 text-secondary-600 hover:text-primary-600"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-6">
                技能专长
              </h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-secondary-700">{skill.name}</span>
                    </div>
                    <p className="text-sm text-secondary-500 mb-3">{skill.description}</p>
                    <div className="w-full bg-secondary-200 rounded-full h-2">
                      <div className="bg-primary-600 h-2 rounded-full transition-all duration-300 group-hover:bg-primary-700" style={{ width: '85%' }}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 
import fs from 'node:fs'
import path from 'node:path'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

// 获取 public/posts/notes 目录下的所有文件
const postsDirectory = path.join(process.cwd(), 'public', 'posts', 'notes')
let fileNames = fs.readdirSync(postsDirectory)

// 生成对应的路由
let routes = fileNames.map((fileName) => {
  // 移除文件扩展名
  const route = fileName.replace(/\.md$/, '')
  return `/posts/notes/${route}`
})

// 获取 public/posts/blogs 目录下的所有文件
const blogDirectory = path.join(process.cwd(), 'public', 'posts', 'blogs')
fileNames = fs.readdirSync(blogDirectory)

const blogRoutes = fileNames.map((fileName) => {
  // 移除文件扩展名
  const route = fileName.replace(/\.md$/, '')
  return `/posts/blogs/${route}`
})

routes = ['/', 'noteList', 'blogList', ...routes, ...blogRoutes]

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@vue-macros/nuxt',
    '@nuxt/content',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/styles/github-markdown.css',
    '@/styles/github-markdown-light.css',
    '@/styles/github-markdown-dark.css',

  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      autoSubfolderIndex: true,
      concurrency: 1,
      interval: 0,
      failOnError: false,
      crawlLinks: false,
      retries: 3,
      retryDelay: 500,
      routes,
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },
})

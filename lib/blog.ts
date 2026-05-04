import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  keywords: string[]
  readTime: string
  author: string
  image: string
  imageAlt: string
  content: string
  htmlContent?: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      category: data.category || '',
      tags: data.tags || [],
      keywords: data.keywords || [],
      readTime: data.readTime || '5 min read',
      author: data.author || 'WebToolkit Pro Team',
      image: data.image || '',
      imageAlt: data.imageAlt || data.title || '',
      content,
    } as BlogPost
  })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  const result = await remark().use(html, { sanitize: false }).process(content)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    category: data.category || '',
    tags: data.tags || [],
    keywords: data.keywords || [],
    readTime: data.readTime || '5 min read',
    author: data.author || 'WebToolkit Pro Team',
    image: data.image || '',
    imageAlt: data.imageAlt || data.title || '',
    content,
    htmlContent: result.toString(),
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

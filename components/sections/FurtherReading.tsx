'use client'

import React from 'react'
import Link from 'next/link'
import { BookOpen, ArrowRight, Zap } from 'lucide-react'
import { BlogPost } from '@/lib/blog'

interface FurtherReadingProps {
  posts: BlogPost[]
}

export default function FurtherReading({ posts }: FurtherReadingProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Further Reading</h2>
          <p className="text-sm text-gray-500 dark:text-[#8A9BBE]">Expert guides and technical research related to this tool.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] p-6 rounded-[20px] hover:border-blue-500/30 dark:hover:border-[#00D4B4]/30 transition-all h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-widest font-mono">
                  {post.category}
                </span>
                <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-[#4A6080] uppercase tracking-widest">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-[#00D4B4] transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 line-clamp-2 flex-grow">
                {post.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-[#1E2D47]/30">
                <span className="text-[10px] font-bold text-blue-600 dark:text-[#00D4B4] flex items-center gap-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  Read Full Post <ArrowRight className="w-3 h-3" />
                </span>
                <Zap className="w-3 h-3 text-gray-300 dark:text-[#1E2D47] group-hover:text-yellow-500 transition-colors" fill="currentColor" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

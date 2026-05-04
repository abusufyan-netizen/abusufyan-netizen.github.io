import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'Developer Blog - Web Development Tips & Tutorials | WebToolkit Pro',
  description: 'Expert web development tips, tutorials, and guides. Learn about developer tools, JSON formatting, password security, SEO optimization, CSS best practices, and more.',
  keywords: 'web development blog, developer tutorials, coding tips, programming guides, web development best practices',
  alternates: {
    canonical: 'https://webtoolkit-pro.netlify.app/blog/',
  },
  openGraph: {
    title: 'Developer Blog - WebToolkit Pro',
    description: 'Expert web development tips, tutorials, and guides for modern developers.',
    url: 'https://webtoolkit-pro.netlify.app/blog/',
    siteName: 'WebToolkit Pro',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Blog - WebToolkit Pro',
    description: 'Expert web development tips, tutorials, and guides for modern developers.',
  },
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
    'content-language': 'en-US',
  },
}

const categoryColors: { [k: string]: string } = {
  'Tools': 'bg-blue-100 text-blue-700 border-blue-200',
  'Tutorials': 'bg-purple-100 text-purple-700 border-purple-200',
  'Security': 'bg-red-100 text-red-700 border-red-200',
  'SEO': 'bg-green-100 text-green-700 border-green-200',
  'CSS': 'bg-orange-100 text-orange-700 border-orange-200',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-4 border border-blue-100">
            📝 Developer Blog
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Tips, Tutorials &amp; Guides
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Expert web development insights to level up your skills. From security best practices to CSS mastery.
          </p>
        </div>

        {/* Ad Slot - Top */}
        <div className="max-w-3xl mx-auto mb-12 min-h-[90px] flex items-center justify-center">
          {/* AdSense Leaderboard */}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              id={`blog-card-${post.slug}`}
              className="group block"
            >
              <article className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Category & Read Time */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryColors[post.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 mb-5 leading-relaxed flex-grow text-sm">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Ad Slot - Bottom */}
        <div className="max-w-3xl mx-auto mt-16 min-h-[250px] flex items-center justify-center">
          {/* AdSense Rectangle */}
        </div>

        {/* JSON-LD Structured Data for Blog listing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              'name': 'WebToolkit Pro Developer Blog',
              'description': 'Expert web development tips, tutorials, and guides.',
              'url': 'https://webtoolkit-pro.netlify.app/blog/',
              'publisher': {
                '@type': 'Organization',
                'name': 'WebToolkit Pro',
                'url': 'https://webtoolkit-pro.netlify.app',
              },
              'blogPost': posts.map((post) => ({
                '@type': 'BlogPosting',
                'headline': post.title,
                'description': post.description,
                'datePublished': post.date,
                'author': {
                  '@type': 'Organization',
                  'name': post.author,
                },
                'url': `https://webtoolkit-pro.netlify.app/blog/${post.slug}/`,
              })),
            }),
          }}
        />
      </div>
    </div>
  )
}

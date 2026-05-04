import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

// Generate static params for all blog posts
export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Dynamic SEO metadata for each post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: `${post.title} | WebToolkit Pro Blog`,
    description: post.description,
    keywords: post.keywords.join(', '),
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://abusufyan-netizen.github.io/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://abusufyan-netizen.github.io/blog/${post.slug}/`,
      siteName: 'WebToolkit Pro',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    other: {
      'geo.region': 'US',
      'geo.placename': 'United States',
      'content-language': 'en-US',
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags.join(', '),
    },
  }
}

const categoryColors: { [k: string]: string } = {
  'Tools': 'bg-blue-100 text-blue-700 border-blue-200',
  'Tutorials': 'bg-purple-100 text-purple-700 border-purple-200',
  'Security': 'bg-red-100 text-red-700 border-red-200',
  'SEO': 'bg-green-100 text-green-700 border-green-200',
  'CSS': 'bg-orange-100 text-orange-700 border-orange-200',
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  // Get related posts (same category, excluding current)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-blue-600 transition-colors" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/blog/" className="hover:text-blue-600 transition-colors" itemProp="item">
                <span itemProp="name">Blog</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600 font-medium" itemProp="name">{post.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${categoryColors[post.category] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
              {post.category}
            </span>
            <span className="text-sm text-gray-400">{post.readTime}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-100">
            <time dateTime={post.date} itemProp="datePublished">
              {formattedDate}
            </time>
            <span>•</span>
            <span itemProp="author">{post.author}</span>
          </div>
        </header>

        {/* Ad Slot - Top of Article */}
        <div className="mb-10 min-h-[90px] flex items-center justify-center">
          {/* AdSense In-Article Top */}
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5
            prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-pink-600
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-ul:text-gray-600 prose-ol:text-gray-600
            prose-li:mb-2
            prose-table:border-collapse
            prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:border prose-th:border-gray-200
            prose-td:p-3 prose-td:border prose-td:border-gray-200
            prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
            prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
        />

        {/* Tags Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Keywords (hidden, for SEO) */}
        <div className="sr-only" aria-hidden="true">
          <p>Keywords: {post.keywords.join(', ')}</p>
        </div>

        {/* Ad Slot - Bottom of Article */}
        <div className="mt-12 min-h-[250px] flex items-center justify-center">
          {/* AdSense In-Article Bottom */}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-100" aria-label="Related articles">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Continue Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}/`}
                  className="group block"
                >
                  <article className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[related.category] || 'bg-gray-100 text-gray-700'}`}>
                      {related.category}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-3 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <span className="text-xs text-gray-400">{related.readTime}</span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            ← Back to All Articles
          </Link>
        </div>

        {/* JSON-LD Structured Data - Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              'headline': post.title,
              'description': post.description,
              'datePublished': post.date,
              'dateModified': post.date,
              'author': {
                '@type': 'Organization',
                'name': post.author,
                'url': 'https://abusufyan-netizen.github.io',
              },
              'publisher': {
                '@type': 'Organization',
                'name': 'WebToolkit Pro',
                'url': 'https://abusufyan-netizen.github.io',
              },
              'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': `https://abusufyan-netizen.github.io/blog/${post.slug}/`,
              },
              'keywords': post.keywords.join(', '),
              'articleSection': post.category,
              'inLanguage': 'en-US',
              'url': `https://abusufyan-netizen.github.io/blog/${post.slug}/`,
            }),
          }}
        />

        {/* JSON-LD Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'Home',
                  'item': 'https://abusufyan-netizen.github.io',
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': 'Blog',
                  'item': 'https://abusufyan-netizen.github.io/blog/',
                },
                {
                  '@type': 'ListItem',
                  'position': 3,
                  'name': post.title,
                  'item': `https://abusufyan-netizen.github.io/blog/${post.slug}/`,
                },
              ],
            }),
          }}
        />
      </div>
    </article>
  )
}

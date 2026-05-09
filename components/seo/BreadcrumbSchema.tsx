'use client'

import React from 'react'

interface BreadcrumbSchemaProps {
  name: string
  slug: string
  category?: string
}

export default function BreadcrumbSchema({ name, slug, category }: BreadcrumbSchemaProps) {
  const cleanSlug = slug.replace(/^tools\//, '').replace(/\/$/, '')
  const itemListElement: any[] = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://wtkpro.site'
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Tools',
      'item': 'https://wtkpro.site/tools'
    }
  ]

  if (category) {
    itemListElement.push({
      '@type': 'ListItem',
      'position': 3,
      'name': category,
      'item': `https://wtkpro.site/tools/?category=${encodeURIComponent(category)}`
    })
  }

  itemListElement.push({
    '@type': 'ListItem',
    'position': itemListElement.length + 1,
    'name': name,
    'item': `https://wtkpro.site/tools/${cleanSlug}/`
  })

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

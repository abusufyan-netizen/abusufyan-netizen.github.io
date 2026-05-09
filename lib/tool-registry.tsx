import dynamic from 'next/dynamic'
import React from 'react'
import ToolSkeleton from '@/components/tools/ToolSkeleton'

const dynamicOptions = {
  loading: () => <ToolSkeleton />,
  ssr: false // Most tools are client-side only
}

export const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'json-formatter': dynamic(() => import('@/components/tools/instances/JsonFormatter'), dynamicOptions),
  'password-generator': dynamic(() => import('@/components/tools/instances/PasswordGenerator'), dynamicOptions),
  'pinterest-downloader': dynamic(() => import('@/components/tools/instances/PinterestDownloader'), dynamicOptions),
  'what-is-my-ip': dynamic(() => import('@/components/tools/instances/WhatIsMyIP'), dynamicOptions),
  'js-minifier': dynamic(() => import('@/components/tools/instances/JsMinifier'), dynamicOptions),
  'meta-tag-generator': dynamic(() => import('@/components/tools/instances/MetaTagGenerator'), dynamicOptions),
  'uuid-v7-generator': dynamic(() => import('@/components/tools/instances/UuidV7Generator'), dynamicOptions),
  'uuid-generator': dynamic(() => import('@/components/tools/instances/UuidGenerator'), dynamicOptions),
  'lorem-ipsum': dynamic(() => import('@/components/tools/instances/LoremIpsum'), dynamicOptions),
  'robots-generator': dynamic(() => import('@/components/tools/instances/RobotsGenerator'), dynamicOptions),
  'hash-generator': dynamic(() => import('@/components/tools/instances/HashGenerator'), dynamicOptions),
  'sitemap-validator': dynamic(() => import('@/components/tools/instances/SitemapValidator'), dynamicOptions),
  'redirect-checker': dynamic(() => import('@/components/tools/instances/RedirectChecker'), dynamicOptions),
  'schema-generator': dynamic(() => import('@/components/tools/instances/SchemaGenerator'), dynamicOptions),
  'api-latency-calculator': dynamic(() => import('@/components/tools/instances/ApiLatencyCalculator'), dynamicOptions),
  'adsense-calculator': dynamic(() => import('@/components/tools/instances/AdSenseCalculator'), dynamicOptions),
  'base64-encoder': dynamic(() => import('@/components/tools/instances/Base64Encoder'), dynamicOptions),
  'binary-converter': dynamic(() => import('@/components/tools/instances/BinaryConverter'), dynamicOptions),
  'case-converter': dynamic(() => import('@/components/tools/instances/CaseConverter'), dynamicOptions),
  'css-unit-converter': dynamic(() => import('@/components/tools/instances/CssUnitConverter'), dynamicOptions),
  'url-encoder': dynamic(() => import('@/components/tools/instances/UrlEncoder'), dynamicOptions),
  'cdn-readiness-tester': dynamic(() => import('@/components/tools/instances/CdnReadinessTester'), dynamicOptions),
  'color-contrast': dynamic(() => import('@/components/tools/instances/ColorContrast'), dynamicOptions),
  'color-picker': dynamic(() => import('@/components/tools/instances/ColorPicker'), dynamicOptions),
  'html-encoder': dynamic(() => import('@/components/tools/instances/HtmlEncoder'), dynamicOptions),
  'timestamp-converter': dynamic(() => import('@/components/tools/instances/TimestampConverter'), dynamicOptions),
  'core-web-vitals-guide': dynamic(() => import('@/components/tools/instances/CoreWebVitalsGuide'), dynamicOptions),
  'markdown-converter': dynamic(() => import('@/components/tools/instances/MarkdownConverter'), dynamicOptions),
  'markdown-previewer': dynamic(() => import('@/components/tools/instances/MarkdownPreviewer'), dynamicOptions),
  'robots-txt-templates': dynamic(() => import('@/components/tools/instances/RobotsTemplates'), dynamicOptions),
  'seo-audit-checklist': dynamic(() => import('@/components/tools/instances/SeoAuditChecklist'), dynamicOptions),
  'social-preview-tester': dynamic(() => import('@/components/tools/instances/SocialPreviewTester'), dynamicOptions),
  'word-counter': dynamic(() => import('@/components/tools/instances/WordCounter'), dynamicOptions),
  'question-explorer': dynamic(() => import('@/components/tools/instances/QuestionExplorer'), dynamicOptions),
}

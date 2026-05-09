'use client'
import React, { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Globe, Zap, Search, Shield, FileCode, Check } from 'lucide-react'

const checklistData = [
  { category: 'Indexing', icon: Globe, items: [
    { id: 'xml-sitemap', text: 'XML Sitemap is present', detail: 'Ensures Google can find all pages.' },
    { id: 'robots-txt', text: 'Robots.txt is optimized', detail: 'Prevents crawling of sensitive areas.' },
    { id: 'canonical-tags', text: 'Canonical tags present', detail: 'Prevents duplicate content.' }
  ]},
  { category: 'Speed', icon: Zap, items: [
    { id: 'lcp-check', text: 'LCP under 2.5s', detail: 'Measures loading speed.' },
    { id: 'inp-check', text: 'INP under 200ms', detail: 'Measures responsiveness.' },
    { id: 'cls-check', text: 'CLS under 0.1', detail: 'Measures visual stability.' }
  ]},
  { category: 'On-Page', icon: Search, items: [
    { id: 'title-length', text: 'Titles (50-60 chars)', detail: 'Optimal for snippets.' },
    { id: 'meta-desc', text: 'Meta descriptions (120-160)', detail: 'Drives CTR.' },
    { id: 'h1-hierarchy', text: 'Single H1 & H2-H3 logic', detail: 'Content structure.' }
  ]},
  { category: 'Security', icon: Shield, items: [
    { id: 'https-check', text: 'Served over HTTPS', detail: 'Core ranking signal.' },
    { id: 'mobile-friendly', text: 'Mobile-Friendly test', detail: 'Mobile-first indexing.' },
    { id: 'json-ld', text: 'Structured Data active', detail: 'Enables Rich Snippets.' }
  ]}
]

export default function SeoAuditChecklist() {
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('wtk_seo_checklist')
    if (saved) setCheckedItems(JSON.parse(saved))
  }, [])

  const toggleItem = (id: string) => {
    const newItems = checkedItems.includes(id) ? checkedItems.filter(i => i !== id) : [...checkedItems, id]
    setCheckedItems(newItems)
    localStorage.setItem('wtk_seo_checklist', JSON.stringify(newItems))
  }

  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0)
  const progress = Math.round((checkedItems.length / totalItems) * 100)

  const copyAsMarkdown = () => {
    let md = '# Technical SEO Audit Checklist\n\n'
    checklistData.forEach(cat => {
      md += `## ${cat.category}\n`
      cat.items.forEach(item => md += `${checkedItems.includes(item.id) ? '[x]' : '[ ]'} ${item.text}\n`)
      md += '\n'
    })
    navigator.clipboard.writeText(md)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-black text-blue-600">{progress}%</div>
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Progress</div>
        </div>
        <button onClick={copyAsMarkdown} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 font-bold rounded-xl border border-gray-200 shadow-sm transition-all text-sm">
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <FileCode className="w-5 h-5" />} {copied ? 'Copied' : 'Markdown'}
        </button>
      </div>
      <div className="w-full h-4 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden mb-12">
        <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="space-y-8">
        {checklistData.map((cat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-gray-50/50 dark:bg-slate-900/50 flex items-center gap-3">
              <cat.icon className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{cat.category}</h2>
            </div>
            <div className="p-6 space-y-4">
              {cat.items.map((item) => (
                <div key={item.id} onClick={() => toggleItem(item.id)} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer transition-all border border-transparent hover:border-gray-100 group">
                  <div className="mt-1 shrink-0">{checkedItems.includes(item.id) ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <Circle className="w-6 h-6 text-gray-300 group-hover:text-blue-500" />}</div>
                  <div>
                    <h3 className={`font-bold transition-colors ${checkedItems.includes(item.id) ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>{item.text}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

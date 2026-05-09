'use client'
import React, { useState } from 'react'
import { Copy, CheckCircle2, Cpu, Layout, ShoppingCart, Terminal } from 'lucide-react'

const templates = [
  { id: 'nextjs', name: 'Next.js (App Router)', icon: Cpu, content: `User-agent: *\nAllow: /\nDisallow: /_next/\nDisallow: /404/\nDisallow: /api/\n\n# Block AI\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: https://yourdomain.com/sitemap.xml` },
  { id: 'wordpress', name: 'WordPress Advanced', icon: Layout, content: `User-agent: *\nAllow: /\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nDisallow: /wp-login.php\nDisallow: /wp-content/plugins/\n\nSitemap: https://yourdomain.com/sitemap_index.xml` },
  { id: 'ecommerce', name: 'E-commerce (Shopify)', icon: ShoppingCart, content: `User-agent: *\nAllow: /\nDisallow: /cart/\nDisallow: /checkout/\nDisallow: /account/\nDisallow: /search/\nDisallow: /*?*filter*\n\nSitemap: https://yourdomain.com/sitemap_products.xml` },
  { id: 'minimal', name: 'Strict Minimal', icon: Terminal, content: `User-agent: *\nAllow: /\nDisallow: /temp/\nDisallow: /staging/\n\nUser-agent: Googlebot\nAllow: /\n\nSitemap: https://yourdomain.com/sitemap.xml` }
]

export default function RobotsTemplates() {
  const [activeTab, setActiveTab] = useState('nextjs')
  const [copied, setCopied] = useState(false)
  const activeTemplate = templates.find(t => t.id === activeTab) || templates[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTemplate.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-3">
        {templates.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full text-left p-5 rounded-2xl border transition-all ${activeTab === t.id ? 'bg-white dark:bg-slate-900 border-orange-200 shadow-md' : 'bg-transparent border-transparent hover:bg-white/50'}`}>
            <div className="flex items-center gap-3">
              <t.icon className={`w-5 h-5 ${activeTab === t.id ? 'text-orange-600' : 'text-gray-400'}`} />
              <div className={`font-bold text-sm ${activeTab === t.id ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{t.name}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/50">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Robots.txt Config</span>
            <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-xs font-bold rounded-xl border border-gray-200 shadow-sm transition-all">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="p-8">
            <pre className="bg-slate-950 text-slate-200 p-8 rounded-2xl text-sm font-mono leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
              {activeTemplate.content}
            </pre>
            <p className="mt-4 text-xs text-amber-600 font-medium italic">Replace yourdomain.com with your actual URL.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import React, { useState } from 'react'
import { Search, Facebook, Twitter, Linkedin, RefreshCw, Smartphone, Monitor } from 'lucide-react'

export default function SocialPreviewTester() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState({ title: 'WebToolkit Pro', description: 'Premium developer tools.', image: 'https://wtkpro.site/og-image.png', siteName: 'WebToolkit Pro', url: 'https://wtkpro.site' })
  const [activeView, setActiveView] = useState<'mobile' | 'desktop'>('mobile')

  const handleFetch = async () => {
    if (!url) return
    setLoading(true)
    try {
      const target = url.startsWith('http') ? url : `https://${url}`
      const res = await fetch(`/api/fetch-meta?url=${encodeURIComponent(target)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setMetadata({ title: data.title || '', description: data.description || '', image: data.image || '', siteName: data.siteName || new URL(target).hostname, url: target })
    } catch (error) { alert('Failed to fetch meta.') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200 shadow-sm">
          <button onClick={() => setActiveView('mobile')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}><Smartphone className="w-4 h-4" /> Mobile</button>
          <button onClick={() => setActiveView('desktop')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500'}`}><Monitor className="w-4 h-4" /> Desktop</button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="url" placeholder="https://example.com" className="flex-grow px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 outline-none dark:text-white" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button onClick={handleFetch} disabled={loading} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />} Fetch
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
              <textarea rows={2} className="w-full p-4 bg-gray-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white text-sm" value={metadata.title} onChange={(e) => setMetadata(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
              <textarea rows={4} className="w-full p-4 bg-gray-50 dark:bg-slate-800 rounded-xl outline-none dark:text-white text-sm" value={metadata.description} onChange={(e) => setMetadata(p => ({ ...p, description: e.target.value }))} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-8">
            {/* Simple FB Preview */}
            <div className="space-y-4">
              <div className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2"><Facebook className="w-4 h-4" /> Facebook</div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 overflow-hidden max-w-[500px]">
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-slate-800">{metadata.image && <img src={metadata.image} className="w-full h-full object-cover" alt="" />}</div>
                <div className="p-4 bg-gray-50 dark:bg-slate-900">
                  <div className="text-xs text-gray-500 uppercase mb-1">{metadata.siteName}</div>
                  <div className="text-lg font-bold dark:text-white line-clamp-2">{metadata.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-2">{metadata.description}</div>
                </div>
              </div>
            </div>
            {/* Simple Twitter Preview */}
            <div className="space-y-4">
              <div className="text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2"><Twitter className="w-4 h-4" /> Twitter / X</div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 overflow-hidden max-w-[500px]">
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-slate-800">{metadata.image && <img src={metadata.image} className="w-full h-full object-cover" alt="" />}</div>
                <div className="p-4"><div className="text-sm font-bold dark:text-white">{metadata.title}</div><div className="text-sm text-gray-500 line-clamp-2">{metadata.description}</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

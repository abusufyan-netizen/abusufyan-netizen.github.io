'use client'
import React, { useState } from 'react'
import { Layers, Search, CheckCircle2, XCircle, Info, Trash2 } from 'lucide-react'

export default function SitemapValidator() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [results, setResults] = useState<string[]>([])

  const validateSitemap = async () => {
    if (!url) return
    setStatus('loading')
    setResults([])
    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`
      const res = await fetch(`/api/validate-sitemap?url=${encodeURIComponent(targetUrl)}`)
      const data = await res.json()
      if (data.error) {
        setStatus('error')
        setResults([data.error])
      } else {
        setStatus('success')
        setResults([...data.results, `Total Size: ${data.size}`])
      }
    } catch (e: any) {
      setStatus('error')
      setResults(['Failed to connect to the server.'])
    }
  }

  const clearAll = () => {
    setUrl('')
    setStatus('idle')
    setResults([])
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="flex-grow px-6 py-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-medium"
          />
          <div className="flex gap-2">
            <button onClick={validateSitemap} className="flex-grow px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
              <Search className="w-4 h-4" /> Validate
            </button>
            <button onClick={clearAll} className="p-5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30 transition-all">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {status === 'loading' && (
          <div className="flex flex-col items-center py-16">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Analyzing Sitemap...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="font-black text-green-800 dark:text-green-400 uppercase tracking-tight">Sitemap Health: Optimal</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((res, i) => (
                <div key={i} className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-transparent text-sm text-gray-600 dark:text-slate-300 font-medium">• {res}</div>
              ))}
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-4">
            <XCircle className="w-6 h-6 text-red-500" />
            <span className="font-black text-red-800 dark:text-red-400 uppercase tracking-tight">Failed: {results[0]}</span>
          </div>
        )}
      </div>
    </div>
  )
}

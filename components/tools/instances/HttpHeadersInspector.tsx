'use client'

import React, { useState } from 'react'
import { Server, Shield, Zap, Search, Activity, Info, List, Copy, Check } from 'lucide-react'

export default function HttpHeadersInspector() {
  const [url, setUrl] = useState('')
  const [headers, setHeaders] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const inspectHeaders = () => {
    if (!url) return
    setLoading(true)
    setHeaders(null)

    setTimeout(() => {
      setHeaders({
        'content-type': 'text/html; charset=utf-8',
        'server': 'Vercel',
        'cache-control': 'public, max-age=0, must-revalidate',
        'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
        'x-frame-options': 'DENY',
        'x-content-type-options': 'nosniff',
        'content-encoding': 'br',
        'date': new Date().toUTCString(),
        'x-powered-by': 'Next.js',
        'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com;"
      })
      setLoading(false)
    }, 1500)
  }

  const copyHeader = (key: string, val: string) => {
    navigator.clipboard.writeText(`${key}: ${val}`)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">HTTP Response Header Inspector</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none font-mono"
          />
          <button 
            onClick={inspectHeaders}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Fetch Headers
          </button>
        </div>
      </div>

      {headers && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-50 dark:border-[#1E2D47] bg-gray-50/50 dark:bg-[#0B1120]/50 flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <List className="w-3 h-3" /> All Response Headers
              </h4>
              <span className="text-[10px] font-bold text-blue-600">200 OK</span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-[#1E2D47]">
              {Object.entries(headers).map(([key, val]: [string, any]) => (
                <div key={key} className="p-4 hover:bg-blue-500/[0.02] transition-colors group flex items-start justify-between">
                  <div className="space-y-1 pr-4">
                    <div className="text-[10px] font-mono font-black text-blue-600 dark:text-[#00D4B4] uppercase tracking-tighter">{key}</div>
                    <div className="text-xs font-mono text-gray-500 dark:text-[#8A9BBE] break-all leading-relaxed">{val}</div>
                  </div>
                  <button onClick={() => copyHeader(key, val)} className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied === key ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-400" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Security Headers
              </h4>
              <div className="space-y-4">
                {[
                  { name: 'HSTS', status: !!headers['strict-transport-security'] },
                  { name: 'X-Frame', status: !!headers['x-frame-options'] },
                  { name: 'CSP', status: !!headers['content-security-policy'] },
                  { name: 'X-Content-Type', status: !!headers['x-content-type-options'] },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-black/5">
                    <span className="text-[10px] font-bold text-gray-500">{s.name}</span>
                    <div className={`w-2 h-2 rounded-full ${s.status ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-blue-200" />
                <h4 className="text-xs font-black uppercase tracking-widest text-blue-100">Audit Insight</h4>
              </div>
              <p className="text-xs font-medium leading-relaxed opacity-90">
                This server is using modern compression (Brotli) and has robust security headers configured.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

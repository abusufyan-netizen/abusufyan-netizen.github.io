'use client'
import React, { useState } from 'react'
import { Search, CheckCircle2, RefreshCw, Terminal } from 'lucide-react'

export default function CdnReadinessTester() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleTest = async () => {
    if (!url) return
    setLoading(true)
    setResults(null)
    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`
      const res = await fetch(`/api/proxy-headers?url=${encodeURIComponent(targetUrl)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      const h = data.headers
      const analyzedHeaders = [
        { name: 'X-Cache / CF-Cache', value: h['x-cache'] || h['cf-cache-status'] || h['x-vercel-cache'] || 'MISS/NONE', status: (h['x-cache']?.includes('HIT') || h['cf-cache-status'] === 'HIT' || h['x-vercel-cache'] === 'HIT') ? 'optimal' : 'warning' },
        { name: 'Content-Encoding', value: h['content-encoding'] || 'identity', status: (h['content-encoding'] === 'br' || h['content-encoding'] === 'gzip') ? 'optimal' : 'warning' },
        { name: 'Server', value: h['server'] || 'Unknown', status: h['server'] ? 'optimal' : 'warning' },
        { name: 'Latency', value: `${data.latency}ms`, status: data.latency < 200 ? 'optimal' : 'warning' }
      ]

      let score = 20
      if (h['x-cache']?.includes('HIT') || h['cf-cache-status'] === 'HIT' || h['x-vercel-cache'] === 'HIT') score += 30
      if (h['content-encoding'] === 'br') score += 25
      if (h['content-encoding'] === 'gzip') score += 15
      if (h['server']) score += 25
      if (data.latency < 150) score += 10

      setResults({
        cdn: h['server'] || 'Unknown Edge',
        headers: analyzedHeaders,
        score: Math.min(score, 100),
        recommendation: score > 80 ? 'Excellent! Optimized for edge delivery.' : 'Optimization required. Consider enabling a CDN and Brotli.'
      })
    } catch (error) {
      alert('Failed to analyze URL.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="url" placeholder="https://example.com" className="flex-grow px-6 py-4 rounded-2xl bg-gray-50 dark:bg-slate-800 outline-none dark:text-white" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button onClick={handleTest} disabled={loading} className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />} Verify
          </button>
        </div>
      </div>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-slate-950 p-8 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-black text-blue-500 mb-2">{results.score}%</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Readiness Score</div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Terminal className="w-5 h-5 text-blue-600" /> Headers</h3>
              <div className="space-y-4">
                {results.headers.map((h: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${h.status === 'optimal' ? 'text-green-500' : 'text-amber-500'}`} />
                      <span className="text-sm font-bold dark:text-white">{h.name}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-500">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 text-sm text-blue-700 dark:text-blue-400">{results.recommendation}</div>
          </div>
        </div>
      )}
    </div>
  )
}

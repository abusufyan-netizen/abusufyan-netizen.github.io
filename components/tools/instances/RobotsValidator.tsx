'use client'

import React, { useState } from 'react'
import { FileText, CheckCircle, AlertTriangle, Search, Trash2, Info } from 'lucide-react'

export default function RobotsValidator() {
  const [content, setContent] = useState('')
  const [results, setResults] = useState<{ type: 'error' | 'warning' | 'success'; message: string; line?: number }[]>([])

  const validate = () => {
    const lines = content.split('\n')
    const findings: typeof results = []
    let hasUserAgent = false

    lines.forEach((line, i) => {
      const clean = line.trim()
      if (!clean || clean.startsWith('#')) return

      const [key, ...val] = clean.split(':')
      const value = val.join(':').trim()

      if (key.toLowerCase() === 'user-agent') {
        hasUserAgent = true
      }

      if (!['user-agent', 'disallow', 'allow', 'sitemap', 'crawl-delay'].includes(key.toLowerCase())) {
        findings.push({
          type: 'error',
          message: `Unknown directive: "${key}"`,
          line: i + 1
        })
      }

      if (['disallow', 'allow'].includes(key.toLowerCase()) && !value.startsWith('/')) {
        findings.push({
          type: 'warning',
          message: `Path should typically start with a slash (/)`,
          line: i + 1
        })
      }
    })

    if (!hasUserAgent && content.trim()) {
      findings.push({
        type: 'error',
        message: 'Missing "User-agent" directive. Every robots.txt must define at least one agent (e.g., User-agent: *)'
      })
    }

    if (findings.length === 0 && content.trim()) {
      findings.push({
        type: 'success',
        message: 'Robots.txt is syntactically valid and REP compliant.'
      })
    }

    setResults(findings)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Robots.txt Syntax Validator</h3>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`User-agent: *\nDisallow: /admin/\nSitemap: https://example.com/sitemap.xml`}
          className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono outline-none"
        />

        <button 
          onClick={validate}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" /> Validate Directives
        </button>
      </div>

      <div className="space-y-4">
        {results.map((res, i) => (
          <div key={i} className={`p-6 rounded-2xl border flex items-center gap-4 ${
            res.type === 'error' ? 'bg-red-500/5 border-red-500/10 text-red-600' :
            res.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/10 text-yellow-600' :
            'bg-green-500/5 border-green-500/10 text-green-600'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              res.type === 'error' ? 'bg-red-500/10' :
              res.type === 'warning' ? 'bg-yellow-500/10' :
              'bg-green-500/10'
            }`}>
              {res.type === 'error' ? <AlertTriangle className="w-5 h-5" /> :
               res.type === 'warning' ? <Info className="w-5 h-5" /> :
               <CheckCircle className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">
                {res.type} {res.line && `on Line ${res.line}`}
              </h4>
              <p className="text-xs font-bold leading-relaxed">{res.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

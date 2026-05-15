'use client'

import React, { useState } from 'react'
import { Code, CheckCircle, AlertTriangle, Search, Trash2, Database, ShieldCheck, Info } from 'lucide-react'

export default function SchemaValidatorPro() {
  const [content, setContent] = useState('')
  const [results, setResults] = useState<{ type: 'error' | 'warning' | 'success'; message: string; field?: string }[]>([])

  const validate = () => {
    const findings: typeof results = []
    
    try {
      const data = JSON.parse(content)
      
      if (data['@context'] !== 'https://schema.org') {
        findings.push({
          type: 'warning',
          message: 'Missing or non-standard @context. Recommended: "https://schema.org"',
          field: '@context'
        })
      }

      if (!data['@type']) {
        findings.push({
          type: 'error',
          message: 'Missing @type declaration. Search engines need to know what entity this describes.',
          field: '@type'
        })
      }

      // Check common types
      const type = data['@type']
      if (type === 'Organization' && !data.name) {
        findings.push({ type: 'error', message: 'Organization must have a "name" property.', field: 'name' })
      }
      if (type === 'WebSite' && !data.url) {
        findings.push({ type: 'error', message: 'WebSite must have a "url" property.', field: 'url' })
      }

    } catch (e) {
      findings.push({ type: 'error', message: 'Invalid JSON format. Please ensure your schema is properly quoted and balanced.' })
    }

    if (findings.length === 0 && content.trim()) {
      findings.push({ type: 'success', message: 'JSON-LD Schema is syntactically valid and contains core required fields.' })
    }

    setResults(findings)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Structured Data Validator</h3>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Organization",\n  "name": "WebToolkit Pro",\n  "url": "https://webtoolkit.pro"\n}`}
          className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono outline-none"
        />

        <button 
          onClick={validate}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" /> Validate Schema
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
                {res.type} {res.field && `in [${res.field}]`}
              </h4>
              <p className="text-xs font-bold leading-relaxed">{res.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

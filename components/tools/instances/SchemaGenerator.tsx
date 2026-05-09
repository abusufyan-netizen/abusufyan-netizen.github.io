'use client'
import React, { useState } from 'react'
import { Code, Copy, CheckCircle2, RefreshCw, Trash2 } from 'lucide-react'

export default function SchemaGenerator() {
  const [type, setType] = useState('Organization')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [copied, setCopied] = useState(false)

  const generateSchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      'name': name,
      'url': url,
      'description': description
    }
    return JSON.stringify(schema, null, 2)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSchema())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setName('')
    setUrl('')
    setDescription('')
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Parameters
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Schema Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white font-bold">
                  <option>Organization</option>
                  <option>WebSite</option>
                  <option>LocalBusiness</option>
                  <option>Person</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Entity Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., WebToolkit Pro" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Primary URL</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Overview..." rows={3} className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white resize-none" />
              </div>
              <button onClick={clearAll} className="w-full py-4 text-red-500 font-bold border border-red-100 dark:border-red-900/30 rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"><Trash2 className="w-4 h-4" /> Clear</button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">JSON-LD Block</h2>
              <button onClick={copyToClipboard} className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="flex-grow p-6 bg-gray-900 dark:bg-slate-950 rounded-3xl border border-gray-800 text-xs font-mono text-emerald-400 overflow-auto">{generateSchema()}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

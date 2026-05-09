'use client'
import React, { useState } from 'react'
import { FileText, Copy, Download, RefreshCw, CheckCircle2, Trash2 } from 'lucide-react'

export default function RobotsGenerator() {
  const [allowAll, setAllowAll] = useState(true)
  const [sitemap, setSitemap] = useState('')
  const [customRules, setCustomRules] = useState('')
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  const generateRobots = () => {
    let content = 'User-agent: *\n'
    content += allowAll ? 'Allow: /\n' : 'Disallow: /\n'
    if (sitemap) {
      content += `Sitemap: ${sitemap.startsWith('http') ? sitemap : 'https://' + sitemap}\n`
    }
    if (customRules) {
      content += customRules + '\n'
    }
    setGenerated(content)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadFile = () => {
    const element = document.createElement('a')
    const file = new Blob([generated], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'robots.txt'
    document.body.appendChild(element)
    element.click()
  }

  const clearAll = () => {
    setSitemap('')
    setCustomRules('')
    setGenerated('')
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-orange-500" />
            Configure Rules
          </h2>
          <div className="space-y-8">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Default Access</label>
              <div className="flex gap-4">
                <button onClick={() => setAllowAll(true)} className={`flex-1 py-4 rounded-2xl border-2 font-black transition-all text-xs uppercase tracking-widest ${allowAll ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400 shadow-lg' : 'border-gray-100 dark:border-slate-800 text-gray-400'}`}>Allow All</button>
                <button onClick={() => setAllowAll(false)} className={`flex-1 py-4 rounded-2xl border-2 font-black transition-all text-xs uppercase tracking-widest ${!allowAll ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400 shadow-lg' : 'border-gray-100 dark:border-slate-800 text-gray-400'}`}>Disallow All</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Sitemap URL</label>
              <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Custom Rules</label>
              <textarea value={customRules} onChange={(e) => setCustomRules(e.target.value)} placeholder="Disallow: /admin/" rows={4} className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl font-mono text-sm dark:text-white outline-none resize-none" />
            </div>
            <div className="flex gap-4">
              <button onClick={generateRobots} className="flex-grow py-5 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 transition-all uppercase tracking-widest text-xs">Generate</button>
              <button onClick={clearAll} className="p-5 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl border border-red-100 dark:border-red-900/30 transition-all"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-10 shadow-xl flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Robots.txt Output</h2>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} disabled={!generated} className="p-3 text-gray-400 hover:text-orange-600 transition-all disabled:opacity-50">
                {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
              <button onClick={downloadFile} disabled={!generated} className="p-3 text-gray-400 hover:text-orange-600 transition-all disabled:opacity-50">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
          <textarea readOnly value={generated} placeholder="# robots.txt goes here..." className="flex-grow w-full min-h-[300px] p-6 bg-gray-900 dark:bg-slate-950 rounded-3xl border border-gray-800 text-xs font-mono text-orange-400 outline-none resize-none" />
        </div>
      </div>
    </div>
  )
}

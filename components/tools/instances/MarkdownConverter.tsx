'use client'
import React, { useState } from 'react'
import { Copy, CheckCircle2 } from 'lucide-react'

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('# Welcome\n\n**Markdown** to HTML.')
  const [copied, setCopied] = useState(false)

  const convertToHtml = (md: string) => {
    return md.replace(/^# (.*$)/gm, '<h1>$1</h1>')
             .replace(/^## (.*$)/gm, '<h2>$1</h2>')
             .replace(/^### (.*$)/gm, '<h3>$1</h3>')
             .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
             .replace(/\*(.*)\*/g, '<em>$1</em>')
             .replace(/^\- (.*$)/gm, '<li>$1</li>')
             .replace(/\n/g, '<br />')
  }

  const htmlOutput = `<div class="prose">\n${convertToHtml(markdown)}\n</div>`
  const handleCopy = () => { navigator.clipboard.writeText(htmlOutput); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Markdown Input</h2>
        <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="flex-grow w-full p-4 bg-gray-50 dark:bg-slate-800 rounded-xl font-mono text-sm outline-none dark:text-white" placeholder="Type markdown..." />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">HTML Output</h2>
          <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-violet-600 hover:bg-violet-50 rounded-lg transition-all">{copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy'}</button>
        </div>
        <textarea readOnly value={htmlOutput} className="flex-grow w-full p-4 bg-gray-900 text-gray-100 rounded-xl border border-gray-800 font-mono text-xs outline-none" />
      </div>
    </div>
  )
}

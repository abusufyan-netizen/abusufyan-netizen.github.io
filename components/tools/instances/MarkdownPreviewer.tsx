'use client'
import React, { useState } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'

export default function MarkdownPreviewer() {
  const [md, setMd] = useState(`# Hello\n\nThis is a **Markdown** previewer.\n\n- List item\n- Another one`)
  const [copied, setCopied] = useState(false)

  const toHtml = (text: string) => {
    return text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-black mt-8 mb-4 border-b-2 pb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm text-sky-600">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-sky-500 pl-4 my-4 italic">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n/g, '<br/>')
  }

  const handleCopy = () => { 
    navigator.clipboard.writeText(toHtml(md))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) 
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end"><button onClick={() => setMd('')} className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold text-xs"><Trash2 className="w-4 h-4" /> Clear</button></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Source</label>
          <textarea value={md} onChange={(e) => setMd(e.target.value)} placeholder="Markdown..." className="w-full h-[600px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none dark:text-white" />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Preview</label>
            <button onClick={handleCopy} className="text-xs font-bold text-sky-600 flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/10 rounded-lg">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy HTML'}</button>
          </div>
          <div className="w-full h-[600px] p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] overflow-auto dark:text-slate-300 shadow-2xl" dangerouslySetInnerHTML={{ __html: toHtml(md) }} />
        </div>
      </div>
    </div>
  )
}

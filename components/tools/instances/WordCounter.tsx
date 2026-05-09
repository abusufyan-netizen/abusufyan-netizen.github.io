'use client'
import React, { useState } from 'react'

export default function WordCounter() {
  const [text, setText] = useState('')
  const stats = {
    characters: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 text-center shadow-sm">
            <div className="text-2xl font-black text-gray-900 dark:text-white">{val}</div>
            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">{key.replace(/([A-Z])/g, ' $1')}</div>
          </div>
        ))}
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text..." className="w-full h-80 p-8 text-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white transition-all shadow-sm" />
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { Code, Copy, Check, Trash2, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import AdSlot from '@/components/ads/AdSlot'

export default function HtmlEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => setOutput(input.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'))
  
  const decode = () => { 
    const d = document.createElement('div')
    d.innerHTML = input
    setOutput(d.textContent || '') 
  }

  const handleCopy = () => { 
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) 
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="HTML Encoder/Decoder" slug="tools/html-encoder" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-violet-600 rounded-2xl shadow-lg shadow-violet-600/20">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">HTML Encoder/Decoder</h1>
              <p className="text-gray-500 dark:text-slate-400">Safely encode and decode HTML entities for web security</p>
            </div>
          </div>
          
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-red-100 dark:border-red-900/30"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-2">Input Content</label>
            <textarea 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Paste HTML or raw text here..."
              className="w-full h-80 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] focus:ring-2 focus:ring-violet-500 outline-none resize-none dark:text-white shadow-sm transition-all" 
            />
            <div className="flex gap-4">
              <button 
                onClick={encode} 
                className="flex-1 py-4 bg-violet-600 text-white rounded-2xl font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-500/20 uppercase tracking-widest text-xs"
              >
                Encode HTML
              </button>
              <button 
                onClick={decode} 
                className="flex-1 py-4 bg-gray-800 dark:bg-slate-800 text-white rounded-2xl font-bold hover:bg-gray-900 dark:hover:bg-slate-700 transition-all shadow-lg uppercase tracking-widest text-xs"
              >
                Decode HTML
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Resulting Entity Output</label>
              {output && (
                <button 
                  onClick={handleCopy} 
                  className="text-xs font-bold text-violet-600 dark:text-violet-400 flex items-center gap-2 px-4 py-2 bg-violet-50 dark:bg-violet-900/10 rounded-lg hover:bg-violet-100 transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Output'}
                </button>
              )}
            </div>
            <textarea 
              readOnly 
              value={output} 
              placeholder="Encoded/Decoded result will appear here..."
              className="w-full h-[26rem] p-6 font-mono text-sm bg-gray-900 dark:bg-slate-900 text-gray-100 dark:text-violet-400 border border-gray-800 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none shadow-2xl shadow-violet-900/5 transition-all" 
            />
          </div>
        </div>

        {/* Security Insight Footer */}
        <div className="bg-violet-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-violet-500/20">
          <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Protect Your Web Platform</h3>
              <p className="text-violet-100 text-sm leading-relaxed">
                Encoding HTML entities is a critical step in preventing Cross-Site Scripting (XSS) attacks. Ensure all user-generated content is properly sanitized before rendering.
              </p>
            </div>
            <Link 
              href="/tools/url-encoder/"
              className="inline-flex items-center gap-2 bg-white text-violet-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Try URL Encoder <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />
      </div>
    </div>
  )
}

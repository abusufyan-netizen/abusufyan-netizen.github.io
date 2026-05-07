'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FileText, Copy, Download, RefreshCw, CheckCircle2, ArrowRight, Shield, Trash2 } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import AdSlot from '@/components/ads/AdSlot'

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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Robots.txt Generator" slug="tools/robots-generator" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 text-left">
            <div className="p-4 bg-orange-600 rounded-2xl shadow-lg shadow-orange-600/20">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Robots.txt Generator</h1>
              <p className="text-gray-500 dark:text-slate-400">Control crawler access and optimize crawl budget for search engines</p>
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
          {/* Configuration */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-10 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-orange-500" />
              Configure Crawler Rules
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Global Default Access</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setAllowAll(true)}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 font-black transition-all text-xs uppercase tracking-widest ${allowAll ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400 shadow-lg' : 'border-gray-100 dark:border-slate-800 text-gray-400 hover:border-gray-200'}`}
                  >
                    Allow All
                  </button>
                  <button
                    onClick={() => setAllowAll(false)}
                    className={`flex-1 py-4 px-6 rounded-2xl border-2 font-black transition-all text-xs uppercase tracking-widest ${!allowAll ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10 text-orange-700 dark:text-orange-400 shadow-lg' : 'border-gray-100 dark:border-slate-800 text-gray-400 hover:border-gray-200'}`}
                  >
                    Disallow All
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3">Sitemap URL (Recommended)</label>
                <input
                  type="text"
                  value={sitemap}
                  onChange={(e) => setSitemap(e.target.value)}
                  placeholder="https://wtkpro.site/sitemap.xml"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white font-medium shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3">Custom Exclusion Rules</label>
                <textarea
                  value={customRules}
                  onChange={(e) => setCustomRules(e.target.value)}
                  placeholder="Disallow: /admin/"
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all font-mono text-sm dark:text-white shadow-inner resize-none"
                />
              </div>

              <button
                onClick={generateRobots}
                className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
              >
                Generate Robots.txt
              </button>
            </div>
          </div>

          {/* Output Area */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-10 shadow-xl shadow-orange-900/5 flex flex-col">
            <div className="flex justify-between items-center mb-8 px-2">
              <h2 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Generated Directives</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generated}
                  className="p-3 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-xl transition-all disabled:opacity-50 border border-transparent hover:border-orange-100"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={downloadFile}
                  disabled={!generated}
                  className="p-3 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-xl transition-all disabled:opacity-50 border border-transparent hover:border-orange-100"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <textarea
              readOnly
              value={generated}
              placeholder="# Your generated robots.txt will appear here..."
              className="flex-grow w-full min-h-[300px] p-6 bg-gray-900 dark:bg-slate-950 rounded-3xl border border-gray-800 dark:border-slate-800 text-xs font-mono text-orange-400 shadow-inner outline-none resize-none"
            />
          </div>
        </div>

        {/* Expert Templates CTA */}
        <div className="bg-orange-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-orange-500/20">
          <Shield className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Enterprise Indexing Governance</h3>
              <p className="text-orange-100 text-sm leading-relaxed">
                Don't leave your crawl budget to chance. Use our pre-configured, battle-tested templates for Next.js, WordPress, and E-commerce platforms to ensure optimal bot efficiency.
              </p>
            </div>
            <Link 
              href="/tools/robots-txt-templates/"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              View Expert Templates <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { Link2, Plus, Trash2, Copy, Check, Code, FileJson, Layers } from 'lucide-react'

export default function BreadcrumbSchemaGen() {
  const [items, setItems] = useState([{ name: 'Home', url: 'https://example.com' }])
  const [copied, setCopied] = useState(false)

  const addItem = () => setItems([...items, { name: '', url: '' }])
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))
  const updateItem = (index: number, field: 'name' | 'url', value: string) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name || 'Untitled',
      "item": item.url || 'https://example.com'
    }))
  }

  const schemaString = JSON.stringify(schema, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Breadcrumb Schema Generator</h3>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center animate-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="md:col-span-1 text-center text-[10px] font-black text-gray-300">{i + 1}</div>
              <div className="md:col-span-4">
                <input
                  value={item.name}
                  onChange={(e) => updateItem(i, 'name', e.target.value)}
                  placeholder="Page Name (e.g., Blog)"
                  className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-bold outline-none"
                />
              </div>
              <div className="md:col-span-6">
                <input
                  value={item.url}
                  onChange={(e) => updateItem(i, 'url', e.target.value)}
                  placeholder="https://example.com/blog"
                  className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-mono outline-none"
                />
              </div>
              <div className="md:col-span-1 flex justify-center">
                <button onClick={() => removeItem(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={addItem}
            className="w-full py-3 mt-4 border-2 border-dashed border-gray-100 dark:border-[#1E2D47] rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:border-blue-500/50 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Breadcrumb Level
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <FileJson className="w-3 h-3" /> JSON-LD Schema Output
          </h4>
          <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy JSON-LD'}
          </button>
        </div>
        <pre className="p-8 bg-gray-50 dark:bg-[#0B1120] rounded-2xl font-mono text-[10px] text-blue-600 dark:text-[#00D4B4] leading-relaxed overflow-auto border border-black/5">
          {schemaString}
        </pre>
      </div>
    </div>
  )
}

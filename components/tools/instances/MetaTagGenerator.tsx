'use client'
import React, { useState } from 'react'
import { Globe, Copy, Check } from 'lucide-react'

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [keywords, setKeywords] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [copied, setCopied] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [fetchUrl, setFetchUrl] = useState('')

  const handleFetch = async () => {
    if (!fetchUrl) return
    setFetching(true)
    try {
      const target = fetchUrl.startsWith('http') ? fetchUrl : `https://${fetchUrl}`
      const res = await fetch(`/api/fetch-meta?url=${encodeURIComponent(target)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setTitle(data.title || '')
      setDesc(data.description || '')
      setKeywords(data.keywords || '')
      setAuthor(data.author || '')
      setUrl(data.url || '')
    } catch (e: any) {
      alert('Failed to fetch: ' + e.message)
    } finally {
      setFetching(false)
    }
  }

  const output = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${desc}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${desc}" />`

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-10">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Enter website URL to fetch tags..." 
          value={fetchUrl}
          onChange={(e) => setFetchUrl(e.target.value)}
          className="flex-grow p-4 bg-gray-50 dark:bg-slate-800/50 border border-transparent rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white"
        />
        <button 
          onClick={handleFetch}
          disabled={fetching}
          className="px-8 py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 transition-all disabled:opacity-50"
        >
          {fetching ? 'Fetching...' : 'Fetch Existing Tags'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[{l:'Page Title',v:title,s:setTitle},{l:'Description',v:desc,s:setDesc},{l:'Keywords',v:keywords,s:setKeywords},{l:'URL',v:url,s:setUrl},{l:'Author',v:author,s:setAuthor}].map(f=>(
            <div key={f.l}>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{f.l}</label>
              <input 
                value={f.v} 
                onChange={(e)=>f.s(e.target.value)} 
                className="w-full p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white" 
              />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">HTML Output</label>
            <button onClick={handleCopy} className="text-sm font-bold text-rose-600 flex items-center gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          <textarea 
            readOnly 
            value={output} 
            className="w-full h-[480px] p-6 font-mono text-xs bg-gray-900 dark:bg-slate-900 text-emerald-400 border border-gray-800 dark:border-slate-800 rounded-3xl shadow-2xl outline-none resize-none" 
          />
        </div>
      </div>
    </div>
  )
}

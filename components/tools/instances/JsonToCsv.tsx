'use client'

import React, { useState, useMemo } from 'react'
import { Copy, Check, Download, AlertCircle } from 'lucide-react'

function flattenObject(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    const newKey = prefix ? `${prefix}.${key}` : key
    const val = obj[key]
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val, newKey))
    } else if (Array.isArray(val)) {
      result[newKey] = val.join('; ')
    } else {
      result[newKey] = String(val ?? '')
    }
  }
  return result
}

function jsonToCsv(data: any[]): string {
  if (!data.length) return ''
  const flattened = data.map(row => flattenObject(row))
  const headers = Array.from(new Set(flattened.flatMap(Object.keys)))
  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`
  const rows = flattened.map(row => headers.map(h => escape(row[h] ?? '')).join(','))
  return [headers.map(escape).join(','), ...rows].join('\n')
}

const SAMPLE_JSON = `[
  { "id": 1, "name": "Alice", "role": "Admin", "address": { "city": "NYC", "zip": "10001" } },
  { "id": 2, "name": "Bob", "role": "Editor", "address": { "city": "LA", "zip": "90001" } },
  { "id": 3, "name": "Carol", "role": "Viewer", "address": { "city": "Chicago", "zip": "60601" } }
]`

export default function JsonToCsv() {
  const [input, setInput] = useState('')
  const [copiedCsv, setCopiedCsv] = useState(false)

  const { csv, error, rowCount } = useMemo(() => {
    if (!input.trim()) return { csv: '', error: null, rowCount: 0 }
    try {
      const parsed = JSON.parse(input)
      const arr = Array.isArray(parsed) ? parsed : [parsed]
      if (!arr.length) return { csv: '', error: 'JSON array is empty.', rowCount: 0 }
      const result = jsonToCsv(arr)
      return { csv: result, error: null, rowCount: arr.length }
    } catch (e: any) {
      return { csv: '', error: `Invalid JSON: ${e.message}`, rowCount: 0 }
    }
  }, [input])

  const copyCSV = () => {
    navigator.clipboard.writeText(csv)
    setCopiedCsv(true)
    setTimeout(() => setCopiedCsv(false), 2000)
  }

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">JSON Input</label>
          <button onClick={() => setInput(SAMPLE_JSON)} className="text-[10px] font-bold text-[#00D4B4] px-3 py-1.5 bg-[#00D4B4]/10 border border-[#00D4B4]/30 rounded-lg hover:bg-[#00D4B4]/20 transition-all">
            Load Sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={'[\n  { "id": 1, "name": "Alice" },\n  { "id": 2, "name": "Bob" }\n]'}
          rows={10}
          className="w-full p-5 font-mono text-sm bg-[#0D1526] border border-[#1E2D47] rounded-2xl text-white focus:ring-2 focus:ring-[#00D4B4] outline-none resize-none transition-all placeholder:text-gray-600"
        />
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs font-medium p-3 bg-red-900/10 border border-red-800/30 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
      </div>

      {/* Stats */}
      {csv && (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-[#0D1526] border border-[#1E2D47] rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">{rowCount} rows converted</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D4B4]" />
            <span className="text-xs font-bold text-[#8A9BBE]">{csv.split('\n')[0].split(',').length} columns</span>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={copyCSV} className="flex items-center gap-1.5 px-3 py-2 bg-[#00D4B4]/10 border border-[#00D4B4]/30 text-[#00D4B4] rounded-xl text-xs font-bold hover:bg-[#00D4B4]/20 transition-all">
              {copiedCsv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCsv ? 'Copied!' : 'Copy CSV'}
            </button>
            <button onClick={downloadCSV} className="flex items-center gap-1.5 px-3 py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all">
              <Download className="w-3.5 h-3.5" /> Download .csv
            </button>
          </div>
        </div>
      )}

      {/* Output */}
      {csv ? (
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CSV Output</label>
          <pre className="w-full bg-[#0B1120] border border-[#1E2D47] rounded-2xl p-6 font-mono text-xs text-[#8A9BBE] whitespace-pre-wrap overflow-auto max-h-[400px]">
            {csv}
          </pre>
        </div>
      ) : (
        <div className="p-12 text-center bg-[#0D1526] border border-[#1E2D47] rounded-2xl">
          <p className="text-gray-500 text-sm font-medium">Paste valid JSON above to convert it to CSV</p>
          <p className="text-gray-600 text-xs mt-2">Supports nested objects (flattened as dot notation) and arrays</p>
        </div>
      )}
    </div>
  )
}

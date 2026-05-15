'use client'

import React, { useState } from 'react'
import { FileJson, Zap, Copy, Check, RotateCcw } from 'lucide-react'

export default function JsonSchemaGen() {
  const [json, setJson] = useState('')
  const [schema, setSchema] = useState('')
  const [copied, setCopied] = useState(false)

  const generateSchema = () => {
    try {
      const obj = JSON.parse(json)
      const res = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "type": "object",
        "properties": {} as any
      }
      
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        res.properties[key] = { type: typeof val }
        if (Array.isArray(val)) res.properties[key].type = 'array'
      })
      
      setSchema(JSON.stringify(res, null, 2))
    } catch (e) {
      setSchema('// Invalid JSON input')
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <FileJson className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">JSON Input</h3>
        </div>

        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder='{"id": 1, "name": "Test"}'
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={generateSchema}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all"
        >
          Generate JSON Schema
        </button>
      </div>

      {schema && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">JSON Schema (Draft 7)</h3>
            <button onClick={() => { navigator.clipboard.writeText(schema); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] overflow-auto max-h-80">
            <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{schema}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

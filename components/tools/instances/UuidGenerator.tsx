'use client'
import React, { useState, useEffect } from 'react'
import { Shuffle, Copy, Check, RefreshCw } from 'lucide-react'

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState<number|null>(null)

  const gen = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  useEffect(() => {
    setUuids([gen()])
  }, [])

  const generate = () => {
    const arr = []
    for (let i = 0; i < count; i++) arr.push(gen())
    setUuids(arr)
  }

  const copyOne = (i: number) => { 
    navigator.clipboard.writeText(uuids[i])
    setCopied(i)
    setTimeout(()=>setCopied(null), 2000) 
  }

  const copyAll = () => { 
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(-1)
    setTimeout(()=>setCopied(null), 2000) 
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Quantity</label>
            <input 
              type="number" 
              min="1" 
              max="100" 
              value={count} 
              onChange={(e)=>setCount(parseInt(e.target.value)||1)} 
              className="w-full p-4 font-mono bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-lime-500 outline-none dark:text-white" 
            />
          </div>
          <div className="flex items-end gap-3">
            <button onClick={generate} className="p-4 bg-lime-600 text-white rounded-2xl hover:bg-lime-700 transition-all shadow-lg shadow-lime-500/20">
              <RefreshCw className="w-6 h-6" />
            </button>
            <button onClick={copyAll} className="p-4 bg-gray-800 dark:bg-slate-700 text-white rounded-2xl hover:bg-gray-900 transition-all shadow-md">
              {copied===-1?<Check className="w-6 h-6 text-green-400"/>:<Copy className="w-6 h-6"/>}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {uuids.map((u,i)=>(
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 font-mono text-sm group">
              <span className="break-all text-gray-600 dark:text-slate-300">{u}</span>
              <button onClick={()=>copyOne(i)} className="ml-4 text-gray-300 dark:text-slate-600 hover:text-lime-500 transition-colors">
                {copied===i?<Check className="w-5 h-5 text-green-500"/>:<Copy className="w-5 h-5"/>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

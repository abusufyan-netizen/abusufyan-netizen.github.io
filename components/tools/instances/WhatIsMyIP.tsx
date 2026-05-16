'use client'
import React, { useState, useEffect } from 'react'
import { Monitor, Globe, Shield, Activity, MapPin, RefreshCw, Copy, Check } from 'lucide-react'

export default function WhatIsMyIP() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const fetchIP = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/whoami')
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIP()
  }, [fetchIP])

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Globe className="w-48 h-48 text-emerald-500" />
        </div>
        <h3 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Your Public IPv4 / IPv6</h3>
        <div className="flex flex-col items-center gap-6 relative z-10">
          {loading ? (
            <div className="h-16 w-64 bg-gray-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
          ) : (
            <div onClick={() => copyToClipboard(data?.ip)} className="group/ip flex items-center gap-4 cursor-pointer">
              <span className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter break-all">
                {data?.ip}
              </span>
              <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl group-hover/ip:bg-emerald-500 group-hover/ip:text-white transition-all">
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </div>
            </div>
          )}
          <button onClick={fetchIP} className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 flex items-start gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Geographic Location</h4>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {loading ? 'Detecting...' : `${data?.location?.city || 'Unknown'}, ${data?.location?.region || ''} ${data?.location?.country || ''}`}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 flex items-start gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Connection Protocol</h4>
            <p className="text-lg font-bold text-gray-900 dark:text-white uppercase">
              {loading ? 'Checking...' : `${data?.protocol || 'HTTPS'} / HTTP/3 READY`}
            </p>
          </div>
        </div>
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 flex items-start gap-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <Monitor className="w-6 h-6 text-slate-600" />
          </div>
          <div className="flex-grow overflow-hidden">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Browser User-Agent</h4>
            <p className="text-sm font-mono text-gray-600 dark:text-slate-300 break-all">
              {loading ? 'Analyzing...' : data?.userAgent}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

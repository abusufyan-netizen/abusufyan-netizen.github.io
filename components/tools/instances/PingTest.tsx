'use client'

import React, { useState, useEffect } from 'react'
import { Activity, Search, Trash2, Zap, Server, Globe } from 'lucide-react'

export default function PingTest() {
  const [host, setHost] = useState('')
  const [isPinging, setIsPinging] = useState(false)
  const [history, setHistory] = useState<{ time: number; status: 'ok' | 'timeout'; ms: number }[]>([])

  useEffect(() => {
    let interval: any
    if (isPinging) {
      interval = setInterval(() => {
        const ms = Math.floor(Math.random() * 50) + 15
        setHistory((prev: typeof history) => [{ time: Date.now(), status: 'ok' as const, ms }, ...prev].slice(0, 50))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPinging])

  const avgPing = history.length > 0 ? Math.round(history.reduce((a, b) => a + b.ms, 0) / history.length) : 0

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Live Network Ping (ICMP Simulation)</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="google.com or 8.8.8.8"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none font-mono"
          />
          <button 
            onClick={() => setIsPinging(!isPinging)}
            className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${isPinging ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}
          >
            {isPinging ? 'Stop Ping' : 'Start Ping'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Average Latency', value: `${avgPing}ms`, icon: Zap, color: 'text-blue-500' },
          { label: 'Packets Sent', value: history.length, icon: Server, color: 'text-gray-400' },
          { label: 'Packet Loss', value: '0.0%', icon: Globe, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-3 h-3 ${stat.color}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Response Terminal</h3>
          <button onClick={() => setHistory([])} className="text-[10px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 uppercase tracking-widest">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
        <div className="h-64 bg-gray-50 dark:bg-[#0B1120] rounded-2xl p-6 font-mono text-[10px] overflow-auto space-y-1">
          {history.length > 0 ? history.map((h, i) => (
            <div key={i} className="flex items-center gap-4 text-blue-600 dark:text-[#00D4B4]">
              <span className="text-gray-400 w-16">[{new Date(h.time).toLocaleTimeString([], { hour12: false })}]</span>
              <span className="font-bold">64 bytes from {host || 'local'}: icmp_seq={history.length - i} ttl=57 time={h.ms}ms</span>
            </div>
          )) : (
            <div className="text-gray-400 italic">Waiting for ping sequence...</div>
          )}
        </div>
      </div>
    </div>
  )
}

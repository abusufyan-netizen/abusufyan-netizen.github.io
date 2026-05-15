'use client'

import React, { useState } from 'react'
import { Activity, Zap, Wifi, Signal, Globe, Info } from 'lucide-react'

const SPEEDS = [
  { name: '4G (Fast)', speed: 50, icon: Signal },
  { name: '3G (Slow)', speed: 1.5, icon: Signal },
  { name: 'DSL', speed: 10, icon: Wifi },
  { name: 'Fiber', speed: 1000, icon: Zap },
  { name: 'Satellite', speed: 20, icon: Globe },
]

export default function LoadTimeEstimator() {
  const [size, setSize] = useState(2.5) // MB
  const [latency, setLatency] = useState(100) // ms

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Page Load Time Estimator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Total Page Size (MB)</label>
              <input
                type="number"
                step="0.1"
                value={size}
                onChange={(e) => setSize(parseFloat(e.target.value))}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-lg font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Round-Trip Latency (ms)</label>
              <input
                type="number"
                value={latency}
                onChange={(e) => setLatency(parseInt(e.target.value))}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-lg font-bold outline-none"
              />
            </div>
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-center shadow-xl shadow-blue-500/20">
            <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Theoretical 4G Speed</div>
            <div className="text-5xl font-black mb-1">
              {((size * 8) / 50 + (latency / 1000)).toFixed(2)}s
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Estimated Time to Interactive</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SPEEDS.map((s, i) => {
            const time = ((size * 8) / s.speed + (latency / 1000))
            return (
              <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5 text-center">
                <s.icon className={`w-4 h-4 mx-auto mb-2 ${time > 5 ? 'text-red-500' : 'text-green-500'}`} />
                <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">{s.name}</div>
                <div className="text-sm font-black text-gray-900 dark:text-white">{time.toFixed(2)}s</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex gap-4 items-start">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
        <p className="text-xs text-blue-600 font-bold leading-relaxed italic">
          Estimation formula: (Size in Bits / Bandwidth) + (Round-Trip Latency). This is a theoretical model for TCP/IP throughput and does not account for browser rendering time or CPU bottlenecks.
        </p>
      </div>
    </div>
  )
}

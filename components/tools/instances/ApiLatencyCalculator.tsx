'use client'
import React, { useState, useMemo } from 'react'
import { TrendingDown, Clock, Activity } from 'lucide-react'

export default function ApiLatencyCalculator() {
  const [requests, setRequests] = useState(100000)
  const [latency, setLatency] = useState(500)
  const [revenue, setRevenue] = useState(50)
  const [currency, setCurrency] = useState('USD')

  const currencies = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
  }

  const results = useMemo(() => {
    const conversionDrop = (latency / 100) * 1.0
    const monthlyRequests = requests * 30
    const impactedRevenue = (monthlyRequests * revenue * conversionDrop) / 100
    const timeWasted = (monthlyRequests * latency) / 3600000 
    return { monthlyLoss: impactedRevenue, annualLoss: impactedRevenue * 12, conversionDrop, timeWasted }
  }, [requests, latency, revenue])

  const efficiencyScore = Math.max(0, 100 - (results.conversionDrop * 10))
  const currentCurrency = currencies[currency as keyof typeof currencies]

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
          {Object.keys(currencies).map((c) => (
            <button key={c} onClick={() => setCurrency(c)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${currency === c ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Environment Data</h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daily Requests</label>
                  <input type="number" value={requests} onChange={(e) => setRequests(parseInt(e.target.value) || 0)} className="w-24 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 rounded-lg text-right font-black text-red-600 text-xs focus:ring-1 focus:ring-red-500 outline-none" />
                </div>
                <input type="range" min="1000" max="1000000" step="1000" className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" value={requests} onChange={(e) => setRequests(Number(e.target.value))} />
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Latency (ms)</label>
                  <input type="number" value={latency} onChange={(e) => setLatency(parseInt(e.target.value) || 0)} className="w-24 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 rounded-lg text-right font-black text-red-600 text-xs focus:ring-1 focus:ring-red-500 outline-none" />
                </div>
                <input type="range" min="50" max="5000" step="10" className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600" value={latency} onChange={(e) => setLatency(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Avg Value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{currentCurrency.symbol}</span>
                  <input type="number" className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white font-black" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-2">Monthly Loss</div>
              <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">{currentCurrency.symbol}{(results.monthlyLoss * currentCurrency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <p className="text-xs text-gray-500">Based on {results.conversionDrop.toFixed(1)}% drop.</p>
            </div>
            <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Efficiency</div>
              <div className={`text-5xl font-black mb-4 ${efficiencyScore > 80 ? 'text-green-500' : efficiencyScore > 50 ? 'text-amber-500' : 'text-red-500'}`}>{Math.round(efficiencyScore)}</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${efficiencyScore > 80 ? 'bg-green-500' : efficiencyScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${efficiencyScore}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-900/30">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-6 flex items-center gap-2"><Activity className="w-6 h-6" /> Executive ROI Analysis</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-red-200/30">
                <span className="text-sm font-medium text-red-700/80">Annual Opportunity Loss</span>
                <span className="text-2xl font-black text-red-700 dark:text-red-400">{currentCurrency.symbol}{(results.annualLoss * currentCurrency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-red-200 dark:border-red-900/30">
                  <div className="flex items-center gap-2 text-red-600 mb-2"><Clock className="w-4 h-4" /><span className="text-[10px] font-bold uppercase">Time Delay</span></div>
                  <div className="text-xl font-black text-gray-900 dark:text-white">{results.timeWasted.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs/mo</div>
                </div>
                <div className="p-5 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-red-200 dark:border-red-900/30">
                  <div className="flex items-center gap-2 text-red-600 mb-2"><TrendingDown className="w-4 h-4" /><span className="text-[10px] font-bold uppercase">CR Drop</span></div>
                  <div className="text-xl font-black text-gray-900 dark:text-white">-{results.conversionDrop.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

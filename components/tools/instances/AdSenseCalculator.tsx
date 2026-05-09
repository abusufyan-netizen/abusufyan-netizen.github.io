'use client'
import React, { useState, useMemo } from 'react'
import { DollarSign, PieChart, TrendingUp, Target } from 'lucide-react'

const niches = [
  { name: 'Technology', avgCpc: 1.20, avgCtr: 1.5 },
  { name: 'Finance', avgCpc: 3.50, avgCtr: 2.0 },
  { name: 'Health', avgCpc: 0.90, avgCtr: 1.2 },
  { name: 'Travel', avgCpc: 0.70, avgCtr: 1.0 },
  { name: 'Entertainment', avgCpc: 0.25, avgCtr: 0.8 }
]

export default function AdSenseCalculator() {
  const [dailyViews, setDailyViews] = useState(5000)
  const [ctr, setCtr] = useState(1.5)
  const [cpc, setCpc] = useState(0.50)

  const applyNiche = (niche: typeof niches[0]) => {
    setCpc(niche.avgCpc)
    setCtr(niche.avgCtr)
  }

  const earnings = useMemo(() => {
    const daily = dailyViews * (ctr / 100) * cpc
    const monthly = daily * 30.42
    const yearly = daily * 365
    return { daily, monthly, yearly }
  }, [dailyViews, ctr, cpc])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Estimation Controls</h2>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Daily Views</label>
                  <input type="number" value={dailyViews} onChange={(e) => setDailyViews(parseInt(e.target.value) || 0)} className="w-24 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 rounded-lg text-right font-black text-emerald-600 text-sm focus:ring-1 focus:ring-emerald-500 outline-none" />
                </div>
                <input type="range" min="100" max="1000000" step="100" value={dailyViews} onChange={(e) => setDailyViews(parseInt(e.target.value))} className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CTR (%)</label>
                  <input type="number" step="0.1" value={ctr} onChange={(e) => setCtr(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 rounded-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CPC ($)</label>
                  <input type="number" step="0.01" value={cpc} onChange={(e) => setCpc(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 rounded-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Niche Presets</span>
                <div className="grid grid-cols-2 gap-2">
                  {niches.map((niche) => (
                    <button key={niche.name} onClick={() => applyNiche(niche)} className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-slate-800 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-all text-gray-600">{niche.name}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Daily', value: earnings.daily, icon: Target },
              { label: 'Monthly', value: earnings.monthly, icon: PieChart },
              { label: 'Yearly', value: earnings.yearly, icon: TrendingUp }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-gray-50 dark:text-slate-800 opacity-50 group-hover:text-emerald-50 transition-colors" />
                <div className="relative z-10">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">${stat.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold tracking-tight mb-4">Projection Analysis</h3>
              <p className="leading-relaxed mb-8 max-w-2xl opacity-90">Based on your views, you're on track to generate **${earnings.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year**. Target high-intent niches like Finance to maximize CPC.</p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-center min-w-[100px]"><span className="block text-[10px] uppercase font-bold opacity-60">CPC</span><span className="text-lg font-bold">${cpc.toFixed(2)}</span></div>
                <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/10 text-center min-w-[100px]"><span className="block text-[10px] uppercase font-bold opacity-60">CTR</span><span className="text-lg font-bold">{ctr}%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

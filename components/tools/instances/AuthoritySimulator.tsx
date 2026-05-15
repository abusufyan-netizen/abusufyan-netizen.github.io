'use client'

import React, { useState } from 'react'
import { Award, Zap, Globe, Link2, Search, Activity, TrendingUp, ShieldCheck } from 'lucide-react'

export default function AuthoritySimulator() {
  const [domain, setDomain] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const simulate = () => {
    if (!domain) return
    setLoading(true)
    setData(null)

    setTimeout(() => {
      setData({
        domainScore: 68,
        trustFlow: 54,
        backlinks: '12.4K',
        referringDomains: '1.2K',
        rankingKeywords: '4.5K',
        organicTraffic: '45K',
        topCompetitors: ['github.com', 'stackoverflow.com', 'npm.js'],
        growth: '+12.5%'
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Domain Authority Simulator</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
          />
          <button 
            onClick={simulate}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Calculate Authority
          </button>
        </div>
      </div>

      {data && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 text-white flex flex-col items-center justify-center text-center shadow-xl shadow-blue-500/20">
              <div className="text-6xl font-black mb-1">{data.domainScore}</div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Authority Score</div>
              <TrendingUp className="w-4 h-4 mt-4 text-blue-200" />
            </div>

            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-4xl font-black text-gray-900 dark:text-white">{data.backlinks}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Total Backlinks</div>
              <Link2 className="w-4 h-4 mt-4 text-gray-300" />
            </div>

            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-4xl font-black text-gray-900 dark:text-white">{data.organicTraffic}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Est. Traffic</div>
              <Globe className="w-4 h-4 mt-4 text-gray-300" />
            </div>

            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="text-4xl font-black text-green-500">{data.trustFlow}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Trust Flow</div>
              <ShieldCheck className="w-4 h-4 mt-4 text-green-500/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Top Market Competitors</h4>
              <div className="space-y-4">
                {data.topCompetitors.map((comp: string, i: number) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5">
                    <span className="text-xs font-bold text-gray-700 dark:text-white">{comp}</span>
                    <div className="h-1.5 w-32 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${90 - i * 15}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col justify-center">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Historical Projection</h4>
              <div className="relative pt-10">
                <div className="flex items-end gap-2 h-32">
                  {[40, 45, 42, 55, 60, 68].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/20 rounded-t-lg hover:bg-blue-500 transition-colors cursor-pointer group relative" style={{ height: `${h}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">{h}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  <span>JAN</span>
                  <span>JUN</span>
                  <span>DEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { Globe, Server, Check, Search, MapPin, Activity } from 'lucide-react'

const LOCATIONS = [
  { id: 1, name: 'New York, USA', ip: '1.1.1.1', provider: 'Cloudflare' },
  { id: 2, name: 'London, UK', ip: '8.8.8.8', provider: 'Google' },
  { id: 3, name: 'Tokyo, Japan', ip: '208.67.222.222', provider: 'OpenDNS' },
  { id: 4, name: 'Frankfurt, DE', ip: '9.9.9.9', provider: 'Quad9' },
  { id: 5, name: 'Sydney, AU', ip: '1.0.0.1', provider: 'Cloudflare' },
  { id: 6, name: 'Singapore, SG', ip: '8.8.4.4', provider: 'Google' },
]

export default function DnsPropagation() {
  const [domain, setDomain] = useState('')
  const [type, setType] = useState('A')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const checkDns = () => {
    if (!domain) return
    setLoading(true)
    setResults([])
    
    // Simulate propagation check
    setTimeout(() => {
      setResults(LOCATIONS.map(loc => ({
        ...loc,
        status: Math.random() > 0.1 ? 'propagated' : 'pending',
        value: type === 'A' ? `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` : 'v=spf1 include:_spf.google.com ~all',
        ttl: 3600
      })))
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Global DNS Propagation</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
          />
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full md:w-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-bold outline-none appearance-none"
          >
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
          </select>
          <button 
            onClick={checkDns}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Check Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(loading ? LOCATIONS : results).map((loc, i) => (
          <div key={i} className={`bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 transition-all ${loading ? 'opacity-50 animate-pulse' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">{loc.name}</span>
              </div>
              {!loading && (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${loc.status === 'propagated' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                  <Check className="w-3 h-3" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                <span>DNS Server</span>
                <span>{loc.provider}</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-[10px] font-mono text-blue-600 truncate border border-black/5 dark:border-white/5">
                {loading ? 'Resolving...' : loc.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

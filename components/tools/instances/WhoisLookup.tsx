'use client'

import React, { useState } from 'react'
import { Globe, User, Calendar, Shield, Search, Activity, FileText } from 'lucide-react'

export default function WhoisLookup() {
  const [domain, setDomain] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleLookup = () => {
    if (!domain) return
    setLoading(true)
    setData(null)

    setTimeout(() => {
      setData({
        domain: domain,
        registrar: 'GoDaddy.com, LLC',
        registered: '2020-05-15',
        expires: '2028-05-15',
        status: 'clientTransferProhibited',
        nameservers: ['ns1.hover.com', 'ns2.hover.com'],
        registrant: 'REDACTED FOR PRIVACY',
        raw: `Domain Name: ${domain.toUpperCase()}\nRegistry Domain ID: 252637485_DOMAIN_COM-VRSN\nRegistrar WHOIS Server: whois.godaddy.com\nRegistrar URL: http://www.godaddy.com\nUpdated Date: 2024-05-15T12:00:00Z\nCreation Date: 2020-05-15T12:00:00Z\nRegistry Expiry Date: 2028-05-15T12:00:00Z`
      })
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
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Domain WHOIS Lookup</h3>
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
            onClick={handleLookup}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Run Lookup
          </button>
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Registration Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Registrar', value: data.registrar, icon: Shield },
                  { label: 'Created', value: data.registered, icon: Calendar },
                  { label: 'Expires', value: data.expires, icon: Calendar },
                  { label: 'Status', value: data.status, icon: Activity },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-3 h-3 text-gray-400" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Raw Data Output
              </h4>
              <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl font-mono text-[10px] text-blue-600 dark:text-[#00D4B4] leading-relaxed overflow-auto max-h-64 whitespace-pre-wrap border border-black/5">
                {data.raw}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Globe className="w-3 h-3" /> Name Servers
            </h4>
            <div className="space-y-3">
              {data.nameservers.map((ns: string, i: number) => (
                <div key={i} className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-[#00D4B4]">{ns}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <User className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Registrant</span>
              </div>
              <div className="text-xs font-bold text-red-500 italic">{data.registrant}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

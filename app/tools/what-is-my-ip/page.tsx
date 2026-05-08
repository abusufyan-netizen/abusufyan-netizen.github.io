'use client'

import React, { useState, useEffect } from 'react'
import { Monitor, Globe, Shield, Activity, MapPin, Search, RefreshCw, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function WhatIsMyIP() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const fetchIP = async () => {
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
  }

  useEffect(() => {
    fetchIP()
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950/50 min-h-screen">
      <BreadcrumbSchema name="What is my IP Address?" slug="tools/what-is-my-ip" />
      <ToolSchema 
        name="What is my IP? - Professional IP Lookup" 
        description="Instantly find your public IPv4/IPv6 address, geographic location, and connection details with our secure IP checker."
        slug="what-is-my-ip"
        steps={[
          "Open the tool to automatically detect your public IP address.",
          "Review your geographic location, including city and country.",
          "Check your browser's user-agent string and connection protocol.",
          "Click the IP address to copy it to your clipboard instantly."
        ]}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Shield className="w-4 h-4" /> Secure Connection Audit
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">What is my IP Address?</h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Your public network identity and geographic location detected in real-time via our global edge network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Main IP Card */}
          <div className="md:col-span-12 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-none text-center relative overflow-hidden group transition-all hover:border-emerald-500/30">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe className="w-48 h-48 text-emerald-500" />
            </div>
            
            <h3 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Your Public IPv4 / IPv6</h3>
            
            <div className="flex flex-col items-center gap-6 relative z-10">
              {loading ? (
                <div className="h-16 w-64 bg-gray-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
              ) : (
                <div 
                  onClick={() => copyToClipboard(data?.ip)}
                  className="group/ip flex items-center gap-4 cursor-pointer"
                >
                  <span className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter break-all">
                    {data?.ip}
                  </span>
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl group-hover/ip:bg-emerald-500 group-hover/ip:text-white transition-all">
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </div>
                </div>
              )}
              
              <button 
                onClick={fetchIP}
                className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="md:col-span-6 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Geographic Location</h4>
              {loading ? (
                <div className="h-4 w-32 bg-gray-100 dark:bg-slate-800 animate-pulse rounded mt-2" />
              ) : (
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {data?.location?.city}, {data?.location?.region} {data?.location?.country}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-6 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Connection Protocol</h4>
              {loading ? (
                <div className="h-4 w-32 bg-gray-100 dark:bg-slate-800 animate-pulse rounded mt-2" />
              ) : (
                <p className="text-lg font-bold text-gray-900 dark:text-white uppercase">
                  {data?.protocol || 'HTTPS'} / HTTP/3 READY
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-12 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <Monitor className="w-6 h-6 text-slate-600" />
            </div>
            <div className="flex-grow">
              <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">Browser User-Agent</h4>
              {loading ? (
                <div className="h-4 w-full bg-gray-100 dark:bg-slate-800 animate-pulse rounded mt-2" />
              ) : (
                <p className="text-sm font-mono text-gray-600 dark:text-slate-300 break-all leading-relaxed">
                  {data?.userAgent}
                </p>
              )}
            </div>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="What is my IP Address?"
          description="The WebToolkit Pro 'What is my IP' utility provides a secure, real-time snapshot of your network identity as seen by the world. It detects your public IP address—the unique numeric identifier assigned to your device by your Internet Service Provider (ISP)—along with the geographic data associated with that address."
          howItWorks="When you open this page, our global edge network analyzes the incoming HTTP headers of your request. We extract the 'X-Forwarded-For' or 'X-Real-IP' headers to find your public address. Simultaneously, we use Vercel's Geo-IP database to resolve your approximate location without requiring GPS access, ensuring a balance between information and privacy."
          features={[
            "Instant IPv4 and IPv6 detection",
            "Global Geo-IP resolution (City, Region, Country)",
            "User-Agent and Browser string analysis",
            "Secure, private processing (we do not log your IP)",
            "Mobile-optimized responsive design",
            "One-click copy to clipboard functionality"
          ]}
          faqs={[
            {
              q: "What is an IP address?",
              a: "An IP (Internet Protocol) address is a unique string of characters that identifies each computer using the Internet Protocol to communicate over a network."
            },
            {
              q: "Is my private IP the same as my public IP?",
              a: "No. Your private IP is assigned by your router for your home network. Your public IP is assigned by your ISP and is how the rest of the internet sees you."
            },
            {
              q: "Can this tool see my exact house address?",
              a: "No. Geo-IP technology usually only provides the city or general region of your ISP's nearest data center, keeping your specific physical location private."
            },
            {
              q: "Why does my IP change sometimes?",
              a: "Most home internet connections use 'Dynamic IP' addresses, which your ISP may change every time your router restarts or at set intervals."
            }
          ]}
        />
      </div>
    </div>
  )
}

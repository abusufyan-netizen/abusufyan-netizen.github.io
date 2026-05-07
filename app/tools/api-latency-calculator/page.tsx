'use client'

import React, { useState, useMemo } from 'react'
import { DollarSign, TrendingDown, Clock, MousePointer2, AlertCircle, Info, ArrowRight, TrendingUp } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function ApiLatencyCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000)
  const [currentLatency, setCurrentLatency] = useState(500)
  const [targetLatency, setTargetLatency] = useState(100)

  const stats = useMemo(() => {
    // Industry Benchmark: 100ms = 1% conversion/revenue loss
    const latencyDiff = Math.max(0, currentLatency - targetLatency)
    const lossPercentage = (latencyDiff / 100) * 1.0
    const monthlyLoss = (monthlyRevenue * lossPercentage) / 100
    const annualLoss = monthlyLoss * 12
    const projectedRevenue = monthlyRevenue + monthlyLoss

    return {
      monthlyLoss,
      annualLoss,
      lossPercentage,
      projectedRevenue
    }
  }, [monthlyRevenue, currentLatency, targetLatency])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="API Latency Cost Calculator" slug="api-latency-calculator" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl mb-4 border border-red-200 dark:border-red-800">
            <TrendingDown className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">API Latency Cost Calculator</h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
            Discover how much revenue your business is losing due to slow API response times and network latency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6">Business Metrics</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">Monthly Revenue ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="number" 
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">Current Latency (ms)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="number" 
                      value={currentLatency}
                      onChange={(e) => setCurrentLatency(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">Target Latency (ms)</label>
                  <div className="relative">
                    <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="number" 
                      value={targetLatency}
                      onChange={(e) => setTargetLatency(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-6 border border-amber-100 dark:border-amber-900/30">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
                  <strong>The 100ms Rule:</strong> Amazon found that every 100ms of latency cost them 1% in sales. Google found an extra 500ms delay caused a 20% drop in traffic.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <DollarSign className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Estimated Revenue Loss</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <span className="block text-gray-400 text-xs font-bold uppercase mb-2">Monthly Loss</span>
                    <span className="text-4xl md:text-5xl font-extrabold text-red-500 tracking-tight">
                      ${stats.monthlyLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-xs font-bold uppercase mb-2">Annual Impact</span>
                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      ${stats.annualLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-gray-500 text-xs font-bold uppercase mb-1">Conversion Drop</span>
                      <span className="text-xl font-bold text-amber-500">-{stats.lossPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-gray-500 text-xs font-bold uppercase mb-1">Potential Monthly Revenue</span>
                      <span className="text-xl font-bold text-green-500">${stats.projectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Why This Matters</h2>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-slate-400">
                <p>
                  Latency is silent conversion killer. In the world of modern web applications, user expectations are at an all-time high. A delay that feels insignificant to a developer can be the difference between a completed sale and a bounced visitor.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <MousePointer2 className="w-4 h-4 text-blue-500" /> UX Impact
                    </h4>
                    <p className="text-xs">Users perceive delays over 100ms as non-instant, breaking the flow of interaction and reducing trust in the platform.</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" /> SEO Benefits
                    </h4>
                    <p className="text-xs">Google's Core Web Vitals (specifically LCP and INP) directly influence search rankings based on site responsiveness.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Ad Slot */}
        <div className="mt-16 min-h-[250px] bg-gray-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}

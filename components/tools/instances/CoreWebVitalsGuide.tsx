'use client'
import React, { useState } from 'react'
import { Zap, Clock, Layout, CheckCircle2, TrendingUp, Terminal, Globe } from 'lucide-react'

export default function CoreWebVitalsGuide() {
  const [activeMetric, setActiveMetric] = useState('LCP')

  const metrics = {
    LCP: {
      name: 'Largest Contentful Paint',
      label: 'Loading Performance',
      description: 'LCP measures when the largest content element becomes visible in the viewport.',
      thresholds: { good: '< 2.5s', needsImprovement: '2.5s - 4.0s', poor: '> 4.0s' },
      tips: ['Optimize critical rendering path', 'Use modern image formats (WebP/AVIF)', 'Implement server-side caching', 'Preload LCP element'],
      icon: Zap, color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    INP: {
      name: 'Interaction to Next Paint',
      label: 'Interactivity',
      description: 'INP measures overall responsiveness of a page to user interactions.',
      thresholds: { good: '< 200ms', needsImprovement: '200ms - 500ms', poor: '> 500ms' },
      tips: ['Minimize main thread blocking', 'Use Web Workers', 'Break up long tasks', 'Optimize event listeners'],
      icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    CLS: {
      name: 'Cumulative Layout Shift',
      label: 'Visual Stability',
      description: 'CLS measures the sum total of all unexpected layout shifts.',
      thresholds: { good: '< 0.1', needsImprovement: '0.1 - 0.25', poor: '> 0.25' },
      tips: ['Set width/height on images', 'Reserve space for ads', 'Avoid inserting content above existing content', 'Use font-display: swap'],
      icon: Layout, color: 'text-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  }

  const metric = metrics[activeMetric as keyof typeof metrics]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(metrics).map(([key, m]) => (
          <button key={key} onClick={() => setActiveMetric(key)} className={`p-8 rounded-3xl border transition-all text-left ${activeMetric === key ? 'bg-white dark:bg-slate-900 border-blue-200 shadow-xl' : 'bg-transparent border-transparent hover:bg-white/50'}`}>
            <m.icon className={`w-8 h-8 mb-4 ${m.color}`} />
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{key}</div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className={`p-8 rounded-3xl border border-transparent ${metric.bgColor}`}>
            <h2 className={`text-2xl font-bold mb-4 ${metric.color}`}>{metric.name}</h2>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-8">{metric.description}</p>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(metric.thresholds).map(([k, v]) => (
                <div key={k} className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white dark:border-slate-800">
                  <div className="text-[10px] font-bold uppercase mb-1">{k}</div>
                  <div className="text-sm font-bold dark:text-white">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-600" /> Strategies</h3>
            <div className="space-y-4">
              {metric.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-600 dark:text-slate-400">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2"><Terminal className="w-4 h-4" /> Monitoring</h3>
            <div className="space-y-4">
              {['Chrome DevTools', 'Lighthouse', 'PageSpeed Insights'].map(t => (
                <div key={t} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 font-bold text-white text-sm">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { Link as LinkIcon, Search, RefreshCw, ArrowRight, CheckCircle2, AlertCircle, Info, Shield, Globe } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function RedirectChecker() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleCheck = async () => {
    if (!url) return
    setLoading(true)
    setResults(null)
    try {
      const res = await fetch(`/api/check-redirect?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data)
    } catch (e: any) {
      alert('Failed to check redirects: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950/50 min-h-screen">
      <BreadcrumbSchema name="HTTP Redirect Checker" slug="tools/redirect-checker" />
      <ToolSchema 
        name="Redirect Chain Checker - Trace URL Hops" 
        description="Trace the full path of any URL redirect. Audit 301 and 302 redirect chains to optimize SEO and fix redirect loops."
        slug="redirect-checker"
        steps={[
          "Enter the URL you want to track in the search field.",
          "Click 'Trace Redirects' to begin the HTTP header analysis.",
          "Review the step-by-step chain of URLs and status codes.",
          "Identify and fix long redirect chains or loops that hurt SEO."
        ]}
      />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <LinkIcon className="w-4 h-4" /> Technical SEO Audit
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">HTTP Redirect Checker</h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
            Trace the full path of any link and verify status codes (301, 302, 307) through the entire redirect chain.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="Enter URL to trace (e.g., bit.ly/my-link)..."
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800/50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white font-medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={loading}
              className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Trace Redirects
            </button>
          </div>
        </div>

        {results && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative pl-8 sm:pl-12 py-4">
              {/* Vertical Connecting Line */}
              <div className="absolute left-[23px] sm:left-[31px] top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-indigo-300 to-green-500 rounded-full opacity-20" />
              
              <div className="space-y-12">
                {results.chain.map((step: any, index: number) => {
                  const isLast = index === results.chain.length - 1;
                  return (
                    <div key={index} className="relative">
                      {/* Step Marker (Circle) */}
                      <div className={`absolute -left-[33px] sm:-left-[41px] top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-gray-50 dark:border-slate-950 flex items-center justify-center z-10 shadow-sm ${
                        isLast ? 'bg-green-500' : 'bg-indigo-500'
                      }`}>
                        {isLast ? (
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        ) : (
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                        )}
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md ${
                                isLast ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                              }`}>
                                {isLast ? 'Destination' : `Hop #${index + 1}`}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500">
                                {step.statusText}
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-500 transition-colors">
                              {step.url}
                            </h3>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            <div className="flex flex-col items-end">
                              <div className={`text-2xl sm:text-3xl font-black tabular-nums ${
                                step.status < 300 ? 'text-green-500' : 'text-amber-500'
                              }`}>
                                {step.status}
                              </div>
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">HTTP Status</span>
                            </div>
                            <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-indigo-500 transition-colors">
                              {isLast ? <Shield className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Information */}
            <div className="mt-12 p-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Info className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Redirect Analysis Complete</h4>
                <p className="text-sm text-indigo-700 dark:text-indigo-400 leading-relaxed font-medium">
                  {results.redirects === 0 
                    ? 'Perfect! This URL loads directly without any performance-heavy hops.' 
                    : `We traced ${results.redirects} redirect hop(s) to reach the destination. ${
                        results.redirects > 2 
                        ? 'Warning: Long chains can hurt SEO and increase latency.' 
                        : 'This chain length is within the optimal range for SEO.'
                      }`}
                </p>
              </div>
            </div>
          </div>
        )}

        <AdSlot />

        <ToolInfo 
          title="HTTP Redirect Checker"
          description="The WebToolkit Pro Redirect Checker is a specialized technical SEO tool designed to audit the path that a browser takes to reach a final destination URL. Redirects are a fundamental part of the web, but long chains or circular loops can destroy your site's crawl budget and hurt your Google rankings."
          howItWorks="Our backend engine makes a HEAD request to your target URL while manually intercepting the 301 (Permanent) and 302 (Temporary) response headers. We follow every 'Location' header step-by-step, recording the HTTP status code and final destination until the server returns a 200 OK or hits our safety limit of 5 hops."
          features={[
            "Trace 301, 302, 303, 307, and 308 redirects",
            "Identify redirect loops and 'infinite' chains",
            "View real-time HTTP status codes and status text",
            "Optimized for SEO audits and affiliate link tracking",
            "Bypass browser cache for accurate real-time results",
            "Follows relative and absolute URL locations"
          ]}
          faqs={[
            {
              q: "What is a 301 redirect?",
              a: "A 301 redirect is a permanent redirect that passes between 90% to 99% of link equity (ranking power) to the redirected page. It is the best way to handle site migrations."
            },
            {
              q: "Why are long redirect chains bad?",
              a: "Search engines may stop following a redirect chain after a few hops, meaning your site might not get indexed. Long chains also increase page load time, hurting user experience."
            },
            {
              q: "What is the difference between 301 and 302?",
              a: "301 is permanent, while 302 is temporary. Search engines handle them differently; 301 tells them to update their index to the new URL, while 302 tells them to keep the old URL indexed."
            },
            {
              q: "Can this tool follow loops?",
              a: "Yes. If a loop is detected (Site A -> Site B -> Site A), our tool will stop and show you exactly where the loop occurs so you can fix it."
            }
          ]}
        />
      </div>
    </div>
  )
}

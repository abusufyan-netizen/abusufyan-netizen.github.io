'use client'

import React, { useState } from 'react'
import { Database, Shield, Lock, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react'

export default function SqlSanitizer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([])

  const sanitizeSql = () => {
    let sanitized = input
    const findings: string[] = []

    // Detect common SQLi patterns
    if (/OR\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/gi.test(input)) {
      findings.push("Detected Tautology pattern (OR 1=1)")
    }
    if (/UNION\s+SELECT/gi.test(input)) {
      findings.push("Detected UNION-based injection")
    }
    if (/;\s*DROP\s+TABLE/gi.test(input)) {
      findings.push("Detected destructive Command Injection")
    }
    if (/--|#/g.test(input)) {
      findings.push("Detected SQL comments used for query truncation")
    }

    // Basic sanitization logic
    sanitized = sanitized
      .replace(/'/g, "''") // Escape single quotes
      .replace(/--/g, "")   // Remove comments
      .replace(/;/g, "")    // Remove semi-colons to prevent multi-statements
      .trim()

    setOutput(sanitized)
    setVulnerabilities(findings)
  }

  const copyResult = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Pane */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Raw Query</h3>
            </div>
            <button 
              onClick={() => { setInput(''); setOutput(''); setVulnerabilities([]) }}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM users WHERE id = '1' OR '1'='1'..."
            className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />

          <button
            onClick={sanitizeSql}
            className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sanitize & Protect
          </button>
        </div>

        {/* Output Pane */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Sanitized Result</h3>
            </div>
            {output && (
              <button
                onClick={copyResult}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-[#8A9BBE] hover:text-blue-600 transition-all border border-gray-100 dark:border-white/5"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy Query'}
              </button>
            )}
          </div>

          <div className="flex-1 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 relative overflow-hidden">
            {!output && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-[#4A6080] opacity-50">
                <Lock className="w-12 h-12 mb-2" strokeWidth={1} />
                <span className="text-xs font-bold uppercase tracking-widest">Locked Output</span>
              </div>
            )}
            <code className="text-sm font-mono text-blue-600 dark:text-[#00D4B4] whitespace-pre-wrap break-all">
              {output}
            </code>
          </div>

          {vulnerabilities.length > 0 && (
            <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Security Warnings</span>
              </div>
              <ul className="space-y-1">
                {vulnerabilities.map((v, i) => (
                  <li key={i} className="text-[11px] text-gray-600 dark:text-[#8A9BBE] font-medium">• {v}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 text-center">
        <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-medium italic">
          Disclaimer: This tool provides basic string-based sanitization. Always use Prepared Statements or ORM parameterization in production environments to fully prevent SQL injection.
        </p>
      </div>
    </div>
  )
}

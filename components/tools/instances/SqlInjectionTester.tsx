'use client'

import React, { useState } from 'react'
import { Database, AlertTriangle, ShieldCheck, Search, Copy, Check, Info } from 'lucide-react'

export default function SqlInjectionTester() {
  const [query, setQuery] = useState('')
  const [findings, setFindings] = useState<{ type: string; risk: 'low' | 'medium' | 'high'; description: string; matches: string[] }[]>([])

  const auditQuery = () => {
    const results: typeof findings = []
    
    const tests = [
      {
        type: 'Tautology (Always True)',
        pattern: /(' OR '1'='1'|' OR 1=1|OR TRUE|OR 1=1)/gi,
        risk: 'high' as const,
        description: 'Detected bypass logic that forces a query to return all records by creating an always-true condition.'
      },
      {
        type: 'Union Based Injection',
        pattern: /(UNION SELECT|UNION ALL SELECT)/gi,
        risk: 'high' as const,
        description: 'Detected attempt to join an unauthorized SELECT statement to the original query.'
      },
      {
        type: 'Comment Obfuscation',
        pattern: /(--|\/\*|#)/gi,
        risk: 'medium' as const,
        description: 'Detected SQL comments used to truncate the original query and execute malicious tail logic.'
      },
      {
        type: 'Stacked Queries',
        pattern: /;/g,
        risk: 'medium' as const,
        description: 'Detected semicolons used to append secondary malicious commands (e.g., DROP TABLE).'
      },
      {
        type: 'Error-Based Probing',
        pattern: /(@@version|DB_NAME|USER_NAME|GROUP BY|ORDER BY)/gi,
        risk: 'low' as const,
        description: 'Detected common probing keywords used to extract database schema information through error messages.'
      }
    ]

    tests.forEach(test => {
      const matches = query.match(test.pattern)
      if (matches) {
        results.push({
          ...test,
          matches: Array.from(new Set(matches))
        })
      }
    })

    setFindings(results)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">SQL Injection Auditor</h3>
        </div>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SELECT * FROM users WHERE id = '1' OR '1'='1' --"
          className="w-full h-40 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono outline-none"
        />

        <button 
          onClick={auditQuery}
          className="w-full mt-6 py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
        >
          <Search className="w-4 h-4" /> Audit SQL Syntax
        </button>
      </div>

      {findings.length > 0 ? (
        <div className="space-y-4">
          {findings.map((f, i) => (
            <div key={i} className={`p-6 rounded-3xl border flex items-start gap-4 ${f.risk === 'high' ? 'bg-red-500/5 border-red-500/10' : 'bg-orange-500/5 border-orange-500/10'}`}>
              <div className={`mt-1 p-2 rounded-xl ${f.risk === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-widest text-[10px]">{f.type}</h4>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${f.risk === 'high' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'}`}>{f.risk}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-3">{f.description}</p>
                <div className="flex flex-wrap gap-2">
                  {f.matches.map((m, j) => (
                    <code key={j} className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-[10px] font-mono text-red-500 border border-black/5">{m}</code>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : query && (
        <div className="p-8 border-2 border-dashed border-green-500/20 bg-green-500/5 rounded-3xl flex flex-col items-center text-center animate-in zoom-in-95">
          <ShieldCheck className="w-12 h-12 text-green-500 mb-3" />
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Clean Query Profile</h3>
          <p className="text-xs text-gray-500 dark:text-[#8A9BBE] mt-1 font-medium">No common SQL injection patterns detected in this input.</p>
        </div>
      )}
    </div>
  )
}

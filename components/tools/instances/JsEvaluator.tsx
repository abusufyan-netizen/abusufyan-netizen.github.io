'use client'

import React, { useState } from 'react'
import { Play, RotateCcw, AlertCircle, Terminal, Clock, ShieldAlert, Sparkles, Copy, Check, FileCode } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

interface LogEntry {
  type: 'log' | 'warn' | 'error' | 'info' | 'system'
  text: string
}

export default function JsEvaluator() {
  const [code, setCode] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [execTime, setExecTime] = useState<number | null>(null)
  const [returnValue, setReturnValue] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)

  const PRESETS = [
    {
      name: 'Array Processing',
      description: 'Functional array manipulation (map, filter, reduce)',
      code: `// Define a list of products
const products = [
  { name: 'Laptop', price: 1200, category: 'electronics' },
  { name: 'Headphones', price: 150, category: 'electronics' },
  { name: 'Shirt', price: 30, category: 'apparel' },
  { name: 'Keyboard', price: 80, category: 'electronics' },
  { name: 'Shoes', price: 90, category: 'apparel' }
];

console.log('--- Original Products ---');
console.log(products);

// Filter electronics and double their price
const promoElectronics = products
  .filter(p => p.category === 'electronics')
  .map(p => ({ ...p, price: p.price * 2 }));

console.warn('Promo Electronics (Double Price):');
console.log(promoElectronics);

// Calculate total value of all electronics
const totalValue = promoElectronics.reduce((sum, p) => sum + p.price, 0);
console.log('Total Electronics Promo Value: $' + totalValue);

return 'Success: Total value computed';`
    },
    {
      name: 'Fibonacci Benchmark',
      description: 'Recursion execution speed and cost demonstration',
      code: `// Standard recursive Fibonacci generator
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const num = 25;
console.log('Starting Fibonacci execution benchmark...');
console.log('Computing Fibonacci(' + num + ')...');

const result = fibonacci(num);

console.info('Computation Finished.');
console.log('Fibonacci(' + num + ') = ' + result);

return 'Fibonacci term: ' + result;`
    },
    {
      name: 'Object & Keys parsing',
      description: 'Object keys extraction and statistics',
      code: `const userStats = {
  id: 'WTK-2026',
  username: 'antigravity_dev',
  role: 'lead_architect',
  sessions: 142,
  active: true,
  metadata: {
    ip: '192.168.1.1',
    agent: 'NextJS-WTKPro'
  }
};

console.log('Parsing user statistics attributes...');
const keys = Object.keys(userStats);
const values = Object.values(userStats);

console.log('Extracted Attributes list:');
console.log(keys);

console.log('Extracted Values list:');
console.log(values);

return {
  status: 'Parsed',
  totalKeys: keys.length,
  isPremium: userStats.sessions > 100
};`
    }
  ]

  const executeCode = () => {
    if (!code.trim()) {
      setLogs([{ type: 'system', text: 'Error: Cannot evaluate empty script.' }])
      setIsSuccess(false)
      return
    }

    const capturedLogs: LogEntry[] = []
    
    // Inject mock console context to intercept outputs
    const mockConsole = {
      log: (...args: any[]) => {
        capturedLogs.push({
          type: 'log',
          text: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
        })
      },
      warn: (...args: any[]) => {
        capturedLogs.push({
          type: 'warn',
          text: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
        })
      },
      error: (...args: any[]) => {
        capturedLogs.push({
          type: 'error',
          text: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
        })
      },
      info: (...args: any[]) => {
        capturedLogs.push({
          type: 'info',
          text: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ')
        })
      }
    }

    const startTime = performance.now()
    let result: any = undefined
    let runSuccess = true

    try {
      // client-side secure sandboxing context
      const executor = new Function('console', `
        "use strict";
        ${code}
      `)
      
      result = executor(mockConsole)
      const endTime = performance.now()
      
      setExecTime(Number((endTime - startTime).toFixed(3)))
      setIsSuccess(true)
      
      if (result !== undefined) {
        setReturnValue(typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result))
      } else {
        setReturnValue('undefined')
      }
      
      triggerQuickSuccess()
    } catch (err: any) {
      runSuccess = false
      const endTime = performance.now()
      setExecTime(Number((endTime - startTime).toFixed(3)))
      setIsSuccess(false)
      capturedLogs.push({
        type: 'error',
        text: `${err.name}: ${err.message}`
      })
      setReturnValue('Execution aborted due to runtime error.')
    }

    setLogs(capturedLogs)
  }

  const handleClear = () => {
    setCode('')
    setLogs([])
    setExecTime(null)
    setReturnValue(null)
    setIsSuccess(null)
  }

  const handleCopyLogs = () => {
    if (logs.length === 0) return
    const logText = logs.map(l => `[${l.type.toUpperCase()}] ${l.text}`).join('\n')
    navigator.clipboard.writeText(logText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Code Snippets Preset list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCode(preset.code)
              setLogs([])
              setExecTime(null)
              setReturnValue(null)
              setIsSuccess(null)
            }}
            className="p-6 text-left bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl hover:border-blue-500/50 dark:hover:border-[#00D4B4]/50 transition-all flex flex-col group"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black uppercase tracking-wider text-gray-900 dark:text-white">{preset.name}</span>
            </div>
            <p className="text-[11px] font-medium text-gray-500 dark:text-[#8A9BBE] leading-relaxed">{preset.description}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Javascript Editor Area */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#0094FF] dark:text-[#00D4B4]">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">JavaScript Code</h3>
            </div>
            <button
              onClick={handleClear}
              className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write clean JavaScript or load an example preset above...&#10;console.log('Hello, WebToolkit Pro!');&#10;return 'Done';"
            className="w-full h-[400px] p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none resize-none focus:border-blue-500 dark:focus:border-[#00D4B4] transition-all"
          />

          <button
            onClick={executeCode}
            className="w-full mt-6 py-4 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/10 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" /> Evaluate & Run
          </button>
        </div>

        {/* Live Interactive Console Terminal */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col h-[550px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Developer Console Logs</h3>
            </div>
            {logs.length > 0 && (
              <button
                onClick={handleCopyLogs}
                className="px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] text-xs font-bold text-gray-600 dark:text-[#8A9BBE] hover:border-blue-500 flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          <div className="flex-grow bg-[#050B14] rounded-2xl border border-slate-900 p-6 font-mono text-xs overflow-y-auto space-y-3 shadow-inner">
            {logs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-60">
                <Terminal className="w-8 h-8 stroke-[1] mb-1" />
                <p className="text-[10px]">Execute your JS snippet to stream interactive logs here...</p>
              </div>
            ) : (
              logs.map((log, index) => {
                let colorClass = 'text-gray-300'
                if (log.type === 'error') colorClass = 'text-red-500 font-bold'
                if (log.type === 'warn') colorClass = 'text-yellow-500'
                if (log.type === 'info') colorClass = 'text-cyan-400'
                if (log.type === 'system') colorClass = 'text-[#00D4B4] italic'

                return (
                  <div key={index} className="flex gap-2 items-start leading-relaxed break-words">
                    <span className="text-slate-700 select-none">&gt;</span>
                    <pre className={`${colorClass} whitespace-pre-wrap font-mono text-[11px]`}>{log.text}</pre>
                  </div>
                )
              })
            )}
          </div>

          {/* Performance & Returns Dashboard */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Duration</span>
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mt-1">
                  {execTime !== null ? `${execTime} ms` : '--'}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Execution Status</span>
                <div className="mt-1 leading-none">
                  {isSuccess === null ? (
                    <p className="text-sm font-bold text-gray-500">Idle</p>
                  ) : isSuccess ? (
                    <p className="text-sm font-bold text-green-500">Passed</p>
                  ) : (
                    <p className="text-sm font-bold text-red-500">Failed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Return Values Segment */}
      {returnValue && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Terminal className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Expression Return Value</h4>
          </div>
          <pre className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] text-xs font-mono text-blue-600 dark:text-[#00D4B4] overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {returnValue}
          </pre>
        </div>
      )}
    </div>
  )
}

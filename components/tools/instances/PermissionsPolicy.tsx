'use client'

import React, { useState, useEffect } from 'react'
import { ShieldAlert, Fingerprint, Copy, Check, Info } from 'lucide-react'

const FEATURES = [
  { id: 'camera', name: 'Camera', description: 'Controls access to video input devices.' },
  { id: 'microphone', name: 'Microphone', description: 'Controls access to audio input devices.' },
  { id: 'geolocation', name: 'Geolocation', description: 'Controls access to the Geolocation API.' },
  { id: 'fullscreen', name: 'Fullscreen', description: 'Controls whether the document can use full screen.' },
  { id: 'payment', name: 'Payment', description: 'Controls access to the Payment Request API.' },
  { id: 'usb', name: 'USB', description: 'Controls access to the WebUSB API.' },
  { id: 'interest-cohort', name: 'FLoC (Interest Cohort)', description: 'Controls browser interest cohort tracking.' },
]

export default function PermissionsPolicy() {
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, string>>({
    camera: 'self',
    microphone: 'self',
    geolocation: 'self',
    fullscreen: '*',
    payment: 'self',
  })
  const [policy, setPolicy] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const p = Object.entries(selectedFeatures)
      .map(([feature, value]) => `${feature}=(${value === '*' ? '*' : value === 'self' ? 'self' : '()'})`)
      .join(', ')
    setPolicy(p)
  }, [selectedFeatures])

  const toggleValue = (feature: string) => {
    setSelectedFeatures(prev => {
      const current = prev[feature]
      let next = 'self'
      if (current === 'self') next = '*'
      else if (current === '*') next = 'none'
      else next = 'self'
      return { ...prev, [feature]: next }
    })
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Permissions Policy</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Feature Policy Generator</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer"
              onClick={() => toggleValue(feature.id)}
            >
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-700 dark:text-white mb-1">{feature.name}</h4>
                <p className="text-[9px] text-gray-400 font-medium">{feature.description}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                selectedFeatures[feature.id] === 'self' ? 'bg-blue-500/10 text-blue-600' :
                selectedFeatures[feature.id] === '*' ? 'bg-green-500/10 text-green-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {selectedFeatures[feature.id] || 'none'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Generated Header</h3>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(policy)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] break-all">
          <code className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{policy}</code>
        </div>

        <div className="mt-6 flex items-start gap-3 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-gray-500 dark:text-[#8A9BBE] leading-relaxed font-medium">
            The <span className="font-mono bg-blue-500/10 px-1 rounded">Permissions-Policy</span> header allows you to selectively enable and disable use of various browser features and APIs. Use the toggle buttons above to switch between <span className="text-blue-600">self</span>, <span className="text-green-500">*</span>, and <span className="text-red-500">none</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

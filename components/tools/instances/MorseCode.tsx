'use client'

import React, { useState } from 'react'
import { Radio, ArrowRight, Copy, Check, RotateCcw } from 'lucide-react'

const MORSE_MAP: any = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
}

export default function MorseCode() {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')
  const [copied, setCopied] = useState(false)

  const encodeMorse = () => {
    const res = text.toUpperCase().split('').map(char => MORSE_MAP[char] || '').join(' ')
    setMorse(res)
  }

  const decodeMorse = () => {
    const reverseMap = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]))
    const res = text.split(' ').map(code => reverseMap[code] || '').join('')
    setMorse(res)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Morse Code Translator</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encode or Morse code to decode..."
          className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button onClick={encodeMorse} className="py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">
            Encode Text
          </button>
          <button onClick={decodeMorse} className="py-4 border border-blue-500 text-blue-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all">
            Decode Morse
          </button>
        </div>
      </div>

      {morse && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Result</h3>
            <button onClick={() => { navigator.clipboard.writeText(morse); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] break-all">
            <code className="text-sm font-mono text-blue-600 dark:text-[#00D4B4]">{morse}</code>
          </div>
        </div>
      )}
    </div>
  )
}

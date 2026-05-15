'use client'

import React, { useState, useEffect } from 'react'
import { Volume2, Play, Pause, Square, Settings, VolumeX, Activity, Mic } from 'lucide-react'

export default function TextToSpeechPro() {
  const [text, setText] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>('')

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices()
      setVoices(v)
      if (v.length > 0) setSelectedVoice(v[0].name)
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const speak = () => {
    if (!text) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = voices.find(v => v.name === selectedVoice)
    if (voice) utterance.voice = voice
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Professional Text-to-Speech</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Input Text / Script</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste text here to convert it into natural sounding speech..."
              className="w-full h-80 p-8 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-[2rem] text-sm font-medium outline-none resize-none leading-relaxed shadow-inner"
            />
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-[#1E2D47] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Settings className="w-3 h-3" /> Voice Settings
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Voice Profile</label>
                  <select 
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="w-full p-3 bg-white dark:bg-[#0B1120] border border-black/5 rounded-xl text-[10px] font-bold outline-none appearance-none"
                  >
                    {voices.map((v, i) => (
                      <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">Rate</label>
                    <span className="text-[8px] font-bold text-indigo-600">{rate}x</span>
                  </div>
                  <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">Pitch</label>
                    <span className="text-[8px] font-bold text-indigo-600">{pitch}</span>
                  </div>
                  <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={speak}
                disabled={isSpeaking || !text}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
              >
                <Play className="w-4 h-4" /> Synthesize Speech
              </button>
              <button 
                onClick={stop}
                className="w-full py-4 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Square className="w-4 h-4" /> Stop Playback
              </button>
            </div>
          </div>
        </div>
      </div>

      {isSpeaking && (
        <div className="bg-indigo-600 rounded-3xl p-8 text-white flex items-center justify-between shadow-xl animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4">
            <Activity className="w-6 h-6 animate-pulse" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Now Playing</div>
              <div className="text-sm font-bold truncate max-w-xs">{selectedVoice}</div>
            </div>
          </div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-8 bg-white/40 rounded-full animate-[bounce_1s_infinite]" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

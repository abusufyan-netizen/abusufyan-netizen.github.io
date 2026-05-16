'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Twitter, ImageIcon, Copy, Check, Info } from 'lucide-react'

export default function TwitterCardGen() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [handle, setHandle] = useState('')
  const [cardType, setCardType] = useState<'summary' | 'summary_large_image'>('summary_large_image')

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#1DA1F2]">
            <Twitter className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Twitter Card Generator</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Optimized Social Cards</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Card Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Catchy headline for X/Twitter..."
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">X/Twitter Handle</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@username"
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/card.jpg"
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Card Format</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value as any)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold text-gray-800 dark:text-[#F0F6FF] outline-none appearance-none"
              >
                <option value="summary_large_image">Summary with Large Image</option>
                <option value="summary">Small Summary Card</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short, punchy summary of your link..."
              className="w-full h-24 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
            />
          </div>
        </div>
      </div>

      {/* X/Twitter Card Preview */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">X / Twitter Live Preview</h3>
        <div className={`max-w-[500px] bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-2xl overflow-hidden shadow-lg transition-all ${cardType === 'summary' ? 'flex h-[120px]' : 'block'}`}>
          <div className={`${cardType === 'summary' ? 'w-[120px] h-[120px] shrink-0 border-r dark:border-[#1E2D47]' : 'aspect-[1.91/1] border-b dark:border-[#1E2D47]'} bg-gray-100 dark:bg-[#1E2D47] relative flex items-center justify-center overflow-hidden`}>
            {image ? (
              <Image src={image} alt="Twitter Preview" className="w-full h-full object-cover" fill unoptimized />
            ) : (
              <ImageIcon className="w-8 h-8 opacity-20 text-gray-400" />
            )}
          </div>
          <div className="p-3 space-y-1 flex-1 min-w-0">
            <span className="text-[12px] text-gray-500 dark:text-gray-400">example.com</span>
            <h4 className="text-[14px] font-bold text-gray-900 dark:text-white line-clamp-1">
              {title || 'Catchy headline here'}
            </h4>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-tight">
              {description || 'This is how your description will look on X/Twitter feeds...'}
            </p>
          </div>
        </div>
      </div>

      {/* Code Section */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Twitter Meta Tags</h3>
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] space-y-2 overflow-x-auto">
          <code className="text-[11px] font-mono text-[#1DA1F2] block whitespace-nowrap">
            &lt;meta name=&quot;twitter:card&quot; content=&quot;{`{cardType}`}&quot; /&gt;
          </code>
          <code className="text-[11px] font-mono text-[#1DA1F2] block whitespace-nowrap">
            &lt;meta name=&quot;twitter:site&quot; content=&quot;{`{handle || '@yourhandle'}`}&quot; /&gt;
          </code>
          <code className="text-[11px] font-mono text-[#1DA1F2] block whitespace-nowrap">
            &lt;meta name=&quot;twitter:title&quot; content=&quot;{`{title}`}&quot; /&gt;
          </code>
          <code className="text-[11px] font-mono text-[#1DA1F2] block whitespace-nowrap">
            &lt;meta name=&quot;twitter:description&quot; content=&quot;{`{description}`}&quot; /&gt;
          </code>
          <code className="text-[11px] font-mono text-[#1DA1F2] block whitespace-nowrap">
            &lt;meta name=&quot;twitter:image&quot; content=&quot;{`{image}`}&quot; /&gt;
          </code>
        </div>
      </div>
    </div>
  )
}

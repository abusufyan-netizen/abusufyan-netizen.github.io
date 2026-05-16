'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Share2, Image as ImageIcon, Link2, Copy, Check, Info } from 'lucide-react'

export default function OgDebugger() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Open Graph Preview</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Social Meta Debugger</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">OG Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The headline of your shareable content..."
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">OG Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/social-card.jpg"
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">OG Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief summary of your content for social feeds..."
              className="w-full h-24 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Social Card Preview */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Facebook / LinkedIn Preview</h3>
        <div className="max-w-[500px] bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-[#1E2D47] rounded-xl overflow-hidden shadow-lg">
          <div className="aspect-[1.91/1] bg-gray-100 dark:bg-[#1E2D47] relative flex items-center justify-center overflow-hidden">
            {image ? (
              <Image src={image} alt="OG Preview" className="w-full h-full object-cover" fill unoptimized />
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-30 text-gray-400">
                <ImageIcon className="w-12 h-12" />
                <span className="text-[10px] font-black uppercase tracking-widest">Image Placeholder</span>
              </div>
            )}
          </div>
          <div className="p-4 space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">DOMAIN.COM</span>
            <h4 className="text-[16px] font-black text-gray-900 dark:text-white line-clamp-1">
              {title || 'Your Content Headline'}
            </h4>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {description || 'This is where your content description will appear on social media platforms like Facebook and LinkedIn.'}
            </p>
          </div>
        </div>
      </div>

      {/* Generated Tags */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">OG Meta Tags</h3>
          <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] space-y-2 overflow-x-auto">
          <code className="text-[11px] font-mono text-blue-600 dark:text-[#00D4B4] block whitespace-nowrap">
            &lt;meta property=&quot;og:title&quot; content=&quot;{`{title}`}&quot; /&gt;
          </code>
          <code className="text-[11px] font-mono text-blue-600 dark:text-[#00D4B4] block whitespace-nowrap">
            &lt;meta property=&quot;og:description&quot; content=&quot;{`{description}`}&quot; /&gt;
          </code>
          <code className="text-[11px] font-mono text-blue-600 dark:text-[#00D4B4] block whitespace-nowrap">
            &lt;meta property=&quot;og:image&quot; content=&quot;{`{image}`}&quot; /&gt;
          </code>
          <code className="text-[11px] font-mono text-blue-600 dark:text-[#00D4B4] block whitespace-nowrap">
            &lt;meta property=&quot;og:type&quot; content=&quot;website&quot; /&gt;
          </code>
        </div>
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import { Zap, ArrowRight } from 'lucide-react'
import { ToolConfig } from '@/types/tool'

interface RelatedToolsSidebarProps {
  relatedTools: ToolConfig[]
}

export default function RelatedToolsSidebar({ relatedTools }: RelatedToolsSidebarProps) {
  if (relatedTools.length === 0) return null

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight text-sm">Related Utilities</h3>
      </div>
      
      <div className="space-y-4">
        {relatedTools.map((tool) => (
          <Link 
            key={tool.slug}
            href={`/tools/${tool.slug}/`}
            className="block group"
          >
            <div className="p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-transparent hover:border-blue-100 dark:hover:border-blue-800 transition-all">
              <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm mb-1 transition-colors">
                {tool.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1">
                {tool.content.description}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Launch <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

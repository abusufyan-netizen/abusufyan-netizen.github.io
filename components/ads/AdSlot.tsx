'use client'

import React from 'react'

interface AdSlotProps {
  className?: string
  id?: string
  minHeight?: string
}

const AdSlot: React.FC<AdSlotProps> = ({ className = '', id, minHeight = '90px' }) => {
  return (
    <div 
      className={`w-full overflow-hidden flex items-center justify-center transition-all bg-gray-50/50 dark:bg-slate-900/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-800 ${className}`}
      style={{ minHeight }}
      aria-hidden="true"
    >
      <div 
        id={id}
        className="ads-container w-full"
        data-ad-slot-ready="true"
      >
        {/* AdSense will inject content here */}
      </div>
    </div>
  )
}

export default AdSlot

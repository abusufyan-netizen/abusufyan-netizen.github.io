'use client'

import React from 'react'

interface AdSlotProps {
  className?: string
  id?: string
}

const AdSlot: React.FC<AdSlotProps> = ({ className = '', id }) => {
  return (
    <div 
      className={`w-full overflow-hidden flex items-center justify-center transition-all ${className}`}
      aria-hidden="true"
    >
      {/* 
        Google AdSense Placeholder
        When you are ready to go live, replace the content inside here with your 
        actual <ins className="adsbygoogle" ...></ins> tags.
      */}
      <div 
        id={id}
        className="ads-container w-full min-h-[50px] opacity-0 group-hover:opacity-100 transition-opacity"
        data-ad-slot-ready="true"
      >
        {/* AdSense will inject content here */}
      </div>
    </div>
  )
}

export default AdSlot

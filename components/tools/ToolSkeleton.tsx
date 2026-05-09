import React from 'react'

export default function ToolSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-8">
      {/* Input Area Skeleton */}
      <div className="h-64 bg-gray-100 dark:bg-slate-800 rounded-3xl" />
      
      {/* Controls Skeleton */}
      <div className="flex flex-wrap gap-4">
        <div className="h-12 w-32 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
        <div className="h-12 w-32 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
        <div className="h-12 w-32 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
      </div>

      {/* Output Area Skeleton (Optional) */}
      <div className="h-48 bg-gray-50 dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800" />
    </div>
  )
}

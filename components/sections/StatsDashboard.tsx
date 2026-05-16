import React from 'react'
import { Zap, Code, Shield, Clock } from 'lucide-react'
import { getGlobalStats } from '@/lib/stats'

export default async function StatsDashboard() {
  const stats = await getGlobalStats()

  const statItems = [
    { label: 'Tools Live', value: '150+', icon: Zap },
    { label: 'Privacy', value: 'Local-Only', icon: Shield },
    { label: 'Latency', value: '< 1ms', icon: Clock },
    { label: 'Open Source', value: 'Verified', icon: Code },
  ]

  return (
    <section className="py-[var(--space-md)] bg-background border-b border-border">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {statItems.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center group">
            <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2 transition-transform group-hover:scale-110" />
            <div className="text-[var(--font-size-2xl)] font-black text-foreground leading-none mb-1 min-h-[1em] flex items-center justify-center">
              {stat.value}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

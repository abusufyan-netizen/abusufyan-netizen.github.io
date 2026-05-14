import React from 'react'
import type { Metadata } from 'next'


export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}

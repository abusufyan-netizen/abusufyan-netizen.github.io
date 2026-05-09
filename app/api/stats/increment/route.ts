import { NextResponse } from 'next/server'
import { incrementToolRun } from '@/lib/stats'

export async function POST() {
  const newTotal = await incrementToolRun()
  return NextResponse.json({ success: true, toolsRun: newTotal })
}

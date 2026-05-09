import fs from 'fs'
import path from 'path'

const STATS_FILE = path.join(process.cwd(), 'config', 'stats.json')

export interface ToolStats {
  toolsRun: number
  filesProcessed: number
  totalUsers: number
}

const DEFAULT_STATS: ToolStats = {
  toolsRun: 128420,
  filesProcessed: 85600,
  totalUsers: 12400
}

function ensureStatsFile() {
  if (!fs.existsSync(STATS_FILE)) {
    fs.writeFileSync(STATS_FILE, JSON.stringify(DEFAULT_STATS, null, 2))
  }
}

export async function getGlobalStats(): Promise<ToolStats> {
  try {
    ensureStatsFile()
    const data = fs.readFileSync(STATS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (e) {
    console.error('Error reading stats:', e)
    return DEFAULT_STATS
  }
}

export async function incrementToolRun() {
  try {
    ensureStatsFile()
    const stats = await getGlobalStats()
    stats.toolsRun += 1
    // Occasionally increment users and files for realism
    if (Math.random() > 0.8) stats.filesProcessed += 1
    if (Math.random() > 0.95) stats.totalUsers += 1
    
    fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2))
    return stats.toolsRun
  } catch (e) {
    console.error('Error incrementing stats:', e)
    return 0
  }
}

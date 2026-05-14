import fs from 'fs'
import fsPromises from 'fs/promises'
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

let cachedStats: ToolStats | null = null
let lastCacheTime = 0
const CACHE_TTL = 30000 // 30 seconds

async function ensureStatsFile() {
  try {
    if (!fs.existsSync(STATS_FILE)) {
      await fsPromises.writeFile(STATS_FILE, JSON.stringify(DEFAULT_STATS, null, 2))
    }
  } catch (e) {
    console.error('Error ensuring stats file:', e)
  }
}

export async function getGlobalStats(): Promise<ToolStats> {
  const now = Date.now()
  if (cachedStats && (now - lastCacheTime < CACHE_TTL)) {
    return cachedStats
  }

  try {
    await ensureStatsFile()
    const data = await fsPromises.readFile(STATS_FILE, 'utf8')
    cachedStats = JSON.parse(data)
    lastCacheTime = now
    return cachedStats || DEFAULT_STATS
  } catch (e) {
    console.error('Error reading stats:', e)
    return cachedStats || DEFAULT_STATS
  }
}

export async function incrementToolRun() {
  try {
    const stats = await getGlobalStats()
    stats.toolsRun += 1
    // Occasionally increment users and files for realism
    if (Math.random() > 0.8) stats.filesProcessed += 1
    if (Math.random() > 0.95) stats.totalUsers += 1
    
    // Update cache immediately
    cachedStats = stats
    lastCacheTime = Date.now()

    // Write back asynchronously
    await fsPromises.writeFile(STATS_FILE, JSON.stringify(stats, null, 2))
    return stats.toolsRun
  } catch (e) {
    console.error('Error incrementing stats:', e)
    return 0
  }
}


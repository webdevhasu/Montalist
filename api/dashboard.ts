import type { IncomingMessage, ServerResponse } from 'http'
import { getPreOrders, getPreOrderCount } from './db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'montalist2026'

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.writeHead(405)
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const authHeader = req.headers.authorization
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    res.writeHead(401)
    res.end(JSON.stringify({ error: 'Unauthorized' }))
    return
  }

  try {
    const orders = await getPreOrders()
    const count = await getPreOrderCount()

    res.writeHead(200)
    res.end(JSON.stringify({ total: count, orders }))
  } catch (error: any) {
    console.error('Dashboard error:', error?.message || error)
    res.writeHead(500)
    res.end(JSON.stringify({ error: 'Server error' }))
  }
}

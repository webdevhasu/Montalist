import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getPreOrders, getPreOrderCount } from './db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'montalist2026'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const orders = await getPreOrders()
    const count = await getPreOrderCount()

    return res.status(200).json({
      total: count,
      orders,
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return res.status(500).json({ error: 'Server error' })
  }
}

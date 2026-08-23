import { getPreOrders, getPreOrderCount } from './db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'montalist2026'

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) return res.status(401).json({ error: 'Unauthorized' })

  try {
    const orders = await getPreOrders()
    const count = await getPreOrderCount()
    return res.status(200).json({ total: count, orders })
  } catch (error: any) {
    console.error('Dashboard error:', error?.message || error)
    return res.status(500).json({ error: 'Server error' })
  }
}

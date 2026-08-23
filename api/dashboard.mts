export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || ''
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || ''
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'montalist2026'

  const auth = req.headers.authorization
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) return res.status(401).json({ error: 'Unauthorized' })

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({ error: 'Database not configured.' })
  }

  try {
    const headers = {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    }

    const dataRes = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(['HGETALL', 'preorders']),
    })
    const data = await dataRes.json()

    const countRes = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(['GET', 'preorder_count']),
    })
    const countData = await countRes.json()

    const orders: any[] = []
    if (data?.result) {
      const entries = data.result
      for (let i = 0; i < entries.length; i += 2) {
        try { orders.push(JSON.parse(entries[i + 1])) } catch {}
      }
    }
    orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return res.status(200).json({
      total: countData?.result ? parseInt(countData.result) || 0 : 0,
      orders,
    })
  } catch (error: any) {
    console.error('Dashboard error:', error?.message || error)
    return res.status(500).json({ error: 'Server error' })
  }
}

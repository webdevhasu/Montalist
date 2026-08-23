export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || ''
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || ''

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({ error: 'Database not configured.' })
  }

  try {
    const { name, phone, city, email, skinConcern, consent } = req.body || {}

    if (!name || !phone || !city || !skinConcern || !consent) {
      return res.status(400).json({ error: 'Sab required fields fill karein.' })
    }

    const id = `po_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const order = {
      id,
      name: String(name).trim(),
      phone: String(phone).trim(),
      city: String(city).trim(),
      email: String(email || '').trim(),
      skinConcern: String(skinConcern),
      consent: Boolean(consent),
      createdAt: new Date().toISOString(),
    }

    const headers = {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    }

    await fetch(UPSTASH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(['HSET', 'preorders', id, JSON.stringify(order)]),
    })

    const countRes = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(['INCR', 'preorder_count']),
    })
    const countData = await countRes.json()

    return res.status(200).json({
      success: true,
      id: order.id,
      totalReservations: countData?.result || 0,
    })
  } catch (error: any) {
    console.error('Pre-order error:', error?.message || error)
    return res.status(500).json({ error: 'Server error. Dobara try karein.' })
  }
}

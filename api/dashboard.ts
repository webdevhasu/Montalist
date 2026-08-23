export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } })
  }

  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || ''
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || ''
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'montalist2026'

  const auth = request.headers.get('authorization')
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } })
  }

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return new Response(JSON.stringify({ error: 'Database not configured.' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }

  try {
    const headers = { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' }

    const dataRes = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(['HGETALL', 'preorders']),
    })
    const data = await dataRes.json() as any

    const countRes = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(['GET', 'preorder_count']),
    })
    const countData = await countRes.json() as any

    const orders: any[] = []
    if (data?.result) {
      const entries = data.result
      for (let i = 0; i < entries.length; i += 2) {
        try { orders.push(JSON.parse(entries[i + 1])) } catch {}
      }
    }
    orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return new Response(JSON.stringify({
      total: countData?.result ? parseInt(countData.result) || 0 : 0,
      orders,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (error: any) {
    console.error('Dashboard error:', error?.message || error)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

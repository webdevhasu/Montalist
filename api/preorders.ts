export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || ''
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || ''

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return new Response(JSON.stringify({ error: 'Database not configured.' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  try {
    const body = await request.json()
    const { name, phone, city, email, skinConcern, consent } = body || {}

    if (!name || !phone || !city || !skinConcern || !consent) {
      return new Response(JSON.stringify({ error: 'Sab required fields fill karein.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
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

    const headers = { Authorization: `Bearer ${UPSTASH_TOKEN}`, 'Content-Type': 'application/json' }

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
    const countData = await countRes.json() as any

    return new Response(JSON.stringify({ success: true, id: order.id, totalReservations: countData?.result || 0 }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Pre-order error:', error?.message || error)
    return new Response(JSON.stringify({ error: 'Server error. Dobara try karein.' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
}

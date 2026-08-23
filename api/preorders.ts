import type { IncomingMessage, ServerResponse } from 'http'
import { savePreOrder, getPreOrderCount } from './db'

interface PreOrderBody {
  name?: string
  phone?: string
  city?: string
  email?: string
  skinConcern?: string
  consent?: boolean
}

function parseBody(req: IncomingMessage): Promise<PreOrderBody> {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(body)) }
      catch { resolve({}) }
    })
  })
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405)
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  try {
    const body = await parseBody(req)
    const { name, phone, city, email, skinConcern, consent } = body

    if (!name || !phone || !city || !skinConcern || !consent) {
      res.writeHead(400)
      res.end(JSON.stringify({ error: 'Sab required fields fill karein.' }))
      return
    }

    const order = await savePreOrder({
      name: String(name).trim(),
      phone: String(phone).trim(),
      city: String(city).trim(),
      email: String(email || '').trim(),
      skinConcern: String(skinConcern),
      consent: Boolean(consent),
    })

    const count = await getPreOrderCount()

    res.writeHead(200)
    res.end(JSON.stringify({
      success: true,
      id: order.id,
      totalReservations: count,
    }))
  } catch (error: any) {
    console.error('Pre-order error:', error?.message || error)
    res.writeHead(500)
    res.end(JSON.stringify({ error: 'Server error. Dobara try karein.' }))
  }
}

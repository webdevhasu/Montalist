import type { VercelRequest, VercelResponse } from '@vercel/node'
import { savePreOrder, getPreOrderCount } from './db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, phone, city, email, skinConcern, consent } = req.body

    if (!name || !phone || !city || !skinConcern || !consent) {
      return res.status(400).json({ error: 'Missing required fields' })
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

    return res.status(200).json({
      success: true,
      id: order.id,
      totalReservations: count,
    })
  } catch (error) {
    console.error('Pre-order error:', error)
    return res.status(500).json({ error: 'Server error. Please try again.' })
  }
}

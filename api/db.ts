const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || ''
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || ''

async function redisCommand(command: string[]): Promise<any> {
  const res = await fetch(UPSTASH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })
  if (!res.ok) throw new Error(`Redis error: ${res.status}`)
  return res.json()
}

export interface PreOrder {
  id: string
  name: string
  phone: string
  city: string
  email: string
  skinConcern: string
  consent: boolean
  createdAt: string
}

export async function savePreOrder(order: Omit<PreOrder, 'id' | 'createdAt'>): Promise<PreOrder> {
  const id = `po_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const fullOrder: PreOrder = {
    ...order,
    id,
    createdAt: new Date().toISOString(),
  }

  await redisCommand(['HSET', 'preorders', id, JSON.stringify(fullOrder)])
  await redisCommand(['INCR', 'preorder_count'])

  return fullOrder
}

export async function getPreOrders(): Promise<PreOrder[]> {
  const data = await redisCommand(['HGETALL', 'preorders'])
  if (!data?.result) return []

  const result: PreOrder[] = []
  const entries = data.result
  for (let i = 0; i < entries.length; i += 2) {
    try {
      result.push(JSON.parse(entries[i + 1]))
    } catch {}
  }
  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getPreOrderCount(): Promise<number> {
  const data = await redisCommand(['GET', 'preorder_count'])
  return data?.result ? parseInt(data.result) || 0 : 0
}

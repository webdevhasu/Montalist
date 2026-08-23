import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

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

  await redis.hset('preorders', { [id]: JSON.stringify(fullOrder) })
  await redis.incr('preorder_count')

  return fullOrder
}

export async function getPreOrders(): Promise<PreOrder[]> {
  const data = await redis.hgetall('preorders')
  if (!data) return []

  return Object.values(data)
    .map((v) => JSON.parse(v as string) as PreOrder)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getPreOrderCount(): Promise<number> {
  const count = await redis.get<number>('preorder_count')
  return count || 0
}

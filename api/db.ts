import { Redis } from '@upstash/redis'

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || ''
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || ''

const useUpstash = !!(UPSTASH_URL && UPSTASH_TOKEN)

let redis: Redis | null = null
if (useUpstash) {
  redis = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN })
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

  if (useUpstash && redis) {
    await redis.hset('preorders', { [id]: JSON.stringify(fullOrder) })
    await redis.incr('preorder_count')
  }

  return fullOrder
}

export async function getPreOrders(): Promise<PreOrder[]> {
  if (useUpstash && redis) {
    const data = await redis.hgetall('preorders')
    if (!data) return []
    return Object.values(data)
      .map((v) => JSON.parse(v as string) as PreOrder)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  return []
}

export async function getPreOrderCount(): Promise<number> {
  if (useUpstash && redis) {
    const count = await redis.get<number>('preorder_count')
    return count || 0
  }
  return 0
}

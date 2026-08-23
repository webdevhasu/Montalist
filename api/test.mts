export default async function handler(req: any, res: any) {
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || ''
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || ''

  return res.status(200).json({
    hasUrl: !!UPSTASH_URL,
    hasToken: !!UPSTASH_TOKEN,
    method: req.method,
  })
}

export const config = { runtime: 'edge' }

export default async function handler(): Promise<Response> {
  return new Response(JSON.stringify({
    ok: true,
    hasUrl: !!process.env.UPSTASH_REDIS_REST_URL,
    hasToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
  }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

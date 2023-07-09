import Redis from 'ioredis'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const SESSION_COOKIE_NAME = 'app_session'

// By default, it will connect to localhost:6379.
const redis = new Redis()

type Primitive = string | number | boolean | null | undefined

class Session {
  constructor(private id: string) {}

  async set(key: string, value: Primitive) {
    const prev = JSON.parse(await redis.get(this.id) ?? '{}')
    const json = JSON.stringify({
      ...prev,
      [key]: value,
    })
    await redis.set(this.id, json)
    await redis.expire("foo", 600); // 10 minutes
  }

  async get(key: string) {
    const json = JSON.parse(await redis.get(this.id) ?? '{}')
    return json[key]
  }
}

export function session() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!sessionCookie) {
    redirect('/api/init_session')
  }
  return new Session(sessionCookie)
}

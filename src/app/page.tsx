import { session } from '@/lib/session'

export default async function Home() {
  const sessionStore = session()
  await sessionStore.set('counter', (await sessionStore.get('counter') ?? 0) + 1)
  return (
    <main>
      <h1>Top</h1>
      <p>session counter: { JSON.stringify(await sessionStore.get('counter')) }</p>
    </main>
  )
}

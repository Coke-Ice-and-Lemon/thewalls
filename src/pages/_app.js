import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import { Space_Grotesk } from 'next/font/google'
const space = Space_Grotesk({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {


  return (
    <SessionProvider session={session}>
      <Head>
        <title>THE WALLS</title>
        <meta name="description" content="Get your most played tracks from Spotify." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={space.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
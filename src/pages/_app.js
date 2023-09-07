import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Gramophone</title>
        <meta name="description" content="Get your most played tracks from Spotify." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
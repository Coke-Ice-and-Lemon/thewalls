import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import { Space_Grotesk } from 'next/font/google'
import { useEffect, useState } from 'react'
const space = Space_Grotesk({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  const getFaviconPath = (isDarkMode = false) => {
    return `/favicon-${isDarkMode ? "dark" : "light"}.ico`;
  };

  return (
    <SessionProvider session={session}>
      <Head>
        <title>THE WALLS</title>
        <meta name="description" content="Veiw your top tracks. go crazy. have fun" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="THE WALLS" />
        <meta property="og:description" content="Veiw your top tracks. go crazy. have fun" />
        <meta property="og:type" content="website" />
        <meta property="og:image:alt" content="THE WALLS" />
        <meta property="og:url" content="https://thewalls.vercel.app" />
        <meta property="og:site_name" content="THE WALLS" />
        <meta name="twitter:title" content="THE WALLS" />
        <meta name="twitter:description" content="Veiw your top tracks. go crazy. have fun" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon-light.ico" />
      </Head>
      <main className={space.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
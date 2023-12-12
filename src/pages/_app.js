import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import '@/styles/tutorialstyle.css'
import { SessionProvider } from "next-auth/react"
import { Space_Grotesk } from 'next/font/google'
import Head from 'next/head'
const space = Space_Grotesk({ subsets: ['latin'] })
import { Analytics } from '@vercel/analytics/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
      <SessionProvider session={session}>
        <Head>
          <title>THE WALLS</title>
          <meta name="google-site-verification" content="ufjB4lpFxeLeyrleMdoU3BtoNleUMd-Wb53g-gZzEiQ" />
          <meta name="google-site-verification" content="vQnQ68HdfmmibXFcdoNnSQdlzKngM4K5hLAfjXrUd4E" />
          <meta name="description" content="Veiw your top tracks. go crazy. have fun" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="THE WALLS" />
          <meta property="og:description" content="Veiw your top tracks. go crazy. have fun" />
          <meta property="og:type" content="website" />
          <meta property="og:image:alt" content="THE WALLS" />
          <meta property="og:image" content="https://i.ibb.co/zsSPcN4/banner-image.png" />
          <meta property="og:url" content="https://thewalls.vercel.app" />
          <meta property="og:site_name" content="THE WALLS" />
          <meta name="twitter:title" content="THE WALLS" />
          <meta name="twitter:description" content="Veiw your top tracks. go crazy. have fun" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content="https://i.ibb.co/zsSPcN4/banner-image.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="bingbot" content="index, follow" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="keywords" content="Spotify playlist, music recommendations, curated playlists, music discovery, artist insights, genre exploration, top tracks, hit songs, album reviews, music trends, streaming service, audio content, personalized music, user-generated playlists, collaborative playlists, Spotify stats, music analytics, favorite genres, explore music, music curation, music library, on-demand streaming, thewalls, spotify wrapped,wrap of the year, top songs of the month, top tracks of the month, favourite top songs, top tracks,the,walls,wrap of the year" />
          <link rel="icon" href="/favicon-light.ico" />
        </Head>
        <main className={space.className}>
          <Navbar />
          <Analytics />
          <Component {...pageProps} />
        </main>
      </SessionProvider>
  )
}
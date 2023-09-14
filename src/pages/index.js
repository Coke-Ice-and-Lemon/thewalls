import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Navbar />
      <Head>
        <title>THE WALLS</title>
        <meta name="description" content="Get your most played tracks from Spotify." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex flex-col items-center h-screen justify-center">
        <h1 className='mb-5 text-3xl font-bold'>THE WALLS</h1>
        <button className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg" onClick={() => signIn('spotify', { callbackUrl: "/explore" })}>Login with spotify</button>
        <div className='flex flex-col justify-center w-6/12 md:11/12 items-center'>
          <Image className="animate-spin-slow my-5" src='/vinyl.png' width={300} height={300} />
          {/* <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/track/0ikz6tENMONtK6qGkOrU3c?utm_source=generator&theme=0" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
        </div>
      </div>
    </>
  )
}

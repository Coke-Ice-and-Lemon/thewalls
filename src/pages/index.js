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
        <div className='flex flex-row justify-center w-6/12 md:11/12'>
          <Image className="animate-spin-slow mt-5" src='/vinyl.png' width={300} height={300} alt="" />
        </div>
      </div>
    </>
  )
}

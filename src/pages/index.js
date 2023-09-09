import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Navbar from '../components/Navbar'


export default function Home() {
  return (
    <>
      <Navbar />
      <Head>
        <title>GRAMOPHINE</title>
        <meta name="description" content="Get your most played tracks from Spotify." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex flex-col items-center mt-20">
        <h1 className='mb-5 text-3xl font-bold'>GRAMOPHONE</h1>
        <button className="text-white px-8 py-2 rounded-full bg-green-500 font-bold text-lg" onClick={() => signIn('spotify', { callbackUrl: "/explore" })}>Login with spotify</button>
      </div>
    </>
  )
}

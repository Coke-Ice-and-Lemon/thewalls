import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from "next/image";
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center h-screen justify-center">
        <Image src="/idk258.svg" width={100} height={100} />
        <h1 className='my-5 text-[#fffded] text-3xl font-bold'>THE WALLS</h1>
        <button className="text-[#fffded] px-5 py-2 rounded-lg bg-[#1DB954] font-bold text-lg flex flex-row items-center" onClick={() => signIn('spotify', { callbackUrl: "/explore" })}>
          <Image src="/spotify.svg" width={20} height={20} />
          <p className='ml-1 font-sans'>
            Login with Spotify
          </p>
        </button>
      </div>
    </>
  )
}

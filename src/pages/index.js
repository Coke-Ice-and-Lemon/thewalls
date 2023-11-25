import { signIn } from 'next-auth/react';
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col items-center h-screen justify-center">
        <Image src="/idk258.svg" width={100} height={100} />
        <h1 className=' text-[#fffded] text-3xl font-bold'>THE WALLS</h1>
        <button className="text-[#fffded] px-5 py-2 rounded-lg bg-[#1DB954] font-bold text-lg flex flex-row items-center my-5" onClick={() => signIn('spotify', { callbackUrl: "/explore" })}>
          <Image src="/spotify.svg" alt='spotify_logo' width={20} height={20} />
          <p className='ml-1 font-sans'>
            Login with Spotify
          </p>
        </button>
        <div class="w-[80%] md:w-max">
          <p className='text-xs font-bold text-center italic'>ready to create your wall? get in.</p>
        </div>
      </div>
    </>
  )
}

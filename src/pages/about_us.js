import Image from 'next/image';
import Link from "next/link";

const AboutUs = () => {
  return (
    <>
      <div className="container mx-auto px-4 flex flex-col justify-center items-center mt-28 w-full">
        <h2 className='text-2xl font-bold'>About Us</h2>
        <div className='flex justify-center w-11/12  md:w-9/12'>
          <div className="flex flex-col flex-wrap md:flex-row justify-between mt-10 ">
            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image width={300} height={300} src={"/harsh.png"} alt="Harsh Mathur" className="w-32 h-32 rounded-full mx-auto" />
              <div className="flex flex-row items-center mt-4 justify-between">
                <h2 className="text-lg font-semibold mr-2">harsh mathur</h2>
                <div className="flex flex-row">
                  <Link href="https://twitter.com/harshwhere" target="_blank" className='mr-2'>
                    <Image src="/icons8-twitter.svg" width={25} height={25} />
                  </Link>
                  <Link href="https://github.com/harshmathurx" target="_blank">
                    <Image src="/icons8-github.svg" width={25} height={25} />
                  </Link>
                </div>
              </div>
              <p className="text-grey-300 text-xs italic">developer (clicks keys)</p>
              <p className="text-grey-300 text-sm mt-2 mb-5">find me jamming to the beatles and the smiths in my room at 3 am; my alternate personality will be dancing on the bar to honey singh at your father&#39;s wedding</p>
              <iframe style={{
                borderRadius:"12px"
              }} 
              src="https://open.spotify.com/embed/track/0p5eZCY0R7uNCZS1YDtIYI?utm_source=generator&theme=0" width="100%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>

            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image width={300} height={300} src={"/pooji.jpg"} alt="Poojan Patel" className="w-32 h-32 rounded-full mx-auto" />
              <div className="flex flex-row items-center mt-4 justify-between">
                <h2 className="text-lg font-semibold mr-2">poojan patel</h2>
                <div className="flex flex-row">
                  <Link href="https://twitter.com/Poojan_bahaha" className='mr-2' target="_blank">
                    <Image src="/icons8-twitter.svg" width={25} height={25} />
                  </Link>
                  <Link href="https://github.com/Poojan-20" target="_blank">
                    <Image src="/icons8-github.svg" width={25} height={25} />
                  </Link>
                </div>
              </div>
              <p className="text-grey-300 text-xs italic">{`developer (rage-quit mode)`}</p>
              <p className="text-grey-300 text-sm mt-2 mb-5">In a parallel universe, I am immersed in Valorant battles with Weekend&#39;s music setting the electrifying mood. On gloomy days,I escape the world with METROOOOOOOO.</p>
              <iframe style={{
                borderRadius:"12px"
              }} 
              src="https://open.spotify.com/embed/track/2Ch7LmS7r2Gy2kc64wv3Bz?utm_source=generator" width="100%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>

            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image width={200} height={200} src="https://avatars.githubusercontent.com/u/58567211" alt="Satish Panchal" className="w-32 h-32 rounded-full mx-auto" />
              <div className="flex flex-row items-center mt-4 justify-between">
                <h2 className="text-lg font-semibold mr-2">satish panchal</h2>
                <div className="flex flex-row">
                  <Link href="http://www.github.com/satisshhhhhh" target="_blank" className='mr-2'>
                    <Image src="/icons8-github.svg" width={25} height={25} />
                  </Link>
                  <Link href="https://www.linkedin.com/in/satish-panchal-26221b203/" target="_blank" className='mr-2'>
                    <Image src="/icons8-linkedin.svg" width={25} height={25} />
                  </Link>
                  <Link href="https://www.instagram.com/satisshhhhhh/" target="_blank">
                    <Image src="/icons8-instagram.svg" width={25} height={25} />
                  </Link>
                </div>
              </div>
              <p className="text-grey-300 text-xs italic">developer / comic / samosa enthusiast </p>
              <p className="text-grey-300 text-sm mt-2 mb-5">In an alternate universe, you and me by the beach, the sun gently descending, you capturing the moment, and me, you. With Taylor Swift&#39;s songs playing in the background, talking about random stuff just like &#34;two headlights shine through the sleepless night.</p>
              <iframe style={{
                borderRadius:"12px"
              }} 
              src="https://open.spotify.com/embed/track/1dGr1c8CrMLDpV6mPbImSI?utm_source=generator&theme=0" width="100%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>

            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image scale="1.1" width={200} height={200} src="/roshni.jpg" alt="Roshni" className="w-32 h-32 rounded-full mx-auto" />
              <div className="flex flex-row items-center mt-4 justify-between">
                <h2 className="text-lg font-semibold mr-2">roshni</h2>
                <div className="flex flex-row">
                  <Link href="https://www.behance.net/roshnisugeesh004" target="_blank">
                    <Image src="/icons8-behance.svg" width={25} height={25} />
                  </Link>
                  <Link href="https://www.instagram.com/_by_roshni/?next=%2F" target="_blank">
                    <Image src="/icons8-instagram.svg" width={25} height={25} />
                  </Link>
                </div>
              </div>
              <p className="text-grey-300 text-xs italic">gareeb designer</p>
              <p className="text-grey-300 text-sm mt-2">Hola! I&#39;m a passionate logo and brand identity designer with a love for art and music.</p>
              <p className="text-grey-300 text-sm">
                Beyond design, my life is punctuated by the electrifying and soulful energy of rock music
                which often serve as a wellspring of inspiration for my creative work.</p>
              <p className="text-grey-300 text-sm mb-5">
                My design philosophy is a harmonious fusion of artistic creativity and the rebellious spirit of rock n roll!</p>
                <iframe style={{
                borderRadius:"12px"
              }} 
              src="https://open.spotify.com/embed/track/4NTMIFWtDXnWN4hDSBlKOf?utm_source=generator" width="100%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>

            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image scale="1.1" width={200} height={200} src="/navya.jpg" alt="navya" className="w-32 h-32 rounded-full mx-auto" />
              <div className="flex flex-row items-center mt-4 justify-between">
                <h2 className="text-lg font-semibold mr-2">navya sharma</h2>
                <div className="flex flex-row">
                  <Link href="https://www.linkedin.com/in/navya-sharma-880126207" target="_blank" className='mr-2'>
                    <Image src="/icons8-linkedin.svg" width={25} height={25} />
                  </Link>
                </div>
              </div>
              <p className="text-grey-300 text-xs italic">annoyingly picky UX engineer</p>
              <p className="text-grey-300 text-sm mt-2">an interaction design student and a ux geek who has an iced coffee in her hands at all times.</p>
              <p className="text-grey-300 text-sm">
                im into art, poetry, reading and all that creative jazz which reminds me that I also love jazz, rock, indie, r&b and hiphop and elevator music because im weird like that.</p>
              <p className="text-grey-300 text-sm mt-2 mb-5"> oh and harsh also wanted me to mention about my obsession with LIIT&#39;s so there&#39;s that.</p>
              <iframe style={{
                borderRadius:"12px"
              }} 
              src="https://open.spotify.com/embed/track/73l2r0EXDHqgC63HL0Xtci?utm_source=generator" width="100%" height="100" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
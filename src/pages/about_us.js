import React from 'react';
import Image from "next/image";
import Navbar from '@/components/Navbar';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 flex flex-col justify-center items-center mt-28 w-full">
        <h2 className='text-2xl font-bold'>About Us</h2>
        <div className='flex justify-center w-9/12'>
          <div className="flex flex-col flex-wrap md:flex-row justify-between mt-10 ">
            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image width={300} height={300} src={"/harsh.png"} alt="Harsh Mathur" className="w-32 h-32 rounded-full mx-auto" />
              <h2 className="text-lg font-semibold mt-4">harsh mathur</h2>
              <p className="text-grey-300 text-xs italic">nocturnal developer</p>
              <p className="text-grey-300 text-sm mt-2">find me jamming to the beatles and arctic monkeys in my room at 3 am; my alternate personality will be dancing on the bar to honey singh at your father&#39;s wedding</p>
            </div>

            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image width={300} height={300} src={"/pooji.jpg"} alt="Poojan Patel" className="w-32 h-32 rounded-full mx-auto" />
              <h2 className="text-lg font-semibold mt-4">poojan patel</h2>
              <p className="text-grey-300 text-xs italic">{`developer (rage-quit mode)`}</p>
              <p className="text-grey-300 text-sm mt-2">In a parallel universe, I am immersed in Valorant battles with Weekend&#39;s music setting the electrifying mood. On gloomy days,I escape the world with METROOOOOOOO.</p>
            </div>

            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image width={200} height={200} src="https://avatars.githubusercontent.com/u/58567211" alt="Satish Panchal" className="w-32 h-32 rounded-full mx-auto" />
              <h2 className="text-lg font-semibold mt-4">satish panchal</h2>
              <p className="text-grey-300 text-xs italic">satish</p>
              <p className="text-grey-300 text-sm mt-2">In an alternate universe, you and me by the beach, the sun gently descending, you capturing the moment, and me, you. With Taylor Swift&#39;s songs playing in the background, talking about random stuff just like &#34;two headlights shine through the sleepless night.</p>
            </div>

            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image scale="1.1" width={200} height={200} src="/roshni.jpg" alt="Roshni" className="w-32 h-32 rounded-full mx-auto" />
              <h2 className="text-lg font-semibold mt-4">roshni</h2>
              <p className="text-grey-300 text-xs italic">gareeb designer</p>
              <p className="text-grey-300 text-sm mt-2">Hola! I&#39;m a passionate logo and brand identity designer with a love for art and music.</p>
              <p className="text-grey-300 text-sm">
                Beyond design, my life is punctuated by the electrifying and soulful energy of rock music
                which often serve as a wellspring of inspiration for my creative work.</p>
              <p className="text-grey-300 text-sm mt-2">Just as music pulses with passion and raw emotion, I channel that same intensity into every design project.</p>
              <p className="text-grey-300 text-sm">
                My design philosophy is a harmonious fusion of artistic creativity and the rebellious spirit of rock n roll!</p>
            </div>
            
            <div className="p-4 md:w-[40%] mx-5 mb-5 rounded-lg">
              <Image scale="1.1" width={200} height={200} src="/navya.jpg" alt="navya" className="w-32 h-32 rounded-full mx-auto" />
              <h2 className="text-lg font-semibold mt-4">navya sharma</h2>
              <p className="text-grey-300 text-xs italic">annoingly picky UX engineer</p>
              <p className="text-grey-300 text-sm mt-2">an interaction design student and a ux geek who has an iced coffee in her hands at all times.</p>
              <p className="text-grey-300 text-sm">
                im into art, poetry, reading and all that creative jazz which reminds me that I also love jazz, rock, indie, r&b and hiphop and elevator music because im weird like that.</p>
              <p className="text-grey-300 text-sm mt-2"> oh and harsh also wanted me to mention about my obsession with LIIT&#39;s so there&#39;s that.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 flex flex-col justify-center items-center mt-10 w-full">
      <h2 className='text-2xl font-bold'>About Us</h2>
      <div className="flex flex-col flex-wrap md:flex-row w-11/12 justify-between mt-10 ">
        <div className="p-4 md:w-[25%] mb-5 bg-[#181818] mx-10 rounded-lg">
          <Image width={200} height={200} src="https://avatars.githubusercontent.com/u/58532371" alt="Harsh Mathur" className="w-32 h-32 rounded-full mx-auto" />
          <h2 className="text-lg font-semibold mt-4">Harsh Mathur</h2>
          <p className="text-grey-300 text-sm mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum repellendus dolorem dolore excepturi voluptatibus, porro nisi ad molestiae nihil iusto.</p>
        </div>

        <div className="p-4 md:w-[25%] mb-5 bg-[#181818] mx-10 rounded-lg">
          <Image width={200} height={200} src={"/pooji.jpg"} alt="Poojan Patel" className="w-32 h-32 rounded-full mx-auto" />
          <h2 className="text-lg font-semibold mt-4">Poojan Patel</h2>
          <p className="text-grey-300 text-sm mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum repellendus dolorem dolore excepturi voluptatibus, porro nisi ad molestiae nihil iusto.</p>
        </div>

        <div className="p-4 md:w-[25%] mb-5 bg-[#181818] mx-10 rounded-lg">
          <Image width={200} height={200} src="https://avatars.githubusercontent.com/u/58567211" alt="Satish Panchal" className="w-32 h-32 rounded-full mx-auto" />
          <h2 className="text-lg font-semibold mt-4">Satish Panchal</h2>
          <p className="text-grey-300 text-sm mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum repellendus dolorem dolore excepturi voluptatibus, porro nisi ad molestiae nihil iusto.</p>
        </div>

        <div className="p-4 md:w-[25%] mb-5 bg-[#181818] mx-10 rounded-lg">
          <Image scale="1.1" width={200} height={200} src="/roshni.jpg" alt="Roshni" className="w-32 h-32 rounded-full mx-auto" />
          <h2 className="text-lg font-semibold mt-4">Roshni - Designer</h2>
          <p className="text-grey-300 text-sm mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum repellendus dolorem dolore excepturi voluptatibus, porro nisi ad molestiae nihil iusto.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;

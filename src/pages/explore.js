import Image from "next/image";
import Link from "next/link";
import { toast } from 'react-toastify';
const Explore = () => {

    const displayToast = () => {
        toast(<p>To use a custom background, click on the <span className="text-4xl">+</span> button</p>, {
            position: "top-left",
            autoClose: 2500,
            closeButton: false,
            closeOnClick: true,
            hideProgressBar: true,
            draggable: false,
            pauseOnHover: false,  
        })
    }

    return (
        <>
            <div className="w-full flex flex-col items-center h-screen justify-center">
                <Image quality={90} alt='explore_img' src="/idk258.svg" width={100} height={100} />
                <h1 className='mb-5 text-3xl font-bold'>THE WALLS</h1>
                <h2 className=" md:text-xl lg:text-2xl font-bold">Select the time period</h2>
                <div className="flex flex-col md:flex-row w-11/12 justify-center items-center mt-5">
                    <Link className="mr-3 mb-5" href={{ pathname: 'tracks', query: { time_range: 'short_term' } }}><button className=" bg-green-500 hover:bg-green-700 text-[#fffded] font-bold text-[0.5rem] text-lg 
                px-3 py-2 lg:px-4 rounded" onClick={displayToast}>
                        Last Month
                    </button></Link>
                    <Link className="mr-3 mb-5" href={{ pathname: 'tracks', query: { time_range: 'medium_term' } }}><button className=" bg-green-500 hover:bg-green-700 text-[#fffded] font-bold  text-[0.5rem] text-lg
                px-3 py-2 lg:px-8 rounded" onClick={displayToast}>
                        Last 6 Months
                    </button></Link>
                    <Link className="mr-3 mb-5" href={{ pathname: 'tracks', query: { time_range: 'long_term' } }}><button className=" bg-green-500 hover:bg-green-700 text-[#fffded] font-bold  text-[0.5rem] text-lg
                px-3 py-2 lg:px-6 rounded" onClick={displayToast}>
                        All Time
                    </button></Link>
                </div>
            </div>
        </>
    )
}
export default Explore
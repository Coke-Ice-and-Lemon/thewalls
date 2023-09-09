import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react"
import Link from "next/link";
const Explore = () => {
    const { data: session } = useSession()

    return (
    <>
    <Navbar/>
        <div className="w-full flex flex-col justify-center items-center mt-28">
            <h1 className='mb-5 text-3xl font-bold'>GRAMOPHONE</h1>
            <h2 className=" md:text-xl lg:text-2xl font-bold">Select the time period</h2>
            <div className="flex flex-col md:flex-row w-11/12 justify-center items-center mt-5">
                <Link className="" href={{ pathname: 'tracks', query: { time_range: 'short_term' } }}><button className="mr-3 bg-green-500 hover:bg-green-700 text-white font-bold text-[0.5rem] text-lg mb-5 
                px-3 py-2 lg:px-4 rounded">
                    Last Month
                </button></Link>
                <Link className="" href={{ pathname: 'tracks', query: { time_range: 'medium_term' } }}><button className="mr-3 bg-green-500 hover:bg-green-700 text-white font-bold  text-[0.5rem] text-lg mb-5
                px-3 py-2 lg:px-8 rounded">
                    Last 6 Months
                </button></Link>
                <Link className="" href={{ pathname: 'tracks', query: { time_range: 'long_term' } }}><button className="mr-3 bg-green-500 hover:bg-green-700 text-white font-bold  text-[0.5rem] text-lg mb-5
                px-3 py-2 lg:px-6 rounded">
                    All Time
                </button></Link>
            </div>
        </div>
        </>
    )
}
export default Explore
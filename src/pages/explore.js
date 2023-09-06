import { useSession } from "next-auth/react"
import Link from "next/link";
const Explore = () => {
    const { data: session } = useSession()
    
    return (
        <div className="w-full flex flex-col justify-center items-center mt-20">
            <h2 className=" md:text-xl lg:text-2xl font-bold">Select the time period</h2>
            <div className="flex flex-row w-5/6 lg:w-3/6 justify-center mt-10">
                <Link href={{pathname:'tracks',query:{time_range:'short_term'}}}><button className="mr-3 bg-green-500 hover:bg-green-700 text-white font-bold text-[0.5rem] sm:text-sm md:text-md lg:text-lg 
                px-1 py-2 lg:px-4 rounded">
                    Last Month
                </button></Link>
                <Link href={{pathname:'tracks',query:{time_range:'medium_term'}}}><button className="mr-3 bg-green-500 hover:bg-green-700 text-white font-bold  text-[0.5rem] sm:text-sm md:text-md lg:text-lg
                px-1 py-2 lg:px-8 rounded">
                    Last 6 Months
                </button></Link>
                <Link href={{pathname:'tracks',query:{time_range:'long_term'}}}><button className="mr-3 bg-green-500 hover:bg-green-700 text-white font-bold  text-[0.5rem] sm:text-sm md:text-md lg:text-lg
                px-1 py-2 lg:px-6 rounded">
                    All Time
                </button></Link>
            </div>
        </div>
    )
}
export default Explore
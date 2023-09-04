import { useSession } from "next-auth/react"
import Link from "next/link";
const Explore = () => {
    const { data: session } = useSession()
    
    return (
        <div className="w-full flex flex-col justify-center items-center mt-20">
            <h2 className="text-2xl font-bold">Select the time period</h2>
            <div className="flex flex-row w-5/6 lg:w-3/6 justify-between mt-10">
                <Link href={{pathname:'tracks',query:{time_range:'short_term'}}}><button className="bg-green-500 hover:bg-green-700 text-white font-bold 
                px-1 py-2 lg:px-4 rounded">
                    Short Term
                </button></Link>
                <Link href={{pathname:'tracks',query:{time_range:'long_term'}}}><button className="bg-green-500 hover:bg-green-700 text-white font-bold 
                px-1 py-2 lg:px-6 rounded">
                    Long Term
                </button></Link>
                <Link href={{pathname:'tracks',query:{time_range:'medium_term'}}}><button className="bg-green-500 hover:bg-green-700 text-white font-bold 
                px-1 py-2 lg:px-8 rounded">
                    Middle Term
                </button></Link>
            </div>
        </div>
    )
}
export default Explore
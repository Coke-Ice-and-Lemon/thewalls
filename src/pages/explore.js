import { useSession } from "next-auth/react"
import Link from "next/link";
const Explore = () => {
    const { data: session } = useSession()
    
    return (
        <>
            <div>{JSON.stringify(session)}</div>
            <div className="flex flex-row w-5/6 justify-between ">
                <Link href={{pathname:'tracks',query:{time_range:'short_term'}}}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Short Term
                </button></Link>
                <Link href={{pathname:'tracks',query:{time_range:'long_term'}}}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                    Long Term
                </button></Link>
                <Link href={{pathname:'tracks',query:{time_range:'medium_term'}}}><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
                    Middle Term
                </button></Link>
            </div>
        </>
    )
}
export default Explore
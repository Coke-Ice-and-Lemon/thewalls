import Image from "next/image"
import Link from "next/link"

const PageNotFound = () => {
    return (
        <div className="container mx-auto px-4 flex flex-col justify-center items-center mt-28 w-10/12 md:w-full px-5">
            <h2 className='text-2xl font-bold'>it looks like you&#39;re lost</h2>
            <div className="flex flex-row mt-5 mb-3 w-full justify-center items-center">
                <h3 className="text-9xl">4</h3>
                <Image src="/vinyl.png" className="animate-spin-slow w-44 h-44" width={225} height={225} />
                <h3 className="text-9xl">4</h3>
            </div>
            <h4 className="text-3xl font-bold">PAGE NOT FOUND</h4>
            <Link href="/">
                <button className="text-[#fffded] p-2 rounded-lg bg-[#1DB954] font-bold text-lg flex flex-row items-center mt-5">
                    <p className='font-sans'>
                        build your wall
                    </p>
                </button>
            </Link>
        </div>
    )
}
export default PageNotFound
import React from 'react'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TrackPreview from './TrackPreview';
import Image from 'next/image';

const Tracks = ({ data }) => {
    const [tracks, setTracks] = useState();
    const [users, setUsers] = useState(null)
    const { data: session } = useSession()
    const router = useRouter()
    const time_range = router.query.time_range
    const [timeRange, setTimeRange] = useState(time_range);

    async function getTopTracks(time) {
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time}&limit=50`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        console.log(session)
        return data.items
    }
    async function getuserprofile() {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        console.log(data)
        return data
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        const f = async () => {
            if (session) {
                setTracks(await getTopTracks(timeRange))
                setUsers(await getuserprofile())
            }
        }
        f();
    }, [session, timeRange])

    useEffect(() => {
        if (router.isReady) {
            setTimeRange(time_range)
        }
    }, [time_range])


    return (
        <div className='py-10 flex flex-col items-center justify-center'>
            {/* {JSON.stringify(users)} */}
            <div className="flex flex-col justify-center items-center max-w-s px-6 py-4 shadow-md rounded-xl sm:px-12 bg-[#181818] hover:bg-[#282828] dark:text-gray-100">
                <h3 className='text-xl font-bold mb-2'>What&#39;s  {users ? capitalizeFirstLetter(users.display_name) : 'Loading...'}  Playing</h3>
                {users && users.images && users.images.length > 0 && (
                    <div className='w-20 h-20'>
                        <Image priority={true} height={300} width={300} src={users.images[users.images.length - 1].url} alt="" className="mx-auto rounded-full dark:bg-gray-500 aspect-square shadow-md" />
                    </div>
                )}
                <div className="space-y-4 text-center divide-y divide-gray-700">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl mt-2">Spotify</h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-400"></p>
                    </div>

                </div>
            </div>
            <ul className="flex flex-wrap text-xs sm:font-medium text-center text-gray-500 dark:text-gray-400 mb-10 justify-center mt-5">
                <li className="mr-2">
                    <div className={`inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer ${timeRange == "short_term" && "text-white bg-blue-600"}`} aria-current="page" onClick={() => {
                        router.push('/tracks?time_range=short_term')
                    }}>Last Month</div>
                </li>
                <li className="mr-2">
                    <div className={`inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer ${timeRange == "medium_term" && "text-white bg-blue-600"}`} onClick={() => {
                        router.push('/tracks?time_range=medium_term')
                    }}>Last 6 Months</div>
                </li>
                <li className="mr-2">
                    <div className={`inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer ${timeRange == "long_term" && "text-white bg-blue-600"}`} onClick={() => {
                        router.push('/tracks?time_range=long_term')
                    }}>All Time</div>
                </li>
            </ul>
            <div className='flex flex-row flex-wrap h-full w-full justify-center overflow-visible'>
                {tracks && tracks.map((track) => (
                    (track.album.images && (
                        <div className="w-[20%] sm:w-[20%] lg:w-[15%] xl:w-[15%] 2xl-[15%]  rounded overflow-hidden mb-0.5 mx-0.5 hover:scale-105 
                        transition duration-150 ease-out hover:ease-in" key={track?.id}>
                            <TrackPreview track={track} />
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default Tracks
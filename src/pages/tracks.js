import React from 'react'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TrackPreview from './TrackPreview';

const Tracks = ({ data }) => {
    const [tracks, setTracks] = useState();
    const { data: session } = useSession()
    const router = useRouter()
    const time_range = router.query.time_range
    const [timeRange, setTimeRange] = useState(time_range);

    async function getTopTracks(time) {
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        return data.items
    }

    useEffect(() => {
        const f = async () => {
            if (session) {
                setTracks(await getTopTracks(timeRange))
            }
        }
        f();
    }, [session, timeRange])

    useEffect(() => {
        if(router.isReady){
            setTimeRange(time_range)
        }
    },[time_range])

    return (
        <div className='px-5 p-10 flex flex-col items-center justify-center'>
            {/* {JSON.stringify(tracks)} */}
            <h3 className='text-xl font-bold'>WHAT'S PLAYING</h3>
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
            <div className='flex flex-row flex-wrap h-full w-full justify-center'>
                {tracks && tracks.map((track) => (
                    (track.album.images && (
                        <div className="w-[25%] sm:w-[20%] lg:w-[15%] xl:w-[12%] 2xl-[10%]  rounded overflow-hidden mb-3 mx-2 hover:scale-105 
                        transition duration-150 ease-out hover:ease-in" key={track?.id}>
                            <TrackPreview track={track} />
                            {/* <div className="font-bold text-[0.5rem] mb-2 mt-2 px-2 text-center">{track?.name}</div> */}
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default Tracks
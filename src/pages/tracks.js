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

    async function getTopTracks() {
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}`, {
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
                setTracks(await getTopTracks())
            }
        }
        f();
    }, [session])

    return (
        <div className='px-20 p-10 bg-[#000]'>
            {/* {JSON.stringify(tracks)} */}
            <div className='flex flex-row flex-wrap h-full w-full justify-start'>
                {tracks && tracks.map((track) => (
                    (track.album.images && (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg mb-5 mx-1 hover:scale-105 
                        transition duration-150 ease-out hover:ease-in" key={track?.id}>
                            <TrackPreview key={track.id} track={track} />
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default Tracks
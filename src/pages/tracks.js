import React from 'react'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
                        <div class="max-w-sm rounded overflow-hidden shadow-lg mb-5 mx-1" key={track?.id}>
                            <Image priority={true} class="w-full" src={track.album.images[0].url} height={640} width={640} alt="Sunset in the mountains" />
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default Tracks
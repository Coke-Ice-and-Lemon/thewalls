import React from 'react'
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TrackPreview from '../components/TrackPreview';
import Image from 'next/image';
import Link from "next/link";
import Head from 'next/head'
import Navbar from '@/components/Navbar';


const Tracks = ({ data }) => {
    const [tracks, setTracks] = useState();
    const [users, setUsers] = useState(null)
    const { data: session } = useSession()
    const [selectedBackground, setSelectedBackground] = useState({
        backgroundImage: `url("/tortoise-shell.svg")`,
        path: "/tortoise-shell.svg"
    })
    const router = useRouter()
    const time_range = router.query.time_range
    const [timeRange, setTimeRange] = useState(time_range);

    async function getTopTracks(time) {
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time}&limit=18`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        console.log(data)
        return data.items
    }
    async function getuserprofile() {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
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

    const backgrounds = [
        {
            path: '/default_bg.svg',
            theme: "dark"
        },
        {
            backgroundImage: `url("/bermuda-diamond.svg")`,
            path: '/bermuda-diamond.svg',
            theme: "dark"
        },
        {
            backgroundImage: `url("/hollowed-boxes.svg")`,
            path: '/hollowed-boxes.svg',
            theme: "dark"
        },
        {
            backgroundImage: `url("/tortoise-shell.svg")`,
            path: "/tortoise-shell.svg",
            theme: "dark"
        },
        {
            backgroundImage: `url("/ffflux.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/ffflux.svg",
            theme: "dark"
        },
        {
            backgroundImage: `url("/hhholographic.webp")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/hhholographic.webp",
            theme: "light"
        },
        {   
            backgroundColor: "white",
            backgroundImage: `url("/ttten.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/ttten.svg",
            theme: "light"
        },
        {
            backgroundImage: `url("/sun-tornado.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/sun-tornado.svg",
            theme: "light"
        },
        {
            backgroundImage: `url("/grain.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/grain.svg",
            theme: "light"
        },
        {
            backgroundImage: `url("/rainbow-vortex.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/rainbow-vortex.svg",
            theme: "dark"
        },
        {
            backgroundImage: `url("/endless-constellation.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/endless-constellation.svg",
            theme: "dark"
        },
        {
            backgroundImage: `url("/sun-tornado_2.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/sun-tornado_2.svg",
            theme: "dark"
        },
        {
            path: '/default_bg.svg',
            theme: "dark",
            backgroundColor:'#83adb5'
        },
        {
            path: '/default_bg.svg',
            theme: "dark",
            backgroundColor:'#2e4045'
        },
        {
            path: '/default_bg.svg',
            theme: "light",
            backgroundColor:'#c7bbc9'
        },
        {
            path: '/default_bg.svg',
            theme: "dark",
            backgroundColor:'#5e3c58'
        },
        {
            path: '/default_bg.svg',
            theme: "light",
            backgroundColor:'#bfb5b2'
        },
    ]

    return (
        <>
            <Head>
                <title>{users ? capitalizeFirstLetter(users.display_name) : 'Gramophone'}</title>
                <meta name="description" content="Get your most played tracks from Spotify." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            
            <div style={selectedBackground} className="py-10 flex flex-col items-center justify-center w-full">
                <ul className="flex flex-wrap text-xs sm:font-medium text-center mb-5 justify-center mt-5">
                    <li className="mr-2">
                        <div className={`inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer ${selectedBackground.theme == 'light' && "text-black"} ${timeRange == "short_term" && "text-white bg-[#181818]"}`} aria-current="page" onClick={() => {
                            router.push('/tracks?time_range=short_term')
                        }}>Last Month</div>
                    </li>
                    <li className="mr-2">
                        <div className={`inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer ${selectedBackground.theme == 'light' && "text-black"} ${timeRange == "medium_term" && "text-white bg-[#181818]"}`} onClick={() => {
                            router.push('/tracks?time_range=medium_term')
                        }}>Last 6 Months</div>
                    </li>
                    <li className="mr-2">
                        <div className={`inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer ${selectedBackground.theme == 'light' && "text-black"} ${timeRange == "long_term" && "text-white bg-[#181818]"}`} onClick={() => {
                            router.push('/tracks?time_range=long_term')
                        }}>All Time</div>
                    </li>
                </ul>
                <ul className="px-10 m-2 flex items-start mb-8 space-x-3 overflow-x-scroll no-scrollbar">
                    {backgrounds.map((bg, index) => (
                        <li className="mr-2 flex-shrink-0" key={index}>
                            <Image className={`p-0.5 rounded-full bg-white cursor-pointer`} src={bg.path} width={50} height={50} onClick={() => {
                                setSelectedBackground(bg)
                            }} />
                        </li>
                    ))}
                </ul>
                <div className='flex flex-row items-center justify-center h-fit py-5'>
                    {users && users.images && users.images.length > 0 && (
                        <div className='w-10 h-35 mr-3 md:w-20'>
                            <Image priority={true} height={300} width={300} src={users.images[users.images.length - 1].url} alt="" className="mx-auto rounded-full dark:bg-gray-500 aspect-square shadow-md" />
                        </div>
                    )}
                    <p className={`text-lg font-bold md:text-2xl ${selectedBackground.theme == 'light' && "text-black"}`}>{users ? capitalizeFirstLetter(users.display_name) : 'Loading...'}  </p>
                </div>
                <div className='flex flex-row flex-wrap h-full w-full justify-center overflow-visible'>
                    {tracks && tracks.map((track) => (
                        (track.album.images && (
                            <Link className="w-[25%] sm:w-[20%] lg:w-[15%] xl:w-[15%] 2xl-[15%]  rounded overflow-hidden m-1.5 hover:scale-105 hover:cursor-pointer transition duration-150 ease-out hover:ease-in" key={track?.id} href={track?.external_urls?.spotify} target="_blank">
                                <TrackPreview track={track} />
                            </Link>
                        ))
                    ))}
                </div>
                <div className="my-5 w-20 h-5 md:w-40">
                    <Image src={selectedBackground.theme == 'light' ? `/spotify_logo_dark.png` : `/spotify_logo.png`} width={200} height={10} />
                </div>
            </div>
        </>
    )
}

export default Tracks
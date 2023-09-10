import React from 'react'
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TrackPreview from '../components/TrackPreview';
import Image from 'next/image';
import Link from "next/link";
import Head from 'next/head'
import Navbar from '@/components/Navbar';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
// import Share from "./Share";

const Tracks = ({ data }) => {
    const [tracks, setTracks] = useState();
    const [users, setUsers] = useState(null)
    // const [showModal, setShowModal] = useState(false);
    // const [shareData, setshareData] = useState(false);
    const { data: session } = useSession()
    const [selectedBackground, setSelectedBackground] = useState({
        backgroundImage: `url("/tortoise-shell.svg")`,
        path: "/tortoise-shell.svg"
    })
    const router = useRouter()
    const time_range = router.query.time_range
    const [timeRange, setTimeRange] = useState(time_range);

    async function getTopTracks(time) {
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time}&limit=25`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json()
        let finalTracksArray = [];
        if (data.items) {
            finalTracksArray = data.items.filter((item) => {
                if (item?.album && item?.album?.images && item?.album?.images[0]) {
                    return true
                }
                else {
                    return false
                }
            })
        }
        // console.log("user tracks data", finalTracksArray.slice(0,15))
        return finalTracksArray.slice(0, 15)
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

    useEffect(() => {
        const f = async () => {
            if (session) {
                setTracks(await getTopTracks(timeRange))
                setUsers(await getuserprofile())
            }
            else {
                if (router.isReady) {
                    router.push('/')
                }
            }
        }
        f();
    }, [session, timeRange])

    useEffect(() => {
        if (router.isReady) {
            setTimeRange(time_range)
        }
    }, [time_range])

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const handleShare = () => {
        const container = document.getElementById("my-container");
        html2canvas(container, {
            imageTimeout: 50000,
            scale: 5, // Set scale to 25x for full HD resolution (1920x1080)
        }).then(canvas => {
            const id = Date.now()
            canvas.toBlob(async (blob) => {
                const filesArray = [
                    new File(
                        [blob],
                        `gramophone_${id}.jpg`,
                        {
                            type: "image/jpeg",
                            lastModified: new Date().getTime()
                        }
                    )
                ];
                const shareData = {
                    files: filesArray,
                };
                navigator.share(shareData);
                if (navigator.share) {
                    try {
                        await navigator
                            .share(shareData)
                            .then(() =>
                                console.log("Hooray! Your content was shared to tha world")
                            );
                    } catch (error) {
                        console.log(`Oops! I couldn't share to the world because: ${error}`);
                    }
                } else {
                    console.log(
                        "Web share is currently not supported on this browser. Please provide a callback"
                    );
                }
            });
        });
    };
    const handleDownload = () => {
        const container = document.getElementById("my-container");
        html2canvas(container, {
            imageTimeout: 50000,
            scale: 5, // Set scale to 25x for full HD resolution (1920x1080)
        }).then(canvas => {
            const id = Date.now()
            canvas.toBlob(blob => saveAs(blob, `Gramophone_${id}.png`));
        });
    };
    const buttonStyle = {
        width: '3rem',
        height: '3rem',
        backgroundColor: '#181818',
        borderRadius: '50%',
        color: 'white',
        outline: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        border: '2px solid white',
        transform: 'translate(0, 0)',
        animation: 'float 2s ease-in-out infinite',
    };
    const backgrounds = [
        {
            path: '/default_bg.svg',
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
            backgroundImage: `url("/pppsychedelic.webp")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/pppsychedelic.webp",
            theme: "dark"
        },
        {
            backgroundColor: "black",
            backgroundImage: `url("/ttten.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/ttten.svg",
            theme: "dark"
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
            backgroundImage: `url("/ssscales.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/ssscales.svg",
            theme: "light"
        },
        {
            backgroundImage: `url("/llleaves.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/llleaves.svg",
            theme: "dark"
        },
        {
            backgroundImage: `url("/sssquiggly.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/sssquiggly.svg",
            theme: "dark"
        },
        {
            backgroundImage: `url("/oooscillate.svg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            path: "/oooscillate.svg",
            theme: "dark",
            backgroundColor: '#121212'
        },
        {
            path: '/solid_bluelight.png',
            theme: "dark",
            backgroundColor: '#83adb5'
        },
        {
            path: '/solid_bluedark.png',
            theme: "dark",
            backgroundColor: '#2e4045'
        },
        {
            path: '/solid_pinklight.png',
            theme: "light",
            backgroundColor: '#c7bbc9'
        },
        {
            path: '/solid_pinkdark.png',
            theme: "dark",
            backgroundColor: '#5e3c58'
        },
        {
            path: '/solid_beigedark.png',
            theme: "light",
            backgroundColor: '#bfb5b2'
        },
        {
            backgroundImage: `url("/big wavy blue orange.svg")`,
            path: '/big wavy blue orange.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/big wavy orange purple4.svg")`,
            path: '/big wavy orange purple4.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/big wavy peak zoomed.svg")`,
            path: '/big wavy peak zoomed.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/black_vector.svg")`,
            path: '/black_vector.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("blue_green_bgblack.svg")`,
            path: '/blue_green_bgblack.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/blue_green_peak.svg")`,
            path: '/blue_green_peak.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/blue_vector.svg")`,
            path: '/blue_vector.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/high blue green.svg")`,
            path: '/high blue green.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/pink stacked wavey.svg")`,
            path: '/pink stacked wavey.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/polygon_golden.svg")`,
            path: '/polygon_golden.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/polygon_purple.svg")`,
            path: '/polygon_purple.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/wavy green mountains.svg")`,
            path: '/wavy green mountains.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/stacked-waves-haikei.svg")`,
            path: '/stacked-waves-haikei.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/ccchaos.svg")`,
            path: '/ccchaos.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/ccchaos (1).svg")`,
            path: '/ccchaos (1).svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/ffflurry.svg")`,
            path: '/ffflurry.svg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/dddepth-240.jpg")`,
            path: '/dddepth-240.jpg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        {
            backgroundImage: `url("/dddepth-241.jpg")`,
            path: '/dddepth-241.jpg',
            theme: "dark",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
    ]

    return (
        <>
            <Head>
                <title>{users ? (users.display_name) : 'Gramophone'}</title>
                <meta name="description" content="Get your most played tracks from Spotify." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div style={selectedBackground} id='my-container' className="py-16 flex flex-col items-center justify-center w-full">
                <ul data-html2canvas-ignore="true" className="flex flex-wrap text-xs sm:font-medium text-center mb-5 justify-center mt-5">
                    <li className="mr-2">
                        <div className={`inline-block px-2 py-2 rounded-lg transition delay-300 backdrop-filter backdrop-blur-lg bg-opacity-60 shadow-xl cursor-pointer ${selectedBackground.theme == 'light' && "text-black"} ${timeRange == "short_term" && " border-[1px] border-white-400"}`} aria-current="page" onClick={() => {
                            router.push('/tracks?time_range=short_term')
                        }}>Last Month</div>
                    </li>
                    <li className="mr-2">
                        <div className={`inline-block px-2 py-2 rounded-lg transition delay-300 backdrop-filter backdrop-blur-lg bg-opacity-60 shadow-xl cursor-pointer ${selectedBackground.theme == 'light' && "text-black"} ${timeRange == "medium_term" && " border-[1px] border-white-400"}`} onClick={() => {
                            router.push('/tracks?time_range=medium_term')
                        }}>Last 6 Months</div>
                    </li>
                    <li className="mr-2">
                        <div className={`inline-block px-2 py-2 rounded-lg transition delay-300 backdrop-filter backdrop-blur-lg bg-opacity-60 shadow-xl cursor-pointer ${selectedBackground.theme == 'light' && "text-black"} ${timeRange == "long_term" && " border-[1px] border-white-400"}`} onClick={() => {
                            router.push('/tracks?time_range=long_term')
                        }}>All Time</div>
                    </li>
                </ul>
                <div className='w-full flex justify-center'>
                    <ul data-html2canvas-ignore="true" className="px-10 m-2 flex items-start mb-8 space-x-3 overflow-x-scroll no-scrollbar">
                        {backgrounds.map((bg, index) => (
                            <li className="mr-2 flex-shrink-0" key={index}>
                                <Image className={`p-0.5 rounded-full bg-white cursor-pointer`} src={bg.path} width={50} height={50} onClick={() => {
                                    setSelectedBackground(bg)
                                }} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="w-full flex flex-row justify-center items-center">
                        <div style={{
                            width: "fit-content",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "fit-content",
                        }} className='py-5'>
                            {users && users.images && users.images.length > 0 && (
                                <div className='w-10 h-35 mr-3 md:w-20'>
                                    <Image priority={true} layout="responsive"
                                        height={200} width={200} src={users.images[users.images.length - 1].url} alt="" className="mx-auto rounded-full dark:bg-gray-500 aspect-square shadow-md" />
                                </div>
                            )}
                            <div className='flex flex-col justify-center items-center'>
                                <p className={`text-lg font-bold md:text-2xl ${selectedBackground.theme == 'light' && "text-black"}`}>{users ? (`${users.display_name}'s wall`) : 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row flex-wrap h-full w-full justify-center overflow-visible px-7'>
                        {tracks && tracks.map((track) => (
                            (track.album.images && (
                                <Link className="w-[25%] sm:w-[20%] lg:w-[15%] xl:w-[15%] 2xl-[15%]  rounded overflow-hidden m-1.5 hover:scale-105 hover:cursor-pointer transition duration-150 ease-out hover:ease-in" key={track?.id} href={track?.external_urls?.spotify} target="_blank">
                                    <TrackPreview track={track} />
                                </Link>
                            ))
                        ))}
                    </div>
                    <div className="w-full flex flex-col justify-center items-center my-4" >
                        <p className={`mb-0 font-semibold italic ${selectedBackground.theme == 'light' && "text-black"}`} >gaslight-web.vercel.app</p>
                        <div className="mb-1 mt-4 w-20 h-5 md:w-40 md:h-10">
                            <Image layout="responsive" src={selectedBackground.theme == 'light' ? `/spotify_logo_dark.png` : `/spotify_logo.png`} width={100} height={10} />
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        debounce(handleShare(), 3000)
                    }}
                    type="button"
                    style={buttonStyle}
                    className="flex items-center justify-center"
                    data-html2canvas-ignore="true"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                        <g transform="translate(33.28,33.28) scale(0.74,0.74)"><g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" style={{ mixBlendMode: 'normal' }}><g transform="scale(5.33333,5.33333)"><path d="M36,5c-3.84823,0 -7,3.15178 -7,7c0,0.58577 0.19854,1.10946 0.33594,1.6543l-11.99023,5.99805c-1.28658,-1.57841 -3.1642,-2.65234 -5.3457,-2.65234c-3.84823,0 -7,3.15178 -7,7c0,3.84822 3.15177,7 7,7c2.1815,0 4.05912,-1.07394 5.3457,-2.65234l11.99023,5.99805c-0.13739,0.54483 -0.33594,1.06853 -0.33594,1.6543c0,3.84822 3.15177,7 7,7c3.84823,0 7,-3.15178 7,-7c0,-3.84822 -3.15177,-7 -7,-7c-2.1815,0 -4.05912,1.07394 -5.3457,2.65234l-11.99023,-5.99805c0.13739,-0.54483 0.33594,-1.06853 0.33594,-1.6543c0,-0.58577 -0.19854,-1.10946 -0.33594,-1.6543l11.99023,-5.99805c1.28658,1.57841 3.1642,2.65234 5.3457,2.65234c3.84823,0 7,-3.15178 7,-7c0,-3.84822 -3.15177,-7 -7,-7zM36,8c2.22691,0 4,1.77309 4,4c0,2.22691 -1.77309,4 -4,4c-2.22691,0 -4,-1.77309 -4,-4c0,-2.22691 1.77309,-4 4,-4zM12,20c2.22691,0 4,1.77309 4,4c0,2.22691 -1.77309,4 -4,4c-2.22691,0 -4,-1.77309 -4,-4c0,-2.22691 1.77309,-4 4,-4zM36,32c2.22691,0 4,1.77309 4,4c0,2.22691 -1.77309,4 -4,4c-2.22691,0 -4,-1.77309 -4,-4c0,-2.22691 1.77309,-4 4,-4z"></path></g></g></g>
                    </svg>
                </button>
                <div style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
                    <button
                        onClick={() => {
                            debounce(handleDownload(), 3000)
                        }}
                        type="button"
                        style={buttonStyle}
                        className="flex items-center justify-center"
                        data-html2canvas-ignore="true"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Tracks
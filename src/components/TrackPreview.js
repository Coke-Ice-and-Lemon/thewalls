import Image from "next/legacy/image";
import React, { useEffect, useState } from 'react';
const TrackPreview = ({ track }) => {

    useEffect(() => {
        // define a custom handler function
        // for the contextmenu event
        const handleContextMenu = (e) => {
            // prevent the right-click menu from appearing
            e.preventDefault()
        }

        // attach the event listener to 
        // the document object
        document.addEventListener("contextmenu", handleContextMenu)

        // clean up the event listener when 
        // the component unmounts
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
        }
    }, [])

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();
    const [isTouching, setIsTouching] = useState(false);

    useEffect(() => {
        if (isTouching) {
            console.log('istouching')
            if (!isPlaying && track.preview_url) {
                console.log('startplaying')
                audioRef.current.src = track.preview_url;
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            StopPlaying();
        }
    }, [isTouching, isPlaying, track.preview_url]);

    const handleMouseEnter = (e) => {
        e.preventDefault();
        setIsTouching(false);
        setIsPlaying(false);
        setIsTouching(true);
    };

    const StopPlaying = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const PlayTouchPreview = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Check if audio is not already playing
        if (!isPlaying && !isTouching) {
            setIsTouching(true);

            if (track.preview_url) {
                audioRef.current.src = track.preview_url;
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            StopPlaying();
        }
    };

    const StopTouchPreview = () => {
        if (isTouching) {
            setIsTouching(false);
            StopPlaying();
        }
    };


    return (
        <div onMouseEnter={PlayPreview} onMouseLeave={!isTouching ? StopPlaying : undefined} onTouchStart={PlayTouchPreview} onTouchEnd={StopTouchPreview}>
            <Image unoptimized priority={true} className="w-full" src={track?.image} max-width={640} max-height={640} height={640} width={640} alt="Sunset in the mountains" layout="responsive"
                position="relative" />
            <audio loop={false} ref={audioRef}></audio>
        </div>

    );
};

export default TrackPreview; 
import Image from "next/legacy/image";
import React, { useEffect, useState, useRef } from 'react';

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
    const [isTouching, setIsTouching] = useState(false);
    const audioRef = useRef();

    useEffect(() => {
        if (isTouching) {
            console.log('hello')
            if (!isPlaying && track.preview_url) {
                audioRef.current.src = track.preview_url;
                audioRef.current.play();
                setIsPlaying(true);
            }
        } else {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, [isTouching, track.preview_url]);

    const handleMouseEnter = () => {
        setIsTouching(false);
        setIsPlaying(false);
        setIsTouching(true);
    };

    const handleMouseLeave = () => {
        setIsTouching(false);
    };

    const handleTouchStart = (e) => {
        setIsTouching(true);
    };

    const handleTouchEnd = () => {
        setIsTouching(false);
    };

    return (
        <div onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={(e) => e.preventDefault()}>
            <Image id="element-of-mystery" unoptimized priority={true} className="w-full" src={track?.image} max-width={640} max-height={640} height={640} width={640} alt="Sunset in the mountains" layout="responsive"
                position="relative" />
            <audio loop={false} ref={audioRef}></audio>
        </div>

    );
};

export default TrackPreview; 
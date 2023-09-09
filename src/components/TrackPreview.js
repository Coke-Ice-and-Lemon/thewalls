import React, { useState, useEffect } from 'react';
import Image from "next/image"
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

    const Playpreview = () => {
        if (!isTouching) {
            console.log('playing');
            if (track.preview_url) {
                audioRef.current.src = track.preview_url;
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const Stoppreview = () => {
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
        }
    };
    const StopTouchPreview = () => {
        if (isTouching) {
            setIsTouching(false);

            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div onMouseEnter={Playpreview} onMouseLeave={Stoppreview} onTouchStart={PlayTouchPreview}
            onTouchEnd={StopTouchPreview} >
            <Image priority={true} className="w-full" src={track?.album?.images[0]?.url} max-width={640} max-height={640} height={640} width={640} alt="Sunset in the mountains" layout="responsive"
                position="relative" />
            <audio ref={audioRef}></audio>
            {/* <Image priority={true} className="w-full" src={"/vinyl.png"} height={620} width={620} style={{
                position: "absolute",
                top: "0.5rem",
                left: "4.5rem",
                width: "9rem",
                height: "9rem",
                zIndex: 10
            }} /> */}
        </div>

    );
};

export default TrackPreview; 
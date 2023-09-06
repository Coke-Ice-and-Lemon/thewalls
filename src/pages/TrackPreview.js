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

    // const Playpreview = () => {
    //     if (!isTouching) {
    //         console.log('playing');
    //         if (track.preview_url) {
    //             audioRef.current.src = track.preview_url;
    //             audioRef.current.play();
    //             setIsPlaying(true);
    //         }
    //     }
    // };

    // const TogglePreview = () => {
    //     if (isPlaying) {
    //       audioRef.current.pause();
    //       setIsPlaying(false);
    //     } else {
    //       if (track.preview_url) {
    //         audioRef.current.src = track.preview_url;
    //         audioRef.current.play();
    //         setIsPlaying(true);
    //       }
    //     }
    //   };

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
        <div onMouseLeave={Stoppreview} onTouchStart={PlayTouchPreview}
            onTouchEnd={StopTouchPreview} >
            <Image priority={true} className="w-full" src={track?.album?.images[0].url} height={640} width={640} alt="Sunset in the mountains" />
            <audio ref={audioRef}></audio>
        </div>
        
    );
};

export default TrackPreview; 
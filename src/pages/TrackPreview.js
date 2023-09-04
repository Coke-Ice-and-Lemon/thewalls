import React, { useState } from 'react';
import Image from "next/image"
const TrackPreview = ({ track }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.createRef();

    const handleMouseEnter = () => {
        if (track.preview_url) {
            audioRef.current.src = track.preview_url;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleMouseLeave = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Image priority={true} className="w-full" src={track.album.images[0].url} height={640} width={640} alt="Sunset in the mountains" />
            <audio ref={audioRef}></audio>
        </div>
    );
};

export default TrackPreview; 
import React from 'react';
import ReactPlayer from 'react-player/lazy'; // Importing react-player

const VideoPlayer = ({ videoUrl, onProgress,onEnded }) => {
    
    return (
        <div className="video-player-container">
            <ReactPlayer
                url={videoUrl}
                controls={true}
                width="100%"
                height="100%"
                playing={true}
                light={true}
                pip={true}
                stopOnUnmount={true}
                onProgress={onProgress}
                onEnded={onEnded}
            />
        </div>
    );
};

export default VideoPlayer;
import React, { useState, useEffect } from 'react';
import VideoPlayer from './videoPlayer.jsx';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''}${minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}${secs} second${secs !== 1 ? 's' : ''}`;
};

function Videos() {
    const location = useLocation()
    const [videos, setVideos] = useState([]);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [playTime, setPlayTime] = useState(0);
    useEffect(() => {
        const fetchVideos = async () => {
            const videoData = [
                {
                    id: 1,
                    title: 'For Bigger Joyrides',
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                },
                {
                    id: 2,
                    title: 'Big Buck Bunny',
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                },
                {
                    id: 3,
                    title: 'Tears of Steel',
                    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                },
            ];
            setVideos(videoData);
        };

        fetchVideos();
    }, []);

    // Handle playtime tracking for each video
    const handleProgress = (state) => {
        if (currentVideoId) {
            setPlayTime(state.playedSeconds); // Track playtime for the current video
            localStorage.setItem(currentVideoId, state.playedSeconds); // Save playtime to localStorage
        }
    };

    // Handle video end (display SweetAlert when video finishes)
    const handleVideoEnd = () => {
        Swal.fire({
            title: 'Video Completed!',
            text: `You have finished watching "${videos.find((video) => video.id === currentVideoId)?.title}".`,
            icon: 'success',
            confirmButtonText: 'Okay',
        });
    };

    // Change the video and reset playtime when a new video is clicked
    const handleChangeVideo = (videoId) => {
        setCurrentVideoId(videoId);
        const savedPlayTime = localStorage.getItem(videoId); // Get saved playtime from localStorage
        setPlayTime(savedPlayTime ? parseFloat(savedPlayTime) : 0); // Use saved playtime or 0 if not available
    };

    return (
        <div className="App">
            <h3>Select a Video to Play</h3>

            {/* Video list with clickable video titles */}
            <div className="video-list">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="video-item"
                        onClick={() => handleChangeVideo(video.id)}
                        style={{ cursor: 'pointer', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                    >
                        {video.title}
                    </div>
                ))}
            </div>

            {/* Display the selected video player */}
            {currentVideoId && (
                <>
                    <h4>Now Playing: "{videos.find((video) => video.id === currentVideoId)?.title}"</h4>
                    <VideoPlayer
                        videoUrl={videos.find((video) => video.id === currentVideoId)?.url}
                        onProgress={handleProgress}
                        onEnded={handleVideoEnd}
                        startTime={playTime} // Start video from the saved playtime
                    />
                    <p>
                        Video played: {formatTime(playTime)} {/* Format the playtime */}
                    </p>
                </>
            )}
        </div>
    );
}

export default Videos;

import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'; // Import Video.js styles
import poster from "./assest/poster.jpg";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true); // Start with muted
//   const BASE_URL = process.env.REACT_APP_BASE_URL;
  const url = `https://api.indiaaheadlive.com/api/v1/stream`; // URL of your backend

  useEffect(() => {
    if (videoRef.current) {
      const videoJsPlayer = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        muted: isMuted, // Control mute status here
        sources: [{
          src: url,
          type: 'application/x-mpegURL'
        }],
        techOrder: ['html5']
      });

      videoJsPlayer.ready(() => {
        if (!isMuted) {
          videoJsPlayer.muted(true); // Unmute if needed
        }
        videoJsPlayer.play().catch(error => {
          console.error('Autoplay error:', error);
        });
      });

      setPlayer(videoJsPlayer);

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [url, isMuted]);

  return (
    <div className="video-container">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-default-skin" poster={poster} />
      </div>
    </div>
  );
};

export default VideoPlayer;

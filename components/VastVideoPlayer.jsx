'use client';
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';

function VastVideoPlayer({ vastUrl, videoUrl }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      // خيارات أخرى لمشغل الفيديو
      sources: [
        {
          src: vastUrl,
          type: 'application/x-vast',
        },
      ],
    });

    return () => {
      player.dispose();
    };
  }, [vastUrl]);

  return (
    <div className="bg-green-400 min-w-44 min-h-40">
      <video
        ref={videoRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
        controls
        controlsList="nodownload"
        referrerPolicy="no-referrer"
        autoPlay
      >
        <source src={`${videoUrl}?autoplay=0`} type="video/mp4" />
      </video>
    </div>
  );
}
export default VastVideoPlayer;

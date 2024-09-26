'use client';
import React, { useState, useEffect, useRef } from 'react';
import LoadingPhoto from './LoadingPhoto';
import HappyTagAd from './ads/happyTagAd';

export default function VideoPlayer({
  videoUrl = ' ',
  episodeName,
  image,
  showAd = false,
  movie,
}) {
  const [videoSource, setVideoSource] = useState('');
  const [videoId, setVideoId] = useState('');
  const [aspectRatio, setAspectRatio] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    setVideoSource('');
    setVideoId('');

    const adjustedUrl = adjustVideoQuality(videoUrl);

    if (
      adjustedUrl.includes('cdn.arteenz.com') ||
      adjustedUrl.includes('ooanime')
    ) {
      setVideoSource('arteenz');
      setVideoId(adjustedUrl);
    } else if (
      adjustedUrl.includes('downet.net') ||
      adjustedUrl.includes('zidwish.site') ||
      movie === true
    ) {
      setVideoSource('zidwish');
      setVideoId(adjustedUrl);
    } else {
      setVideoSource('otherSources');
      setVideoId(adjustedUrl);
    }
  }, [videoUrl]);

  const handleVideoPlay = () => {
    const videoElement = videoRef.current;
    videoElement.play();
  };

  const handleTimeUpdate = () => {
    // يمكن إضافة أي وظائف أخرى هنا عند تحديث وقت الفيديو إن وجدت
  };

  function adjustVideoQuality(url) {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    let adjustedUrl = url;

    if (connection) {
      if (
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g'
      ) {
        adjustedUrl = url.replace('high', 'low');
      } else if (connection.effectiveType === '4g') {
        adjustedUrl = url.replace('high', 'medium');
      } else if (connection.effectiveType === '5g') {
        adjustedUrl = url;
      }
    }

    return adjustedUrl;
  }

  const updateAspectRatio = () => {
    const videoElement = videoRef.current;
    if (videoElement && videoElement.videoWidth && videoElement.videoHeight) {
      let ratio = videoElement.videoWidth / videoElement.videoHeight;
      setAspectRatio(ratio);
    }
  };

  return (
    <div
      className="relative w-full"
      style={{
        height: aspectRatio ? `calc(100vw / ${aspectRatio})` : 'auto',
      }}
    >
      {videoId ? (
        <div className="w-full">
          {/* إضافة key يجعل الكومبوننت يعاد تحميله عند تغيير videoUrl */}
          <HappyTagAd key={videoUrl} linkChanged={videoUrl} />

          {videoSource === 'arteenz' && (
            <video
              ref={videoRef}
              className="w-full h-[100%]"
              style={{ width: '100%', height: '100%' }}
              controls
              poster={image}
              controlsList="nodownload"
              onLoadedMetadata={updateAspectRatio}
              onPlay={handleVideoPlay}
              onTimeUpdate={handleTimeUpdate}
              onContextMenu="return false"
              onDragStart={(e) => e.preventDefault()}
              referrerPolicy="no-referrer"
              allow="fullscreen"
              autoPlay
              loop
              onSeeked={() => {
                const video = document.querySelector('video');
                if (video.currentTime === 0) {
                  window.location.reload(); // إعادة تحميل الصفحة عند بداية التشغيل بعد الدورة الأولى
                }
              }}
            >
              <source src={`${videoId}?autoplay=0`} type="video/mp4" />
            </video>
          )}

          {/* إضافة مشغل Zidwish */}
          {videoSource === 'zidwish' && (
            <div className="w-full h-full ">
              <iframe
                ref={videoRef}
                className="w-full h-full my-8"
                src={`${videoId}?autoplay=1&loop=1`} // تعديل URL لتفعيل autoplay و loop
                allowFullScreen={true}
                controls={true}
                frameBorder="0"
                onLoad={updateAspectRatio}
                allow="autoplay; fullscreen"
                title="Video Player"
                autoPlay
                style={{
                  border: '0px solid #ccc',
                  overflow: 'hidden',
                }}
                scrolling="no"
              ></iframe>
            </div>
          )}

          {videoSource === 'otherSources' && (
            <video
              ref={videoRef}
              className="w-full h-[100%]"
              style={{ width: '100%', height: '100%' }}
              controls
              poster={image}
              controlsList="nodownload"
              onLoadedMetadata={updateAspectRatio}
              onPlay={handleVideoPlay}
              onTimeUpdate={handleTimeUpdate}
              onContextMenu="return false"
              onDragStart={(e) => e.preventDefault()}
              referrerPolicy="no-referrer"
              allow="fullscreen"
              autoPlay
              loop
              onSeeked={() => {
                const video = document.querySelector('video');
                if (video.currentTime === 0) {
                  window.location.reload(); // إعادة تحميل الصفحة عند بداية التشغيل بعد الدورة الأولى
                }
              }}
            >
              <source src={`${videoId}?autoplay=0`} type="video/mp4" />
            </video>
          )}
        </div>
      ) : (
        <LoadingPhoto />
      )}
    </div>
  );
}

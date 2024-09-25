'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import LoadingPhoto from './LoadingPhoto';
import { inputsContext } from './Context';
import HappyTagAd from './ads/happyTagAd';
export default function VideoPlayer({
  videoUrl = ' ',
  episodeName,
  image,
  showAd = false,
}) {
  const [videoSource, setVideoSource] = useState('');
  const [videoId, setVideoId] = useState('');
  const [aspectRatio, setAspectRatio] = useState(null);
  const [adShown, setAdShown] = useState(false);
  const [quarterAdShown, setQuarterAdShown] = useState(false);
  const videoRef = useRef(null);

  // عرض الإعلان في الريندر الأول
  useEffect(() => {
    if (showAd) {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = 'false';
      script.src = '//thubanoa.com/1?z=8130767'; // كود الإعلان
      document.body.appendChild(script);
      setTimeout(() => {
        document.body.removeChild(script);
        setAdShown(true);
      }, 5000);
    }
  }, [showAd, videoUrl]);

  useEffect(() => {
    setAdShown(false);

    const adjustedUrl = adjustVideoQuality(videoUrl);

    if (
      adjustedUrl.includes('cdn.arteenz.com') ||
      adjustedUrl.includes('ooanime')
    ) {
      setVideoSource('arteenz');
      setVideoId(adjustedUrl);
    } else if (adjustedUrl.includes('downet.net')) {
      setVideoSource('downet');
      setVideoId(adjustedUrl);
    } else if (adjustedUrl.includes('zidwish.site')) {
      setVideoSource('zidwish');
      setVideoId(adjustedUrl);
    } else {
      setVideoSource('otherSources');
      setVideoId(adjustedUrl);
    }
  }, [videoUrl]);

  const handleVideoPlay = () => {
    const videoElement = videoRef.current;

    if (!adShown && showAd) {
      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = 'false';
      script.src = '//thubanoa.com/1?z=8130767';

      document.body.appendChild(script);

      setTimeout(() => {
        document.body.removeChild(script);
        videoElement.play(); // تشغيل الفيديو بعد انتهاء الإعلان
        setAdShown(true); // الإشارة إلى أن الإعلان تم عرضه
      }, 5000); // مدة عرض الإعلان (5 ثوانٍ)
    } else {
      videoElement.play(); // تشغيل الفيديو بدون عرض الإعلان
    }
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
      if (ratio === 3) {
        ratio = 16 / 9;
      }
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
        <>
          <HappyTagAd />
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
              oncontextmenu="return false"
              onDragStart={(e) => e.preventDefault()}
              referrerPolicy="no-referrer"
              allow="fullscreen"
            >
              <source src={`${videoId}?autoplay=0`} type="video/mp4" />
            </video>
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
              oncontextmenu="return false"
              onDragStart={(e) => e.preventDefault()}
              referrerPolicy="no-referrer"
              allow="fullscreen"
            >
              <source src={`${videoId}?autoplay=0`} type="video/mp4" />
            </video>
          )}
        </>
      ) : (
        <LoadingPhoto />
      )}
    </div>
  );
}

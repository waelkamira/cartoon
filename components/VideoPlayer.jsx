'use client';
import React, { useState, useEffect, useRef } from 'react';
import LoadingPhoto from './LoadingPhoto';
import HappyTagAd from './ads/happyTagAd';

export default function VideoPlayer({
  videoUrl = ' ',
  image,
  movie,
  onNextEpisode, // إضافة prop جديد لدالة الانتقال للحلقة التالية
}) {
  const [videoSource, setVideoSource] = useState('');
  const [videoId, setVideoId] = useState('');
  const [aspectRatio, setAspectRatio] = useState(null);
  const [isAdPlaying, setIsAdPlaying] = useState(false); // حالة تتبع للإعلان
  const [adTimer, setAdTimer] = useState(null); // المؤقت لتشغيل الإعلان
  const videoRef = useRef(null);
  const adVideoUrl = '//thubanoa.com/1?z=8130767'; // رابط الفيديو الإعلاني

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

    // إعداد المؤقت لتشغيل الإعلان كل نصف ساعة
    if (!adTimer) {
      const timer = setInterval(() => {
        setIsAdPlaying(true); // إظهار الإعلان
      }, 1800000); // 30 دقيقة بالمللي ثانية (1800000 مللي ثانية)
      setAdTimer(timer);
    }

    // تنظيف المؤقت عند تفكيك المكون
    return () => {
      if (adTimer) clearInterval(adTimer);
    };
  }, [videoUrl]);

  const blockAdsAndPopups = () => {
    window.open = () => null; // منع فتح النوافذ الجديدة
  };

  useEffect(() => {
    blockAdsAndPopups();
  }, []);

  const handleAdEnd = () => {
    // بعد انتهاء الإعلان، نعيد تشغيل الفيلم الرئيسي
    setIsAdPlaying(false);
    videoRef.current.play(); // استئناف تشغيل الفيلم الرئيسي
  };

  const handleVideoEnd = () => {
    // عند انتهاء الحلقة الحالية، الانتقال تلقائيًا إلى الحلقة التالية
    if (onNextEpisode) onNextEpisode();
  };

  const handleFullScreen = () => {
    // دالة لتفعيل وضع ملء الشاشة
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        // لأجهزة iOS/Safari
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        // لمتصفحات Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        // لمتصفحات Internet Explorer/Edge
        videoRef.current.msRequestFullscreen();
      }
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
          {/* إضافة إعلان HappyTagAd */}
          <HappyTagAd />

          {/* تشغيل الفيديو الرئيسي أو الإعلان بناءً على isAdPlaying */}
          {isAdPlaying ? (
            <div className="w-full h-full flex justify-center items-center">
              <video
                className="w-full min-w-72 min-h-44 sm:w-96 sm:h-72 md:w-[800px] md:h-[600px]"
                src={adVideoUrl} // رابط الإعلان
                autoPlay
                controls
                onEnded={handleAdEnd} // استئناف الفيلم بعد انتهاء الإعلان
              />
            </div>
          ) : (
            <>
              {videoSource === 'arteenz' && (
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                  controls
                  poster={image}
                  controlsList="nodownload"
                  onLoadedMetadata={updateAspectRatio}
                  onPlay={() => videoRef.current.play()}
                  onContextMenu="return false"
                  onDragStart={(e) => e.preventDefault()}
                  referrerPolicy="no-referrer"
                  allow="fullscreen"
                  autoPlay
                  onEnded={handleVideoEnd} // الانتقال إلى الحلقة التالية عند انتهاء الحلقة الحالية
                  onDoubleClick={handleFullScreen} // تفعيل وضع ملء الشاشة عند النقر المزدوج
                >
                  <source src={`${videoId}?autoplay=0`} type="video/mp4" />
                </video>
              )}

              {videoSource === 'zidwish' && (
                <div className="w-full h-full flex justify-center items-center">
                  <iframe
                    ref={videoRef}
                    className="w-full min-w-72 min-h-44 sm:w-96 sm:h-72 md:w-[800px] md:h-[600px]"
                    src={`${videoId}?autoplay=1`} // تعديل URL لتفعيل autoplay
                    allowFullScreen={true}
                    controls={true}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation"
                    title="Video Player"
                    autoPlay
                    style={{
                      border: '0px solid #ccc',
                      overflow: 'hidden',
                    }}
                    scrolling="no"
                    onEnded={handleVideoEnd} // الانتقال إلى
                    الحلقة
                    التالية
                    عند
                    انتهاء
                    الحلقة
                    الحالية
                    onDoubleClick={handleFullScreen} // تفعيل وضع ملء الشاشة عند النقر المزدوج
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
                  onPlay={() => videoRef.current.play()}
                  onContextMenu="return false"
                  onDragStart={(e) => e.preventDefault()}
                  referrerPolicy="no-referrer"
                  allow="fullscreen"
                  autoPlay
                  onEnded={handleVideoEnd} // الانتقال إلى الحلقة التالية عند انتهاء الحلقة الحالية
                  onDoubleClick={handleFullScreen} // تفعيل وضع ملء الشاشة عند النقر المزدوج
                >
                  <source src={`${videoId}?autoplay=0`} type="video/mp4" />
                </video>
              )}
            </>
          )}
        </div>
      ) : (
        <LoadingPhoto />
      )}
    </div>
  );
}

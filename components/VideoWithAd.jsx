'use client';
import React, { useEffect, useState, useRef } from 'react';
export default function VideoWithAd({ videoUrl }) {
  const [showAd, setShowAd] = useState(false); // لعرض الإعلان
  const videoRef = useRef(null); // المرجع الخاص بالفيديو

  useEffect(() => {
    const video = videoRef.current;

    // عرض إعلان قبل بدء الفيديو
    const handlePreRollAd = () => {
      setShowAd(true); // عرض الإعلان
      setTimeout(() => {
        setShowAd(false);
        video.play(); // تشغيل الفيديو بعد الإعلان
      }, 10000); // مدة الإعلان 10 ثواني
    };

    video.addEventListener('play', handlePreRollAd);

    return () => {
      video.removeEventListener('play', handlePreRollAd);
    };
  }, []);

  // عرض الإعلان كل نصف ساعة
  useEffect(() => {
    const adInterval = setInterval(() => {
      const video = videoRef.current;
      video.pause(); // إيقاف الفيديو
      setShowAd(true); // عرض الإعلان

      setTimeout(() => {
        setShowAd(false);
        video.play(); // استئناف الفيديو بعد انتهاء الإعلان
      }, 10000); // مدة الإعلان 10 ثواني
    }, 1800000); // نصف ساعة

    return () => clearInterval(adInterval); // تنظيف المؤقت
  }, []);

  return (
    <div
      className="video-container"
      style={{ position: 'relative', maxWidth: '800px', margin: 'auto' }}
    >
      {showAd && (
        <div
          className="ad-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <iframe
            src="//thubanoa.com/1?z=8130767"
            width="100%"
            height="150"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      )}

      <video ref={videoRef} width="100%" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

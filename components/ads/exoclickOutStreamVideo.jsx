// 'use client';
// import React, { useEffect } from 'react';

// const ExoclickOutStreamVideo = () => {
//   useEffect(() => {
//     // وظيفة لتشغيل الفيديو مرة واحدة فقط
//     const playVideoOnce = (videoElement) => {
//       if (videoElement && videoElement.paused) {
//         videoElement.play().catch((error) => {
//           console.error('Error playing the video:', error);
//         });
//       }
//     };

//     // مراقبة الفيديو
//     const observeVideoPlayback = () => {
//       const videoElements = document.querySelectorAll('video[class*="_video"]'); // العثور على جميع الفيديوهات التي تحتوي على _video في class
//       videoElements.forEach((videoElement) => {
//         playVideoOnce(videoElement); // تشغيل الفيديو مرة واحدة فقط عند العثور عليه
//       });
//     };

//     // مراقبة DOM للحصول على الفيديو عند إضافته
//     const observer = new MutationObserver(() => {
//       observeVideoPlayback();
//     });

//     // البدء بمراقبة DOM
//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });

//     // تشغيل الفيديو باستمرار حتى خارج الإطار
//     observeVideoPlayback();

//     // تنظيف المراقبة عند إزالة المكون
//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div
//       id="outstream-video-ad-container"
//       className="outstream-video-ad-container"
//     >
//       {/* عنصر <ins> لإعلان outstream */}
//       <ins
//         className="eas6a97888e37"
//         data-zoneid="5448580"
//         id="outstream-video-ad"
//         style={{ display: 'block', width: '100%', height: 'auto' }} // تحديد الأبعاد
//       ></ins>
//     </div>
//   );
// };

// export default ExoclickOutStreamVideo;

'use client';
import React, { useEffect } from 'react';

const ExoclickOutStreamVideo = () => {
  useEffect(() => {
    // Fetch ad script from the /api/proxy
    const loadAdScript = () => {
      const script = document.createElement('script');
      script.src = 'https://a.magsrv.com/ad-provider.js'; // Ensure this URL is correct
      script.async = true;

      script.onload = () => {
        // Handle script loaded
      };

      script.onerror = (error) => {
        console.error('Error loading ad script:', error);
      };

      document.body.appendChild(script);
    };

    // Load the ad when component mounts
    loadAdScript();
  }, []);

  return (
    <div
      id="outstream-video-ad-container"
      className="outstream-video-ad-container"
    >
      {/* Placeholder for the outstream video ad */}
      <ins
        className="eas6a97888e37"
        data-zoneid="5448580"
        id="outstream-video-ad"
        style={{ display: 'block', width: '100%', height: 'auto' }} // Set dimensions
      ></ins>
    </div>
  );
};

export default ExoclickOutStreamVideo;

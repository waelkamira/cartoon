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

import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // إضافة السكريبت غير المتزامن
    const script1 = document.createElement('script');
    script1.src = 'https://a.magsrv.com/ad-provider.js';
    script1.async = true;
    document.body.appendChild(script1);

    // إضافة العنصر <ins>
    const ins = document.createElement('ins');
    ins.className = 'eas6a97888e37';
    ins.setAttribute('data-zoneid', '5448580');
    document.body.appendChild(ins);

    // إضافة السكريبت الثاني لتنفيذ AdProvider
    const script2 = document.createElement('script');
    script2.innerHTML =
      '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    document.body.appendChild(script2);

    // تنظيف بعد إزالة المكون
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(ins);
      document.body.removeChild(script2);
    };
  }, []);

  return null;
};

export default AdComponent;

'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const SharePrompt = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // استرجاع عدد الفتحات
    const openCount = parseInt(localStorage.getItem('openCount')) || 0;

    // تحديث العداد وتخزينه
    localStorage.setItem('openCount', openCount + 1);

    // تحقق من عدد الفتحات لعرض رسالة المشاركة
    if (openCount > 0) {
      setTimeout(() => {
        setShowModal(true);
      }, 15000);
    }
  }, []);

  // دالة لمشاركة التطبيق على واتساب أو عرض قائمة المشاركة
  const handleShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      'جرب تطبيق "كرتون بهيجة" الرائع'
    )}`;

    // تحقق مما إذا كان واتساب مثبتًا، وإلا عرض قائمة المشاركة
    if (navigator.share) {
      navigator
        .share({
          title: 'كرتون بهيجة',
          text: 'جرب تطبيق "كرتون بهيجة" الرائع لمشاهدة أفضل أفلام الكرتون',
          url: 'https://cartoon.example.com', // ضع هنا رابط التطبيق
        })
        .then(() => localStorage.setItem('openCount', 0))
        .catch((error) => console.log('مشاركة ألغيت', error));
    } else {
      window.location.href = whatsappUrl;
    }

    // إعادة تعيين العداد بعد المشاركة
    localStorage.setItem('openCount', 0);
    setShowModal(false); // إغلاق النافذة بعد المشاركة
  };

  return (
    <>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              maxWidth: '300px',
            }}
          >
            <div className="relative size-14 w-full">
              <Image
                src="/android/android-launchericon-96-96.png" // رابط صورة التطبيق
                alt="App Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p>
              إذا أردت استخدام هذا التطبيق مجاناً عليك مشاركته على واتس اب مع
              أفراد العائلة والأصدقاء مع تحيات بهيجة أشرق لبن 😀
            </p>
            <button
              onClick={handleShare}
              style={{
                backgroundColor: '#25D366',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              مشاركة
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SharePrompt;

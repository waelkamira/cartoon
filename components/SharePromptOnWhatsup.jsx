'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const SharePrompt = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the prompt has already been shown in this session
    const hasShownPrompt = localStorage.getItem('hasShownPrompt');

    // If the prompt hasn't been shown yet, show it immediately
    if (!hasShownPrompt) {
      setTimeout(() => {
        setShowModal(true);
        localStorage.setItem('hasShownPrompt', 'true'); // Set flag to avoid repeat prompt in this session
      }, 10000);
    }

    // Remove hasShownPrompt when the app (or page) is closed
    const handleUnload = () => localStorage.removeItem('hasShownPrompt');
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // Sharing function
  const handleShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      'جرب تطبيق "كرتون بهيجة" الرائع'
    )}`;

    if (navigator.share) {
      navigator
        .share({
          title: 'كرتون بهيجة',
          text: 'جرب تطبيق "كرتون بهيجة" الرائع لمشاهدة أفضل أفلام الكرتون',
          url: 'https://cartoon-cloudflare-repo4.pages.dev', // Replace with app link
        })
        .then(() => console.log('shred'))
        .catch((error) => console.log('مشاركة ألغيت', error));
    } else {
      window.location.href = whatsappUrl;
    }

    // Close the modal after sharing
    setShowModal(false);
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
                src="/android/android-launchericon-96-96.png"
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

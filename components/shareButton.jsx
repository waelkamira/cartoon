'use client';
import React from 'react';
import { BsShare } from 'react-icons/bs';

export default function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'شوفوا شو لقيت',
          text: 'كرتون قديم وجديد',
          url: 'يجب وضع رابط تحميل التطبيق هنا', // ضع الرابط الخاص بالتطبيق هنا
        });
        console.log('Content shared successfully!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing is not supported in your browser.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="text-white text-sm rounded-md hover:bg-red-500 p-1"
    >
      مشاركة
      {/* <BsShare /> */}
    </button>
  );
}

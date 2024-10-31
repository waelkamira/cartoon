'use client';
import React, { useEffect } from 'react';

const SharePrompt = () => {
  useEffect(() => {
    // استرجاع عدد الفتحات
    const openCount = parseInt(localStorage.getItem('openCount')) || 0;

    // تحديث العداد وتخزينه
    localStorage.setItem('openCount', openCount + 1);

    // دالة لعرض الإشعار
    const showNotification = () => {
      if (Notification.permission === 'granted') {
        const notification = new Notification('كرتون بهيجة', {
          body: 'قم بمشاركة تطبيق كرتون بهيجة على واتساب للاستمرار!',
          icon: '/android/android-launchericon-96-96.png', // رابط صورة الأيقونة
        });

        // إعادة توجيه المستخدم إلى التطبيق عند الضغط على الإشعار
        notification.onclick = () => {
          window.focus();
        };
      }
    };

    // طلب إذن الإشعارات إن لم يكن ممنوحًا مسبقًا
    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification();
        }
      });
    } else if (Notification.permission === 'granted') {
      showNotification();
    }

    // دالة لمحاولة فتح واتساب إذا كان مثبتًا
    const openWhatsApp = () => {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        'جرب تطبيق "كرتون بهيجة" الرائع!'
      )}`;

      // محاولة فتح رابط WhatsApp مباشرة
      window.location.href = whatsappUrl;

      // إعادة تعيين العداد بعد المشاركة
      localStorage.setItem('openCount', 0);
    };

    // دالة لعرض قائمة المشاركة عند عدم توفر واتساب
    const shareFallback = () => {
      if (navigator.share) {
        navigator
          .share({
            title: 'كرتون بهيجة',
            text: 'جرب تطبيق "كرتون بهيجة" الرائع لمشاهدة أفضل أفلام الكرتون!',
            url: '/android/android-launchericon-96-96.png', // رابط التطبيق
          })
          .then(() => localStorage.setItem('openCount', 0))
          .catch((error) => console.log('مشاركة ألغيت', error));
      } else {
        alert('ميزة المشاركة غير مدعومة في متصفحك.');
      }
    };

    // تحقق من عدد الفتحات لعرض رسالة المشاركة
    if (openCount > 0) {
      const shareMessage =
        'قم بمشاركة تطبيق "كرتون بهيجة" على واتساب للاستمرار في استخدامه!';

      // عرض رسالة التأكيد
      if (window.confirm(shareMessage)) {
        // حاول فتح واتساب، وإذا لم يكن متوفرًا فافتح قائمة المشاركة
        openWhatsApp();
        setTimeout(() => {
          // إذا لم يتم التوجيه لواتساب بعد 500 مللي ثانية، فافتح قائمة المشاركة
          if (window.location.href === whatsappUrl) {
            shareFallback();
          }
        }, 500);
      }
    }
  }, []);

  return null; // هذا المكون يعمل فقط عند تحميل الصفحة
};

export default SharePrompt;

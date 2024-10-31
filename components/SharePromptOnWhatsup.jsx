'use client';
import React, { useEffect } from 'react';

const SharePrompt = () => {
  useEffect(() => {
    // استرجاع عدد الفتحات
    const openCount = parseInt(localStorage.getItem('openCount')) || 0;

    // تحديث العداد وتخزينه
    localStorage.setItem('openCount', openCount + 1);

    // تحقق من عدد الفتحات لعرض الرسالة
    if (openCount > 0) {
      // حسب عدد الفتحات التي ترغب بها
      // عرض رسالة المشاركة
      if (
        window.confirm(
          'قم بمشاركة هذا التطبيق على واتساب للاستمرار في استخدامه!'
        )
      ) {
        // إعادة التوجيه إلى رابط المشاركة على واتساب
        window.location.href = `https://wa.me/?text=${encodeURIComponent(
          'جرب هذا التطبيق الرائع!'
        )}`;

        // إعادة تعيين العداد بعد المشاركة
        localStorage.setItem('openCount', 0);
      }
    }
  }, []);

  return null; // هذا المكون يعمل فقط عند تحميل الصفحة
};

export default SharePrompt;

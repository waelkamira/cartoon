'use client';
import { useContext, useEffect, useState } from 'react';
import CurrentUser from '../CurrentUser';
import { inputsContext } from '../Context';

export default function SubscribedOrNot() {
  const [Subscribed, setSubscribed] = useState(false); // الافتراض أنه غير مشترك
  const user = CurrentUser(); // الحصول على بيانات المستخدم
  const { rerender_subscribed_or_not } = useContext(inputsContext);

  useEffect(() => {
    const currentDate = new Date();

    if (user) {
      const createdAtDate = new Date(user?.createdAt);
      const timeDifference = currentDate - createdAtDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      // المستخدم غير مشترك ولم تمر أكثر من يوم منذ إنشاء الحساب (تجربة مجانية)
      if (
        user?.monthly_subscribed === false &&
        user?.yearly_subscribed === false &&
        daysDifference <= 1
      ) {
        console.log('user', 'مشترك تجريبي', daysDifference);
        setSubscribed(true); // المستخدم يعتبر مشتركًا تجريبيًا
      } else if (user?.monthly_subscribed) {
        // التحقق من الاشتراك الشهري
        const monthlySubscribedDate = new Date(user?.monthly_subscribed_date);
        const daysSinceMonthlySubscribed =
          (currentDate - monthlySubscribedDate) / (1000 * 60 * 60 * 24);

        if (daysSinceMonthlySubscribed <= 30) {
          console.log('user', 'مشترك شهري');
          setSubscribed(true); // المستخدم ما زال مشتركًا
        }
      } else if (user?.yearly_subscribed) {
        // التحقق من الاشتراك السنوي
        const yearlySubscribedDate = new Date(user?.yearly_subscribed_date);
        const daysSinceYearlySubscribed =
          (currentDate - yearlySubscribedDate) / (1000 * 60 * 60 * 24);

        if (daysSinceYearlySubscribed <= 365) {
          console.log('user', 'مشترك سنوي');
          setSubscribed(true); // المستخدم ما زال مشتركًا
        }
      } else {
        console.log('user', 'غير مشترك');
        setSubscribed(false); // غير مشترك
      }
    }
  }, [user, rerender_subscribed_or_not]);

  return Subscribed;
}

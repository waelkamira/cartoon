'use client';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import CurrentUser from './CurrentUser';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function SubscriptionMessage() {
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const user = CurrentUser();
  const path = usePathname();

  // console.log('path', path);
  useEffect(() => {
    // console.log('user', user);
    const currentDate = new Date();
    // console.log('currentDate', currentDate);

    if (user) {
      const createdAtDate = new Date(user?.createdAt);
      // console.log('createdAtDate', createdAtDate);

      const timeDifference = currentDate - createdAtDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      if (
        !user?.monthly_subscribed &&
        !user?.yearly_subscribed &&
        daysDifference >= 1
      ) {
        console.log('user', 'غير مشترك');

        setShowSubscriptionMessage(true);
      } else if (user?.monthly_subscribed) {
        console.log('user', '30 مشترك شهري');
        const monthlySubscribedDate = new Date(user?.monthly_subscribed_date);
        const daysSinceMonthlySubscribed =
          (currentDate - monthlySubscribedDate) / (1000 * 60 * 60 * 24);
        console.log('daysSinceMonthlySubscribed', daysSinceMonthlySubscribed);

        if (daysSinceMonthlySubscribed >= 30) {
          setShowSubscriptionMessage(true);
        }
      } else if (user?.yearly_subscribed) {
        console.log('user', '365 مشترك سنوي');
        const yearlySubscribedDate = new Date(user?.yearly_subscribed_date);
        const daysSinceYearlySubscribed =
          (currentDate - yearlySubscribedDate) / (1000 * 60 * 60 * 24);
        console.log('daysSinceYearlySubscribed', daysSinceYearlySubscribed);

        if (daysSinceYearlySubscribed >= 365) {
          setShowSubscriptionMessage(true);
        }
      }
    }
    // isPaymentSucceeded();
  }, [user]);

  // //تحقق من نجاح عملية الدفع
  // async function isPaymentSucceeded() {
  //   const response = await fetch('/api/webhook/stripe');
  //   const json = await response?.json();
  //   console.log('json', json);
  // }
  return (
    <div>
      {showSubscriptionMessage && !path?.includes('pay') && (
        <div className="fixed right-0 h-screen w-full z-40 bg-white/99">
          <div className="flex-col justify-center items-center text-white py-4 w-full h-full bg-one rounded-md my-44 p-4">
            <div className="relative flex justify-center h-44 w-full text-center">
              <Image
                src={'https://i.imgur.com/nfDVITC.png'}
                layout="fill"
                objectFit="contain"
                alt="photo"
              />
            </div>
            <h1 className="text-center my-8">
              يجب عليك شراء بسكوتة 🍫 للمتابعة
            </h1>
            <Button
              title={'شراء بسكوتة'}
              path={'/pay'}
              style={'border border-white '}
            />
          </div>
        </div>
      )}
    </div>
  );
}

'use client';
import { useContext, useEffect } from 'react';
import Button from '../../components/Button';
import CurrentUser from '../../components/CurrentUser';
import { useRouter } from 'next/navigation';
import { inputsContext } from '../../components/Context';

export default function PaymentSuccess({ plan }) {
  const user = CurrentUser();
  // console.log('user', user);
  const router = useRouter();
  const { dispatch } = useContext(inputsContext);

  // console.log('plan', plan);
  useEffect(() => {
    if (user) {
      updateUserSubscription();
    }
  }, [user]);
  async function updateUserSubscription() {
    const date = new Date();

    // استخراج الأجزاء المختلفة للتاريخ
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // الأشهر تبدأ من 0
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

    // بناء سلسلة التاريخ
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;

    // console.log(formattedDate);

    // console.log('date', date);
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...user,
        email: user?.email,
        image: user?.image,
        name: user?.name,
        plan_price: plan?.price,
        monthly_subscribed: plan?.price === 1 ? true : false,
        monthly_subscribed_date: plan?.price === 1 ? formattedDate : null,
        yearly_subscribed: plan?.price === 1 ? false : true,
        yearly_subscribed_date: plan?.price === 1 ? null : formattedDate,
      }),
    });
    if (response) {
      dispatch({ type: 'RERENDER' });
      // console.log('subscribed');
      // setTimeout(() => {
      //   if (typeof window !== 'undefined') {
      //     window?.location?.reload();
      //   }
      // }, 5000);
    }
  }

  return (
    <main className="fixed flex-col justify-end items-end  w-full h-full bg-white z-50 overflow-y-auto top-0 text-center">
      <div className="absolute bottom-0 z-50 p-8 w-full min-h-52 overflow-y-auto">
        <h1 className="text-2xl font-extrabold">
          تم تفعيل اشتراكك{' '}
          <span className="text-one">{plan?.subscription_period}</span> يوماً!
        </h1>
        {/* <h2 className="text-xl">جاري تفعيل الاشتراك</h2> */}

        <Button title={'رجوع للصفحة الرئيسية'} path={'/'} />
      </div>
    </main>
  );
}

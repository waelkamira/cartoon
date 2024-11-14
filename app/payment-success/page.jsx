'use client';
import { useEffect } from 'react';
import Button from '../../components/Button';
import CurrentUser from '../../components/CurrentUser';
import { useRouter } from 'next/navigation';
export default function PaymentSuccess() {
  const user = CurrentUser();
  console.log('user', user);
  const router = useRouter();
  useEffect(() => {
    updateUserSubscription();
  }, []);
  async function updateUserSubscription() {
    const date = new Date();
    // console.log('date', date);
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, subscribed: true }),
    });
    if (response) {
      // console.log('subscribed');
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-black text-center border m-10 rounded-md bg-white">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          تم تفعيل اشتراكك 30 يوماً!
        </h1>
        <h2 className="text-2xl">سيتم تحويلك للصفحة الرئيسية تلقائياً</h2>

        <Button title={'رجوع للصفحة الرئيسية'} path={'/'} />
      </div>
    </main>
  );
}

import { useContext, useEffect, useState } from 'react';
import { inputsContext } from './Context';
import { useSession } from 'next-auth/react';

export default function CurrentUser() {
  const { profile_image } = useContext(inputsContext);

  const [user, setUser] = useState();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      getUserData();

      // إنشاء مؤقت لإعادة التحميل كل 30 دقيقة
      const interval = setInterval(() => {
        getUserData();
      }, 1800000); // 30 دقيقة = 1800000 ميلي ثانية

      // تنظيف المؤقت عند تدمير المكون
      return () => clearInterval(interval);
    }
  }, [status, profile_image?.image]);

  async function getUserData() {
    if (session) {
      const email = session?.user?.email;
      const response = await fetch(`/api/user?email=${email}`);
      const json = await response?.json();
      if (response.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('CurrentUser', JSON.stringify(json[0]));
        }

        setUser(json[0]);
      }
    }
  }

  return { ...user };
}

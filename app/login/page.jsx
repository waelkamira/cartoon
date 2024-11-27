'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../components/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import CustomToast from '../../components/CustomToast';
import { useEffect } from 'react';
import { TbDoorEnter } from 'react-icons/tb';

export default function LogInPage() {
  const session = useSession();
  // console.log(session?.data?.user?.name);
  const router = useRouter();
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(),
  });

  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (session?.data?.user?.email) {
      // تحديد الصفحة المطلوبة بعد تسجيل الدخول
      const callbackUrl = router.query?.callbackUrl || '/';
      router.push(callbackUrl);
    }
  }, [router, session?.data?.user?.email]);

  async function onSubmit() {
    if (getValues()?.email === '') {
      setError('email', {
        type: 'custom',
        message: 'عنوان البريد الإلكتروني مطلوب',
      });
      return;
    } else if (getValues()?.password?.length < 5) {
      setError('password', {
        type: 'custom',
        message:
          'طول كلمة السر يجب أن يكون 5 أحرف (أو 5 أرقام وأحرف) على الأقل',
      });
      return;
    }
    // console.log('getValues', getValues());

    const response = await signIn('credentials', {
      ...getValues(),
      redirect: false,
      callbackUrl: '/',
      popup: true,
    });

    if (response.ok) {
      const values = getValues();

      localStorage.setItem('email', values?.email);
      // localStorage.setItem('password', values?.password);
      router.push('/');
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={' بهيجة اشرق لبن ترحب بكم أهلا وسهلا '}
          emoji={'🧀'}
          greenEmoji={'🧀'}
        />
      ));
    } else {
      setError(response?.error);
      toast.custom((t) => (
        <CustomToast
          t={t}
          message={
            'عنوان البريد الالكتروني هذا غير موجود يجب عليك التسجيل أولا 😐'
          }
        />
      ));
    }
  }

  function handleGoogleSignIn() {
    const clientId =
      '214968631752-aquuoiiq6ffe43tbq55q3usrcjgbl685.apps.googleusercontent.com';
    const redirectUri =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/auth/callback/google'
        : 'https://cartoon-alpha.vercel.app/api/auth/callback/google';
    const scope = 'openid email profile';
    const responseType = 'code';
    const codeChallengeMethod = 'S256';

    // بناء رابط Google OAuth
    const state = Math.random().toString(36).substring(7); // رمز حالة عشوائي
    const codeChallenge = 'cVY22UbN_cpHIFUCRYfRphGuPze-NDuLBh2mr06lXVE'; // استبدله إذا كنت تستخدم `PKCE`

    const googleOAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=${responseType}&` +
      `scope=${encodeURIComponent(scope)}&` +
      `state=${state}&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=${codeChallengeMethod}`;

    // فتح نافذة منبثقة
    const popupWidth = 500;
    const popupHeight = 700;
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;
    const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`;

    const popup = window.open(googleOAuthUrl, 'GoogleLoginPopup', options);

    const checkPopup = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopup);
        fetch('/api/auth/session')
          .then((res) => res.json())
          .then((session) => {
            if (session?.user) {
              router.push('/dashboard');
            } else {
              console.error('تسجيل الدخول غير ناجح');
            }
          });
      }
    }, 1000);

    if (!popup) {
      console.error('تعذر فتح النافذة المنبثقة.');
      return;
    }

    // مراقبة النافذة المنبثقة
    const interval = setInterval(() => {
      if (popup.closed) {
        clearInterval(interval);
        fetch('/api/auth/session')
          .then((res) => res.json())
          .then((session) => {
            if (session?.user) {
              router.push('/');
            } else {
              console.error('لم يتم تسجيل الدخول.');
            }
          });
      }
    }, 500);
  }

  return (
    <div className="flex justify-center items-center w-full h-screen text-white text-lg md:text-xl text-end">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-1/2 bg-four p-8 rounded-lg border border-one"
      >
        <h1 className="flex justify-center mb-16 w-full my-2 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-center select-none text-nowrap">
          تسجيل الدخول
          <TbDoorEnter className="text-3xl" />
        </h1>

        <div className="relative flex justify-center h-44 w-full text-center">
          <Image
            src={'https://i.imgur.com/nfDVITC.png'}
            layout="fill"
            objectFit="contain"
            alt="photo"
          />
        </div>
        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 select-none text-start text-sm sm:text-lg">
            البريد الإلكتروني
          </h1>
          <input
            type="text"
            name={'email'}
            placeholder="الإيميل"
            {...register('email')}
            className=" placeholder-gray-400 transition-all placeholder:text-sm placeholder:sm:text-lg duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-start"
          />
        </div>
        {errors?.email && (
          <h1 className="text-one text-md my-2 select-none">
            {errors?.email?.message}
          </h1>
        )}

        <div className="relative flex flex-col items-start justify-center w-full">
          <h1 className="w-full my-4 select-none text-start text-sm sm:text-lg">
            كلمة السر
          </h1>
          <input
            type="password"
            name={'password'}
            placeholder="كلمة السر"
            {...register('password')}
            className=" placeholder-gray-400 placeholder:text-sm placeholder:sm:text-lg transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-start"
          />
        </div>
        {errors?.password && (
          <h1 className="text-one text-md my-2 select-none">
            {errors?.password?.message}
          </h1>
        )}
        <div
          className="flex justify-center w-full bg-white rounded-md px-4 py-2 gap-2 items-center my-8 hover:shadow-md cursor-pointer hover:scale-110"
          onClick={handleGoogleSignIn}
        >
          <h1 className="text-sm sm:text-lg grow text-center text-gray-500 select-none font-semibold">
            تسجيل الدخول عن طريق جوجل
          </h1>
          <div className="relative h-8 w-8 ">
            <Image
              priority
              src={'https://i.imgur.com/Z4ts3yl.png'}
              alt="google image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-8 items-center mt-4 w-full">
          <button
            type="submit"
            className=" text-lg p-2 shadow-lg my-3 text-white text-nowrap bg-five hover:bg-one rounded-lg hover:scale-[101%] w-full "
          >
            تسجيل الدخول
          </button>

          <div className="w-full">
            <Link href={'/'}>
              <button
                type="submit"
                className=" text-lg p-2 shadow-lg my-3 text-white text-nowrap bg-five hover:bg-one rounded-lg hover:scale-[101%] w-full "
              >
                إغلاق{' '}
              </button>{' '}
            </Link>
          </div>
        </div>
        <Link href={'/register'}>
          <h1 className="flex gap-2 mt-4 text-start text-sm sm:text-lg text-nowrap underline">
            ليس لديك حساب؟ قم بالتسجيل هنا{' '}
            <TbDoorEnter className="text-xl animate-pulse" />
          </h1>
        </Link>
      </form>
    </div>
  );
}

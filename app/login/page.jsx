// 'use client';

// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Button from '../../components/Button';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import Link from 'next/link';
// import { signIn, useSession } from 'next-auth/react';
// import Image from 'next/image';
// import CustomToast from '../../components/CustomToast';
// import { useEffect } from 'react';
// import { TbDoorEnter } from 'react-icons/tb';

// export default function LogInPage() {
//   const session = useSession();
//   // console.log(session?.data?.user?.name);
//   const router = useRouter();
//   const schema = z.object({
//     email: z.string().email(),
//     password: z.string().min(),
//   });
//   // {
//   //   "version": 2,
//   //   "builds": [
//   //     { "src": "package.json", "use": "@vercel/node" },
//   //     { "src": "next.config.js", "use": "@vercel/next" }
//   //   ]
//   // }

//   const {
//     register,
//     getValues,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(schema) });

//   useEffect(() => {
//     if (session?.data?.user?.email) {
//       router.push('/');
//     }
//   }, [router, session?.data?.user?.email]);

//   async function onSubmit() {
//     if (getValues()?.email === '') {
//       setError('email', {
//         type: 'custom',
//         message: 'عنوان البريد الإلكتروني مطلوب',
//       });
//       return;
//     } else if (getValues()?.password?.length < 5) {
//       setError('password', {
//         type: 'custom',
//         message:
//           'طول كلمة السر يجب أن يكون 5 أحرف (أو 5 أرقام وأحرف) على الأقل',
//       });
//       return;
//     }
//     // console.log('getValues', getValues());

//     const response = await signIn('credentials', {
//       ...getValues(),
//       redirect: false,
//       callbackUrl: '/',
//     });

//     if (response.ok) {
//       const values = getValues();

//       localStorage.setItem('email', values?.email);
//       // localStorage.setItem('password', values?.password);
//       router.push('/');
//       toast.custom((t) => (
//         <CustomToast
//           t={t}
//           message={' بهيجة اشرق لبن ترحب بكم أهلا وسهلا '}
//           emoji={'🧀'}
//           greenEmoji={'🧀'}
//         />
//       ));
//     } else {
//       setError(response?.error);
//       toast.custom((t) => (
//         <CustomToast
//           t={t}
//           message={
//             'عنوان البريد الالكتروني هذا غير موجود يجب عليك التسجيل أولا 😐'
//           }
//         />
//       ));
//     }
//   }

//   return (
//     <div className="flex justify-center items-center w-full h-screen text-white text-lg md:text-xl text-end">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full lg:w-1/2 bg-four p-8 rounded-lg border border-one"
//       >
//         <h1 className="flex justify-center mb-16 w-full my-2 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-center select-none text-nowrap">
//           تسجيل الدخول
//           <TbDoorEnter className="text-3xl" />
//         </h1>

//         <div className="relative flex justify-center h-44 w-full text-center">
//           <Image
//             src={'https://i.imgur.com/nfDVITC.png'}
//             layout="fill"
//             objectFit="contain"
//             alt="photo"
//           />
//         </div>
//         <div className="relative flex flex-col items-start justify-center w-full">
//           <h1 className="w-full my-4 select-none text-start text-sm sm:text-lg">
//             البريد الإلكتروني
//           </h1>
//           <input
//             type="text"
//             name={'email'}
//             placeholder="الإيميل"
//             {...register('email')}
//             className=" placeholder-gray-400 transition-all placeholder:text-sm placeholder:sm:text-lg duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-start"
//           />
//         </div>
//         {errors?.email && (
//           <h1 className="text-one text-md my-2 select-none">
//             {errors?.email?.message}
//           </h1>
//         )}

//         <div className="relative flex flex-col items-start justify-center w-full">
//           <h1 className="w-full my-4 select-none text-start text-sm sm:text-lg">
//             كلمة السر
//           </h1>
//           <input
//             type="password"
//             name={'password'}
//             placeholder="كلمة السر"
//             {...register('password')}
//             className=" placeholder-gray-400 placeholder:text-sm placeholder:sm:text-lg transition-all duration-300 grow py-2 border-2 border-gray-300 border-solid focus:border-2 focus:outline-one outline-none rounded-md px-2 w-full caret-one text-black text-start"
//           />
//         </div>
//         {errors?.password && (
//           <h1 className="text-one text-md my-2 select-none">
//             {errors?.password?.message}
//           </h1>
//         )}
//         <div
//           className="flex justify-center w-full bg-white rounded-md px-4 py-2 gap-2 items-center my-8 hover:shadow-md cursor-pointer hover:scale-110"
//           onClick={() =>
//             signIn('google', {
//               redirect: false, // يمنع التنقل الكامل
//               callbackUrl: '/',
//             })
//           }
//         >
//           <h1 className="text-sm sm:text-lg grow text-center text-gray-500 select-none font-semibold">
//             تسجيل الدخول عن طريق جوجل
//           </h1>
//           <div className="relative h-8 w-8 ">
//             <Image
//               priority
//               src={'https://i.imgur.com/Z4ts3yl.png'}
//               alt="google image"
//               layout="fill"
//               objectFit="contain"
//             />
//           </div>
//         </div>
//         <div className="flex flex-col sm:flex-row justify-between gap-8 items-center mt-4 w-full">
//           {/* <button
//             type="submit"
//             className=" text-lg p-2 shadow-lg my-3 text-white text-nowrap bg-five hover:bg-one rounded-lg hover:scale-[101%] w-full "
//           >
//             تسجيل الدخول
//           </button> */}

//           <div className="w-full">
//             <Link href={'/'}>
//               <button
//                 type="submit"
//                 className=" text-lg p-2 shadow-lg my-3 text-white text-nowrap bg-five hover:bg-one rounded-lg hover:scale-[101%] w-full "
//               >
//                 إغلاق{' '}
//               </button>{' '}
//             </Link>
//           </div>
//         </div>
//         <Link href={'/register'}>
//           <h1 className="flex gap-2 mt-4 text-start text-sm sm:text-lg text-nowrap underline">
//             ليس لديك حساب؟ قم بالتسجيل هنا{' '}
//             <TbDoorEnter className="text-xl animate-pulse" />
//           </h1>
//         </Link>
//       </form>
//     </div>
//   );
// }

// 'use client';
// import { signIn } from 'next-auth/react';
// import { toast } from 'react-hot-toast';

// export default function LogInPage() {
//   const handleGoogleSignIn = async () => {
//     try {
//       const res = await signIn('google', { callbackUrl: '/' });
//       if (res?.error) {
//         toast.error('فشل تسجيل الدخول: ' + res.error);
//       } else {
//         toast.success('تم تسجيل الدخول بنجاح');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('حدث خطأ أثناء تسجيل الدخول');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">تسجيل الدخول</h1>
//       <button
//         onClick={handleGoogleSignIn}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         تسجيل الدخول باستخدام Google
//       </button>
//     </div>
//   );
// }

// app/auth/page.js
'use client';
import GoogleLoginButton from '../../components/google_login/GoogleLoginButton';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await fetch('/api/auth/google-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: token }),
      });

      // تحقق من نوع المحتوى أولاً
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json(); // إذا كانت الاستجابة JSON، استخدم json()
        console.log(data);
      } else {
        const textResponse = await res.text(); // في حالة عدم كونها JSON، استخدم text()
        console.error('استجابة غير JSON:', textResponse);
      }
    } catch (error) {
      console.error('حدث خطأ:', error);
    }
  };

  const handleError = () => {
    toast.error('فشل تسجيل الدخول');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">تسجيل الدخول</h1>
      <GoogleLoginButton
        onSuccess={handleGoogleLogin}
        onError={handleError}
        auto_select // تمكين تسجيل الدخول التلقائي
      />
    </div>
  );
}

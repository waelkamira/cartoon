// 'use client';
// import Image from 'next/image';
// import React, { useContext, useEffect, useState } from 'react';
// import { TbArrowBigLeftLinesFilled } from 'react-icons/tb';
// import PaypalButton from './paypalButton';
// import SubscribedOrNot from './subscribedOrNot';
// import CurrentUser from '../CurrentUser';
// import { FaCheck } from 'react-icons/fa6';
// import { inputsContext } from '../Context';
// import { SiAdguard } from 'react-icons/si';
// import { SiAdblock } from 'react-icons/si';
// import { BsTv } from 'react-icons/bs';

// export const plans = [
//   {
//     price: 1,
//     duration: '/شهر',
//     subscription_period: 30,
//   },
//   {
//     price: 10,
//     duration: '/سنة',
//     subscription_period: 365,
//   },
// ];

// export default function SubscriptionPage() {
//   const [plan, setPlan] = useState(plans[0]);
//   const subscribed = SubscribedOrNot();
//   const user = CurrentUser();
//   const { dispatch } = useContext(inputsContext);

//   //   console.log('subscribed', subscribed);
//   //   console.log('user', user);
//   useEffect(() => {
//     checkUser();
//   }, []);
//   function checkUser() {
//     dispatch({ type: 'RERENDER' });
//   }
//   return (
//     <>
//       {!subscribed &&
//         user?.monthly_subscribed === false &&
//         user?.yearly_subscribed === false && (
//           <div className="fixed flex-col justify-center items-center w-full h-full bg-white z-40 overflow-y-auto top-0 pb-24 text-center">
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full sm:w-1/3 p-4 overflow-y-auto">
//               <div className="flex flex-col text-center w-full mb-12">
//                 <p className="font-medium text-one mb-5">الاشتراك</p>
//                 <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
//                   مرحباً أصدقاء بهيجة أشرق لبن
//                 </h2>
//               </div>
//               <div className="relative flex justify-center h-44 w-full text-center">
//                 <Image
//                   loading="lazy"
//                   src={'https://i.imgur.com/nfDVITC.png'}
//                   layout="fill"
//                   objectFit="contain"
//                   alt="photo"
//                 />
//               </div>
//               <h1 className="text-center my-8">يجب عليك الاشتراك للمتابعة</h1>
//               <h1>اختر نوع الاشتراك</h1>
//               <div
//                 className={
//                   (plan?.price === 1 ? 'border-[#8FEA2F]' : 'border-white') +
//                   ' flex items-start justify-start gap-2  rounded-lg p-2 my-2 cursor-pointer'
//                 }
//                 onClick={() => setPlan(plans[0])}
//               >
//                 <TbArrowBigLeftLinesFilled
//                   className={
//                     plan?.price === 1
//                       ? 'text-one animate-pulse'
//                       : 'text-white animate-pulse'
//                   }
//                 />
//                 <input
//                   type="checkbox"
//                   name="monthly"
//                   className="radio "
//                   checked={plan?.price === 1}
//                 />
//                 <span>اشتراك شهري</span>
//               </div>
//               <div
//                 className={
//                   (plan?.price === 10 ? 'border-green-400' : 'border-white') +
//                   ' flex items-start justify-start gap-2 rounded-lg p-2 my-2 cursor-pointer'
//                 }
//                 onClick={() => setPlan(plans[1])}
//               >
//                 <TbArrowBigLeftLinesFilled
//                   className={
//                     plan?.price === 10
//                       ? 'text-one animate-pulse '
//                       : 'text-white animate-pulse'
//                   }
//                 />
//                 <input
//                   type="checkbox"
//                   name="yearly"
//                   className="radio"
//                   checked={plan.price === 10}
//                 />
//                 <div>
//                   <span className="w-full mb-4">اشتراك سنوي (خصم 16% 💰)</span>
//                 </div>
//               </div>
//               <div className="flex justify-center gap-2 w-full p-2 rounded-lg mb-4">
//                 <p className={`text-5xl tracking-tight font-extrabold`}>
//                   ${plan.price}
//                 </p>
//                 <div className="flex flex-col justify-end mb-[4px]">
//                   <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
//                     {plan.duration}
//                   </p>
//                 </div>
//               </div>
//               <PaypalButton plan={plan} />
//               <div className="flex text-sm my-4 mt-8 border-[#8FEA2F] rounded-lg p-2">
//                 <div className="flex-col justify-center items-center w-full">
//                   <SiAdguard className="text-green-400 text-center w-full text-xl" />

//                   <h1 className="">محتوى أمن</h1>
//                 </div>
//                 <div className="flex-col justify-center items-center w-full">
//                   <BsTv className="text-green-400 text-center w-full text-xl" />

//                   <h1 className="">دقة عالية</h1>
//                 </div>
//                 <div className="flex-col justify-center items-center w-full">
//                   <SiAdblock className="text-green-400 text-center w-full text-xl" />

//                   <h1 className="">بدون إعلانات</h1>
//                 </div>
//               </div>

//               <ul className="space-y-2.5 leading-relaxed flex-1 w-full text-sm p-2 my-4 border-[#8FEA2F] rounded-lg text-start">
//                 {[
//                   { name: 'مشاهدة أفلام الكرتون القديمة و الحديثة' },
//                   {
//                     name: 'مشاهدة بدون إعلانات',
//                   },
//                   { name: ' مشاهدة أفلام ديزني وبكسار بجودة عالية' },
//                   { name: 'كرتون مدبلج باحترافية' },
//                   { name: 'رفع دوري لأحدث الأفلام والمسلسلات الكرتونية' },
//                   { name: 'بالإضافة إلى كرتون باللغة الإنجليزية و التركية' },
//                 ].map((feature, i) => (
//                   <li key={i} className="flex items-center gap-2">
//                     <div>
//                       <FaCheck className="text-green-500 text-sm" />
//                     </div>

//                     <span>{feature.name} </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//     </>
//   );
// }
'use client';

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import PaypalButton from './paypalButton';
import SubscribedOrNot from './subscribedOrNot';
import CurrentUser from '../CurrentUser';
import { inputsContext } from '../Context';
import { motion } from 'framer-motion';
import {
  Check,
  CreditCard,
  Shield,
  Tv,
  Ban,
  Star,
  Crown,
  Sparkles,
  Calendar,
  CalendarClock,
  Globe,
  Film,
  Zap,
} from 'lucide-react';

export const plans = [
  {
    price: 1,
    duration: '/شهر',
    subscription_period: 30,
  },
  {
    price: 10,
    duration: '/سنة',
    subscription_period: 365,
  },
];

export default function SubscriptionPage() {
  const [plan, setPlan] = useState(plans[0]);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const subscribed = SubscribedOrNot();
  const user = CurrentUser();
  const { dispatch } = useContext(inputsContext);

  useEffect(() => {
    checkUser();
  }, []);

  function checkUser() {
    dispatch({ type: 'RERENDER' });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  const featureItems = [
    {
      name: 'مشاهدة أفلام الكرتون القديمة و الحديثة',
      icon: <Film size={16} />,
    },
    { name: 'مشاهدة بدون إعلانات', icon: <Ban size={16} /> },
    { name: 'مشاهدة أفلام ديزني وبكسار بجودة عالية', icon: <Star size={16} /> },
    { name: 'كرتون مدبلج باحترافية', icon: <Globe size={16} /> },
    {
      name: 'رفع دوري لأحدث الأفلام والمسلسلات الكرتونية',
      icon: <Zap size={16} />,
    },
    {
      name: 'بالإضافة إلى كرتون باللغة الإنجليزية و التركية',
      icon: <Globe size={16} />,
    },
  ];

  return (
    <>
      {!subscribed &&
        // وضعت هذا هنا فقط لحجب الصفحة اثناء التطوير هو شرط لا علاقة له
        1 < 0 &&
        user?.monthly_subscribed === false &&
        user?.yearly_subscribed === false && (
          <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-[#3a2a7d] z-40 overflow-y-auto">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#8e44ad]/10 blur-xl"></div>
              <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-[#9b59b6]/10 blur-xl"></div>
              <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#8e44ad]/10 blur-lg"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-md mx-auto bg-[#2c1f5e] rounded-2xl shadow-2xl overflow-hidden p-6 my-8"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8e44ad] to-[#9b59b6]"></div>
              <div className="absolute top-4 right-4 opacity-10">
                <Sparkles className="w-20 h-20 text-[#8e44ad]" />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10"
              >
                {/* Header */}
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-6"
                >
                  <div className="inline-block bg-[#8e44ad]/20 px-3 py-1 rounded-full mb-2">
                    <span className="text-[#9b59b6] font-medium text-sm">
                      الاشتراك المميز
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    مرحباً أصدقاء بهيجة أشرق لبن
                  </h2>
                  <p className="text-white/70 text-sm">
                    اشترك الآن للحصول على تجربة مشاهدة مميزة بدون إعلانات
                  </p>
                </motion.div>

                {/* Logo */}
                <motion.div
                  variants={itemVariants}
                  className="relative flex justify-center h-32 w-full mb-6"
                >
                  <div className="relative h-full w-full max-w-[200px]">
                    <Image
                      src={'https://i.imgur.com/nfDVITC.png'}
                      layout="fill"
                      objectFit="contain"
                      alt="logo"
                    />
                    <div className="absolute -inset-4 bg-[#8e44ad]/10 rounded-full blur-lg animate-pulse"></div>
                  </div>
                </motion.div>

                {/* Plan selection */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Crown className="w-4 h-4 mr-2 text-[#8e44ad]" />
                    اختر نوع الاشتراك
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        selectedPlan === 0
                          ? 'bg-gradient-to-br from-[#8e44ad] to-[#9b59b6] shadow-lg shadow-[#8e44ad]/30'
                          : 'bg-[#3a2a7d] border border-white/10'
                      }`}
                      onClick={() => {
                        setPlan(plans[0]);
                        setSelectedPlan(0);
                      }}
                    >
                      <div className="absolute top-2 right-2">
                        {selectedPlan === 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white rounded-full p-1"
                          >
                            <Check className="w-3 h-3 text-[#8e44ad]" />
                          </motion.div>
                        )}
                      </div>

                      <div className="flex flex-col items-center">
                        <Calendar className="w-8 h-8 mb-2 text-white" />
                        <span className="text-white font-medium">شهري</span>
                        <div className="mt-2 font-bold text-white">
                          $1<span className="text-xs font-normal">/شهر</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                        selectedPlan === 1
                          ? 'bg-gradient-to-br from-[#8e44ad] to-[#9b59b6] shadow-lg shadow-[#8e44ad]/30'
                          : 'bg-[#3a2a7d] border border-white/10'
                      }`}
                      onClick={() => {
                        setPlan(plans[1]);
                        setSelectedPlan(1);
                      }}
                    >
                      <div className="absolute top-2 right-2">
                        {selectedPlan === 1 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white rounded-full p-1"
                          >
                            <Check className="w-3 h-3 text-[#8e44ad]" />
                          </motion.div>
                        )}
                      </div>

                      <div className="flex flex-col items-center">
                        <CalendarClock className="w-8 h-8 mb-2 text-white" />
                        <span className="text-white font-medium">سنوي</span>
                        <div className="mt-2 font-bold text-white">
                          $10<span className="text-xs font-normal">/سنة</span>
                        </div>
                      </div>

                      <div className="absolute -top-2 -right-2">
                        <div className="bg-[#8FEA2F] text-[#2c1f5e] text-xs font-bold px-2 py-1 rounded-full transform rotate-12">
                          خصم 16% 💰
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Price display */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center items-end mb-6"
                >
                  <motion.p
                    key={plan.price}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-extrabold text-white"
                  >
                    ${plan.price}
                  </motion.p>
                  <div className="mb-1 ml-1">
                    <p className="text-sm text-white/70 font-medium">
                      {plan.duration}
                    </p>
                  </div>
                </motion.div>

                {/* PayPal button */}
                <motion.div variants={itemVariants} className="mb-6">
                  <PaypalButton plan={plan} />
                </motion.div>

                {/* Features */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="grid grid-cols-3 gap-2 bg-[#3a2a7d] rounded-xl p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#8e44ad]/20 flex items-center justify-center mb-2">
                        <Shield className="w-5 h-5 text-[#8e44ad]" />
                      </div>
                      <span className="text-white text-xs text-center">
                        محتوى أمن
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#8e44ad]/20 flex items-center justify-center mb-2">
                        <Tv className="w-5 h-5 text-[#8e44ad]" />
                      </div>
                      <span className="text-white text-xs text-center">
                        دقة عالية
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#8e44ad]/20 flex items-center justify-center mb-2">
                        <Ban className="w-5 h-5 text-[#8e44ad]" />
                      </div>
                      <span className="text-white text-xs text-center">
                        بدون إعلانات
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Benefits list */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-[#8e44ad]" />
                    المميزات
                  </h3>

                  <ul className="space-y-3 bg-[#3a2a7d] rounded-xl p-4">
                    {featureItems.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 bg-[#8e44ad]/20 p-1 rounded-full">
                          <Check className="w-3 h-3 text-[#8e44ad]" />
                        </div>
                        <div className="flex items-center">
                          <div className="mr-2 text-[#8e44ad]">
                            {feature.icon}
                          </div>
                          <span className="text-white/90 text-sm">
                            {feature.name}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Security note */}
                <motion.div
                  variants={itemVariants}
                  className="mt-6 text-center text-white/50 text-xs flex items-center justify-center"
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  <span>جميع المدفوعات آمنة ومشفرة</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
    </>
  );
}

'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import CurrentUser from '../CurrentUser';
import Image from 'next/image';

// Stripe Plans >> fill in your own priceId & link
export const plans = [
  {
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_3cs00Y2SS1No9zybII'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1QKLFkGuuuUL2td5xMyNAvua'
        : '',
    price: 1,
    duration: '/شهر',
  },
  {
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_28o5lidxw2Rs7rq3cd'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1QKMnIGuuuUL2td5WLUCAnCV'
        : '',

    price: 10,
    duration: '/سنة',
  },
];

const Pricing = () => {
  const { data: session } = useSession();
  const [plan, setPlan] = useState(plans[0]);
  const user = CurrentUser();

  useEffect(() => {
    handlePlanPrice(plan?.price);
  }, [plan?.price]);
  //هذه الدالة لتخزين قيمة الخطة المدفوعة لأننا سوف نحتاج هذه القيمة في الباك اند لتعديل حقول monthly_subscribed monthly_subscribed_date
  // أو yearly_subscribed yearly_subscribed_date
  // على حسب القيمة
  async function handlePlanPrice(price) {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...user, plan_price: price }),
    });
  }
  return (
    <>
      <section id="pricing" className="bg-white">
        <div className="py-2 px-8 max-w-5xl mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <p className="font-medium text-primary mb-5">الاشتراك</p>
            <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
              مرحباً أصدقاء بهيجة أشرق لبن{' '}
            </h2>
          </div>
          <div className="relative flex justify-center h-44 w-full text-center">
            <Image
              src={'https://i.imgur.com/nfDVITC.png'}
              layout="fill"
              objectFit="contain"
              alt="photo"
            />
          </div>
          <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
            <div className=" w-full max-w-lg">
              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-xl">
                <div className="flex-col sm:flex-row items-center gap-8">
                  <h1 className="p-2">اختر نوع الاشتراك:</h1>
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[0])}
                  >
                    <input
                      type="checkbox"
                      name="monthly"
                      className="radio h-12"
                      checked={plan.price === 1}
                    />
                    <span>اشتراك شهري</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    onClick={() => setPlan(plans[1])}
                  >
                    <input
                      type="checkbox"
                      name="yearly"
                      className="radio"
                      checked={plan.price === 10}
                    />
                    <span>اشتراك سنوي (خصم 16% 💰) </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <p className={`text-5xl tracking-tight font-extrabold`}>
                    ${plan.price}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                      {plan.duration}
                    </p>
                  </div>
                </div>
                <div className="w-full h-8 text-center">
                  <a
                    className="w-full bg-green-400 text-lg py-2 px-12 rounded-md text-center hover:scale-150"
                    href={
                      plan.link + '?prefilled_email=' + session?.user?.email
                    }
                  >
                    اشتراك
                  </a>
                </div>
                <ul className="space-y-2.5 leading-relaxed text-base flex-1 w-full">
                  {[
                    { name: 'مشاهدة أفلام كرتون قديمة و حديثة' },
                    {
                      name: 'مشاهدة بدون إعلانات',
                    },
                    { name: ' مشاهدة أفلام ديزني وبكسار بجودة عالية' },
                    { name: 'كرتون مدبلج باحترافية' },
                    { name: 'رفع دوري لأحدث الأفلام والمسلسلات الكرتونية' },
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-[18px] h-[18px] opacity-80 shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span>{feature.name} </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="fixed right-8 bottom-8">
        <a
          href="https://shipfa.st?ref=stripe_pricing_viodeo"
          className="bg-white font-medium inline-block text-sm border border-base-content/20 hover:border-base-content/40 hover:text-base-content/90 hover:scale-105 duration-200 cursor-pointer rounded text-base-content/80 px-2 py-1"
        >
          <div className="flex gap-1 items-center">
            <span>Built with</span>
            <span className="font-bold text-base-content flex gap-0.5 items-center tracking-tight">
              <Image
                src={
                  '/windows11/Square44x44Logo.altform-unplated_targetsize-96.png'
                }
                alt="ShipFast logo"
                priority={true}
                className="w-5 h-5"
                width={20}
                height={20}
              />
              ShipFast
            </span>
          </div>
        </a>
      </section> */}
    </>
  );
};

export default Pricing;

// 'use client';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import { usePathname, useRouter } from 'next/navigation';
// import React, { useEffect, useState, useContext } from 'react';
// import { inputsContext } from './Context';
// import Loading from './Loading';
// import Image from 'next/image';
// import CustomToast from './CustomToast';
// import toast from 'react-hot-toast';
// import CurrentUser from './CurrentUser';
// import { useSession } from 'next-auth/react';
// import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

// export default function ZomurodaPlanet() {
//   const [pageNumber, setPageNumber] = useState(1);
//   const [Zumoroda, setZumoroda] = useState([]);
//   const { newSeries, deletedSeries } = useContext(inputsContext);
//   const router = useRouter();
//   const user = CurrentUser();
//   const session = useSession();
//   const [showMessage, setShowMessage] = useState(true);
//   const [vertical, setVertical] = useState(false);
//   const path = usePathname();
//   const [ZumorodaSliderRef, ZumorodaInstanceRef] = useKeenSlider({
//     loop: false,
//     mode: 'free',
//     vertical: vertical ? true : false,
//     rtl: vertical ? false : true,
//     slides: {
//       perView: 3,
//       spacing: () => {
//         // التحقق من أن الكود يعمل في المتصفح
//         if (typeof window !== 'undefined') {
//           return window.innerWidth < 768 ? 3 : 17;
//         }
//         return 17; // القيمة الافتراضية في بيئة السيرفر
//       },
//     },
//     slideChanged(slider) {
//       const currentSlide = slider.track.details.rel;
//       const totalSlides = slider.track.details.slides.length;

//       // جلب المزيد من المسلسلات عند الوصول إلى الشريحة الأخيرة
//       if (currentSlide >= totalSlides - 3) {
//         setPageNumber((prevPage) => prevPage + 1);
//       }
//     },
//   });

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const handleResize = () => {
//         setVertical(window.innerWidth < 768 && path !== '/');
//       };

//       // تعيين الحالة عند التحميل الأول
//       handleResize();

//       // إضافة مستمع لحدث تغيير الحجم
//       window.addEventListener('resize', handleResize);

//       // تنظيف المستمع عند إلغاء المكون
//       return () => window.removeEventListener('resize', handleResize);
//     }
//   }, []);

//   useEffect(() => {
//     fetchZumoroda();
//     const timer = setTimeout(() => {
//       setShowMessage(false);
//     }, 30000);

//     // Cleanup timer if the component is unmounted
//     return () => clearTimeout(timer);
//   }, [newSeries, deletedSeries, pageNumber]);

//   useEffect(() => {
//     if (ZumorodaInstanceRef.current) {
//       ZumorodaInstanceRef.current.update();
//     }
//   }, [Zumoroda, newSeries]);

//   async function fetchZumoroda() {
//     try {
//       const response = await fetch(
//         `/api/serieses?page=${pageNumber}&planetName=زمردة&limit=4`
//       );
//       const json = await response.json();
//       if (response.ok) {
//         // console.log('Zumoroda', Zumoroda);

//         const existingIds = new Set(Zumoroda.map((series) => series.id));
//         const newZumoroda = json.filter(
//           (series) => !existingIds.has(series.id)
//         );

//         if (newZumoroda?.length > 0) {
//           setZumoroda((prevZumoroda) => [...prevZumoroda, ...newZumoroda]);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching Zumoroda:', error);
//     }
//   }
//   async function handleAdd(id) {
//     // console.log('id', id);
//     const response = await fetch('/api/serieses', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id: id }),
//     });
//     if (response.ok) {
//       toast.custom((t) => (
//         <CustomToast
//           t={t}
//           emoji={'🧀'}
//           message={'تم إضافة المسلسل الى الأكثر مشاهدة'}
//           greenEmoji={'✔'}
//         />
//       ));
//     }
//   }
//   return (
//     <div className="flex flex-col items-center justify-center w-full overflow-x-hidden p-2  bg-one sm:mt-24 ">
//       <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12">
//         {/* <TfiMenuAlt
//           className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50  bg-two"
//           onClick={() => setIsOpen(!isOpen)}
//         />
//         {isOpen && <SideBarMenu setIsOpen={setIsOpen} />} */}
//       </div>

//       <>
//         <div className="relative h-32 w-52 sm:h-52 sm:w-80">
//           <Image
//             loading="lazy"
//             src={'https://i.imgur.com/wbjwdXO.png'}
//             layout="fill"
//             objectFit="cover"
//             alt={'زمردة'}
//           />{' '}
//         </div>
//       </>
//       {vertical ? (
//         <>
//           <div className="flex items-center w-full px-8">
//             <hr className="w-full h-0.5 bg-gray-400 rounded-lg border-hidden " />
//           </div>
//           <h1 className="w-fit text-start p-2 text-white my-2 ">كوكب زمردة</h1>
//         </>
//       ) : (
//         <h1 className="w-full text-start p-2 text-white my-2">كوكب زمردة</h1>
//       )}
//       {showMessage && (
//         <div className="relative w-full flex items-center justify-between animate-pulse text-white h-12  text-2xl px-2 ">
//           <MdKeyboardDoubleArrowRight />

//           <h6 className="text-sm w-full text-start">
//             {' '}
//             اسحب لمزيد من المسلسلات
//           </h6>
//         </div>
//       )}
//       <div
//         ref={ZumorodaSliderRef}
//         className={
//           (vertical ? 'h-[600px]' : 'h-fit') +
//           ' keen-slider  py-2 shadow-lg  overflow-scroll rounded-md flex-row justify-start items-start'
//         }
//       >
//         {Zumoroda.length === 0 ? (
//           <Loading />
//         ) : (
//           Zumoroda?.map((series) => (
//             <div
//               key={series.id}
//               className="keen-slider__slide snap-center flex flex-col items-center"
//             >
//               {session?.status === 'authenticated' && user?.isAdmin === '1' && (
//                 <button
//                   className="bg-green-400 rounded-full px-2 my-2 hover:scale-105 w-fit text-center mx-2"
//                   onClick={() => handleAdd(series?.id)}
//                 >
//                   إضافة
//                 </button>
//               )}
//               <div
//                 className="flex flex-col  items-center justify-start flex-shrink-0 w-full mr-1"
//                 key={series?.id}
//                 onClick={() => {
//                   // التنقل إلى الرابط الجديد
//                   router.push(
//                     `/seriesAndEpisodes?seriesName=${series?.seriesName}`
//                   );
//                 }}
//               >
//                 <div
//                   className={
//                     (vertical ? 'w-72 h-44' : 'w-24 h-32') +
//                     ' relative w-24 h-32 sm:w-full sm:h-64 rounded-md overflow-hidden hover:cursor-pointer'
//                   }
//                 >
//                   <Image
//                     loading="lazy"
//                     src={series?.seriesImage}
//                     layout="fill"
//                     objectFit="cover"
//                     objectPosition="top" // يحدد موضع الصورة من الأعلى
//                     alt={series?.seriesName}
//                   />
//                 </div>
//                 <h1 className="text-white text-center m-2 text-[10px] sm:text-[15px] w-full line-clamp-2 font-bold">
//                   {series?.seriesName}
//                 </h1>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
'use client';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useContext, useRef } from 'react';
import { inputsContext } from './Context';
import Loading from './Loading';
import Image from 'next/image';
import CustomToast from './CustomToast';
import toast from 'react-hot-toast';
import CurrentUser from './CurrentUser';
import { useSession } from 'next-auth/react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Star,
  Play,
  Plus,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export default function ZomurodaPlanet() {
  const [pageNumber, setPageNumber] = useState(1);
  const [Zumoroda, setZumoroda] = useState([]);
  const { newSeries, deletedSeries } = useContext(inputsContext);
  const router = useRouter();
  const user = CurrentUser();
  const session = useSession();
  const [showMessage, setShowMessage] = useState(true);
  const [vertical, setVertical] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animateStars, setAnimateStars] = useState(false);
  const starsRef = useRef([]);
  const path = usePathname();

  // Generate random stars for background effect
  useEffect(() => {
    starsRef.current = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
    setAnimateStars(true);
  }, []);

  const [ZumorodaSliderRef, ZumorodaInstanceRef] = useKeenSlider({
    loop: false,
    mode: 'free',
    vertical: vertical ? true : false,
    rtl: vertical ? false : true,
    slides: {
      perView: 3,
      spacing: () => {
        if (typeof window !== 'undefined') {
          return window.innerWidth < 768 ? 3 : 17;
        }
        return 17;
      },
    },
    slideChanged(slider) {
      const currentSlide = slider.track.details.rel;
      const totalSlides = slider.track.details.slides.length;

      if (currentSlide >= totalSlides - 3) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setVertical(window.innerWidth < 768 && path !== '/');
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [path]);

  useEffect(() => {
    fetchZumoroda();
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [newSeries, deletedSeries, pageNumber]);

  useEffect(() => {
    if (ZumorodaInstanceRef.current) {
      ZumorodaInstanceRef.current.update();
    }
  }, [Zumoroda, newSeries]);

  async function fetchZumoroda() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/serieses?page=${pageNumber}&planetName=زمردة&limit=4`
      );
      const json = await response.json();
      if (response.ok) {
        const existingIds = new Set(Zumoroda.map((series) => series.id));
        const newZumoroda = json.filter(
          (series) => !existingIds.has(series.id)
        );

        if (newZumoroda?.length > 0) {
          setZumoroda((prevZumoroda) => [...prevZumoroda, ...newZumoroda]);
        }
      }
    } catch (error) {
      console.error('Error fetching Zumoroda:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAdd(id) {
    try {
      const response = await fetch('/api/serieses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            emoji={'🧀'}
            message={'تم إضافة المسلسل الى الأكثر مشاهدة'}
            greenEmoji={'✔'}
          />
        ));
      }
    } catch (error) {
      console.error('Error adding series:', error);
      toast.custom((t) => (
        <CustomToast
          t={t}
          emoji={'❌'}
          message={'حدث خطأ أثناء إضافة المسلسل'}
          greenEmoji={''}
        />
      ));
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full overflow-hidden p-2 bg-gradient-to-b from-[#1a0b2e] to-[#30197d] rounded-xl shadow-2xl sm:mt-24">
      {/* Animated stars background */}
      {animateStars &&
        starsRef.current.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--twinkle-delay': star.delay,
              '--twinkle-duration': star.duration,
            }}
          />
        ))}

      {/* Floating planet decorations */}
      <div
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff9e9e] opacity-30 blur-md animate-float"
        style={{ animationDelay: '0.5s' }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#4facfe] to-[#00f2fe] opacity-20 blur-md animate-float"
        style={{ animationDelay: '1.2s' }}
      ></div>

      {/* Logo with glow effect */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative h-32 w-52 sm:h-52 sm:w-80 mb-4"
      >
        <div className="absolute inset-0 bg-[#8a2be2] rounded-full filter blur-xl opacity-30 animate-pulse"></div>
        <Image
          loading="lazy"
          src={'https://i.imgur.com/wbjwdXO.png'}
          layout="fill"
          objectFit="cover"
          alt={'زمردة'}
          className="relative z-10 drop-shadow-[0_0_15px_rgba(138,43,226,0.8)]"
        />
      </motion.div>

      {/* Planet title with decorative elements */}
      {vertical ? (
        <div className="w-full space-y-2">
          <div className="flex items-center w-full px-8">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent rounded-lg"></div>
          </div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="text-[#a855f7] h-5 w-5" />
            <h1 className="text-2xl font-bold text-white my-2 bg-gradient-to-r from-[#a855f7] to-[#e879f9] bg-clip-text text-transparent">
              كوكب زمردة
            </h1>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex items-center gap-2 px-4"
        >
          <Sparkles className="text-[#a855f7] h-6 w-6" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#a855f7] to-[#e879f9] bg-clip-text text-transparent my-2">
            كوكب زمردة
          </h1>
        </motion.div>
      )}

      {/* Swipe instruction with animation */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full flex items-center justify-between text-white h-12 text-2xl px-4 my-2 bg-[#4a1e9e]/30 backdrop-blur-sm rounded-lg"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <MdKeyboardDoubleArrowRight className="text-[#e879f9]" />
            </motion.div>
            <h6 className="text-sm w-full text-start font-medium">
              اسحب لمزيد من المسلسلات
            </h6>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content slider with enhanced styling */}
      <div
        ref={ZumorodaSliderRef}
        className={`${
          vertical ? 'h-[600px]' : 'h-fit'
        } keen-slider py-4 overflow-hidden rounded-xl flex-row justify-start items-start bg-[#2a1155]/50 backdrop-blur-sm border border-[#8b5cf6]/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]`}
      >
        {isLoading && Zumoroda.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          Zumoroda?.map((series, index) => (
            <motion.div
              key={series.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="keen-slider__slide snap-center flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {session?.status === 'authenticated' && user?.isAdmin === '1' && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white rounded-full px-3 py-1 my-2 shadow-lg flex items-center gap-1 z-10"
                  onClick={() => handleAdd(series?.id)}
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة</span>
                </motion.button>
              )}

              <div
                className="flex flex-col items-center justify-start flex-shrink-0 w-full mr-1 relative"
                key={series?.id}
                onClick={() => {
                  router.push(
                    `/seriesAndEpisodes?seriesName=${series?.seriesName}`
                  );
                }}
              >
                <div
                  className={`${
                    vertical ? 'w-72 h-44' : 'w-24 h-32'
                  } relative sm:w-full sm:h-64 rounded-xl overflow-hidden hover:cursor-pointer group transition-all duration-300 ease-in-out`}
                >
                  {/* Card with hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b2e]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                  <Image
                    loading="lazy"
                    src={series?.seriesImage || '/placeholder.svg'}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    alt={series?.seriesName}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover overlay with play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-[#8b5cf6]/80 p-3 rounded-full backdrop-blur-sm"
                    >
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </motion.div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-2 left-2 bg-[#8b5cf6]/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 z-20">
                    <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
                    <span className="text-xs text-white font-bold">
                      {(Math.random() * 2 + 3).toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Series title with animation */}
                <motion.div
                  initial={false}
                  animate={
                    hoveredIndex === index
                      ? { y: 0, opacity: 1 }
                      : { y: 0, opacity: 0.8 }
                  }
                  className="relative w-full mt-2 px-2"
                >
                  <h1 className="text-white text-center m-1 text-[10px] sm:text-[15px] w-full line-clamp-2 font-bold">
                    {series?.seriesName}
                  </h1>

                  {/* Decorative underline */}
                  <div
                    className={`h-0.5 w-0 bg-gradient-to-r from-[#a855f7] to-[#e879f9] mx-auto transition-all duration-300 rounded-full ${
                      hoveredIndex === index ? 'w-1/2' : 'w-0'
                    }`}
                  ></div>
                </motion.div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Navigation arrows */}
      {!vertical && Zumoroda.length > 0 && (
        <div className="flex justify-between w-full px-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#4a1e9e]/70 backdrop-blur-sm p-2 rounded-full text-white shadow-[0_0_10px_rgba(138,43,226,0.5)]"
            onClick={() => ZumorodaInstanceRef.current?.prev()}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#4a1e9e]/70 backdrop-blur-sm p-2 rounded-full text-white shadow-[0_0_10px_rgba(138,43,226,0.5)]"
            onClick={() => ZumorodaInstanceRef.current?.next()}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

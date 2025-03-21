// 'use client';
// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
//   useContext,
// } from 'react';
// import VideoPlayer from '../../components/VideoPlayer';
// import Loading from '../../components/Loading';
// import BackButton from '../../components/BackButton';
// import SideBarMenu from '../../components/SideBarMenu';
// import { TfiMenuAlt } from 'react-icons/tfi';
// import LoadingPhoto from '../../components/LoadingPhoto';
// import Image from 'next/image';
// import { ContactUs } from '../../components/sendEmail/sendEmail';
// import SubscriptionPage from '../../components/paypal/subscriptionPage';
// import { useSession } from 'next-auth/react';
// import CurrentUser from '../../components/CurrentUser';
// import { inputsContext } from '../../components/Context';
// import SubscribedOrNot from '../../components/paypal/subscribedOrNot';

// export default function SeriesAndEpisodes() {
//   const [episodes, setEpisodes] = useState([]);
//   const [episodeNumber, setEpisodeNumber] = useState(1); // حالة للتحكم برقم الحلقة
//   const [isLoading, setIsLoading] = useState(false);
//   const [seriesName, setSeriesName] = useState('');
//   const [series, setSeries] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [hasMoreEpisodes, setHasMoreEpisodes] = useState(true);
//   const [isTrue, setIsTrue] = useState(true);
//   const [showMessage, setShowMessage] = useState(true);
//   const session = useSession();
//   const user = CurrentUser();
//   const { dispatch } = useContext(inputsContext);

//   useEffect(() => {
//     dispatch({ type: 'RERENDER' });

//     const params = new URLSearchParams(window.location.search);
//     const seriesNameParam = params.get('seriesName');
//     if (seriesNameParam) {
//       fetchSeries(seriesNameParam);
//     }
//     setSeriesName(seriesNameParam);
//   }, []);

//   useEffect(() => {
//     if (seriesName && hasMoreEpisodes) {
//       fetchEpisode();
//       setTimeout(() => {
//         setShowMessage(false);
//       }, 10000);
//     }
//   }, [seriesName, episodeNumber]);

//   const fetchEpisode = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const episodeName = `${seriesName} الحلقة ${episodeNumber}`;
//       const response = await fetch(
//         `/api/showSeries?seriesName=${seriesName}&episodeName=${encodeURIComponent(
//           episodeName
//         )}`
//       );
//       if (response.ok) {
//         const json = await response.json();
//         // console.log('json', json);

//         if (json.length > 0) {
//           setEpisodes([json[0]]); // تغيير لجلب حلقة واحدة بدلاً من تكديس الحلقات
//           const nextEpisodeName = `${seriesName} الحلقة ${episodeNumber + 1}`;
//           const nextResponse = await fetch(
//             `/api/showSeries?seriesName=${seriesName}&episodeName=${encodeURIComponent(
//               nextEpisodeName
//             )}`
//           );
//           if (!nextResponse.ok || (await nextResponse.json()).length === 0) {
//             setHasMoreEpisodes(false);
//           }
//         } else {
//           setHasMoreEpisodes(false);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching episode:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [seriesName, episodeNumber]);

//   async function fetchSeries(seriesName) {
//     const response = await fetch(`/api/serieses?seriesName=${seriesName}`);
//     const json = await response?.json();
//     // console.log('fetchSeries', json);
//     if (response.ok) {
//       setSeries(json[0]);
//     }
//   }

//   // عند تحميل الصفحة، استرجاع رقم الحلقة من localStorage أو استخدام 1 إذا لم يكن موجوداً
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const seriesNameParam = params.get('seriesName');
//     const savedEpisodeNumber = localStorage.getItem('episodeNumber'); // استرجاع رقم الحلقة المحفوظ
//     if (seriesNameParam) {
//       fetchSeries(seriesNameParam);
//       setSeriesName(seriesNameParam);
//       setEpisodeNumber(savedEpisodeNumber ? parseInt(savedEpisodeNumber) : 1); // استخدام الحلقة المحفوظة أو البدء من 1
//     }
//   }, []);

//   const handleNextEpisode = () => {
//     dispatch({ type: 'RERENDER' });
//     const nextEpisodeNumber = episodeNumber + 1;
//     setEpisodeNumber(nextEpisodeNumber);
//     localStorage.setItem('episodeNumber', nextEpisodeNumber); // حفظ رقم الحلقة الجديد في localStorage
//     // window.location.reload(); // إعادة تحميل الصفحة
//   };

//   const handlePreviousEpisode = () => {
//     dispatch({ type: 'RERENDER' });

//     if (episodeNumber > 1) {
//       const prevEpisodeNumber = episodeNumber - 1;
//       setEpisodeNumber(prevEpisodeNumber);
//       localStorage.setItem('episodeNumber', prevEpisodeNumber); // حفظ رقم الحلقة الجديد في localStorage
//       // window.location.reload(); // إعادة تحميل الصفحة
//     }
//   };

//   return (
//     <>
//       {session?.status === 'authenticated' &&
//         user?.monthly_subscribed === false &&
//         user?.yearly_subscribed === false && <SubscriptionPage />}
//       <div className="relative w-full h-[1000px] sm:p-4 lg:p-8  bg-one overflow-y-auto mt-20">
//         <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12">
//           {/* <TfiMenuAlt
//             className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-40  bg-two"
//             onClick={() => setIsOpen(!isOpen)}
//           />
//           {isOpen && <SideBarMenu setIsOpen={setIsOpen} />} */}
//         </div>
//         <div className="relative w-full">
//           <div className="relative w-full h-44 sm:h-[500px] overflow-hidden shadow-lg ">
//             {series?.seriesImage ? (
//               <Image
//                 loading="lazy"
//                 src={series?.seriesImage}
//                 layout="fill"
//                 objectFit="cover"
//                 alt="photo"
//               />
//             ) : (
//               <LoadingPhoto />
//             )}
//           </div>
//           <div className="absolute w-full h-44 sm:h-[500px] overflow-hidden shadow-lg top-0">
//             {series?.seriesImage ? (
//               <Image
//                 loading="lazy"
//                 src={series?.seriesImage}
//                 layout="fill"
//                 objectFit="contain"
//                 alt="photo"
//               />
//             ) : (
//               <LoadingPhoto />
//             )}
//           </div>
//         </div>
//         <div className="flex flex-col justify-start items-center w-full gap-4 my-8">
//           <div
//             onClick={
//               () => {
//                 localStorage.removeItem('episodeNumber');
//                 setIsTrue(false);
//               } // حفظ رقم الحلقة الجديد في localStorage
//             }
//           >
//             <BackButton />
//           </div>

//           <h1 className="grow text-lg lg:text-2xl w-full text-white p-2">
//             <span className="text-gray-500 ml-2">#</span>
//             اسم المسلسل <span>{seriesName}</span>
//           </h1>
//           {showMessage && (
//             <h1 className="text-sm lg:text-2xl w-full text-white p-4">
//               اذا لم يتم تفعيل زر التشغيل بسبب الضغط على السيرفر انتظر 15 ثانية
//               ثم اضغط على زر الحلقة التالية ثم ارجع الى الحلقة التي تريدها
//             </h1>
//           )}
//         </div>

//         <div className="my-2 p-2">
//           {episodes.length === 0 && !isLoading && (
//             <Loading myMessage={'😉لا يوجد نتائج لعرضها'} />
//           )}

//           <div>
//             {episodes.map((episode) => (
//               <div
//                 key={episode.id}
//                 className="flex flex-col items-center justify-start rounded-lg overflow-hidden "
//               >
//                 <div className={'w-full'}>
//                   <h1 className="text-white text-center p-2">
//                     {episode?.episodeName}
//                   </h1>
//                   {/* <SubscribedOrNot /> */}

//                   <VideoPlayer
//                     videoUrl={episode?.episodeLink}
//                     image={series?.seriesImage}
//                     episodeName={episode?.episodeName}
//                     showAd={isTrue}
//                     onNextEpisode={handleNextEpisode} // تمرير دالة الانتقال للحلقة التالية
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* أزرار التنقل بين الحلقات */}
//           <div className="flex justify-between w-full p-4 items-start">
//             <button
//               onClick={handleNextEpisode}
//               className="btn p-1 sm:px-4 sm:py-2 shadow-lg text-white rounded-lg disabled:opacity-50"
//               disabled={!hasMoreEpisodes} // تعطيل زر الحلقة التالية إذا لم تكن هناك حلقات
//             >
//               الحلقة التالية
//             </button>
//             <button
//               onClick={handlePreviousEpisode}
//               className="btn p-1 sm:px-4 sm:py-2 shadow-lg text-white rounded-lg disabled:opacity-50"
//               disabled={episodeNumber === 1} // تعطيل زر الحلقة السابقة إذا كانت الحلقة الأولى
//             >
//               الحلقة السابقة
//             </button>
//           </div>
//           <ContactUs />
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  SkipForward,
  SkipBack,
  ArrowLeft,
  Search,
  Star,
  Film,
  Music,
  Menu,
  X,
  Heart,
  Info,
  AlertCircle,
} from 'lucide-react';
import { inputsContext } from '../../components/Context';

export default function SeriesAndEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [seriesName, setSeriesName] = useState('');
  const [series, setSeries] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasMoreEpisodes, setHasMoreEpisodes] = useState(true);
  const [isTrue, setIsTrue] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const session = useSession();
  const { dispatch } = useContext(inputsContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get user from custom hook (simplified for this example)
  const user = { monthly_subscribed: true, yearly_subscribed: false };

  useEffect(() => {
    dispatch({ type: 'RERENDER' });

    const params = new URLSearchParams(window.location.search);
    const seriesNameParam = params.get('seriesName');
    if (seriesNameParam) {
      fetchSeries(seriesNameParam);
    }
    setSeriesName(seriesNameParam);

    // Get saved episode number
    const savedEpisodeNumber = localStorage.getItem('episodeNumber');
    if (savedEpisodeNumber) {
      setEpisodeNumber(Number.parseInt(savedEpisodeNumber));
    }

    // Hide notification after 10 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (seriesName && hasMoreEpisodes) {
      fetchEpisode();
    }
  }, [seriesName, episodeNumber]);

  const fetchEpisode = useCallback(async () => {
    setIsLoading(true);
    try {
      const episodeName = `${seriesName} الحلقة ${episodeNumber}`;
      const response = await fetch(
        `/api/showSeries?seriesName=${seriesName}&episodeName=${encodeURIComponent(
          episodeName
        )}`
      );
      if (response.ok) {
        const json = await response.json();

        if (json.length > 0) {
          setEpisodes([json[0]]);

          // Check if next episode exists
          const nextEpisodeName = `${seriesName} الحلقة ${episodeNumber + 1}`;
          const nextResponse = await fetch(
            `/api/showSeries?seriesName=${seriesName}&episodeName=${encodeURIComponent(
              nextEpisodeName
            )}`
          );
          if (!nextResponse.ok || (await nextResponse.json()).length === 0) {
            setHasMoreEpisodes(false);
          } else {
            setHasMoreEpisodes(true);
          }
        } else {
          setHasMoreEpisodes(false);
        }
      }
    } catch (error) {
      console.error('Error fetching episode:', error);
    } finally {
      setIsLoading(false);
    }
  }, [seriesName, episodeNumber]);

  async function fetchSeries(seriesName) {
    try {
      const response = await fetch(`/api/serieses?seriesName=${seriesName}`);
      if (response.ok) {
        const json = await response.json();
        setSeries(json[0]);
      }
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  }

  const handleNextEpisode = () => {
    dispatch({ type: 'RERENDER' });
    const nextEpisodeNumber = episodeNumber + 1;
    setEpisodeNumber(nextEpisodeNumber);
    localStorage.setItem('episodeNumber', nextEpisodeNumber.toString());
    setIsPlaying(false);
  };

  const handlePreviousEpisode = () => {
    dispatch({ type: 'RERENDER' });

    if (episodeNumber > 1) {
      const prevEpisodeNumber = episodeNumber - 1;
      setEpisodeNumber(prevEpisodeNumber);
      localStorage.setItem('episodeNumber', prevEpisodeNumber.toString());
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetEpisodes = () => {
    localStorage.removeItem('episodeNumber');
    setIsTrue(false);
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#3a2a7d] text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3a2a7d] shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-[#8e44ad] text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
            <h1 className="text-xl font-bold text-white">سبيس تون</h1>
          </div>

          <div className="relative w-full max-w-md mx-4 hidden md:block">
            <input
              type="text"
              placeholder="ابحث عن مسلسل أو فيلم أو أغنية..."
              className="w-full py-2 px-4 pr-10 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8e44ad] text-white placeholder-white/50 rtl:text-right"
            />
            <Search
              className="absolute top-2.5 right-3 text-white/70"
              size={18}
            />
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] flex items-center justify-center cursor-pointer"
            >
              <Star size={18} className="text-white" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed top-16 left-0 z-40 w-64 h-screen bg-[#2c1f5e] shadow-xl"
          >
            <div className="p-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث..."
                  className="w-full py-2 px-4 pr-10 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#8e44ad] text-white placeholder-white/50 rtl:text-right"
                />
                <Search
                  className="absolute top-2.5 right-3 text-white/70"
                  size={18}
                />
              </div>

              <div className="space-y-2">
                <button className="flex items-center space-x-3 rtl:space-x-reverse w-full p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Film size={18} />
                  <span>أفلام</span>
                </button>
                <button className="flex items-center space-x-3 rtl:space-x-reverse w-full p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Play size={18} />
                  <span>مسلسلات</span>
                </button>
                <button className="flex items-center space-x-3 rtl:space-x-reverse w-full p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Music size={18} />
                  <span>أغاني</span>
                </button>
                <button className="flex items-center space-x-3 rtl:space-x-reverse w-full p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Star size={18} />
                  <span>المميز</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 pb-20">
        {/* Hero Banner */}
        <div className="relative w-full h-44 sm:h-[400px] overflow-hidden">
          {series?.seriesImage ? (
            <>
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#3a2a7d]/30 to-[#3a2a7d]">
                <Image
                  src={series.seriesImage || '/placeholder.svg'}
                  layout="fill"
                  objectFit="cover"
                  alt={seriesName}
                  className="opacity-40 blur-sm"
                />
              </div>

              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-[80%] aspect-[2/3] sm:h-[90%] rounded-lg overflow-hidden shadow-2xl"
                >
                  <Image
                    src={series.seriesImage || '/placeholder.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={seriesName}
                    className="rounded-lg"
                  />
                </motion.div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a7d] via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#3a2a7d]">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-lg bg-[#4a3a8d] h-32 w-24"></div>
              </div>
            </div>
          )}
        </div>

        {/* Series Info */}
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-white mb-2"
              >
                {seriesName}
              </motion.h1>

              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <span className="px-2 py-1 bg-[#8e44ad] rounded-md text-xs">
                  مسلسل أطفال
                </span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <Star className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex space-x-2 rtl:space-x-reverse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetEpisodes}
                className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>رجوع</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Info size={16} />
                <span>معلومات</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5 rounded-full bg-[#8e44ad] hover:bg-[#9b59b6] transition-colors"
              >
                <Heart size={16} />
                <span>المفضلة</span>
              </motion.button>
            </div>
          </div>

          {/* Series Description (Togglable) */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#2c1f5e] rounded-lg p-4 my-4 overflow-hidden"
              >
                <p className="text-white/80 text-sm leading-relaxed">
                  مسلسل {seriesName} هو مسلسل رسوم متحركة للأطفال يحكي قصة
                  مغامرات شيقة ومثيرة. يتعلم الأطفال من خلاله قيم التعاون
                  والصداقة والشجاعة.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#2c1f5e] border-l-4 border-[#8e44ad] rounded-lg p-4 my-4 flex items-start space-x-3 rtl:space-x-reverse"
              >
                <AlertCircle
                  className="text-[#8e44ad] shrink-0 mt-0.5"
                  size={20}
                />
                <p className="text-white/80 text-sm">
                  اذا لم يتم تفعيل زر التشغيل بسبب الضغط على السيرفر انتظر 15
                  ثانية ثم اضغط على زر الحلقة التالية ثم ارجع الى الحلقة التي
                  تريدها
                </p>
                <button
                  onClick={() => setShowMessage(false)}
                  className="shrink-0 text-white/50 hover:text-white"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Video Player */}
          <div className="my-6">
            {isLoading ? (
              <div className="w-full aspect-video bg-[#2c1f5e] rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8e44ad]"></div>
              </div>
            ) : episodes.length > 0 ? (
              <div className="relative">
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                  {/* Video Player Placeholder - In a real implementation, this would be your actual video player */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying ? (
                      <div className="relative w-full h-full">
                        {series?.seriesImage && (
                          <Image
                            src={series.seriesImage || '/placeholder.svg'}
                            layout="fill"
                            objectFit="cover"
                            alt={episodes[0]?.episodeName || seriesName}
                            className="opacity-50"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={togglePlay}
                            className="w-20 h-20 rounded-full bg-[#8e44ad]/80 flex items-center justify-center"
                          >
                            <Play size={40} className="ml-2" />
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        {/* This would be your actual video player */}
                        <div className="text-center">
                          <p className="text-xl mb-4">جاري تشغيل الفيديو...</p>
                          <button
                            onClick={togglePlay}
                            className="px-4 py-2 bg-[#8e44ad] rounded-md hover:bg-[#9b59b6]"
                          >
                            إيقاف
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Episode Title */}
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1.5 rounded-full">
                  <h2 className="text-sm font-medium">
                    {episodes[0]?.episodeName}
                  </h2>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 rtl:space-x-reverse">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePreviousEpisode}
                    disabled={episodeNumber === 1}
                    className={`p-3 rounded-full ${
                      episodeNumber === 1
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-[#8e44ad] text-white'
                    }`}
                  >
                    <SkipBack size={20} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="p-4 rounded-full bg-[#8e44ad] text-white"
                  >
                    {isPlaying ? (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div className="w-1.5 h-5 bg-white mx-0.5"></div>
                        <div className="w-1.5 h-5 bg-white mx-0.5"></div>
                      </div>
                    ) : (
                      <Play size={24} className="ml-1" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNextEpisode}
                    disabled={!hasMoreEpisodes}
                    className={`p-3 rounded-full ${
                      !hasMoreEpisodes
                        ? 'bg-gray-700 text-gray-500'
                        : 'bg-[#8e44ad] text-white'
                    }`}
                  >
                    <SkipForward size={20} />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video bg-[#2c1f5e] rounded-lg flex items-center justify-center">
                <p className="text-white/70">😉 لا يوجد نتائج لعرضها</p>
              </div>
            )}
          </div>

          {/* Episode Navigation */}
          <div className="flex justify-between items-center my-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextEpisode}
              disabled={!hasMoreEpisodes}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg ${
                !hasMoreEpisodes
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] text-white shadow-lg shadow-[#8e44ad]/30'
              }`}
            >
              <span>الحلقة التالية</span>
              <SkipForward size={16} />
            </motion.button>

            <div className="px-4 py-2 bg-[#2c1f5e] rounded-lg">
              <span className="text-white/80">الحلقة</span>
              <span className="mx-2 text-white font-bold">{episodeNumber}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousEpisode}
              disabled={episodeNumber === 1}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg ${
                episodeNumber === 1
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] text-white shadow-lg shadow-[#8e44ad]/30'
              }`}
            >
              <SkipBack size={16} />
              <span>الحلقة السابقة</span>
            </motion.button>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#2c1f5e] shadow-lg z-40">
        <div className="container mx-auto">
          <div className="flex justify-around items-center py-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Film className="w-5 h-5 text-white/70" />
              <span className="text-xs mt-1 text-white/70">أفلام</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Music className="w-5 h-5 text-white/70" />
              <span className="text-xs mt-1 text-white/70">أغاني</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Play className="w-5 h-5 text-white/70" />
              <span className="text-xs mt-1 text-white/70">مسلسلات</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Star className="w-5 h-5 text-[#8e44ad]" />
              <span className="text-xs mt-1 text-[#8e44ad] font-medium">
                المميز
              </span>
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 'use client';
// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import VideoPlayer from '../../components/VideoPlayer';
// import Loading from '../../components/Loading';
// import SideBarMenu from '../../components/SideBarMenu';
// import { TfiMenuAlt } from 'react-icons/tfi';
// import LoadingPhoto from '../../components/LoadingPhoto';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { inputsContext } from '../../components/Context';
// import { useSession } from 'next-auth/react';
// import SubscriptionPage from '../../components/paypal/subscriptionPage';
// import CurrentUser from '../../components/CurrentUser';
// import { ContactUs } from '../../components/sendEmail/sendEmail';

// export default function Page() {
//   const [episodes, setEpisodes] = useState([]);
//   const [episodeNumber, setEpisodeNumber] = useState(1); // التحكم برقم الحلقة
//   const [isLoading, setIsLoading] = useState(false);
//   const [episodeName, setEpisodeName] = useState('');
//   const [episodeImage, setEpisodeImage] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [isTrue, setIsTrue] = useState(true);
//   const [hasMoreEpisodes, setHasMoreEpisodes] = useState(true);
//   const router = useRouter();
//   const { dispatch } = useContext(inputsContext);
//   const session = useSession();
//   const user = CurrentUser();
//   // استخدام URL parameters لجلب اسم الحلقة
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const episodeNameParam = params.get('episodeName');
//     if (episodeNameParam) {
//       // console.log('episodeNameParam', episodeNameParam);

//       setEpisodeName(episodeNameParam);
//       fetchEpisode(episodeNameParam);
//       extractEpisodeNumber(episodeNameParam);
//     }
//   }, []);

//   // استخراج رقم الحلقة من اسمها
//   function extractEpisodeNumber(episodeName) {
//     const regex = /الحلقة\s+(\d+)/; // تعبير منتظم لاستخراج الرقم بعد كلمة "الحلقة"
//     const match = episodeName.match(regex);

//     if (match && match[1]) {
//       localStorage.setItem('episodeNumber', match[1]);
//       // console.log('episodeNumber', match[1]);

//       setEpisodeNumber(parseInt(match[1], 10));
//     } else {
//       return null; // إذا لم يتم العثور على الرقم
//     }
//   }

//   // جلب الحلقة بناءً على الرقم واسم المسلسل
//   const fetchEpisode = useCallback(
//     async (episodeName) => {
//       setIsLoading(true);

//       try {
//         const response = await fetch(
//           `/api/episodes?episodeName=${episodeName}`
//         );

//         const json = await response.json();
//         // console.log('json', json);

//         // التحقق من نجاح الاستجابة
//         if (response.ok) {
//           if (json.length > 0) {
//             fetchEpisodeImage(json[0]?.seriesName);
//             setEpisodes([json[0]]);
//             // إنشاء اسم الحلقة التالية بناءً على رقم الحلقة الحالي +1
//             const seriesName = json[0].seriesName || 'لا يوجد اسم';
//             const regex = /الحلقة\s+(\d+)/; // تعبير منتظم لاستخراج الرقم بعد كلمة "الحلقة"
//             const match = episodeName.match(regex);
//             const nextEpisodeName = `${seriesName} الحلقة ${
//               parseInt(match[1]) + 1
//             }`;
//             // console.log('nextEpisodeName', nextEpisodeName); // طباعة اسم الحلقة التالية للتحقق

//             // إرسال طلب جديد للتحقق مما إذا كانت هناك حلقة تالية
//             const nextResponse = await fetch(
//               `/api/episodes?episodeName=${nextEpisodeName}`
//             );
//             const res = await nextResponse.json();

//             // إذا كانت الاستجابة للحلقة التالية غير ناجحة أو لم يتم العثور على حلقة تالية (الطول 0)
//             if (res?.length > 0) {
//               // console.log('لايوجد حلقات اضافية'); // طباعة رسالة تفيد بعدم وجود حلقات إضافية
//               setHasMoreEpisodes(true); // تعيين الحالة للإشارة إلى عدم وجود حلقات إضافية
//             } else {
//               setHasMoreEpisodes(false); // تعيين الحالة للإشارة إلى عدم وجود حلقات إضافية
//             }
//           } else {
//             // إذا لم يتم العثور على أي حلقة في JSON، تعيين الحالة لعدم وجود حلقات إضافية
//             setHasMoreEpisodes(false);
//           }
//         }
//       } catch (error) {
//         // إذا حدث خطأ أثناء جلب البيانات، يتم طباعة الخطأ في الكونسول
//         console.error('Error fetching episode:', error);
//       } finally {
//         // في النهاية، يتم تعيين حالة التحميل إلى false لإخفاء مؤشر التحميل
//         setIsLoading(false);
//       }
//     },
//     [episodeNumber]
//   );

//   // جلب صورة المسلسل بناءً على اسم المسلسل
//   async function fetchEpisodeImage(seriesName) {
//     try {
//       const res = await fetch(
//         `/api/serieses?seriesName=${encodeURIComponent(seriesName)}`
//       );
//       const json = await res.json();
//       if (res.ok && json.length > 0) {
//         setEpisodeImage(json[0]?.seriesImage);
//       }
//     } catch (error) {
//       console.error('Error fetching series image:', error);
//     }
//     return null;
//   }

//   // حفظ رقم الحلقة في localStorage عند تحميل الصفحة
//   useEffect(() => {
//     const savedEpisodeNumber = localStorage.getItem('episodeNumber');
//     if (savedEpisodeNumber) {
//       setEpisodeNumber(parseInt(savedEpisodeNumber, 10));
//     }
//   }, []);

//   // التبديل للحلقة التالية
//   const handleNextEpisode = (seriesName) => {
//     dispatch({ type: 'RERENDER' });

//     const nextEpisodeNumber = episodeNumber + 1;
//     const nextEpisodeName = `${seriesName} الحلقة ${nextEpisodeNumber}`;

//     // تحديث الحالة فقط بدلاً من إعادة تحميل الصفحة
//     setEpisodeNumber(nextEpisodeNumber);
//     setEpisodeName(nextEpisodeName);
//     localStorage.setItem('episodeNumber', nextEpisodeNumber); // حفظ رقم الحلقة في localStorage
//     fetchEpisode(nextEpisodeName); // جلب بيانات الحلقة التالية
//   };

//   // التبديل للحلقة السابقة
//   const handlePreviousEpisode = (seriesName) => {
//     dispatch({ type: 'RERENDER' });

//     if (episodeNumber > 1) {
//       const prevEpisodeNumber = episodeNumber - 1;
//       const prevEpisodeName = `${seriesName} الحلقة ${prevEpisodeNumber}`;

//       // تحديث الحالة فقط بدلاً من إعادة تحميل الصفحة
//       setEpisodeNumber(prevEpisodeNumber);
//       setEpisodeName(prevEpisodeName);
//       localStorage.setItem('episodeNumber', prevEpisodeNumber); // حفظ رقم الحلقة في localStorage
//       fetchEpisode(prevEpisodeName); // جلب بيانات الحلقة السابقة
//     }
//   };

//   return (
//     <>
//       {session?.status === 'authenticated' &&
//         user?.monthly_subscribed === false &&
//         user?.yearly_subscribed === false && <SubscriptionPage />}

//       <div className="relative w-full sm:p-4 lg:p-8 bg-one h-[1000px] overflow-y-auto sm:mt-24">
//         <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12">
//           {/* <TfiMenuAlt
//             className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50 bg-two"
//             onClick={() => setIsOpen(!isOpen)}
//           />
//           {isOpen && <SideBarMenu setIsOpen={setIsOpen} />} */}
//         </div>
//         <div className="relative w-full">
//           <div className="relative w-full h-44 sm:h-[500px] overflow-hidden shadow-lg">
//             {episodes.length > 0 && episodeImage ? (
//               <Image
//                 loading="lazy"
//                 src={episodeImage}
//                 layout="fill"
//                 objectFit="cover"
//                 alt="photo"
//                 objectPosition="top"
//               />
//             ) : (
//               <LoadingPhoto />
//             )}
//           </div>
//         </div>
//         <div className="flex flex-col justify-start items-center w-full gap-4 my-8">
//           <div
//             onClick={() => {
//               localStorage.removeItem('episodeNumber');
//               setIsTrue(false);
//             }}
//           ></div>

//           <h1 className="grow text-lg lg:text-2xl w-full text-white p-2">
//             <span className="text-gray-500 ml-2">#</span>
//             اسم المسلسل <span className="">{episodes[0]?.seriesName}</span>
//           </h1>
//         </div>
//         <div className="my-2 p-2">
//           {episodes.length === 0 && !isLoading && (
//             <Loading myMessage={'😉 لا يوجد نتائج لعرضها'} />
//           )}
//           {episodes.length > 0 && (
//             <div>
//               {episodes.map((episode) => (
//                 <div
//                   key={episode.id}
//                   className="flex flex-col items-center justify-start  overflow-hidden"
//                 >
//                   <div className={'w-full'}>
//                     <h1 className="text-white text-center p-2">
//                       {episode?.episodeName}
//                     </h1>
//                     <VideoPlayer
//                       videoUrl={episode?.episodeLink}
//                       image={episodeImage}
//                       episodeName={episode?.episodeName}
//                       showAd={isTrue}
//                       onNextEpisode={handleNextEpisode} // تمرير دالة الانتقال للحلقة التالية
//                     />
//                   </div>
//                   <div className="flex justify-between w-full p-4 items-start">
//                     <button
//                       onClick={() => handleNextEpisode(episode?.seriesName)}
//                       className="btn p-1 sm:px-4 sm:py-2 shadow-lg text-white rounded-lg disabled:opacity-50"
//                       disabled={!hasMoreEpisodes} // تعطيل زر الحلقة التالية إذا لم تكن هناك حلقات
//                     >
//                       الحلقة التالية
//                     </button>
//                     <button
//                       onClick={() => handlePreviousEpisode(episode?.seriesName)}
//                       className="btn p-1 sm:px-4 sm:py-2 shadow-lg text-white rounded-lg disabled:opacity-50"
//                       disabled={episodeNumber === 1} // تعطيل زر الحلقة السابقة إذا كانت الحلقة الأولى
//                     >
//                       الحلقة السابقة
//                     </button>
//                   </div>
//                   <ContactUs />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { inputsContext } from '../../components/Context';
import { useSession } from 'next-auth/react';
import SubscriptionPage from '../../components/paypal/subscriptionPage';
import CurrentUser from '../../components/CurrentUser';
import { ContactUs } from '../../components/sendEmail/sendEmail';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  SkipForward,
  SkipBack,
  Heart,
  Share2,
  MessageCircle,
  Star,
  Film,
  ArrowLeft,
  Info,
  AlertCircle,
  Menu,
  X,
  Sparkles,
  Volume2,
  Send,
} from 'lucide-react';

export default function Page() {
  const [episodes, setEpisodes] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [episodeName, setEpisodeName] = useState('');
  const [episodeImage, setEpisodeImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(true);
  const [hasMoreEpisodes, setHasMoreEpisodes] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'سارة',
      text: 'حلقة رائعة! أحببت القصة كثيراً 😍',
      time: '3 ساعات',
    },
    {
      id: 2,
      user: 'أحمد',
      text: 'من أفضل الحلقات في المسلسل! شكراً لكم',
      time: '5 ساعات',
    },
  ]);

  const router = useRouter();
  const { dispatch } = useContext(inputsContext);
  const session = useSession();
  const user = CurrentUser();
  const videoRef = useRef(null);

  // Animation variants
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

  // استخدام URL parameters لجلب اسم الحلقة
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const episodeNameParam = params.get('episodeName');
    if (episodeNameParam) {
      setEpisodeName(episodeNameParam);
      fetchEpisode(episodeNameParam);
      extractEpisodeNumber(episodeNameParam);
    }

    // Hide notification after 10 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // استخراج رقم الحلقة من اسمها
  function extractEpisodeNumber(episodeName) {
    const regex = /الحلقة\s+(\d+)/;
    const match = episodeName.match(regex);

    if (match && match[1]) {
      localStorage.setItem('episodeNumber', match[1]);
      setEpisodeNumber(Number.parseInt(match[1], 10));
    } else {
      return null;
    }
  }

  // جلب الحلقة بناءً على الرقم واسم المسلسل
  const fetchEpisode = useCallback(
    async (episodeName) => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/episodes?episodeName=${episodeName}`
        );

        const json = await response.json();

        if (response.ok) {
          if (json.length > 0) {
            fetchEpisodeImage(json[0]?.seriesName);
            setEpisodes([json[0]]);

            const seriesName = json[0].seriesName || 'لا يوجد اسم';
            const regex = /الحلقة\s+(\d+)/;
            const match = episodeName.match(regex);
            const nextEpisodeName = `${seriesName} الحلقة ${
              Number.parseInt(match[1]) + 1
            }`;

            const nextResponse = await fetch(
              `/api/episodes?episodeName=${nextEpisodeName}`
            );
            const res = await nextResponse.json();

            if (res?.length > 0) {
              setHasMoreEpisodes(true);
            } else {
              setHasMoreEpisodes(false);
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
    },
    [episodeNumber]
  );

  // جلب صورة المسلسل بناءً على اسم المسلسل
  async function fetchEpisodeImage(seriesName) {
    try {
      const res = await fetch(
        `/api/serieses?seriesName=${encodeURIComponent(seriesName)}`
      );
      const json = await res.json();
      if (res.ok && json.length > 0) {
        setEpisodeImage(json[0]?.seriesImage);
      }
    } catch (error) {
      console.error('Error fetching series image:', error);
    }
    return null;
  }

  // حفظ رقم الحلقة في localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedEpisodeNumber = localStorage.getItem('episodeNumber');
    if (savedEpisodeNumber) {
      setEpisodeNumber(Number.parseInt(savedEpisodeNumber, 10));
    }
  }, []);

  // التبديل للحلقة التالية
  const handleNextEpisode = (seriesName) => {
    dispatch({ type: 'RERENDER' });

    const nextEpisodeNumber = episodeNumber + 1;
    const nextEpisodeName = `${seriesName} الحلقة ${nextEpisodeNumber}`;

    setEpisodeNumber(nextEpisodeNumber);
    setEpisodeName(nextEpisodeName);
    localStorage.setItem('episodeNumber', nextEpisodeNumber);
    fetchEpisode(nextEpisodeName);

    // Scroll to video player
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // التبديل للحلقة السابقة
  const handlePreviousEpisode = (seriesName) => {
    dispatch({ type: 'RERENDER' });

    if (episodeNumber > 1) {
      const prevEpisodeNumber = episodeNumber - 1;
      const prevEpisodeName = `${seriesName} الحلقة ${prevEpisodeNumber}`;

      setEpisodeNumber(prevEpisodeNumber);
      setEpisodeName(prevEpisodeName);
      localStorage.setItem('episodeNumber', prevEpisodeNumber);
      fetchEpisode(prevEpisodeName);

      // Scroll to video player
      if (videoRef.current) {
        videoRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  const resetEpisodes = () => {
    localStorage.removeItem('episodeNumber');
    setIsTrue(false);
    window.history.back();
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      user: 'أنت',
      text: comment,
      time: 'الآن',
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <>
      {session?.status === 'authenticated' &&
        user?.monthly_subscribed === false &&
        user?.yearly_subscribed === false && <SubscriptionPage />}

      <div className="min-h-screen bg-[#3a2a7d] text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#8e44ad]/10 blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-[#9b59b6]/10 blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#8e44ad]/10 blur-lg"></div>
        </div>

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
            {episodeImage ? (
              <>
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#3a2a7d]/30 to-[#3a2a7d]">
                  <Image
                    src={episodeImage || '/placeholder.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={episodeName}
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
                      src={episodeImage || '/placeholder.svg'}
                      layout="fill"
                      objectFit="cover"
                      alt={episodeName}
                      className="rounded-lg"
                    />

                    {/* Decorative elements */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full"
                    >
                      <Film className="w-4 h-4 text-white" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="absolute bottom-2 left-2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a7d] via-transparent to-transparent"></div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#3a2a7d]">
                <div className="w-16 h-16 border-4 border-t-[#8e44ad] border-b-[#8e44ad] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
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
                  {episodes[0]?.seriesName || 'جاري التحميل...'}
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
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
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
                  onClick={toggleLike}
                  className={`flex items-center space-x-1 rtl:space-x-reverse px-3 py-1.5 rounded-full ${
                    isLiked ? 'bg-[#8e44ad]' : 'bg-white/10 hover:bg-white/20'
                  } transition-colors`}
                >
                  <Heart size={16} className={isLiked ? 'fill-white' : ''} />
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
                    مسلسل {episodes[0]?.seriesName} هو مسلسل رسوم متحركة للأطفال
                    يحكي قصة مغامرات شيقة ومثيرة. يتعلم الأطفال من خلاله قيم
                    التعاون والصداقة والشجاعة.
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

            {/* Episode Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#2c1f5e] rounded-lg p-4 my-4"
            >
              <h2 className="text-lg font-medium text-white">
                {episodes[0]?.episodeName || 'جاري التحميل...'}
              </h2>
            </motion.div>

            {/* Video Player */}
            <div ref={videoRef} className="my-6">
              {isLoading ? (
                <div className="w-full aspect-video bg-[#2c1f5e] rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8e44ad]"></div>
                </div>
              ) : episodes.length > 0 ? (
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <VideoPlayer
                    videoUrl={episodes[0]?.episodeLink}
                    image={episodeImage}
                    episodeName={episodes[0]?.episodeName}
                    showAd={isTrue}
                    onNextEpisode={() =>
                      handleNextEpisode(episodes[0]?.seriesName)
                    }
                  />

                  {/* Custom controls overlay */}
                  <div className="absolute bottom-4 left-0 right-0 px-6 z-10 pointer-events-none">
                    <div className="flex justify-between items-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          handlePreviousEpisode(episodes[0]?.seriesName)
                        }
                        disabled={episodeNumber === 1}
                        className={`pointer-events-auto p-2 rounded-full ${
                          episodeNumber === 1
                            ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                            : 'bg-[#8e44ad] text-white shadow-lg shadow-[#8e44ad]/30'
                        }`}
                      >
                        <SkipBack size={20} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          handleNextEpisode(episodes[0]?.seriesName)
                        }
                        disabled={!hasMoreEpisodes}
                        className={`pointer-events-auto p-2 rounded-full ${
                          !hasMoreEpisodes
                            ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                            : 'bg-[#8e44ad] text-white shadow-lg shadow-[#8e44ad]/30'
                        }`}
                      >
                        <SkipForward size={20} />
                      </motion.button>
                    </div>
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
                onClick={() => handleNextEpisode(episodes[0]?.seriesName)}
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
                <span className="mx-2 text-white font-bold">
                  {episodeNumber}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePreviousEpisode(episodes[0]?.seriesName)}
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

            {/* Social Actions */}
            <div className="flex justify-center space-x-4 rtl:space-x-reverse my-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLike}
                className={`p-3 rounded-full ${
                  isLiked
                    ? 'bg-[#8e44ad]'
                    : 'bg-[#2c1f5e] border border-[#8e44ad]'
                } flex items-center space-x-2 rtl:space-x-reverse`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isLiked ? 'fill-white text-white' : 'text-[#8e44ad]'
                  }`}
                />
                <span>أعجبني</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-[#2c1f5e] border border-[#8e44ad] flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Share2 className="w-5 h-5 text-[#8e44ad]" />
                <span>مشاركة</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowComments(!showComments)}
                className={`p-3 rounded-full ${
                  showComments
                    ? 'bg-[#8e44ad] text-white'
                    : 'bg-[#2c1f5e] border border-[#8e44ad] text-[#8e44ad]'
                } flex items-center space-x-2 rtl:space-x-reverse`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>تعليقات</span>
              </motion.button>
            </div>

            {/* Comments section */}
            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="bg-[#2c1f5e] rounded-xl p-4">
                    <h3 className="text-lg font-bold mb-4">
                      التعليقات ({comments.length})
                    </h3>

                    {/* Comment form */}
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-10 h-10 rounded-full bg-[#8e44ad] flex items-center justify-center">
                          <span className="font-bold">أ</span>
                        </div>
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="اكتب تعليقك هنا..."
                            className="w-full py-2 px-4 pr-12 rounded-full bg-[#3a2a7d] border border-[#8e44ad]/30 focus:outline-none focus:border-[#8e44ad] text-white placeholder-white/50"
                          />
                          <button
                            type="submit"
                            className="absolute top-1 right-2 p-1.5 rounded-full bg-[#8e44ad] text-white"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* Comments list */}
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex space-x-3 rtl:space-x-reverse"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#8e44ad]/70 flex items-center justify-center shrink-0">
                            <span className="font-bold">
                              {comment.user.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-[#3a2a7d] rounded-lg p-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold">
                                  {comment.user}
                                </span>
                                <span className="text-xs text-white/50">
                                  {comment.time}
                                </span>
                              </div>
                              <p className="text-white/90">{comment.text}</p>
                            </div>
                            <div className="flex items-center mt-1 space-x-4 rtl:space-x-reverse text-xs text-white/60">
                              <button className="hover:text-white">
                                أعجبني
                              </button>
                              <button className="hover:text-white">رد</button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#2c1f5e] rounded-xl p-6 my-8 shadow-lg"
            >
              <div className="relative z-10">
                <ContactUs />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-10">
                <Sparkles className="w-20 h-20 text-[#8e44ad]" />
              </div>
            </motion.div>
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
                <Volume2 className="w-5 h-5 text-white/70" />
                <span className="text-xs mt-1 text-white/70">أغاني</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <Play className="w-5 h-5 text-[#8e44ad]" />
                <span className="text-xs mt-1 text-[#8e44ad] font-medium">
                  مسلسلات
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <Star className="w-5 h-5 text-white/70" />
                <span className="text-xs mt-1 text-white/70">المميز</span>
              </motion.button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

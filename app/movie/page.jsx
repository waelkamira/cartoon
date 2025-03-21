// 'use client';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import Loading from '../../components/Loading';
// import BackButton from '../../components/BackButton';
// import Image from 'next/image';
// import SideBarMenu from '../../components/SideBarMenu';
// import { TfiMenuAlt } from 'react-icons/tfi';
// import LoadingPhoto from '../../components/LoadingPhoto';
// import VideoPlayer from '../../components/VideoPlayer';
// import { ContactUs } from '../../components/sendEmail/sendEmail';
// import { useSession } from 'next-auth/react';
// import SubscriptionPage from '../../components/paypal/subscriptionPage';
// import CurrentUser from '../../components/CurrentUser';

// export default function Page() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [movie, setMovie] = useState([]);
//   const [movieName, setMovieName] = useState('');
//   const [showMessage, setShowMessage] = useState(true);
//   const [isTrue, setIsTrue] = useState(true);
//   const session = useSession();
//   const user = CurrentUser();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const getMovieName = params.get('movieName');
//     if (getMovieName) {
//       setMovieName(getMovieName);
//     }
//   }, []); // This effect runs only once on component mount

//   useEffect(() => {
//     if (movieName) {
//       fetchMovie();
//     }
//     const timer = setTimeout(() => {
//       setShowMessage(false);
//     }, 100000); // 10000 milliseconds = 10 seconds

//     // Cleanup timer if the component is unmounted
//     return () => clearTimeout(timer);
//   }, [movieName, pageNumber]); // Run this effect when movieName or pageNumber changes

//   async function fetchMovie() {
//     if (movieName) {
//       // console.log('Fetching movie:', movieName);

//       const response = await fetch(`/api/movies?movieName=${movieName}`);
//       const json = await response?.json();
//       if (response.ok) {
//         // console.log('Fetched movie data:', json);
//         setMovie(json);
//       } else {
//         console.error('Failed to fetch movie');
//       }
//     }
//   }

//   return (
//     <>
//       {session?.status === 'authenticated' &&
//         user?.monthly_subscribed === false &&
//         user?.yearly_subscribed === false && <SubscriptionPage />}

//       <div className=" w-full sm:p-4 lg:p-8 rounded-lg bg-one h-[1000px] overflow-y-auto">
//         <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
//           {/* <TfiMenuAlt
//             className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50  bg-two"
//             onClick={() => setIsOpen(!isOpen)}
//           />
//           {isOpen && <SideBarMenu setIsOpen={setIsOpen} />} */}
//         </div>
//         <div className="relative w-full h-72 sm:h-[500px] overflow-hidden z-30">
//           {movie[0]?.movieImage ? (
//             <Image
//               loading="lazy"
//               src={movie[0]?.movieImage}
//               layout="fill"
//               objectFit="cover"
//               alt="photo"
//               objectPosition="top"
//             />
//           ) : (
//             <LoadingPhoto />
//           )}
//         </div>

//         <div className="flex flex-col justify-start items-center w-full gap-4 my-8">
//           <div onClick={() => setIsTrue(false)}>{/* <BackButton /> */}</div>
//           <h1 className="grow text-lg lg:text-2xl w-full text-white">
//             <span className="text-gray-500 ml-2">#</span>
//             اسم الفيلم:
//             <span> {movie[0]?.movieName}</span>
//           </h1>
//           {showMessage && (
//             <h1 className="text-yellow-400 p-2">
//               الرجاء الإنتظار قليلا ... جاري إحضار الفيلم ربما تحتاج للضغط عدة
//               مرات على الزر ليعمل لاننا نقوم بمنع الاعلانات المنبثقة المزعجة
//             </h1>
//           )}
//         </div>

//         <div className="my-8 p-2">
//           {movie?.length === 0 && (
//             <Loading myMessage={'😉لا يوجد نتائج لعرضها'} />
//           )}

//           <div className=" flex-col gap-32 my-32 justify-evenly items-center w-full h-full">
//             {movie?.length > 0 &&
//               movie.map((item, index) => (
//                 <div key={index} className="w-full h-fit">
//                   <VideoPlayer
//                     videoUrl={item?.movieLink}
//                     showAd={isTrue}
//                     movie={true}
//                   />
//                 </div>
//               ))}
//           </div>

//           <ContactUs />
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from '../../components/VideoPlayer';
import { ContactUs } from '../../components/sendEmail/sendEmail';
import SubscriptionPage from '../../components/paypal/subscriptionPage';
import CurrentUser from '../../components/CurrentUser';
import LoadingPhoto from '../../components/LoadingPhoto';
import {
  Film,
  Play,
  Star,
  Heart,
  Share2,
  Download,
  MessageCircle,
  ArrowLeft,
  Info,
  AlertCircle,
  Menu,
  X,
  Sparkles,
  Volume2,
  Clock,
  Calendar,
  Award,
  Send,
} from 'lucide-react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [movie, setMovie] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [showMessage, setShowMessage] = useState(true);
  const [isTrue, setIsTrue] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'سارة',
      text: 'فيلم رائع! أحببت القصة كثيراً 😍',
      time: '3 ساعات',
    },
    {
      id: 2,
      user: 'أحمد',
      text: 'من أفضل أفلام الأطفال! شكراً لكم',
      time: '5 ساعات',
    },
  ]);

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const getMovieName = params.get('movieName');
    if (getMovieName) {
      setMovieName(getMovieName);
    }
  }, []);

  useEffect(() => {
    if (movieName) {
      fetchMovie();
    }

    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Reduced to 10 seconds for better UX

    return () => clearTimeout(timer);
  }, [movieName, pageNumber]);

  async function fetchMovie() {
    if (movieName) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/movies?movieName=${movieName}`);
        const json = await response?.json();
        if (response.ok) {
          setMovie(json);
        } else {
          console.error('Failed to fetch movie');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }

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

  const goBack = () => {
    window.history.back();
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
          <div className="relative w-full h-72 sm:h-[500px] overflow-hidden">
            {isLoading ? (
              <LoadingPhoto />
            ) : movie[0]?.movieImage ? (
              <>
                {/* Background blur effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3a2a7d]/30 to-[#3a2a7d]">
                  <Image
                    src={movie[0]?.movieImage || '/placeholder.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={movie[0]?.movieName || 'Movie poster'}
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
                      src={movie[0]?.movieImage || '/placeholder.svg'}
                      layout="fill"
                      objectFit="cover"
                      alt={movie[0]?.movieName || 'Movie poster'}
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#3a2a7d] via-transparent to-transparent"></div>
              </>
            ) : (
              <LoadingPhoto />
            )}
          </div>

          {/* Movie Info */}
          <div className="container mx-auto px-4 -mt-10 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                >
                  {movie[0]?.movieName || 'جاري التحميل...'}
                </motion.h1>

                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                  <span className="px-2 py-1 bg-[#8e44ad] rounded-md text-xs">
                    فيلم أطفال
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
                  onClick={goBack}
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

            {/* Movie Description (Togglable) */}
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#2c1f5e] rounded-lg p-4 my-4 overflow-hidden"
                >
                  <div className="flex flex-col space-y-4">
                    <p className="text-white/80 text-sm leading-relaxed">
                      فيلم {movie[0]?.movieName} هو فيلم رسوم متحركة للأطفال
                      يحكي قصة مغامرات شيقة ومثيرة. يتعلم الأطفال من خلاله قيم
                      التعاون والصداقة والشجاعة.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Clock className="w-4 h-4 text-[#8e44ad]" />
                        <span className="text-sm text-white/70">
                          المدة: 90 دقيقة
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Calendar className="w-4 h-4 text-[#8e44ad]" />
                        <span className="text-sm text-white/70">
                          سنة الإنتاج: 2023
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Award className="w-4 h-4 text-[#8e44ad]" />
                        <span className="text-sm text-white/70">
                          التصنيف: عائلي
                        </span>
                      </div>
                    </div>
                  </div>
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
                    الرجاء الإنتظار قليلا ... جاري إحضار الفيلم ربما تحتاج للضغط
                    عدة مرات على الزر ليعمل لاننا نقوم بمنع الاعلانات المنبثقة
                    المزعجة
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
            <div ref={videoRef} className="my-8">
              {isLoading ? (
                <div className="w-full aspect-video bg-[#2c1f5e] rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8e44ad]"></div>
                </div>
              ) : movie?.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative rounded-xl overflow-hidden shadow-2xl"
                >
                  <div className="relative">
                    <VideoPlayer
                      videoUrl={movie[0]?.movieLink}
                      showAd={isTrue}
                      movie={true}
                    />

                    {/* Custom overlay with film details */}
                    <div className="absolute top-4 right-4 bg-black/70 px-3 py-1.5 rounded-full z-10">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Film size={14} className="text-[#8e44ad]" />
                        <h2 className="text-sm font-medium">
                          {movie[0]?.movieName}
                        </h2>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="w-full aspect-video bg-[#2c1f5e] rounded-lg flex items-center justify-center">
                  <p className="text-white/70">😉 لا يوجد نتائج لعرضها</p>
                </div>
              )}
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

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-[#2c1f5e] border border-[#8e44ad] flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Download className="w-5 h-5 text-[#8e44ad]" />
                <span>تحميل</span>
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

            {/* Movie Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#2c1f5e] rounded-xl p-6 my-8"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Film className="mr-2 text-[#8e44ad]" size={20} />
                <span>أفلام مشابهة قد تعجبك</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative rounded-lg overflow-hidden cursor-pointer group"
                  >
                    <div className="aspect-[2/3] bg-[#3a2a7d] relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2c1f5e] via-transparent to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-[#8e44ad]/80 p-2 rounded-full">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-2 text-center">
                      <h4 className="text-sm font-medium truncate">
                        فيلم كرتون {index + 1}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#2c1f5e] rounded-xl p-6 my-8 shadow-lg relative overflow-hidden"
            >
              <div className="relative z-10">
                <ContactUs />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-10">
                <Sparkles className="w-20 h-20 text-[#8e44ad]" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-10">
                <Film className="w-16 h-16 text-[#8e44ad]" />
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
                <Film className="w-5 h-5 text-[#8e44ad]" />
                <span className="text-xs mt-1 text-[#8e44ad] font-medium">
                  أفلام
                </span>
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
                <Play className="w-5 h-5 text-white/70" />
                <span className="text-xs mt-1 text-white/70">مسلسلات</span>
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

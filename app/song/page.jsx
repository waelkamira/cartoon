// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import Loading from '../../components/Loading';
// import BackButton from '../../components/BackButton';
// import Image from 'next/image';
// import SideBarMenu from '../../components/SideBarMenu';
// import { TfiMenuAlt } from 'react-icons/tfi';
// import LoadingPhoto from '../../components/LoadingPhoto';
// import Songs from '../../components/kidsSongs';
// import { ContactUs } from '../../components/sendEmail/sendEmail';
// import VideoPlayer from '../../components/VideoPlayer';
// import SubscriptionPage from '../../components/paypal/subscriptionPage';
// import { useSession } from 'next-auth/react';
// import CurrentUser from '../../components/CurrentUser';

// export default function Page() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [song, setSong] = useState([]);
//   const session = useSession();
//   const [songId, setSongId] = useState('');
//   const videoRef = useRef(null);
//   const user = CurrentUser();

//   // console.log('song', song);
//   // استخدام useEffect للتأكد من أن الكود يتم تشغيله فقط على العميل
//   useEffect(() => {
//     const handleUrlChange = () => {
//       // تأكد من أن الكود يعمل على العميل فقط
//       if (typeof window !== 'undefined') {
//         const urlParams = new URLSearchParams(window.location.search);
//         const songIdFromUrl = urlParams.get('songId');
//         // console.log('songIdFromUrl', songIdFromUrl);
//         if (songIdFromUrl && songIdFromUrl !== songId) {
//           setSongId(songIdFromUrl);
//         }
//       }
//     };

//     handleUrlChange();
//   }, [songId]); // إعادة التشغيل عند تغيير songId

//   useEffect(() => {
//     if (songId) {
//       fetchSong();
//     }
//   }, [songId]);

//   useEffect(() => {
//     // التمرير إلى الفيديو عند تحميل الصفحة
//     if (videoRef.current) {
//       videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   }, [songId]);
//   async function fetchSong() {
//     const response = await fetch(`/api/songs?songId=${songId}`);
//     const json = await response?.json();
//     if (response.ok) {
//       setSong(json);
//     }
//   }

//   return (
//     <>
//       {session?.status === 'authenticated' &&
//         user?.monthly_subscribed === false &&
//         user?.yearly_subscribed === false && <SubscriptionPage />}

//       <div className="bg-one sm:mt-24">
//         <div className="z-50">
//           <div className="relative w-full sm:p-4 lg:p-8 rounded-lg bg-one ">
//             <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
//               {/* <TfiMenuAlt
//                 className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50  bg-two"
//                 onClick={() => {
//                   setIsOpen(!isOpen);
//                 }}
//               />
//               {isOpen && <SideBarMenu setIsOpen={setIsOpen} />} */}
//             </div>

//             <div className=" relative w-full h-44 sm:h-[500px] overflow-hidden shadow-lg shadow-one">
//               {song[0]?.songImage ? (
//                 <Image
//                   loading="lazy"
//                   src={song[0]?.songImage}
//                   layout="fill"
//                   objectFit="cover"
//                   alt="photo"
//                 />
//               ) : (
//                 <LoadingPhoto />
//               )}
//             </div>

//             <div className="flex flex-col justify-start items-center w-full gap-4 my-2 px-2">
//               <h1 className="grow text-sm lg:text-2xl w-full text-white">
//                 <span className="text-gray-500 ml-2">#</span>
//                 اسم الأغنية: <span className="">{song[0]?.songName}</span>
//               </h1>
//             </div>

//             <div ref={videoRef} className="my-2 p-2">
//               {song?.length === 0 && (
//                 <Loading myMessage={'😉لا يوجد نتائج لعرضها'} />
//               )}
//               <div className="flex gap-8 justify-start items-center w-full h-full">
//                 {song?.length > 0 &&
//                   song?.map((item) => {
//                     return (
//                       <div
//                         className="min-h-72 flex flex-col items-start justify-start rounded-lg overflow-hidden w-full h-full"
//                         key={item.songLink}
//                       >
//                         <VideoPlayer
//                           videoUrl={item.songLink}
//                           image={item?.songImage}
//                           episodeName={item?.songId}
//                         />
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           </div>

//           <Songs vertical={false} title={false} image={false} />
//           <div className="p-2">
//             <ContactUs />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import {
  Play,
  Pause,
  Music,
  Heart,
  Share2,
  Download,
  ChevronLeft,
  ChevronRight,
  Star,
  Volume2,
  VolumeX,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Send,
} from 'lucide-react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [song, setSong] = useState([]);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [songId, setSongId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'سارة',
      text: 'أغنية جميلة جداً! أحبها كثيراً 😍',
      time: '3 ساعات',
    },
    {
      id: 2,
      user: 'أحمد',
      text: 'من أجمل أغاني الأطفال! شكراً لكم',
      time: '5 ساعات',
    },
  ]);
  const [hoveredSongIndex, setHoveredSongIndex] = useState(-1);
  const videoRef = useRef(null);
  const session = useSession();

  // Mock user data (replace with actual CurrentUser hook)
  const user = { monthly_subscribed: true, yearly_subscribed: false };

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

  // Slider for related songs
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: 'free',
    rtl: true,
    slides: {
      perView: () => {
        if (typeof window !== 'undefined') {
          return window.innerWidth > 768 ? 4 : 2;
        }
        return 3;
      },
      spacing: 15,
    },
    created() {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const songIdFromUrl = urlParams.get('songId');
        if (songIdFromUrl && songIdFromUrl !== songId) {
          setSongId(songIdFromUrl);
        }
      }
    };

    handleUrlChange();
  }, [songId]);

  useEffect(() => {
    if (songId) {
      fetchSong();
      fetchRelatedSongs();
    }
  }, [songId]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [songId]);

  async function fetchSong() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/songs?songId=${songId}`);
      const json = await response?.json();
      if (response.ok) {
        setSong(json);
      }
    } catch (error) {
      console.error('Error fetching song:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchRelatedSongs() {
    try {
      const response = await fetch(`/api/songs?page=1&limit=8&random=true`);
      const json = await response?.json();
      if (response.ok) {
        setRelatedSongs(json);
      }
    } catch (error) {
      console.error('Error fetching related songs:', error);
    }
  }

  const handleSongClick = (newSongId) => {
    if (newSongId === songId) return;

    // Navigate to the song
    window.history.pushState({}, '', `/song?songId=${newSongId}`);
    setSongId(newSongId);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control the actual video player here
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, you would control the actual video player here
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

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#3a2a7d] text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#8e44ad]/10 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-[#9b59b6]/10 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#8e44ad]/10 blur-lg"></div>
      </div>

      {/* Subscription check (commented out as we're using mock data) */}
      {/* {session?.status === 'authenticated' &&
        user?.monthly_subscribed === false &&
        user?.yearly_subscribed === false && <SubscriptionPage />} */}

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-12">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goBack}
          className="flex items-center space-x-2 rtl:space-x-reverse mb-6 bg-[#2c1f5e] hover:bg-[#8e44ad] px-4 py-2 rounded-full transition-colors"
        >
          <ArrowLeft size={16} />
          <span>رجوع</span>
        </motion.button>

        {/* Main content */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#2c1f5e]/50 backdrop-blur-sm shadow-xl">
          {/* Hero image with gradient overlay */}
          <div className="relative w-full h-44 sm:h-[400px] overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 bg-[#2c1f5e] animate-pulse"></div>
            ) : song[0]?.songImage ? (
              <>
                {/* Background blur effect */}
                <div className="absolute inset-0">
                  <Image
                    src={song[0]?.songImage || '/placeholder.svg'}
                    layout="fill"
                    objectFit="cover"
                    alt={song[0]?.songName || 'Song cover'}
                    className="opacity-30 blur-md"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3a2a7d]/30 to-[#2c1f5e]"></div>

                {/* Main image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-40 h-40 sm:w-64 sm:h-64 rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={song[0]?.songImage || '/placeholder.svg'}
                      layout="fill"
                      objectFit="cover"
                      alt={song[0]?.songName || 'Song cover'}
                      className="rounded-lg"
                    />

                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full"
                      >
                        <Music className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    <div className="absolute bottom-2 left-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full"
                      >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </>
            ) : (
              <div className="absolute inset-0 bg-[#2c1f5e] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-[#8e44ad] border-b-[#8e44ad] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Song info */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {isLoading ? (
                    <div className="h-8 w-64 bg-[#3a2a7d] animate-pulse rounded"></div>
                  ) : (
                    song[0]?.songName || 'جاري التحميل...'
                  )}
                </h1>

                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                  <span className="px-2 py-1 bg-[#8e44ad] rounded-md text-xs">
                    أغنية أطفال
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
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleLike}
                  className={`p-2 rounded-full ${
                    isLiked
                      ? 'bg-[#8e44ad]'
                      : 'bg-[#2c1f5e] border border-[#8e44ad]'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? 'fill-white text-white' : 'text-[#8e44ad]'
                    }`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-[#2c1f5e] border border-[#8e44ad] text-[#8e44ad]"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-[#2c1f5e] border border-[#8e44ad] text-[#8e44ad]"
                >
                  <Download className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowComments(!showComments)}
                  className={`p-2 rounded-full ${
                    showComments
                      ? 'bg-[#8e44ad] text-white'
                      : 'bg-[#2c1f5e] border border-[#8e44ad] text-[#8e44ad]'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Video player */}
            <div ref={videoRef} className="my-8">
              {isLoading ? (
                <div className="w-full aspect-video bg-[#3a2a7d] animate-pulse rounded-xl"></div>
              ) : song?.length > 0 ? (
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-xl">
                  {/* Custom video player UI - in a real implementation, this would be your actual VideoPlayer component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying ? (
                      <div className="relative w-full h-full">
                        {song[0]?.songImage && (
                          <Image
                            src={song[0]?.songImage || '/placeholder.svg'}
                            layout="fill"
                            objectFit="cover"
                            alt={song[0]?.songName || 'Song cover'}
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

                  {/* Video controls */}
                  <div className="absolute bottom-4 left-0 right-0 px-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={togglePlay}
                          className="p-2 rounded-full bg-[#8e44ad] text-white"
                        >
                          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleMute}
                          className="p-2 rounded-full bg-white/20 text-white"
                        >
                          {isMuted ? (
                            <VolumeX size={16} />
                          ) : (
                            <Volume2 size={16} />
                          )}
                        </motion.button>

                        <div className="text-sm text-white/80">
                          00:00 / 03:45
                        </div>
                      </div>

                      <div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-full bg-white/20 text-white"
                        >
                          <Share2 size={16} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8e44ad] w-[30%]"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video bg-[#2c1f5e] rounded-xl flex items-center justify-center">
                  <p className="text-white/70">😉 لا يوجد نتائج لعرضها</p>
                </div>
              )}
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
          </div>
        </div>

        {/* Related songs section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <motion.h2
              variants={itemVariants}
              className="text-xl font-bold flex items-center"
            >
              <Music className="mr-2 text-[#8e44ad]" size={20} />
              <span>المزيد من الأغاني</span>
            </motion.h2>

            <div className="flex space-x-2 rtl:space-x-reverse">
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => instanceRef.current?.prev()}
                className="p-2 rounded-full bg-[#2c1f5e] text-white hover:bg-[#8e44ad] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => instanceRef.current?.next()}
                className="p-2 rounded-full bg-[#2c1f5e] text-white hover:bg-[#8e44ad] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div className="relative">
            {isLoading && relatedSongs.length === 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-[#2c1f5e] rounded-xl h-40 w-full"></div>
                    <div className="h-4 bg-[#2c1f5e] rounded mt-4 w-3/4 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={sliderRef}
                className="keen-slider py-4 overflow-visible"
              >
                {relatedSongs.map((relatedSong, index) => (
                  <motion.div
                    key={relatedSong?.id}
                    variants={itemVariants}
                    whileHover="hover"
                    className="keen-slider__slide"
                    onClick={() => handleSongClick(relatedSong?.id)}
                    onMouseEnter={() => setHoveredSongIndex(index)}
                    onMouseLeave={() => setHoveredSongIndex(-1)}
                  >
                    <div className="relative group cursor-pointer">
                      {/* Card background with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2c1f5e] to-[#3a2a7d] rounded-xl transform -rotate-1 scale-[0.98] opacity-70 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300"></div>

                      {/* Main card */}
                      <div className="relative bg-[#2c1f5e] rounded-xl overflow-hidden shadow-lg group-hover:shadow-[0_0_25px_rgba(142,68,173,0.3)] transition-all duration-300">
                        {/* Image container */}
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={relatedSong?.songImage || '/placeholder.svg'}
                            layout="fill"
                            objectFit="cover"
                            alt={relatedSong?.songName}
                            className="transition-transform duration-500 group-hover:scale-110"
                          />

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2c1f5e] via-transparent to-transparent opacity-70"></div>

                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-[#8e44ad]/80 p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                              <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                          </div>

                          {/* Decorative elements */}
                          {hoveredSongIndex === index && (
                            <>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-2 right-2 bg-[#8e44ad]/80 p-1.5 rounded-full"
                              >
                                <Volume2 className="w-4 h-4 text-white" />
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute top-2 left-2 bg-white/80 p-1.5 rounded-full"
                              >
                                <Heart className="w-4 h-4 text-[#8e44ad]" />
                              </motion.div>
                            </>
                          )}
                        </div>

                        {/* Song info */}
                        <div className="p-3 text-center">
                          <h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-[#9b59b6] transition-colors">
                            {relatedSong?.songName}
                          </h3>

                          {/* Rating stars */}
                          <div className="flex justify-center mt-2 space-x-1 rtl:space-x-reverse">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <Star className="w-3 h-3 text-gray-400" />
                          </div>
                        </div>

                        {/* Sparkle effects */}
                        {hoveredSongIndex === index && (
                          <>
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                              className="absolute -top-1 -right-1"
                            >
                              <Sparkles className="w-5 h-5 text-yellow-400" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                              className="absolute -bottom-1 -left-1"
                            >
                              <Sparkles className="w-5 h-5 text-yellow-400" />
                            </motion.div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-[#2c1f5e] rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageCircle className="mr-2 text-[#8e44ad]" size={20} />
            <span>تواصل معنا</span>
          </h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">الاسم</label>
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg bg-[#3a2a7d] border border-[#8e44ad]/30 focus:outline-none focus:border-[#8e44ad] text-white"
                  placeholder="أدخل اسمك"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  className="w-full py-2 px-4 rounded-lg bg-[#3a2a7d] border border-[#8e44ad]/30 focus:outline-none focus:border-[#8e44ad] text-white"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الرسالة</label>
              <textarea
                rows={4}
                className="w-full py-2 px-4 rounded-lg bg-[#3a2a7d] border border-[#8e44ad]/30 focus:outline-none focus:border-[#8e44ad] text-white"
                placeholder="اكتب رسالتك هنا..."
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] rounded-lg text-white font-bold shadow-lg shadow-[#8e44ad]/30"
            >
              إرسال الرسالة
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

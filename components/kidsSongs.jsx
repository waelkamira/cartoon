// 'use client';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import { usePathname, useRouter } from 'next/navigation';
// import React, { useEffect, useState, useContext } from 'react';
// import { inputsContext } from './Context';
// import Image from 'next/image';
// import Loading from './Loading';
// import { TfiMenuAlt } from 'react-icons/tfi';
// import SideBarMenu from './SideBarMenu';
// import BackButton from './BackButton';
// import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

// export default function KidsSongs({ image = true, title = true }) {
//   const [pageNumber, setPageNumber] = useState(1);
//   const [songs, setSongs] = useState([]);
//   const { newSong, deletedSong, dispatch } = useContext(inputsContext);
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);
//   const [showMessage, setShowMessage] = useState(true);
//   const [previousPath, setPreviousPath] = useState('');
//   const [vertical, setVertical] = useState(false);
//   const path = usePathname();

//   const [songsSliderRef, songsInstanceRef] = useKeenSlider({
//     loop: false,
//     mode: 'free',
//     vertical: vertical ? true : false,
//     rtl: vertical ? false : true,
//     slides: {
//       perView: () => {
//         // التحقق من أن الكود يعمل في المتصفح
//         if (typeof window !== 'undefined') {
//           return window?.innerWidth > 768 || vertical ? 3 : 2;
//         }
//         return 3; // القيمة الافتراضية في بيئة السيرفر
//       },
//       spacing: 5,
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
//     fetchSongs();
//     const timer = setTimeout(() => {
//       setShowMessage(false);
//     }, 90000);

//     // Cleanup timer if the component is unmounted
//     return () => clearTimeout(timer);
//   }, [newSong, deletedSong, pageNumber]);

//   useEffect(() => {
//     if (songsInstanceRef.current) {
//       songsInstanceRef.current.update();
//     }
//   }, [songs, newSong]);

//   async function fetchSongs() {
//     try {
//       const response = await fetch(
//         `/api/songs?page=${pageNumber}&limit=4&random=true`
//       );
//       const json = await response.json();
//       if (response.ok) {
//         // console.log('songs', songs);

//         const existingIds = new Set(songs.map((song) => song.id));
//         const newSongs = json.filter((song) => !existingIds.has(song.id));

//         if (newSongs.length > 0) {
//           setSongs((prevSongs) => [...prevSongs, ...newSongs]);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching songs:', error);
//     }
//   }

//   const handleSongClick = (songId) => {
//     // احفظ المسار السابق
//     const currentPath = window.location.pathname + window.location.search;
//     setPreviousPath(currentPath);

//     // التنقل إلى صفحة الأغنية
//     router.push(`/song?songId=${songId}`);

//     setTimeout(() => {
//       const newPath = window.location.pathname + window.location.search;
//       // تحديث الصفحة فقط إذا تغير المسار
//       if (newPath !== previousPath && newPath.includes('/song')) {
//         window?.location?.reload();
//       }
//     }, 3000);
//   };
//   return (
//     <div className="flex flex-col items-center justify-center w-full overflow-x-hidden p-2 bg-one sm:mt-24">
//       <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12">
//         {/* <TfiMenuAlt
//           className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50 bg-two"
//           onClick={() => setIsOpen(!isOpen)}
//         />
//         {isOpen && <SideBarMenu setIsOpen={setIsOpen} />} */}
//       </div>

//       {image ? (
//         <div className="relative h-44 w-48 sm:h-[300px] sm:w-80">
//           <Image
//             loading="lazy"
//             src={'https://i.imgur.com/rRBpVhp.png'}
//             layout="fill"
//             objectFit="conatin"
//             alt={'أغاني أطفال'}
//           />{' '}
//         </div>
//       ) : (
//         ''
//       )}

//       {title ? (
//         <h1 className="w-full text-start p-2 text-white my-2">أغاني أطفال</h1>
//       ) : (
//         // <h1 className="w-full text-start p-2 text-white my-2">
//         //   المزيد من الأغاني
//         // </h1>
//         ''
//       )}
//       {showMessage && (
//         <div className="relative w-full flex items-center justify-between animate-pulse text-white h-12  text-2xl px-2 ">
//           <MdKeyboardDoubleArrowRight />

//           <h6 className="text-sm w-full text-start">اسحب لمزيد من الأغاني</h6>
//         </div>
//       )}
//       <div
//         ref={songsSliderRef}
//         className={
//           (vertical ? 'h-[600px]' : ' h-fit') +
//           ' keen-slider py-2 shadow-lg overflow-scroll rounded-md'
//         }
//       >
//         {songs.length === 0 ? (
//           <Loading />
//         ) : (
//           // إنقاص أول 4 مسلسلات من العرض
//           songs?.map((song) => (
//             <div
//               key={song?.id}
//               className="keen-slider__slide snap-center flex flex-col items-center justify-start flex-shrink-0 px-2 w-full"
//               onClick={() => {
//                 dispatch({ type: 'KIDS_SONG_NAME', payload: song?.songName });
//                 handleSongClick(song?.id);
//               }}
//             >
//               <div
//                 className={
//                   (vertical ? 'w-72 h-44' : 'w-40 h-[90px]') +
//                   ' relative w-24 h-32 sm:w-full sm:h-64 rounded-md overflow-hidden hover:cursor-pointer'
//                 }
//               >
//                 <Image
//                   loading="lazy"
//                   src={song?.songImage}
//                   layout="fill"
//                   objectFit="cover"
//                   alt={song?.songName}
//                 />
//               </div>
//               <h1 className="text-white text-center m-2 text-[10px] sm:text-[15px] w-full line-clamp-2 font-bold">
//                 {song?.songName}
//               </h1>
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
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  ChevronRight,
  ChevronLeft,
  Play,
  Star,
  Heart,
  Sparkles,
  Volume2,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

export default function KidsSongs({ image = true, title = true }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [songs, setSongs] = useState([]);
  const { newSong, deletedSong, dispatch } = useContext(inputsContext);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [previousPath, setPreviousPath] = useState('');
  const [vertical, setVertical] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const path = usePathname();
  const containerRef = useRef(null);

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
    hover: {
      scale: 1.05,
      y: -5,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  };

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: 'free',
    vertical: vertical,
    rtl: vertical ? false : true,
    slides: {
      perView: () => {
        if (typeof window !== 'undefined') {
          return window.innerWidth > 768 || vertical ? 3 : 2;
        }
        return 3;
      },
      spacing: 15,
    },
    slideChanged(slider) {
      const currentSlide = slider.track.details.rel;
      const totalSlides = slider.track.details.slides.length;

      if (currentSlide >= totalSlides - 3) {
        setPageNumber((prevPage) => prevPage + 1);
      }
    },
    created() {
      setIsLoading(false);
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
    fetchSongs();
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10000); // Reduced from 90000 to 10000 for better UX

    return () => clearTimeout(timer);
  }, [newSong, deletedSong, pageNumber]);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [songs, newSong, vertical]);

  async function fetchSongs() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/songs?page=${pageNumber}&limit=6&random=true`
      );
      const json = await response.json();
      if (response.ok) {
        const existingIds = new Set(songs.map((song) => song.id));
        const newSongs = json.filter((song) => !existingIds.has(song.id));

        if (newSongs.length > 0) {
          setSongs((prevSongs) => [...prevSongs, ...newSongs]);
        }
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSongClick = (songId, index) => {
    setActiveIndex(index);

    // Save current path
    const currentPath = window.location.pathname + window.location.search;
    setPreviousPath(currentPath);

    // Add a small delay for the animation to play
    setTimeout(() => {
      // Navigate to song page
      dispatch({ type: 'KIDS_SONG_NAME', payload: songs[index]?.songName });
      router.push(`/song?songId=${songId}`);
    }, 300);

    setTimeout(() => {
      const newPath = window.location.pathname + window.location.search;
      if (newPath !== previousPath && newPath.includes('/song')) {
        window?.location?.reload();
      }
    }, 3000);
  };

  const handleNext = () => {
    instanceRef.current?.next();
  };

  const handlePrev = () => {
    instanceRef.current?.prev();
  };

  return (
    <div className="relative w-full overflow-hidden py-6 px-4 bg-[#3a2a7d]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#8e44ad]/10 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#9b59b6]/10 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[#8e44ad]/10 blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with title and image */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex-1">
            {title && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <div className="bg-[#8e44ad] p-2 rounded-lg">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  أغاني أطفال
                </h1>
              </motion.div>
            )}

            {showMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center mt-4 bg-[#2c1f5e] p-3 rounded-lg border-l-4 border-[#8e44ad]"
              >
                <ArrowRight className="w-5 h-5 text-[#8e44ad] animate-pulse mr-2" />
                <p className="text-white/80 text-sm">اسحب لمزيد من الأغاني</p>
              </motion.div>
            )}
          </div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 100,
              }}
              className="relative h-32 w-32 md:h-40 md:w-40 mt-4 md:mt-0"
            >
              <Image
                src={'https://i.imgur.com/rRBpVhp.png'}
                layout="fill"
                objectFit="contain"
                alt={'أغاني أطفال'}
                className="drop-shadow-[0_0_15px_rgba(142,68,173,0.5)]"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8e44ad]/20 to-[#9b59b6]/20 rounded-full blur-lg animate-pulse"></div>
            </motion.div>
          )}
        </div>

        {/* Slider navigation buttons */}
        <div className="flex justify-end mb-4 space-x-2 rtl:space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-2 rounded-full bg-[#2c1f5e] text-white hover:bg-[#8e44ad] transition-colors"
          >
            {vertical ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2 rounded-full bg-[#2c1f5e] text-white hover:bg-[#8e44ad] transition-colors"
          >
            {vertical ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fetchSongs()}
            className="p-2 rounded-full bg-[#2c1f5e] text-white hover:bg-[#8e44ad] transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Main slider */}
        <div className="relative">
          {isLoading && songs.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-[#2c1f5e] rounded-xl h-48 md:h-64 w-full"></div>
                  <div className="h-4 bg-[#2c1f5e] rounded mt-4 w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              ref={containerRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="overflow-visible"
            >
              <div
                ref={sliderRef}
                className={`keen-slider ${
                  vertical ? 'h-[600px]' : 'h-fit'
                } py-4 overflow-visible`}
              >
                <AnimatePresence>
                  {songs.map((song, index) => (
                    <motion.div
                      key={song?.id}
                      variants={itemVariants}
                      whileHover="hover"
                      custom={index}
                      className={`keen-slider__slide ${
                        activeIndex === index ? 'scale-95 opacity-0' : ''
                      }`}
                      onClick={() => handleSongClick(song?.id, index)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                    >
                      <div className="relative group">
                        {/* Card background with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2c1f5e] to-[#3a2a7d] rounded-xl transform -rotate-1 scale-[0.98] opacity-70 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300"></div>

                        {/* Main card */}
                        <div className="relative bg-[#2c1f5e] rounded-xl overflow-hidden shadow-lg group-hover:shadow-[0_0_25px_rgba(142,68,173,0.3)] transition-all duration-300">
                          {/* Image container */}
                          <div className="relative aspect-video md:aspect-[4/3] overflow-hidden">
                            <Image
                              src={song?.songImage || '/placeholder.svg'}
                              layout="fill"
                              objectFit="cover"
                              alt={song?.songName}
                              className="transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1f5e] via-transparent to-transparent opacity-70"></div>

                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-[#8e44ad]/80 p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <Play className="w-8 h-8 text-white fill-white" />
                              </div>
                            </div>

                            {/* Decorative elements */}
                            {hoveredIndex === index && (
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
                            <h3 className="text-white font-bold text-sm md:text-base line-clamp-1 group-hover:text-[#9b59b6] transition-colors">
                              {song?.songName}
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
                          {hoveredIndex === index && (
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
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Loading indicator */}
          {isLoading && songs.length > 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-[#2c1f5e] px-4 py-2 rounded-full shadow-lg">
                <div className="w-4 h-4 rounded-full bg-[#8e44ad] animate-pulse"></div>
                <p className="text-white text-sm">جاري تحميل المزيد...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

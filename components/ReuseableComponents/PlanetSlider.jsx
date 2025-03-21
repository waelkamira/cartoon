// 'use client';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState, useContext, useRef, useCallback } from 'react';
// import { inputsContext } from '../Context';
// import Loading from '../Loading';
// import Image from 'next/image';
// import CustomToast from '../CustomToast';
// import toast from 'react-hot-toast';
// import CurrentUser from '../CurrentUser';
// import { useSession } from 'next-auth/react';
// import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Sparkles,
//   Star,
//   Play,
//   Plus,
//   ChevronRight,
//   ChevronLeft,
// } from 'lucide-react';

// export default function PlanetSlider({ data, type, logoSrc }) {
//   // تم تغيير props
//   const [pageNumber, setPageNumber] = useState(1);
//   const [items, setItems] = useState([]); // بيانات الأفلام والمسلسلات
//   const { newSeries, deletedSeries, newMovie, deletedMovie } =
//     useContext(inputsContext); // تم إضافة newMovie و deletedMovie
//   const router = useRouter();
//   const user = CurrentUser();
//   const session = useSession();
//   const [showMessage, setShowMessage] = useState(true);
//   const [vertical, setVertical] = useState(false);
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [animateStars, setAnimateStars] = useState(false);
//   const starsRef = useRef([]);
//   const path = usePathname();

//   // Generate random stars for background effect
//   useEffect(() => {
//     starsRef.current = Array.from({ length: 50 }, () => ({
//       top: `${Math.random() * 100}%`,
//       left: `${Math.random() * 100}%`,
//       size: `${Math.random() * 2 + 1}px`,
//       delay: `${Math.random() * 5}s`,
//       duration: `${Math.random() * 3 + 2}s`,
//     }));
//     setAnimateStars(true);
//   }, []);

//   const [sliderRef, sliderInstanceRef] = useKeenSlider({
//     loop: false,
//     mode: 'free',
//     vertical: vertical ? true : false,
//     rtl: vertical ? false : true,
//     slides: {
//       perView: 3,
//       spacing: () => {
//         if (typeof window !== 'undefined') {
//           return window.innerWidth < 768 ? 3 : 17;
//         }
//         return 17;
//       },
//     },
//     slideChanged(slider) {
//       const currentSlide = slider.track.details.rel;
//       const totalSlides = slider.track.details.slides.length;

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

//       handleResize();
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//     }
//   }, [path]);

//   // Fetch data using useCallback for memoization
//   const fetchData = useCallback(async () => {
//     // تم تغيير اسم الدالة
//     setIsLoading(true);
//     try {
//       let endpoint = `/api/${
//         type === 'movie' ? 'movies' : 'serieses'
//       }?page=${pageNumber}&limit=4`;
//       if (type === 'series' && data) {
//         endpoint += `&planetName=${data}`; // استخدم data كـ planetName للمسلسلات
//       }
//       const response = await fetch(endpoint);
//       const json = await response.json();
//       if (response.ok) {
//         const existingIds = new Set(items.map((item) => item.id));
//         const newItems = json.filter((item) => !existingIds.has(item.id));

//         if (newItems?.length > 0) {
//           setItems((prevItems) => [...prevItems, ...newItems]);
//         }
//       }
//     } catch (error) {
//       console.error(`Error fetching ${type} data:`, error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [pageNumber, data, type, items]);

//   useEffect(() => {
//     fetchData();
//     const timer = setTimeout(() => {
//       setShowMessage(false);
//     }, 30000);

//     return () => clearTimeout(timer);
//   }, [newSeries, deletedSeries, newMovie, deletedMovie, pageNumber, fetchData]);

//   useEffect(() => {
//     if (sliderInstanceRef.current) {
//       sliderInstanceRef.current.update();
//     }
//   }, [items]);

//   async function handleAdd(id) {
//     try {
//       const response = await fetch(
//         `/api/${type === 'movie' ? 'movies' : 'serieses'}`,
//         {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ id: id }),
//         }
//       );
//       if (response.ok) {
//         toast.custom((t) => (
//           <CustomToast
//             t={t}
//             emoji={'🧀'}
//             message={`تم إضافة ${
//               type === 'movie' ? 'الفيلم' : 'المسلسل'
//             } الى الأكثر مشاهدة`}
//             greenEmoji={'✔'}
//           />
//         ));
//       }
//     } catch (error) {
//       console.error('Error adding item:', error);
//       toast.custom((t) => (
//         <CustomToast
//           t={t}
//           emoji={'❌'}
//           message={`حدث خطأ أثناء إضافة ${
//             type === 'movie' ? 'الفيلم' : 'المسلسل'
//           }`}
//           greenEmoji={''}
//         />
//       ));
//     }
//   }

//   return (
//     <div className="relative flex flex-col items-center justify-center w-full overflow-hidden p-2 bg-white/10 rounded-xl shadow-2xl sm:mt-24">
//       {/* Animated stars background */}
//       {animateStars &&
//         starsRef.current.map((star, index) => (
//           <div
//             key={index}
//             className="absolute rounded-full bg-white animate-twinkle"
//             style={{
//               top: star.top,
//               left: star.left,
//               width: star.size,
//               height: star.size,
//               '--twinkle-delay': star.delay,
//               '--twinkle-duration': star.duration,
//             }}
//           />
//         ))}

//       {/* Floating planet decorations */}
//       <div
//         className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-md animate-float"
//         style={{ animationDelay: '0.5s' }}
//       ></div>
//       <div
//         className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#4facfe] to-[#00f2fe] opacity-20 blur-md animate-float"
//         style={{ animationDelay: '1.2s' }}
//       ></div>

//       {/* Logo with glow effect */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className="relative h-32 w-52 sm:h-52 sm:w-80 mb-4"
//       >
//         <div className="absolute inset-0 bg-white rounded-full filter blur-xl opacity-30 animate-pulse"></div>
//         <Image
//           loading="lazy"
//           src={logoSrc}
//           layout="fill"
//           objectFit="cover"
//           alt={type === 'movie' ? 'أفلام' : data}
//           className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
//         />
//       </motion.div>

//       {/* Planet title with decorative elements */}
//       {vertical ? (
//         <div className="w-full space-y-2">
//           <div className="flex items-center w-full px-8">
//             <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-one to-transparent rounded-lg"></div>
//           </div>
//           <motion.div
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="flex items-center gap-2"
//           >
//             <Sparkles className="text-one h-5 w-5" />
//             <h1 className="text-2xl font-bold text-white my-2 bg-gradient-to-r from-one to-white bg-clip-text text-transparent">
//               كوكب {type === 'movie' ? 'الأفلام' : data}
//             </h1>
//           </motion.div>
//         </div>
//       ) : (
//         <motion.div
//           initial={{ x: -50, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="w-full flex items-center gap-2 px-4"
//         >
//           <Sparkles className="text-one h-6 w-6" />
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-one to-white bg-clip-text text-transparent my-2">
//             كوكب {type === 'movie' ? 'الأفلام' : data}
//           </h1>
//         </motion.div>
//       )}

//       {/* Swipe instruction with animation */}
//       <AnimatePresence>
//         {showMessage && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="relative w-full flex items-center justify-between text-white h-12 text-2xl px-4 my-2 bg-one/30 backdrop-blur-sm rounded-lg"
//           >
//             <motion.div
//               animate={{ x: [0, 10, 0] }}
//               transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//             >
//               <MdKeyboardDoubleArrowRight className="text-white" />
//             </motion.div>
//             <h6 className="text-sm w-full text-start font-medium">
//               اسحب لمزيد من {type === 'movie' ? 'الأفلام' : 'المسلسلات'}
//             </h6>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Content slider with enhanced styling */}
//       <div
//         ref={sliderRef}
//         className={`${
//           vertical ? 'h-[600px]' : 'h-fit'
//         } keen-slider py-4 overflow-hidden rounded-xl flex-row justify-start items-start bg-one/50 backdrop-blur-sm border border-one/20 shadow-[0_0_15px_rgba(255, 255, 0, 0.3)]`}
//       >
//         {isLoading && items.length === 0 ? (
//           <div className="w-full h-full flex items-center justify-center">
//             <Loading />
//           </div>
//         ) : (
//           items?.map((item, index) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="keen-slider__slide snap-center flex flex-col items-center"
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//               {session?.status === 'authenticated' && user?.isAdmin === '1' && (
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white rounded-full px-3 py-1 my-2 shadow-lg flex items-center gap-1 z-10"
//                   onClick={() => handleAdd(item?.id)}
//                 >
//                   <Plus className="h-4 w-4" />
//                   <span>إضافة</span>
//                 </motion.button>
//               )}

//               <div
//                 className="flex flex-col items-center justify-start flex-shrink-0 w-full mr-1 relative"
//                 key={item?.id}
//                 onClick={() => {
//                   router.push(
//                     `/${type === 'movie' ? 'movie' : 'seriesAndEpisodes'}?${
//                       type === 'movie' ? 'movieName' : 'seriesName'
//                     }=${type === 'movie' ? item?.movieName : item?.seriesName}`
//                   );
//                 }}
//               >
//                 <div
//                   className={`${
//                     vertical ? 'w-72 h-44' : 'w-24 h-32'
//                   } relative sm:w-full sm:h-64 rounded-xl overflow-hidden hover:cursor-pointer group transition-all duration-300 ease-in-out`}
//                 >
//                   {/* Card with hover effects */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-one/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

//                   <Image
//                     loading="lazy"
//                     src={
//                       type === 'movie'
//                         ? item?.movieImage || '/placeholder.svg'
//                         : item?.seriesImage || '/placeholder.svg'
//                     }
//                     layout="fill"
//                     objectFit="cover"
//                     objectPosition="top"
//                     alt={type === 'movie' ? item?.movieName : item?.seriesName}
//                     className="transition-transform duration-500 "
//                   />

//                   {/* Hover overlay with play button */}
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
//                     <motion.div
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                       className="bg-one/80 p-3 rounded-full backdrop-blur-sm"
//                     >
//                       <Play className="h-8 w-8 text-white" fill="white" />
//                     </motion.div>
//                   </div>

//                   {/* Rating badge */}
//                   <div className="absolute top-2 left-2 bg-one/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 z-20">
//                     <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
//                     <span className="text-xs text-white font-bold">
//                       {(Math.random() * 2 + 3).toFixed(1)}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Item title with animation */}
//                 <motion.div
//                   initial={false}
//                   animate={
//                     hoveredIndex === index
//                       ? { y: 0, opacity: 1 }
//                       : { y: 0, opacity: 0.8 }
//                   }
//                   className="relative w-full mt-2 px-2"
//                 >
//                   <h1 className="text-white text-center m-1 text-[10px] sm:text-[15px] w-full line-clamp-2 font-bold">
//                     {type === 'movie' ? item?.movieName : item?.seriesName}
//                   </h1>

//                   {/* Decorative underline */}
//                   <div
//                     className={`h-0.5 w-0 bg-gradient-to-r from-one to-white mx-auto transition-all duration-300 rounded-full ${
//                       hoveredIndex === index ? 'w-1/2' : 'w-0'
//                     }`}
//                   ></div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>

//       {/* Navigation arrows */}
//       {!vertical && items.length > 0 && (
//         <div className="flex justify-between w-full px-4 mt-4">
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-one/70 backdrop-blur-sm p-2 rounded-full text-white shadow-[0_0_10px_rgba(138,43,226,0.5)]"
//             onClick={() => sliderInstanceRef.current?.prev()}
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className="bg-one/70 backdrop-blur-sm p-2 rounded-full text-white shadow-[0_0_10px_rgba(138,43,226,0.5)]"
//             onClick={() => sliderInstanceRef.current?.next()}
//           >
//             <ChevronRight className="h-5 w-5" />
//           </motion.button>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { inputsContext } from '../Context';
import Loading from '../Loading';
import Image from 'next/image';
import CustomToast from '../CustomToast';
import toast from 'react-hot-toast';
import CurrentUser from '../CurrentUser';
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

const categoryEndpoints = {
  movie: 'movies',
  series: 'serieses',
  englishCartoon: 'englishCartoons',
  englishEpisodes: 'englishEpisodes',
  englishSongs: 'englishSongs',
  nasohSeries: 'nasohSeries',
  songs: 'songs',
  spacetoonSongs: 'spacetoonSongs',
  turkishCartoon: 'turkishCartoons',
  turkishEpisodes: 'turkishEpisodes',
  turkishSongs: 'turkishSongs',
};

export default function PlanetSlider({ category, data, logoSrc }) {
  // تم تغيير props
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState([]); // بيانات الأفلام والمسلسلات
  const { newSeries, deletedSeries, newMovie, deletedMovie } =
    useContext(inputsContext); // تم إضافة newMovie و deletedMovie
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

  const isMovieOrSeries = category === 'movie' || category === 'series';

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

  const [sliderRef, sliderInstanceRef] = useKeenSlider({
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

  // Fetch data using useCallback for memoization
  const fetchData = useCallback(async () => {
    // تم تغيير اسم الدالة
    setIsLoading(true);
    try {
      const endpointBase = categoryEndpoints[category] || 'defaultEndpoint'; // استخدم  categoryEndpoints لتحديد نقطة النهاية
      let endpoint = `/api/${endpointBase}?page=${pageNumber}&limit=4`;
      if (isMovieOrSeries && data) {
        endpoint += `&planetName=${data}`; // استخدم data كـ planetName للمسلسلات
      }
      const response = await fetch(endpoint);
      const json = await response.json();
      if (response.ok) {
        const existingIds = new Set(items.map((item) => item.id));
        const newItems = json.filter((item) => !existingIds.has(item.id));

        if (newItems?.length > 0) {
          setItems((prevItems) => [...prevItems, ...newItems]);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${category} data:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber, data, category, items, isMovieOrSeries]);

  useEffect(() => {
    fetchData();
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [newSeries, deletedSeries, newMovie, deletedMovie, pageNumber, fetchData]);

  useEffect(() => {
    if (sliderInstanceRef.current) {
      sliderInstanceRef.current.update();
    }
  }, [items]);

  async function handleAdd(id) {
    try {
      const endpointBase = categoryEndpoints[category] || 'defaultEndpoint';
      const response = await fetch(`/api/${endpointBase}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            emoji={'🧀'}
            message={`تم إضافة ${category} الى الأكثر مشاهدة`}
            greenEmoji={'✔'}
          />
        ));
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.custom((t) => (
        <CustomToast
          t={t}
          emoji={'❌'}
          message={`حدث خطأ أثناء إضافة ${category}`}
          greenEmoji={''}
        />
      ));
    }
  }
  const getItemName = (item) => {
    if (category === 'movie') return item?.movieName;
    if (category === 'series') return item?.seriesName;
    if (category === 'englishCartoon') return item?.cartoonName;
    if (category === 'englishEpisodes') return item?.episodeName;
    if (category === 'englishSongs') return item?.songName;
    if (category === 'nasohSeries') return item?.seriesName;
    if (category === 'songs') return item?.songName;
    if (category === 'spacetoonSongs') return item?.songName;
    if (category === 'turkishCartoon') return item?.cartoonName;
    if (category === 'turkishEpisodes') return item?.episodeName;
    if (category === 'turkishSongs') return item?.songName;

    return item?.name || 'اسم العنصر'; // Default name property
  };

  const getItemImage = (item) => {
    if (category === 'movie') return item?.movieImage || '/placeholder.svg';
    if (category === 'series') return item?.seriesImage || '/placeholder.svg';
    if (category === 'englishCartoon')
      return item?.cartoonImage || '/placeholder.svg';
    if (category === 'englishEpisodes')
      return item?.episodeImage || '/placeholder.svg';
    if (category === 'englishSongs')
      return item?.songImage || '/placeholder.svg';
    if (category === 'nasohSeries')
      return item?.seriesImage || '/placeholder.svg';
    if (category === 'songs') return item?.songImage || '/placeholder.svg';
    if (category === 'spacetoonSongs')
      return item?.songImage || '/placeholder.svg';
    if (category === 'turkishCartoon')
      return item?.cartoonImage || '/placeholder.svg';
    if (category === 'turkishEpisodes')
      return item?.episodeImage || '/placeholder.svg';
    if (category === 'turkishSongs')
      return item?.songImage || '/placeholder.svg';
    return item?.image || '/placeholder.svg'; // Default image property
  };
  const getItemLink = (item) => {
    if (category === 'movie') return `/movie?movieName=${item.movieName}`;
    if (category === 'series')
      return `/seriesAndEpisodes?seriesName=${item.seriesName}`;
    if (category === 'englishCartoon')
      return `/englishCartoon?cartoonName=${item.cartoonName}`;
    if (category === 'englishEpisodes')
      return `/englishEpisode?episodeName=${item.episodeName}`;
    if (category === 'englishSongs')
      return `/englishSong?songName=${item.songName}`;
    if (category === 'nasohSeries')
      return `/nasohSeries?seriesName=${item.seriesName}`;
    if (category === 'songs') return `/song?songName=${item.songName}`;
    if (category === 'spacetoonSongs')
      return `/spacetoonSong?songName=${item.songName}`;
    if (category === 'turkishCartoon')
      return `/turkishCartoon?cartoonName=${item.cartoonName}`;
    if (category === 'turkishEpisodes')
      return `/turkishEpisode?episodeName=${item.episodeName}`;
    if (category === 'turkishSongs')
      return `/turkishSong?songName=${item.songName}`;

    return `/item?id=${item.id}`; // Default link
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full overflow-hidden p-2 bg-white/10 rounded-xl shadow-2xl sm:mt-24">
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
        className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-md animate-float"
        style={{ animationDelay: '0.5s' }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-16 h-16 rounded-full opacity-20 blur-md animate-float"
        style={{ animationDelay: '1.2s' }}
      ></div>

      {/* Logo with glow effect */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative h-32 w-52 sm:h-52 sm:w-80 mb-4"
      >
        <div className="absolute inset-0 bg-white rounded-full filter blur-xl opacity-30 animate-pulse"></div>
        <Image
          loading="lazy"
          src={logoSrc}
          layout="fill"
          objectFit="cover"
          alt={category}
          className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        />
      </motion.div>

      {/* Planet title with decorative elements */}
      {vertical ? (
        <div className="w-full space-y-2">
          <div className="flex items-center w-full px-8">
            <div className="w-full h-0.5 rounded-lg"></div>
          </div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="text-one h-5 w-5" />
            <h1 className="text-2xl font-bold text-white my-2 bg-clip-text text-transparent">
              كوكب {category}
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
          <Sparkles className="text-one h-6 w-6" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-one to-white bg-clip-text text-transparent my-2">
            كوكب {category}
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
            className="relative w-full flex items-center justify-between text-white h-12 text-2xl px-4 my-2 bg-one/30 backdrop-blur-sm rounded-lg"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <MdKeyboardDoubleArrowRight className="text-white" />
            </motion.div>
            <h6 className="text-sm w-full text-start font-medium">
              اسحب لمزيد من {category}
            </h6>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content slider with enhanced styling */}
      <div
        ref={sliderRef}
        className={`${
          vertical ? 'h-[600px]' : 'h-fit'
        } keen-slider py-4 overflow-hidden rounded-xl flex-row justify-start items-start bg-one/50 backdrop-blur-sm border border-one/20 shadow-[0_0_15px_rgba(255, 255, 0, 0.3)]`}
      >
        {isLoading && items.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          items?.map((item, index) => (
            <motion.div
              key={item.id}
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
                  className=" text-white rounded-full px-3 py-1 my-2 shadow-lg flex items-center gap-1 z-10"
                  onClick={() => handleAdd(item?.id)}
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة</span>
                </motion.button>
              )}

              <div
                className="flex flex-col items-center justify-start flex-shrink-0 w-full mr-1 relative"
                key={item?.id}
                onClick={() => {
                  router.push(getItemLink(item));
                }}
              >
                <div
                  className={`${
                    vertical ? 'w-72 h-44' : 'w-24 h-32'
                  } relative sm:w-full sm:h-64 rounded-xl overflow-hidden hover:cursor-pointer group transition-all duration-300 ease-in-out`}
                >
                  {/* Card with hover effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                  <Image
                    loading="lazy"
                    src={getItemImage(item)}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    alt={getItemName(item)}
                    className="transition-transform duration-500 "
                  />

                  {/* Hover overlay with play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-one/80 p-3 rounded-full backdrop-blur-sm"
                    >
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </motion.div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-2 left-2 bg-one/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 z-20">
                    <Star className="h-3 w-3 text-yellow-300 fill-yellow-300" />
                    <span className="text-xs text-white font-bold">
                      {(Math.random() * 2 + 3).toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Item title with animation */}
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
                    {getItemName(item)}
                  </h1>

                  {/* Decorative underline */}
                  <div
                    className={`h-0.5 w-0 bg-gradient-to-r from-one to-white mx-auto transition-all duration-300 rounded-full ${
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
      {!vertical && items.length > 0 && (
        <div className="flex justify-between w-full px-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className=" backdrop-blur-sm p-2 rounded-full text-white shadow-one]"
            onClick={() => sliderInstanceRef.current?.prev()}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-one/70 backdrop-blur-sm p-2 rounded-full text-white shadow-[0_0_10px_rgba(138,43,226,0.5)]"
            onClick={() => sliderInstanceRef.current?.next()}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

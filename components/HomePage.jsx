// 'use client';
// import React, { useContext, useEffect, useState } from 'react';
// import CategoriesSlides from './CategoriesSlides';
// import Button from './Button';
// import CurrentUser from './CurrentUser';
// import Serieses from './serieses';
// import SeriesForm from './createSeries';
// import EpisodForm from './createEpisode';
// import MovieForm from './createMovie';
// import SongForm from './createSong';
// import SpacetoonSongForm from './createSpacetoonSong';
// import LoginMessage from './loginMessage';
// import SubscriptionPage from './paypal/subscriptionPage';

// export default function HomePage() {
//   const [isSpacetoonOpen, setIsSpacetoonOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [show, setShow] = useState(false);
//   const [display, setDisplay] = useState(false);
//   const [active, setActive] = useState(false);
//   const session = useSession();
//   const user = CurrentUser();
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     sessionStorage.clear(); // تفريغ جميع العناصر في sessionStorage
//     localStorage.removeItem('episodeNumber');
//   }, []);

//   return (
//     <>
//       {user &&
//         session?.status === 'authenticated' &&
//         user?.monthly_subscribed === false &&
//         user?.yearly_subscribed === false && <SubscriptionPage />}{' '}
//       {session?.status === 'unauthenticated' && (
//         <div
//           className="absolute right-0 top-0 h-full w-full z-50"
//           onClick={() => setOpen(true)}
//         >
//           {open ? <LoginMessage setOpen={setOpen} /> : ''}
//         </div>
//       )}
//       <div className="relative flex flex-col justify-center items-center xl:w-4/5 z-40 sm:my-0 w-full bg-one">
//         <div className=" w-full ">

//           <CategoriesSlides />

//           <div className={'p-4'}>
//             {user?.isAdmin ? (
//               <>
//                 <Button title={'انشاء حلقة'} onClick={() => setShow(!show)} />
//                 <Button
//                   title={'انشاء مسلسل'}
//                   onClick={() => setIsVisible(!isVisible)}
//                 />
//                 <Button
//                   title={'انشاء أغنية سبيس تون'}
//                   onClick={() => setIsSpacetoonOpen(!isSpacetoonOpen)}
//                 />
//                 <Button
//                   title={'انشاء فيلم'}
//                   onClick={() => setDisplay(!display)}
//                 />
//                 <Button
//                   title={'انشاء أغنية'}
//                   onClick={() => setActive(!active)}
//                 />
//               </>
//             ) : (
//               ''
//             )}
//             <SeriesForm setIsVisible={setIsVisible} isVisible={isVisible} />
//             <EpisodForm setShow={setShow} show={show} />
//             <MovieForm setDisplay={setDisplay} display={display} />
//             <SongForm setActive={setActive} active={active} />
//             <SpacetoonSongForm
//               setIsSpacetoonOpen={setIsSpacetoonOpen}
//               isSpacetoonOpen={isSpacetoonOpen}
//             />

//             {session?.status === 'unauthenticated' && (
//               <Button title={'تسجيل الدخول'} path={'/login'} style={' '} />
//             )}
//           </div>
//         </div>
//         <div className=" flex flex-col justify-center items-center w-full rounded-lg sm:p-8 gap-2 ">
//           <Serieses />
//         </div>
//       </div>
//     </>
//   );
// }
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { motion } from 'framer-motion';
// import {
//   Film,
//   Tv,
//   Music,
//   Plus,
//   ChevronDown,
//   LogIn,
//   Star,
//   TrendingUp,
// } from 'lucide-react';

// import CategoriesSlides from './CategoriesSlides';
// import CurrentUser from './CurrentUser';
// import Serieses from './serieses';
// import SeriesForm from './createSeries';
// import EpisodForm from './createEpisode';
// import MovieForm from './createMovie';
// import SongForm from './createSong';
// import SpacetoonSongForm from './createSpacetoonSong';
// import LoginMessage from './loginMessage';
// import SubscriptionPage from './paypal/subscriptionPage';
// import Button from './Button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';

// export default function HomePage() {
//   // State management
//   const [isSpacetoonOpen, setIsSpacetoonOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [show, setShow] = useState(false);
//   const [display, setDisplay] = useState(false);
//   const [active, setActive] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState('featured');

//   // Auth and user data
//   const session = useSession();
//   const user = CurrentUser();
//   const isAdmin = user?.isAdmin;
//   const isAuthenticated = session?.status === 'authenticated';
//   const isSubscribed = user?.monthly_subscribed || user?.yearly_subscribed;

//   // Clear session storage on component mount
//   useEffect(() => {
//     sessionStorage.clear();
//     localStorage.removeItem('episodeNumber');
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { type: 'spring', stiffness: 300, damping: 24 },
//     },
//   };

//   // Render login overlay for unauthenticated users
//   const renderAuthOverlay = () => {
//     if (session?.status === 'unauthenticated') {
//       return (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
//           onClick={() => setOpen(true)}
//         >
//           {open ? (
//             <LoginMessage setOpen={setOpen} />
//           ) : (
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4"
//             >
//               <h2 className="text-2xl font-bold text-center mb-6">مرحباً بك</h2>
//               <p className="text-center mb-8 text-gray-600 dark:text-gray-300">
//                 سجل الدخول للوصول إلى جميع المحتويات والميزات
//               </p>
//               <Button
//                 className="w-full py-6 text-lg font-medium flex items-center justify-center gap-2"
//                 onClick={() => setOpen(true)}
//               >
//                 <LogIn className="w-5 h-5" />
//                 تسجيل الدخول
//               </Button>
//             </motion.div>
//           )}
//         </div>
//       );
//     }
//     return null;
//   };

//   // Render subscription banner for authenticated but not subscribed users
//   const renderSubscriptionBanner = () => {
//     if (isAuthenticated && !isSubscribed) {
//       return <SubscriptionPage />;
//     }
//     return null;
//   };

//   // Render admin controls
//   const renderAdminControls = () => {
//     if (!isAdmin) return null;

//     return (
//       <motion.div
//         variants={itemVariants}
//         className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-4 shadow-lg mb-8"
//       >
//         <div className="flex flex-wrap gap-3 justify-center">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Plus className="w-4 h-4" />
//                 إضافة محتوى جديد
//                 <ChevronDown className="w-4 h-4 ml-1" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuItem onClick={() => setIsVisible(!isVisible)}>
//                 <Tv className="w-4 h-4 ml-2" />
//                 إنشاء مسلسل
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setShow(!show)}>
//                 <Film className="w-4 h-4 ml-2" />
//                 إنشاء حلقة
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setDisplay(!display)}>
//                 <Film className="w-4 h-4 ml-2" />
//                 إنشاء فيلم
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setActive(!active)}>
//                 <Music className="w-4 h-4 ml-2" />
//                 إنشاء أغنية
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => setIsSpacetoonOpen(!isSpacetoonOpen)}
//               >
//                 <Star className="w-4 h-4 ml-2" />
//                 إنشاء أغنية سبيس تون
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </motion.div>
//     );
//   };

//   // Render content tabs
//   const renderContentTabs = () => {
//     return (
//       <motion.div
//         variants={itemVariants}
//         className="flex overflow-x-auto scrollbar-hide gap-2 pb-2 mb-6"
//       >
//         {['featured', 'trending', 'new', 'recommended'].map((tab) => (
//           <Button
//             key={tab}
//             variant={activeTab === tab ? 'default' : 'outline'}
//             className="px-6 py-2 rounded-full whitespace-nowrap"
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab === 'featured' && <Star className="w-4 h-4 ml-2" />}
//             {tab === 'trending' && <TrendingUp className="w-4 h-4 ml-2" />}
//             {tab === 'new' && <Plus className="w-4 h-4 ml-2" />}
//             {tab === 'recommended' && <Film className="w-4 h-4 ml-2" />}
//             {tab === 'featured' && 'المميز'}
//             {tab === 'trending' && 'الأكثر مشاهدة'}
//             {tab === 'new' && 'جديد'}
//             {tab === 'recommended' && 'موصى به'}
//           </Button>
//         ))}
//       </motion.div>
//     );
//   };

//   // Render forms
//   const renderForms = () => {
//     return (
//       <>
//         <SeriesForm setIsVisible={setIsVisible} isVisible={isVisible} />
//         <EpisodForm setShow={setShow} show={show} />
//         <MovieForm setDisplay={setDisplay} display={display} />
//         <SongForm setActive={setActive} active={active} />
//         <SpacetoonSongForm
//           setIsSpacetoonOpen={setIsSpacetoonOpen}
//           isSpacetoonOpen={isSpacetoonOpen}
//         />
//       </>
//     );
//   };

//   return (
//     <>
//       {renderAuthOverlay()}
//       {renderSubscriptionBanner()}

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-4 pb-12"
//       >
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Hero Section */}
//           <motion.div
//             variants={itemVariants}
//             className="relative overflow-hidden rounded-2xl mb-8 shadow-xl"
//           >
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
//             <CategoriesSlides />
//           </motion.div>

//           {/* Admin Controls */}
//           {renderAdminControls()}

//           {/* Content Tabs */}
//           {renderContentTabs()}

//           {/* Main Content */}
//           <motion.div
//             variants={itemVariants}
//             className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
//           >
//             <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
//               {activeTab === 'featured' && 'المحتوى المميز'}
//               {activeTab === 'trending' && 'الأكثر مشاهدة'}
//               {activeTab === 'new' && 'أحدث المحتويات'}
//               {activeTab === 'recommended' && 'موصى به لك'}
//             </h2>
//             <Serieses />
//           </motion.div>

//           {/* Forms */}
//           {renderForms()}
//         </div>
//       </motion.div>
//     </>
//   );
// }
'use client';
import { useEffect, useState } from 'react';
import CategoriesSlides from './CategoriesSlides';
import Button from './Button';
import CurrentUser from './CurrentUser';
import Serieses from './serieses';
import SeriesForm from './createSeries';
import EpisodForm from './createEpisode';
import MovieForm from './createMovie';
import SongForm from './createSong';
import SpacetoonSongForm from './createSpacetoonSong';
import LoginMessage from './loginMessage';
import SubscriptionPage from './paypal/subscriptionPage';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaFilm,
  FaMusic,
  FaGamepad,
  FaStar,
  FaPlus,
  FaSignInAlt,
  FaRocket,
  FaVideo,
  FaPlayCircle,
} from 'react-icons/fa';
import { GiSpaceship, GiRingedPlanet, GiStarsStack } from 'react-icons/gi';
import Image from 'next/image';

export default function HomePage() {
  const [isSpacetoonOpen, setIsSpacetoonOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [active, setActive] = useState(false);
  const session = useSession();
  const user = CurrentUser();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    sessionStorage.clear(); // تفريغ جميع العناصر في sessionStorage
    localStorage.removeItem('episodeNumber');

    // Add animation to page load
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-load');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate-in');
        }, index * 150);
      });
    };

    animateElements();
  }, []);

  // Generate random stars for the background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      });
    }
    return stars;
  };

  const stars = generateStars();

  const tabs = [
    { id: 'featured', label: 'المميز', icon: <FaStar className="ml-2" /> },
    { id: 'series', label: 'مسلسلات', icon: <FaFilm className="ml-2" /> },
    { id: 'movies', label: 'أفلام', icon: <FaVideo className="ml-2" /> },
    { id: 'songs', label: 'أغاني', icon: <FaMusic className="ml-2" /> },
    { id: 'games', label: 'ألعاب', icon: <FaGamepad className="ml-2" /> },
  ];

  const adminActions = [
    {
      id: 'series',
      label: 'انشاء مسلسل',
      icon: <FaFilm />,
      action: () => setIsVisible(!isVisible),
    },
    {
      id: 'episode',
      label: 'انشاء حلقة',
      icon: <FaPlayCircle />,
      action: () => setShow(!show),
    },
    {
      id: 'movie',
      label: 'انشاء فيلم',
      icon: <FaVideo />,
      action: () => setDisplay(!display),
    },
    {
      id: 'song',
      label: 'انشاء أغنية',
      icon: <FaMusic />,
      action: () => setActive(!active),
    },
    {
      id: 'spacetoon',
      label: 'انشاء أغنية سبيس تون',
      icon: <FaRocket />,
      action: () => setIsSpacetoonOpen(!isSpacetoonOpen),
    },
  ];

  return (
    <>
      {/* Subscription check */}
      {user &&
        session?.status === 'authenticated' &&
        user?.monthly_subscribed === false &&
        user?.yearly_subscribed === false && <SubscriptionPage />}

      {/* Login message for unauthenticated users */}
      {session?.status === 'unauthenticated' && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(true)}
        >
          <AnimatePresence>
            {open ? <LoginMessage setOpen={setOpen} /> : ''}
          </AnimatePresence>
        </div>
      )}

      {/* Main content */}
      <motion.div
        className="relative flex flex-col justify-center items-center w-full z-40 min-h-screen bg-gradient-to-b from-[#F47B47]  to-[#141A2C] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: star.animationDelay,
                animationDuration: star.animationDuration,
              }}
            />
          ))}

          {/* Floating planets */}
          <motion.div
            className="absolute top-[10%] right-[5%] text-yellow-300 opacity-20 pointer-events-none"
            animate={{ y: [0, -15, 0], rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          >
            <GiRingedPlanet size={100} />
          </motion.div>

          <motion.div
            className="absolute bottom-[15%] left-[8%] text-blue-300 opacity-20 pointer-events-none"
            animate={{ y: [0, 20, 0], rotate: -360 }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          >
            <GiSpaceship size={80} />
          </motion.div>
        </div>

        {/* Content container */}
        <div className="relative w-full max-w-6xl mx-auto px-4 py-6 z-10">
          {/* Header with logo and search */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div
                className="relative h-16 w-16 mr-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Image
                  src="https://i.imgur.com/nfDVITC.png"
                  alt="Logo"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(255, 255, 255, 0)',
                      '0 0 0 10px rgba(255, 255, 255, 0.3)',
                      '0 0 0 0 rgba(255, 255, 255, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  سبيس تون
                </h1>
                <p className="text-orange-200 text-sm">
                  عالم من المغامرات والمرح
                </p>
              </div>
            </div>

            {/* Search bar placeholder */}
            <motion.div
              className="relative w-full md:w-auto"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="ابحث عن مسلسل أو فيلم أو أغنية ..."
                  className="w-full md:w-64 py-2 px-4 pr-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-right"
                />
                <FaSearch className="absolute right-3 text-orange-200" />
              </div>
            </motion.div>
          </motion.div>

          {/* Hero section with slider */}
          <motion.div
            className="relative mb-10 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm z-0 rounded-2xl"></div>

            <div className="relative z-10">
              <CategoriesSlides />
            </div>

            {/* Navigation arrows */}
            <motion.button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full text-white z-20"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-2 rounded-full text-white z-20"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Category tabs */}
          <motion.div
            className="mb-8 overflow-x-auto scrollbar-hide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex space-x-2 space-x-reverse justify-center">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex items-center px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-orange-600 text-white shadow-lg'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Admin controls */}
          {user?.isAdmin && (
            <motion.div
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.button
                className={`flex items-center mx-auto px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  showAdminPanel
                    ? 'bg-red-500 text-white'
                    : 'bg-gradient-to-r from-gray-500 to-orange-600 text-white'
                } shadow-lg`}
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus className="ml-2" />
                {showAdminPanel ? 'إغلاق لوحة الإدارة' : 'لوحة الإدارة'}
              </motion.button>

              <AnimatePresence>
                {showAdminPanel && (
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {adminActions.map((action, index) => (
                      <motion.button
                        key={action.id}
                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300"
                        onClick={action.action}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-2">{action.icon}</div>
                        <span className="text-sm">{action.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Main content section */}
          <motion.div
            className="relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="h-0.5 bg-gradient-to-l from-orange-500 to-transparent flex-grow ml-4"></div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <GiStarsStack className="ml-2 text-yellow-300" />
                المحتوى المميز
              </h2>
              <div className="h-0.5 bg-gradient-to-r from-orange-500 to-transparent flex-grow mr-4"></div>
            </div>

            {/* Featured content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <motion.div
                  key={item}
                  className="relative group rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-orange-900/40 to-gray-900/40 backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=300&width=400&text=محتوى ${item}`}
                      layout="fill"
                      objectFit="cover"
                      alt={`محتوى ${item}`}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900 to-transparent opacity-70"></div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        className="bg-white/30 backdrop-blur-sm p-4 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaPlayCircle className="text-white text-3xl" />
                      </motion.div>
                    </div>

                    {/* Content type badge */}
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-600 to-orange-600 text-white text-xs px-2 py-1 rounded-full">
                      {index % 3 === 0
                        ? 'مسلسل'
                        : index % 3 === 1
                        ? 'فيلم'
                        : 'أغنية'}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white text-lg font-bold mb-1 text-right">
                      عنوان المحتوى {item}
                    </h3>
                    <p className="text-orange-200 text-sm mb-3 text-right line-clamp-2">
                      وصف قصير للمحتوى يظهر هنا ويمكن أن يكون على سطرين كحد
                      أقصى.
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-orange-300">2023</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-xs ml-1">
                          4.5
                        </span>
                        <FaStar className="text-yellow-400 text-sm" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Series section */}
          <motion.div
            className="mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="h-0.5 bg-gradient-to-l from-blue-500 to-transparent flex-grow ml-4"></div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <FaFilm className="ml-2 text-blue-400" />
                أحدث المسلسلات
              </h2>
              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-transparent flex-grow mr-4"></div>
            </div>

            <div className="relative">
              <Serieses />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Forms */}
      <SeriesForm setIsVisible={setIsVisible} isVisible={isVisible} />
      <EpisodForm setShow={setShow} show={show} />
      <MovieForm setDisplay={setDisplay} display={display} />
      <SongForm setActive={setActive} active={active} />
      <SpacetoonSongForm
        setIsSpacetoonOpen={setIsSpacetoonOpen}
        isSpacetoonOpen={isSpacetoonOpen}
      />

      {/* Login button for unauthenticated users */}
      {session?.status === 'unauthenticated' && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            title={
              <div className="flex items-center">
                <FaSignInAlt className="ml-2" />
                تسجيل الدخول
              </div>
            }
            path={'/login'}
            style={
              'bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-600 hover:to-orange-700 text-white px-6 py-3 rounded-full shadow-lg'
            }
          />
        </motion.div>
      )}
    </>
  );
}

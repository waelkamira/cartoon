'use client';
import { useEffect, useState } from 'react';
import CategoriesSlides from '../components/CategoriesSlides';
import Button from '../components/Button';
import CurrentUser from '../components/CurrentUser';
import Serieses from '../components/serieses';
import SeriesForm from '../components/createSeries';
import EpisodForm from '../components/createEpisode';
import MovieForm from '../components/createMovie';
import SongForm from '../components/createSong';
import SpacetoonSongForm from '../components/createSpacetoonSong';
import LoginMessage from '../components/loginMessage';
import SubscriptionPage from '../components/paypal/subscriptionPage';
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
        className="relative flex flex-col justify-center items-center w-full z-40 min-h-screen bg-gradient-to-r from-one to-two overflow-hidden"
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
                <p className="text-one-200 text-sm">عالم من المغامرات والمرح</p>
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
                  className="w-full md:w-64 py-2 px-4 pr-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-one-200 focus:outline-none focus:ring-2 focus:ring-one-400 text-right"
                />
                <FaSearch className="absolute right-3 text-one-200" />
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
            <div className="absolute inset-0 backdrop-blur-sm z-0 rounded-2xl"></div>

            <div className="relative z-10">
              <CategoriesSlides />
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
                    ? 'bg-one-500 text-white'
                    : 'bg-gradient-to-r from-gray-500 to-one-600 text-white'
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

          {/* Series section */}
          <motion.div
            className="mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="h-0.5 bg-gradient-to-r from-blue-500 to-transparent flex-grow ml-4"></div>
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
              'bg-gradient-to-r from-pink-500 to-one-600 hover:from-pink-600 hover:to-one-700 text-white px-6 py-3 rounded-full shadow-lg'
            }
          />
        </motion.div>
      )}
    </>
  );
}

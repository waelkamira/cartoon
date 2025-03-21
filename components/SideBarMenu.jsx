// 'use client';
// import { signOut, useSession } from 'next-auth/react';
// import React from 'react';
// import CurrentUser from '../components/CurrentUser';
// import Image from 'next/image';
// import Button from './Button';
// import LoadingPhoto from './LoadingPhoto';
// import ItemForSideBarMenu from './itemForSideBarMenu';
// import { FaRegCreditCard } from 'react-icons/fa';

// export default function SideBarMenu({ setIsOpen }) {
//   const session = useSession();
//   const user = CurrentUser();
//   return (
//     <div
//       className="absolute w-full sm:w-fit h-screen z-50 right-0 top-0 border-l-[3px] border-white"
//       onClick={() => setIsOpen(false)}
//     >
//       <div
//         className=" w-64 bg-white z-50  h-screen overflow-y-auto "
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="sticky top-0 w-full z-50">
//           <div className="flex justify-center items-center w-full cursor-pointer bg-one">
//             <div className="relative size-36 my-2 mt-6 left-2">
//               <Image
//                 loading="lazy"
//                 src={'https://i.imgur.com/nfDVITC.png'}
//                 fill
//                 alt={'photo'}
//               />
//             </div>
//           </div>
//           <div className="bg-white px-4">
//             <Button title={'إغلاق'} onClick={() => setIsOpen(false)} />
//           </div>
//         </div>

//         <div className="relative p-4 " onClick={() => setIsOpen(false)}>
//           <ItemForSideBarMenu
//             planetName={'كوكب زمردة'}
//             planetImage={'https://i.imgur.com/wbjwdXO.png'}
//             planetRoute={'/zomurodaPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'كوكب مغامرات'}
//             planetImage={'https://i.imgur.com/sUeBEaz.png'}
//             planetRoute={'/adventuresPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'كوكب رياضة'}
//             planetImage={'https://i.imgur.com/CI7HaVo.png'}
//             planetRoute={'/sportPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'كوكب أكشن'}
//             planetImage={'https://i.imgur.com/bg5hr5i.png'}
//             planetRoute={'/actionPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'كوكب أفلام'}
//             planetImage={'https://i.imgur.com/QBreMYl.png'}
//             planetRoute={'/moviesPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'كوكب بون بونة'}
//             planetImage={'https://i.imgur.com/DnKrRt2.png'}
//             planetRoute={'/bonbonaPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'أغاني سبيس تون'}
//             planetImage={'https://i.imgur.com/BWPdDAF.png'}
//             planetRoute={'/spacetoonSongsPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'أغاني أطفال'}
//             planetImage={'https://i.imgur.com/rRBpVhp.png'}
//             planetRoute={'/songsPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'كرتون لغة انجليزية'}
//             planetImage={'https://i.imgur.com/bw6ZZCJ.png'}
//             planetRoute={'/englishCartoonPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'أغاني أطفال لغة انجليزية'}
//             planetImage={'https://i.imgur.com/3PEEhLC.png'}
//             planetRoute={'/englishSongsPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'كرتون لغة تركية'}
//             planetImage={'https://i.imgur.com/gfdEgLt.png'}
//             planetRoute={'/turkishCartoonPlanet'}
//           />
//           <ItemForSideBarMenu
//             planetName={'أغاني أطفال لغة تركية'}
//             planetImage={'https://i.imgur.com/GTuV1My.png'}
//             planetRoute={'/turkishSongsPlanet'}
//           />

//           {session?.status === 'unauthenticated' ? (
//             <Button title={'تسجيل الدخول'} path={'/login'} />
//           ) : (
//             <Button title={'بروفايل'} path={'/profile'} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CurrentUser from './CurrentUser';
import Image from 'next/image';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaSignInAlt, FaUser, FaTimes, FaRocket } from 'react-icons/fa';

// Create a component for the animated planet items
const PlanetItem = ({ planetName, planetImage, planetRoute, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center p-3 mb-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group"
    >
      <Link href={planetRoute} className="flex items-center w-full">
        <div className="relative size-12 mr-3 overflow-hidden rounded-full border-2 border-white/30 group-hover:border-white/70 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 group-hover:opacity-0 transition-opacity duration-300"></div>
          <Image
            loading="lazy"
            src={planetImage || '/placeholder.svg'}
            fill
            alt={planetName}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg group-hover:text-orange-300 transition-colors duration-300">
            {planetName}
          </h3>
          <div className="h-0.5 w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-white/50 group-hover:text-white transition-colors duration-300"
        >
          <FaRocket className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function SideBarMenu({ setIsOpen }) {
  const session = useSession();
  const user = CurrentUser();
  const [stars, setStars] = useState([]);

  // Generate random stars for the background
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 3 + 2}s`,
      });
    }
    setStars(newStars);
  }, []);

  // List of planets
  const planets = [
    {
      planetName: 'كوكب زمردة',
      planetImage: 'https://i.imgur.com/wbjwdXO.png',
      planetRoute: '/zomurodaPlanet',
    },
    {
      planetName: 'كوكب مغامرات',
      planetImage: 'https://i.imgur.com/sUeBEaz.png',
      planetRoute: '/adventuresPlanet',
    },
    {
      planetName: 'كوكب رياضة',
      planetImage: 'https://i.imgur.com/CI7HaVo.png',
      planetRoute: '/sportPlanet',
    },
    {
      planetName: 'كوكب أكشن',
      planetImage: 'https://i.imgur.com/bg5hr5i.png',
      planetRoute: '/actionPlanet',
    },
    {
      planetName: 'كوكب أفلام',
      planetImage: 'https://i.imgur.com/QBreMYl.png',
      planetRoute: '/moviesPlanet',
    },
    {
      planetName: 'كوكب بون بونة',
      planetImage: 'https://i.imgur.com/DnKrRt2.png',
      planetRoute: '/bonbonaPlanet',
    },
    {
      planetName: 'أغاني سبيس تون',
      planetImage: 'https://i.imgur.com/BWPdDAF.png',
      planetRoute: '/spacetoonSongsPlanet',
    },
    {
      planetName: 'أغاني أطفال',
      planetImage: 'https://i.imgur.com/rRBpVhp.png',
      planetRoute: '/songsPlanet',
    },
    {
      planetName: 'كرتون لغة انجليزية',
      planetImage: 'https://i.imgur.com/bw6ZZCJ.png',
      planetRoute: '/englishCartoonPlanet',
    },
    {
      planetName: 'أغاني أطفال لغة انجليزية',
      planetImage: 'https://i.imgur.com/3PEEhLC.png',
      planetRoute: '/englishSongsPlanet',
    },
    {
      planetName: 'كرتون لغة تركية',
      planetImage: 'https://i.imgur.com/gfdEgLt.png',
      planetRoute: '/turkishCartoonPlanet',
    },
    {
      planetName: 'أغاني أطفال لغة تركية',
      planetImage: 'https://i.imgur.com/GTuV1My.png',
      planetRoute: '/turkishSongsPlanet',
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="absolute w-full sm:w-80 h-screen right-0 top-0 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Space background with stars */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-orange-900 to-blue-900 overflow-hidden">
            {stars.map((star) => (
              <div
                key={star.id}
                className="star"
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

            {/* Animated planets in the background */}
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 opacity-20 blur-xl"></div>
            <div className="absolute top-40 -right-10 w-32 h-32 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20 blur-xl"></div>
            <div className="absolute bottom-60 left-20 w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-teal-500 opacity-20 blur-xl"></div>
          </div>

          {/* Content container */}
          <div className="relative h-full overflow-y-auto scrollbar-hide">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="sticky top-0 z-10 backdrop-blur-md bg-gradient-to-b from-gray-900/90 to-gray-900/70 border-b border-white/10 pb-2"
            >
              {/* Logo */}
              <div className="flex justify-center items-center w-full cursor-pointer pt-4 pb-2">
                <motion.div
                  className="relative size-32 my-2"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 opacity-30 blur-xl animate-pulse"></div>
                  <Image
                    loading="lazy"
                    src={'https://i.imgur.com/nfDVITC.png'}
                    fill
                    alt={'Spacetoon Logo'}
                    className="drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]"
                  />
                </motion.div>
              </div>

              {/* Close button */}
              <div className="px-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2.5 px-4 rounded-lg bg-white/10 text-white font-bold border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-orange-300" />
                  <span>إغلاق</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Planet list */}
            <div className="p-4 space-y-1">
              {planets.map((planet, index) => (
                <PlanetItem
                  key={index}
                  planetName={planet.planetName}
                  planetImage={planet.planetImage}
                  planetRoute={planet.planetRoute}
                  index={index}
                />
              ))}
            </div>

            {/* Footer with auth buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="sticky bottom-0 p-4 backdrop-blur-md bg-gradient-to-t from-gray-900/90 to-gray-900/70 border-t border-white/10"
            >
              {session?.status === 'unauthenticated' ? (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    title={'تسجيل الدخول'}
                    path={'/login'}
                    style={
                      'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 border-none flex items-center justify-center gap-2'
                    }
                    icon={<FaSignInAlt className="ml-2" />}
                  />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    title={'الملف الشخصي'}
                    path={'/profile'}
                    style={
                      'bg-gradient-to-r from-blue-500 to-gray-600 hover:from-blue-600 hover:to-gray-700 text-white font-bold py-3 border-none flex items-center justify-center gap-2'
                    }
                    icon={<FaUser className="ml-2" />}
                  />
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

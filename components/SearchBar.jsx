// 'use client';
// import React, { useState, useEffect, useContext } from 'react';
// import { Suspense } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { inputsContext } from './Context';
// import { FaUber } from 'react-icons/fa6';
// import { useSession } from 'next-auth/react';
// import CurrentUser from './CurrentUser';
// import LoadingPhoto from './LoadingPhoto';

// // Function to normalize Arabic text
// const normalizeArabic = (text) => {
//   if (!text) return '';
//   return text.replace(/[أ]/g, 'أ');
// };

// export default function SearchBar() {
//   const { dispatch } = useContext(inputsContext);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [isVisible, setIsVisible] = useState(false);
//   const [searchedWord, setSearchedWord] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchTriggered, setSearchTriggered] = useState(false);
//   const [seriesImages, setSeriesImages] = useState({}); // تخزين صور المسلسلات
//   const router = useRouter();
//   const session = useSession();
//   const user = CurrentUser();

//   // Function to perform search
//   const search = async () => {
//     setSearchTriggered(true);
//     const queryParams = new URLSearchParams({
//       page: pageNumber?.toString(),
//       limit: '5',
//     });

//     const normalizedSearchedWord = normalizeArabic(searchedWord);

//     if (normalizedSearchedWord) {
//       queryParams.append('searchTerm', normalizedSearchedWord);
//     }

//     const res = await fetch(`/api/search?${queryParams?.toString()}`);
//     const json = await res?.json();
//     if (res.ok) {
//       setIsVisible(true);
//       setSearchResults(json);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchedWord) search();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       search();
//     }
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setSearchedWord('');
//     setSearchTriggered(false);
//   };

//   // Function to fetch episode image
//   async function fetchEpisodeImage(seriesName) {
//     try {
//       const res = await fetch(`/api/serieses?seriesName=${seriesName}`);
//       const json = await res?.json();
//       if (res.ok && json.length > 0) {
//         return json[0]?.seriesImage;
//       }
//     } catch (error) {
//       console.error('Error fetching series image:', error);
//     }
//     return null; // Return null if there's an error or no image
//   }

//   // useEffect to load images for the search results
//   useEffect(() => {
//     async function loadImages() {
//       const images = {};
//       for (const result of searchResults) {
//         if (result?.episodeName && result?.seriesName) {
//           const image = await fetchEpisodeImage(result?.seriesName);
//           images[result?.seriesName] = image || result?.seriesImage;
//         }
//       }
//       setSeriesImages(images);
//     }

//     if (searchResults.length > 0) {
//       loadImages();
//     }
//   }, [searchResults]);

//   return (
//     <>
//       <div
//         className={
//           (searchTriggered
//             ? 'absolute z-50 top-0 p-4 h-screen overflow-scroll bg-one'
//             : '') +
//           ' flex flex-col items-center justify-center w-full rounded-lg'
//         }
//       >
//         <div className="flex flex-col justify-center items-center sm:flex-row gap-4 w-full">
//           <div className="relative w-full sm:px-4 xl:mr-36">
//             <input
//               value={searchedWord}
//               onChange={(e) => setSearchedWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               type="text"
//               id="search_meal"
//               name="search_meal"
//               placeholder="ابحث عن مسلسل أو فيلم  ..."
//               className="relative pr-14 sm:pr-24 py-1 border-white w-full focus:outline-none rounded-full text-sm sm:text-xl text-black placeholder:text-[10px] sm:placeholder:text-lg sm:placeholder:px-8 text-right"
//             />
//             <div className="absolute flex items-center top-0 md:top-0 md:right-4 md:w-24 w-[80px] right-0 h-full rounded-r-full">
//               <h1
//                 className="absolute flex justify-center cursor-pointer select-none items-center top-0 right-0 bg-one h-full text-white rounded-r-full border-white w-fit px-2 sm:text-2xl sm:px-4"
//                 onClick={handleSearch}
//               >
//                 بحث
//               </h1>
//             </div>
//           </div>
//         </div>
//         {isVisible && (
//           <div className="sticky top-0 flex flex-row-reverse justify-between items-center mt-1 w-full z-50 bg-four p-4">
//             <button
//               onClick={handleClose}
//               className="btn p-1 sm:px-4 text-white bg-five w-24 rounded-full text-sm sm:text-lg hover:bg-one shadow-lg hover:scale-55"
//             >
//               إغلاق
//             </button>
//             <h1 className="text-sm sm:text-2xl text-nowrap mx-2 font-bold text-white">
//               نتائج البحث:
//             </h1>
//           </div>
//         )}
//         {isVisible && (
//           <div className="relative w-full flex flex-col items-center justify-start p-2 overflow-y-auto h-screen rounded-lg content-center ">
//             {searchResults &&
//               searchResults.map((result) => {
//                 const imageSrc =
//                   seriesImages[result?.seriesName] ||
//                   result?.seriesImage ||
//                   result?.movieImage ||
//                   result?.songImage ||
//                   result?.spacetoonSongImage;

//                 return (
//                   <>
//                     {session?.status === 'authenticated' &&
//                       user?.isAdmin === '1' && (
//                         <button
//                           className="bg-green-400 rounded-full px-2 my-2 hover:scale-105 w-fit text-center mx-2"
//                           onClick={() =>
//                             router.push(
//                               `/editMovie?movieName=${result?.movieName}`
//                             )
//                           }
//                         >
//                           تعديل{' '}
//                         </button>
//                       )}
//                     <div
//                       onClick={async () => {
//                         if (result?.episodeName) {
//                           await router.push(
//                             `/episodes?episodeName=${result?.episodeName}`
//                           );
//                           setTimeout(() => {
//                             window?.location?.reload();
//                           }, 3000);
//                         } else if (result?.seriesName) {
//                           router.push(
//                             `/seriesAndEpisodes?seriesName=${result?.seriesName}`
//                           );
//                           setTimeout(() => {
//                             window?.location?.reload();
//                           }, 3000);
//                         } else if (result?.movieName) {
//                           await router.push(
//                             `/movie?movieName=${result?.movieName}`
//                           );
//                           setTimeout(() => {
//                             window?.location?.reload();
//                           }, 3000);
//                         } else if (result?.songName) {
//                           dispatch({
//                             type: 'SONG_NAME',
//                             payload: result?.songName,
//                           });
//                           await router.push(
//                             `/song?songName=${result?.songName}`
//                           );
//                           setTimeout(() => {
//                             window?.location?.reload();
//                           }, 3000);
//                         } else if (result?.spacetoonSongName) {
//                           dispatch({
//                             type: 'SPACETOON_SONG_NAME',
//                             payload: result?.spacetoonSongName,
//                           });
//                           await router.push(
//                             `/spacetoonSong?spacetoonSongName=${result?.spacetoonSongName}`
//                           );
//                           setTimeout(() => {
//                             window?.location?.reload();
//                           }, 3000);
//                         }
//                       }}
//                       className="my-2 cursor-pointer"
//                     >
//                       <div className="relative w-52 h-32 sm:w-96 sm:h-96">
//                         {imageSrc ? (
//                           <Image
//                             loading="lazy"
//                             src={imageSrc}
//                             layout={'fill'}
//                             objectFit={'cover'}
//                             objectPosition="top"
//                             alt="photo"
//                           />
//                         ) : (
//                           <LoadingPhoto />
//                         )}
//                       </div>
//                       <h1 className="text-white text-center m-2 text-[10px] w-full line-clamp-2 font-bold">
//                         {result?.episodeName ||
//                           result?.movieName ||
//                           result?.seriesName ||
//                           result?.songName ||
//                           result?.spacetoonSongName}
//                       </h1>
//                     </div>
//                   </>
//                 );
//               })}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
'use client';
import { useState, useEffect, useContext, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { inputsContext } from './Context';
import { FaSearch, FaTimes, FaStar, FaEdit, FaPlay } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import CurrentUser from './CurrentUser';
import LoadingPhoto from './LoadingPhoto';
import { motion, AnimatePresence } from 'framer-motion';

// Function to normalize Arabic text
const normalizeArabic = (text) => {
  if (!text) return '';
  return text.replace(/[أ]/g, 'أ');
};

export default function SearchBar() {
  const { dispatch } = useContext(inputsContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [searchedWord, setSearchedWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [seriesImages, setSeriesImages] = useState({}); // تخزين صور المسلسلات
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const session = useSession();
  const user = CurrentUser();

  // Function to perform search
  const search = async () => {
    if (!searchedWord.trim()) return;

    setIsLoading(true);
    setSearchTriggered(true);
    const queryParams = new URLSearchParams({
      page: pageNumber?.toString(),
      limit: '5',
    });

    const normalizedSearchedWord = normalizeArabic(searchedWord);

    if (normalizedSearchedWord) {
      queryParams.append('searchTerm', normalizedSearchedWord);
    }

    try {
      const res = await fetch(`/api/search?${queryParams?.toString()}`);
      const json = await res?.json();
      if (res.ok) {
        setIsVisible(true);
        setSearchResults(json);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchedWord) search();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setSearchedWord('');
    setSearchTriggered(false);
    setSelectedResult(null);
  };

  // Function to fetch episode image
  async function fetchEpisodeImage(seriesName) {
    try {
      const res = await fetch(`/api/serieses?seriesName=${seriesName}`);
      const json = await res?.json();
      if (res.ok && json.length > 0) {
        return json[0]?.seriesImage;
      }
    } catch (error) {
      console.error('Error fetching series image:', error);
    }
    return null; // Return null if there's an error or no image
  }

  // useEffect to load images for the search results
  useEffect(() => {
    async function loadImages() {
      const images = {};
      for (const result of searchResults) {
        if (result?.episodeName && result?.seriesName) {
          const image = await fetchEpisodeImage(result?.seriesName);
          images[result?.seriesName] = image || result?.seriesImage;
        }
      }
      setSeriesImages(images);
    }

    if (searchResults.length > 0) {
      loadImages();
    }
  }, [searchResults]);

  // Focus input when search is triggered
  useEffect(() => {
    if (searchTriggered && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTriggered]);

  // Generate random stars for the background
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1;
      stars.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${size}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 3 + 2}s`,
      });
    }
    return stars;
  };

  const stars = generateStars();

  // Handle navigation to content
  const navigateToContent = async (result) => {
    setSelectedResult(result);

    setTimeout(async () => {
      if (result?.episodeName) {
        await router.push(`/episodes?episodeName=${result?.episodeName}`);
      } else if (result?.seriesName) {
        router.push(`/seriesAndEpisodes?seriesName=${result?.seriesName}`);
      } else if (result?.movieName) {
        await router.push(`/movie?movieName=${result?.movieName}`);
      } else if (result?.songName) {
        dispatch({
          type: 'SONG_NAME',
          payload: result?.songName,
        });
        await router.push(`/song?songName=${result?.songName}`);
      } else if (result?.spacetoonSongName) {
        dispatch({
          type: 'SPACETOON_SONG_NAME',
          payload: result?.spacetoonSongName,
        });
        await router.push(
          `/spacetoonSong?spacetoonSongName=${result?.spacetoonSongName}`
        );
      }

      setTimeout(() => {
        window?.location?.reload();
      }, 3000);
    }, 500);
  };

  // Get content type label
  const getContentTypeLabel = (result) => {
    if (result?.episodeName) return 'حلقة';
    if (result?.seriesName && !result?.episodeName) return 'مسلسل';
    if (result?.movieName) return 'فيلم';
    if (result?.songName) return 'أغنية';
    if (result?.spacetoonSongName) return 'أغنية سبيس تون';
    return '';
  };

  return (
    <>
      <div
        className={`${
          searchTriggered
            ? 'fixed z-50 inset-0 overflow-y-auto bg-gradient-to-r from-gray-900/95 via-one-900/95 to-pink-900/95 backdrop-blur-sm'
            : ''
        } flex flex-col items-center justify-start w-full rounded-lg transition-all duration-300`}
      >
        {/* Animated stars background when search is triggered */}
        {searchTriggered && (
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
                  opacity: 0.7,
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                }}
              />
            ))}
          </div>
        )}

        {/* Search input area */}
        {/* <motion.div
          className={`flex flex-col justify-center items-center sm:flex-row gap-4 w-full max-w-3xl ${
            searchTriggered ? 'pt-6' : ''
          }`}
          initial={searchTriggered ? { y: -20, opacity: 0 } : false}
          animate={searchTriggered ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full sm:px-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                ref={searchInputRef}
                value={searchedWord}
                onChange={(e) => setSearchedWord(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                id="search_meal"
                name="search_meal"
                placeholder="ابحث عن مسلسل أو فيلم أو أغنية ..."
                className="relative pr-14 sm:pr-24 py-3 border-2 border-one-400 w-full focus:outline-none focus:ring-2 focus:ring-one-500 focus:border-transparent rounded-full text-sm sm:text-xl text-black placeholder:text-[10px] sm:placeholder:text-lg sm:placeholder:px-8 text-right shadow-lg shadow-one-500/20"
              />

              {searchedWord && (
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchedWord('')}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              )}

              <motion.div
                className="absolute flex items-center top-0 md:top-0 md:right-4 md:w-24 w-[80px] right-0 h-full rounded-r-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  className="absolute flex justify-center cursor-pointer select-none items-center top-0 right-0 bg-gradient-to-r from-one-600 to-pink-600 h-full text-white rounded-r-full w-full px-2 sm:text-xl sm:px-4 font-bold"
                  onClick={handleSearch}
                >
                  <FaSearch className="ml-2" />
                  بحث
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div> */}
        <motion.div
          className={`flex flex-col justify-center items-center sm:flex-row gap-4 w-full max-w-3xl ${
            searchTriggered ? 'pt-6' : ''
          }`}
          initial={searchTriggered ? { y: -20, opacity: 0 } : false}
          animate={searchTriggered ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-full sm:px-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative flex items-center">
              <input
                ref={searchInputRef}
                value={searchedWord}
                onChange={(e) => setSearchedWord(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                id="search_meal"
                name="search_meal"
                placeholder="ابحث عن مسلسل أو فيلم أو أغنية ..."
                className="w-full py-2 px-4 pr-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-one-200 focus:outline-none focus:ring-2 focus:ring-one-400 text-right"
              />
              {searchedWord && (
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchedWord('')}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              )}
              <FaSearch
                className="absolute right-3 text-one-200"
                onClick={handleSearch}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </motion.div>
        </motion.div>
        {/* Search results header */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="sticky top-0 flex flex-row-reverse justify-between items-center mt-4 w-full max-w-3xl z-50 p-4 rounded-lg backdrop-blur-md shadow-lg"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={handleClose}
                className="btn px-4 py-2 text-white bg-gradient-to-r from-pink-600 to-one-600 rounded-full text-sm sm:text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes className="inline-block ml-2" />
                إغلاق
              </motion.button>
              <h1 className="text-sm sm:text-2xl text-nowrap mx-2 font-bold text-white">
                نتائج البحث:
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex justify-center items-center my-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-t-one-500 border-r-transparent border-b-pink-500 border-l-transparent animate-spin"></div>
                <div className="absolute inset-3 rounded-full border-4 border-t-transparent border-r-pink-500 border-b-transparent border-l-one-500 animate-spin animation-delay-150"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search results */}
        <AnimatePresence>
          {isVisible && !isLoading && (
            <motion.div
              className="relative w-full max-w-3xl flex flex-col items-center justify-start p-4 overflow-y-auto max-h-[70vh] rounded-lg content-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {searchResults && searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                  {searchResults.map((result, index) => {
                    const imageSrc =
                      seriesImages[result?.seriesName] ||
                      result?.seriesImage ||
                      result?.movieImage ||
                      result?.songImage ||
                      result?.spacetoonSongImage;

                    const contentType = getContentTypeLabel(result);
                    const title =
                      result?.episodeName ||
                      result?.movieName ||
                      result?.seriesName ||
                      result?.songName ||
                      result?.spacetoonSongName;

                    return (
                      <motion.div
                        key={index}
                        className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-one-900/40 to-gray-900/40 backdrop-blur-sm shadow-xl border border-one-500/30 ${
                          selectedResult === result ? 'scale-95 opacity-50' : ''
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow:
                            '0 20px 25px -5px rgba(147, 51, 234, 0.3), 0 8px 10px -6px rgba(147, 51, 234, 0.3)',
                        }}
                      >
                        {/* Admin edit button */}
                        {session?.status === 'authenticated' &&
                          user?.isAdmin === '1' &&
                          result?.movieName && (
                            <motion.button
                              className="absolute top-2 right-2 z-10 bg-green-500 text-white rounded-full p-2 shadow-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/editMovie?movieName=${result?.movieName}`
                                );
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaEdit />
                            </motion.button>
                          )}

                        {/* Content type badge */}
                        {contentType && (
                          <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-pink-600 to-one-600 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                            {contentType}
                          </div>
                        )}

                        <div
                          className="flex flex-col cursor-pointer"
                          onClick={() => navigateToContent(result)}
                        >
                          {/* Image container with overlay */}
                          <div className="relative w-full h-48 overflow-hidden">
                            {imageSrc ? (
                              <>
                                <Image
                                  loading="lazy"
                                  src={imageSrc || '/placeholder.svg'}
                                  layout={'fill'}
                                  objectFit={'cover'}
                                  objectPosition="top"
                                  alt={title}
                                  className="transition-transform duration-500 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-one-900/80 to-transparent opacity-70"></div>

                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                  <motion.div
                                    className="bg-white/30 backdrop-blur-sm p-4 rounded-full"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <FaPlay className="text-white text-2xl" />
                                  </motion.div>
                                </div>
                              </>
                            ) : (
                              <LoadingPhoto />
                            )}
                          </div>

                          {/* Content details */}
                          <div className="p-4">
                            <h2 className="text-white text-lg font-bold line-clamp-2 text-right mb-2">
                              {title}
                            </h2>

                            <div className="flex items-center justify-end mt-2">
                              <div className="flex items-center">
                                <span className="text-yellow-400 text-xs ml-1">
                                  {Math.floor(Math.random() * 5) + 1}/5
                                </span>
                                <FaStar className="text-yellow-400 text-sm" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    لا توجد نتائج
                  </h3>
                  <p className="text-one-200 text-sm">
                    حاول البحث بكلمات مختلفة أو تحقق من الإملاء
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

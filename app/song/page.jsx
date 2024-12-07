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

//   console.log('song', song);
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

//       <div className="bg-one">
//         <div className="z-50">
//           <div className="relative w-full sm:p-4 lg:p-8 rounded-lg bg-one ">
//             <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
//               <TfiMenuAlt
//                 className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50  bg-two"
//                 onClick={() => {
//                   setIsOpen(!isOpen);
//                 }}
//               />
//               {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
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

//           <Songs vertical={true} title={false} image={false} />
//           <div className="p-2">
//             <ContactUs />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Papa from 'papaparse';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import Image from 'next/image';
import SideBarMenu from '../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import LoadingPhoto from '../../components/LoadingPhoto';
import Songs from '../../components/kidsSongs';
import { ContactUs } from '../../components/sendEmail/sendEmail';
import VideoPlayer from '../../components/VideoPlayer';
import SubscriptionPage from '../../components/paypal/subscriptionPage';
import { useSession } from 'next-auth/react';
import CurrentUser from '../../components/CurrentUser';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [song, setSong] = useState([]);
  const session = useSession();
  const [songId, setSongId] = useState('');
  const videoRef = useRef(null);
  const user = CurrentUser();

  // رابط ملف CSV المستضاف على GitHub
  const csvUrl =
    'https://raw.githubusercontent.com/waelkamira/csv/refs/heads/main/songs.csv';

  const CACHE_DURATION = 30 * 60 * 1000; // تم زيادة مدة الكاش إلى 30 دقيقة
  const cache = {
    data: null,
    lastUpdated: null,
  };

  // التحقق من صلاحية الكاش
  function isCacheValid() {
    return cache.data && Date.now() - cache.lastUpdated < CACHE_DURATION;
  }

  // قراءة ملف CSV من الرابط وتحويله إلى JSON باستخدام PapaParse
  async function readCSVFile(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch CSV data');
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      });
    });
  }

  // جلب البيانات بعد تحديد songId
  async function fetchSong() {
    try {
      let songs;

      if (isCacheValid()) {
        songs = cache.data;
      } else {
        songs = await readCSVFile(csvUrl);
        cache.data = songs;
        cache.lastUpdated = Date.now();
      }

      // تصفية الأغاني بناءً على songId
      if (songId) {
        songs = songs.filter((song) => song.id === songId);
      }

      // تصنيف الأغاني حسب تاريخ الإنشاء
      songs = songs.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setSong(songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  }

  useEffect(() => {
    if (songId) {
      fetchSong();
    }
  }, [songId]);

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
    if (videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [songId]);

  return (
    <>
      {session?.status === 'authenticated' &&
        user?.monthly_subscribed === false &&
        user?.yearly_subscribed === false && <SubscriptionPage />}

      <div className="bg-one">
        <div className="z-50">
          <div className="relative w-full sm:p-4 lg:p-8 rounded-lg bg-one ">
            <div className="absolute flex flex-col items-start gap-2 z-30 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
              <TfiMenuAlt
                className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50  bg-two"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
              {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
            </div>

            <div className="relative w-full h-44 sm:h-[500px] overflow-hidden shadow-lg shadow-one">
              {song.length > 0 && song[0]?.songImage ? (
                <Image
                  loading="lazy"
                  src={song[0]?.songImage}
                  layout="fill"
                  objectFit="cover"
                  alt="photo"
                />
              ) : (
                <LoadingPhoto />
              )}
            </div>

            <div className="flex flex-col justify-start items-center w-full gap-4 my-2 px-2">
              <h1 className="grow text-sm lg:text-2xl w-full text-white">
                <span className="text-gray-500 ml-2">#</span>
                اسم الأغنية: <span className="">{song[0]?.songName}</span>
              </h1>
            </div>

            <div ref={videoRef} className="my-2 p-2">
              {song.length === 0 && (
                <Loading myMessage={'😉لا يوجد نتائج لعرضها'} />
              )}
              <div className="flex gap-8 justify-start items-center w-full h-full">
                {song.length > 0 &&
                  song.map((item) => (
                    <div
                      className="min-h-72 flex flex-col items-start justify-start rounded-lg overflow-hidden w-full h-full"
                      key={item.songLink}
                    >
                      <VideoPlayer
                        videoUrl={item.songLink}
                        image={item?.songImage}
                        episodeName={item?.songId}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <Songs vertical={true} title={false} image={false} />
          <div className="p-2">
            <ContactUs />
          </div>
        </div>
      </div>
    </>
  );
}

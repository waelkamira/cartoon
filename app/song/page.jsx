'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import Image from 'next/image';
import SideBarMenu from '../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import LoadingPhoto from '../../components/LoadingPhoto';
import { inputsContext } from '../../components/Context';
import Songs from '../../components/kidsSongs';
import HappyTagAd from '../../components/ads/happyTagAd';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [song, setSong] = useState([]);
  // const { songName } = useContext(inputsContext);
  const [songName, setSongName] = useState('');

  // استخدام useEffect للتأكد من أن الكود يتم تشغيله فقط على العميل
  useEffect(() => {
    const handleUrlChange = () => {
      // تأكد من أن الكود يعمل على العميل فقط
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const songNameFromUrl = urlParams.get('songName');
        // console.log('songNameFromUrl', songNameFromUrl);
        if (songNameFromUrl && songNameFromUrl !== songName) {
          setSongName(songNameFromUrl);
        }
      }
    };

    handleUrlChange();
  }, [songName]); // إعادة التشغيل عند تغيير songName

  useEffect(() => {
    if (songName) {
      fetchSong();
    }
  }, [songName, songName]);

  async function fetchSong() {
    const response = await fetch(`/api/songs?songName=${songName}`);
    const json = await response?.json();
    if (response.ok) {
      setSong(json);
    }
  }

  return (
    <div className="bg-one">
      <HappyTagAd />
      <div className="relative w-full sm:p-4 lg:p-8 rounded-lg bg-one ">
        <div className="absolute flex flex-col items-start gap-2 z-40 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
          <TfiMenuAlt
            className="p-1 rounded-lg text-3xl lg:text-5xl text-white cursor-pointer z-50  bg-two"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
          {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
        </div>

        <div className="relative w-full h-44 sm:h-[500px] overflow-hidden shadow-lg shadow-one">
          {song[0]?.songImage ? (
            <Image
              priority
              src={song[0]?.songImage}
              layout="fill"
              objectFit="cover"
              alt="photo"
            />
          ) : (
            <LoadingPhoto />
          )}
        </div>

        <div className="flex flex-col justify-start items-center w-full gap-4 my-8 px-2">
          <BackButton />
          <h1 className="grow text-sm lg:text-2xl w-full text-white">
            <span className="text-white font-bold text-lg ml-2">#</span>
            اسم الأغنية:{' '}
            <span className="text-white text-sm ">{song[0]?.songName}</span>
          </h1>
        </div>

        <div className="my-8 p-2">
          {song?.length === 0 && (
            <Loading myMessage={'😉لا يوجد نتائج لعرضها'} />
          )}
          <div className="flex gap-8 justify-center items-center w-full">
            {song?.length > 0 &&
              song?.map((item) => {
                return (
                  <div
                    className=" flex flex-col items-center justify-center rounded-lg overflow-hidden w-full"
                    key={item.songLink}
                  >
                    <video
                      key={item.songLink}
                      width="100%"
                      height="500px"
                      controls
                      poster={item?.songImage}
                      oncontextmenu="return false"
                      autoPlay
                      loop
                      onSeeked={() => {
                        const video = document.querySelector('video');
                        if (video.currentTime === 0) {
                          window.location.reload(); // إعادة تحميل الصفحة عند بداية التشغيل بعد الدورة الأولى
                        }
                      }}
                    >
                      <source src={item?.songLink} type="video/mp4" />
                    </video>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Songs vertical={true} title={false} image={false} />
    </div>
  );
}

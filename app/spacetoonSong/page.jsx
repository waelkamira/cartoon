'use client';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Loading from '../../components/Loading';
import BackButton from '../../components/BackButton';
import Image from 'next/image';
import SideBarMenu from '../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import LoadingPhoto from '../../components/LoadingPhoto';
import { inputsContext } from '../../components/Context';
import SpacetoonSongs from '../../components/spacetoonSongs';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [spacetoonSong, setSpacetoonSong] = useState([]);
  const { newSpacetoonSong, spacetoonSongName } = useContext(inputsContext);

  console.log('spacetoonSongName', spacetoonSongName);

  useEffect(() => {
    if (spacetoonSongName) {
      fetchSpacetoonSong();
    }
  }, [spacetoonSongName, pageNumber, newSpacetoonSong]);

  async function fetchSpacetoonSong() {
    const response = await fetch(
      `/api/spacetoonSongs?spacetoonSongName=${spacetoonSongName}`
    );
    const json = await response?.json();
    if (response.ok) {
      console.log('json', json);

      setSpacetoonSong(json);
    }
  }

  return (
    <div className="bg-one">
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
          {spacetoonSong[0]?.spacetoonSongImage ? (
            <Image
              priority
              src={spacetoonSong[0]?.spacetoonSongImage}
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
            <span className="text-white text-sm ">
              {' '}
              {spacetoonSong[0]?.spacetoonSongName}
            </span>
          </h1>
        </div>

        <div className="my-8 p-2">
          {spacetoonSong?.length === 0 && (
            <Loading myMessage={'😉لا يوجد نتائج لعرضها'} />
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-8 justify-center items-center w-full">
            {spacetoonSong?.length > 0 &&
              spacetoonSong?.map((item) => {
                return (
                  <div
                    className=" flex flex-col items-center justify-center rounded-lg overflow-hidden"
                    key={item.spacetoonSongLink} // استخدم `songLink` كمفتاح لتحديث الفيديو
                  >
                    <video
                      key={item.spacetoonSongLink} // استخدم `songLink` كمفتاح لتحديث الفيديو
                      width="100%"
                      height="500px"
                      controls
                      poster={item?.spacetoonSongImage}
                      oncontextmenu="return false"
                      autoPlay
                      loop
                    >
                      <source src={item?.spacetoonSongLink} type="video/mp4" />
                    </video>
                  </div>
                );
              })}
          </div>
        </div>
      </div>{' '}
      <SpacetoonSongs vertical={true} title={false} image={false} />
    </div>
  );
}

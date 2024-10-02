'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useSession } from 'next-auth/react';
import SideBarMenu from './SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import CategoriesSlides from './CategoriesSlides';
import Button from './Button';
import CurrentUser from './CurrentUser';
import Serieses from './serieses';
import SeriesForm from './createSeries';
import EpisodForm from './createEpisode';
import MovieForm from './createMovie';
import SongForm from './createSong';
import SpacetoonSongForm from './createSpacetoonSong';
export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpacetoonOpen, setIsSpacetoonOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [active, setActive] = useState(false);
  const session = useSession();
  const user = CurrentUser();
  useEffect(() => {
    sessionStorage.clear(); // تفريغ جميع العناصر في sessionStorage
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-center items-center xl:w-4/5 z-40 sm:my-0 w-full bg-one">
        <div className=" w-full ">
          <div className="fixed top-0 right-0 z-50 flex items-center justify-center mb-2 gap-2 w-full text-white bg-one p-2">
            <TfiMenuAlt
              className="sm:hidden p-2 rounded-lg text-5xl text-white hover:scale-101 "
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
            <div className="relative w-20 h-12 sm:h-16 sm:w-20 md:h-20 md:w-24 lg:h-24 lg:w-28 shadow-lg shadow-one">
              <Image
                priority
                src={'https://i.imgur.com/uuWOSAu.png'}
                layout="fill"
                objectFit="cover"
                alt="photo"
              />
            </div>
            <SearchBar />
            {/* <ShareButton /> */}
          </div>
          <CategoriesSlides />
          {/* <iframe src="" frameborder="0"></iframe> */}
          {/* <video
            className="w-full h-full"
            controls
            controlsList="nodownload"
            oncontextmenu="return false"
            referrerPolicy="no-referrer"
            allow="fullscreen"
          >
            <source
              src={
                'https://tfs78.asd-dl.store/d/k4ql7svrfsrnuwfu4f6i3ypduzkygwopo3qpf2xladbdux6j5hzlbweeyopia4skf3jqb7yy/video.mp4'
              }
              type="video/mp4"
            />
          </video> */}
          <div className={'p-4'}>
            {user?.isAdmin && (
              <>
                <Button title={'انشاء حلقة'} onClick={() => setShow(!show)} />
                <Button
                  title={'انشاء مسلسل'}
                  onClick={() => setIsVisible(!isVisible)}
                />
                <Button
                  title={'انشاء أغنية سبيس تون'}
                  onClick={() => setIsSpacetoonOpen(!isSpacetoonOpen)}
                />
                <Button
                  title={'انشاء فيلم'}
                  onClick={() => setDisplay(!display)}
                />
                <Button
                  title={'انشاء أغنية'}
                  onClick={() => setActive(!active)}
                />
              </>
            )}

            <SeriesForm setIsVisible={setIsVisible} isVisible={isVisible} />
            <EpisodForm setShow={setShow} show={show} />
            <MovieForm setDisplay={setDisplay} display={display} />
            <SongForm setActive={setActive} active={active} />
            <SpacetoonSongForm
              setIsSpacetoonOpen={setIsSpacetoonOpen}
              isSpacetoonOpen={isSpacetoonOpen}
            />
            {/* انتبه يتم تفعيل هذا الخيار فقط عندما نريد اضافة مسلسل او فيلم او حلقة .. الخ وليس متاح للمستخدمين */}
            {session?.status === 'unauthenticated' && (
              <Button title={'تسجيل الدخول'} path={'/login'} style={' '} />
            )}
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center w-full rounded-lg sm:p-8 gap-2 ">
          <Serieses />
        </div>
      </div>
    </>
  );
}

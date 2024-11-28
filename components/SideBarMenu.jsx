'use client';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import CurrentUser from '../components/CurrentUser';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import LoadingPhoto from './LoadingPhoto';
import ItemForSideBarMenu from './itemForSideBarMenu';

export default function SideBarMenu({ setIsOpen }) {
  const session = useSession();
  const user = CurrentUser();
  return (
    <div
      className="absolute w-full sm:w-fit h-screen z-50 right-0 top-0"
      onClick={() => setIsOpen(false)}
    >
      <div
        className=" w-64 bg-white z-50  h-screen overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 w-full z-50">
          <div className="flex justify-end items-center w-full cursor-pointer bg-one">
            <div className="relative size-28 my-2 mt-6 left-2">
              <Image
                priority
                src={'https://i.imgur.com/nfDVITC.png'}
                fill
                alt={'photo'}
              />
            </div>
            <div className="absolute flex-col justify-end items-end z-50 p-2 top-4 w-full">
              <div className="relative my-2">
                {user?.image ? (
                  <Image
                    priority
                    src={user?.image}
                    width={100}
                    height={100}
                    alt={'photo'}
                    className=" z-50 size-12 rounded-full bg-sky-500"
                  />
                ) : (
                  <LoadingPhoto />
                )}
              </div>
              <h1 className="text-nowrap text-sm w-20 text-end truncate">
                {user?.name}
              </h1>

              <h1 className="text-nowrap text-sm w-20 text-start">
                {user?.monthly_subscribed === false &&
                user?.yearly_subscribed === false
                  ? 'غير مشترك'
                  : ''}
              </h1>
              <h1 className="text-nowrap text-sm w-20 text-start">
                {user?.monthly_subscribed === true ? 'مشترك شهري' : ''}
              </h1>
              <h1 className="text-nowrap text-sm w-20 text-start">
                {user?.yearly_subscribed === true ? 'مشترك سنوي' : ''}
              </h1>
            </div>
          </div>
          <div className="bg-white px-4">
            <Button title={'إغلاق'} onClick={() => setIsOpen(false)} />
          </div>
        </div>

        <div className="relative p-4 ">
          {/* <Button title={'بروفايل'} path={'/profile'} /> */}

          <ItemForSideBarMenu
            planetName={'أغاني سبيس تون'}
            planetImage={'https://i.imgur.com/BWPdDAF.png'}
            planetRoute={'/spacetoonSongsPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'أغاني أطفال'}
            planetImage={'https://i.imgur.com/rRBpVhp.png'}
            planetRoute={'/songsPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كوكب زمردة'}
            planetImage={'https://i.imgur.com/wbjwdXO.png'}
            planetRoute={'/zomurodaPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كوكب مغامرات'}
            planetImage={'https://i.imgur.com/sUeBEaz.png'}
            planetRoute={'/adventuresPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كوكب رياضة'}
            planetImage={'https://i.imgur.com/CI7HaVo.png'}
            planetRoute={'/sportPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كوكب أكشن'}
            planetImage={'https://i.imgur.com/bg5hr5i.png'}
            planetRoute={'/actionPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كوكب أفلام'}
            planetImage={'https://i.imgur.com/QBreMYl.png'}
            planetRoute={'/moviesPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كوكب بون بونة'}
            planetImage={'https://i.imgur.com/DnKrRt2.png'}
            planetRoute={'/bonbonaPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كرتون لغة انجليزية'}
            planetImage={'https://i.imgur.com/bw6ZZCJ.png'}
            planetRoute={'/englishCartoonPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'أغاني أطفال لغة انجليزية'}
            planetImage={'https://i.imgur.com/3PEEhLC.png'}
            planetRoute={'/englishSongsPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'كرتون لغة تركية'}
            planetImage={'https://i.imgur.com/gfdEgLt.png'}
            planetRoute={'/turkishCartoonPlanet'}
          />
          <ItemForSideBarMenu
            planetName={'أغاني أطفال لغة تركية'}
            planetImage={'https://i.imgur.com/GTuV1My.png'}
            planetRoute={'/turkishSongsPlanet'}
          />

          {session?.status === 'authenticated' && (
            <>
              {/* <Button path={'/users'} title={'المستخدمين'} /> */}
              <Button
                title={'تسجيل الخروج'}
                path={'/'}
                onClick={() => signOut()}
              />
            </>
          )}
          {session?.status === 'unauthenticated' && (
            <div>
              <Button title={'تسجيل الدخول'} path={'/login'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

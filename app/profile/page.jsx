'use client';
import CurrentUser from '../../components/CurrentUser';
import ImageUpload from '../../components/ImageUpload';
import Button from '../../components/Button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { inputsContext } from '../../components/Context';
import toast from 'react-hot-toast';
import Link from 'next/link';
import CustomToast from '../../components/CustomToast';
import BackButton from '../../components/BackButton';
import SideBarMenu from '../../components/SideBarMenu';
import { TfiMenuAlt } from 'react-icons/tfi';
import { MdEdit } from 'react-icons/md';
import { FaRegCreditCard } from 'react-icons/fa6';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { GrContactInfo } from 'react-icons/gr';
import LoadingPhoto from '../../components/LoadingPhoto';

export default function Profile() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const user = CurrentUser();
  const { profile_image, dispatch } = useContext(inputsContext);
  const [newUserName, setNewUserName] = useState('');
  console.log('user?.image', user?.image);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newName = JSON.parse(localStorage.getItem('CurrentUser'));
      setNewUserName(newName?.name);
    }
    // setNewImage(profile_image?.image);
    editProfileImageAndUserName();
  }, [profile_image?.image]);

  async function editProfileImageAndUserName() {
    if (profile_image?.image || newUserName) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('image', JSON.stringify(profile_image?.image));
      }
      // console.log('newUserName', newUserName);
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.data?.user?.email,
          image: profile_image?.image,
          name: newUserName,
        }),
      });
      if (response.ok) {
        toast.custom((t) => (
          <CustomToast t={t} message={'تم التعديل بنجاح '} greenEmoji={'✔'} />
        ));
        dispatch({ type: 'PROFILE_IMAGE', payload: profile_image?.image });
        if (typeof window !== 'undefined') {
          const newName = JSON.parse(localStorage.getItem('CurrentUser'));
          setNewUserName(newName?.name);
        }
      } else {
        toast.custom((t) => (
          <CustomToast t={t} message={'حدث حطأ ما حاول مرة أخرى 😐'} />
        ));
      }
    }
  }

  return (
    <div className="flex flex-col bg-white  h-screen justify-start items-start text-md">
      {session?.status === 'unauthenticated' && (
        <div className="p-4 bg-four rounded-lg m-2 md:m-8 border border-one text-center h-screen">
          <h1 className=" md:text-2xl p-2 my-8 text-white">
            يجب عليك تسجيل الدخول أولا لرؤية هذا البروفايل
          </h1>
          <div className="flex flex-col justify-between items-center gap-4 w-full">
            <Button title={'تسجيل الدخول'} style={''} path="/api/aut/login" />

            {/* <BackButton /> */}
          </div>
        </div>
      )}
      {session?.status === 'authenticated' && (
        <div className="relative grow bg-one text-white flex justify-start items-start w-full bg-four  xl:p-8 rounded-lg  sm: lg:text-xl">
          <div className="absolute flex flex-col items-start gap-2 z-50 top-2 right-2 sm:top-4 sm:right-4 xl:right-12 xl:top-12 ">
            <TfiMenuAlt
              className=" p-1 rounded-lg text-3xl lg:text-5xl text-one cursor-pointer z-50  "
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
          </div>
          <div className="flex flex-col items-start gap-4  justify-start w-full 2xl:w-2/3 h-full rounded-lg overflow-hidden">
            <div className="flex justify-center items-center w-full size-44 bg-one my-4">
              <div className="relative size-44 rounded-full">
                {user?.image ? (
                  <Image priority src={user?.image} fill alt={'photo'} />
                ) : (
                  <LoadingPhoto />
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full h-full text-start text-black bg-white py-4">
              <div className="flex flex-col items-start gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <div className="flex justify-start items-start gap-1">
                  <h4 className="flex justify-center items-center gap-2 ml-2 text-lg text-nowrap text-start w-full select-none">
                    <GrContactInfo className="text-xl" />
                    الإسم:
                  </h4>
                  <div>
                    <h1 className="text-nowrap w-20 text-start">
                      {user?.name}{' '}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-white rounded-lg border-hidden" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <div className="flex justify-start items-start gap-1">
                  <h4 className="flex justify-start gap-2 ml-2 items-center  text-nowrap text-start w-full select-none">
                    <MdOutlineMarkEmailRead className="text-xl" />
                    الإيميل:
                  </h4>
                  <div>
                    <h1 className="text-nowrap w-20 text-start">
                      {session?.data?.user?.email}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-white rounded-lg border-hidden" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <div className="flex justify-start items-start gap-1">
                  <h4 className="flex justify-start gap-2 ml-2 items-center text-nowrap text-start w-full select-none">
                    <FaRegCreditCard />
                    الإشتراك:
                  </h4>
                  <div>
                    <h1 className="text-nowrap w-20 text-start">
                      {user?.monthly_subscribed === false &&
                      user?.yearly_subscribed === false
                        ? 'غير مشترك'
                        : ''}
                    </h1>
                    <h1 className="text-nowrap w-20 text-start">
                      {user?.monthly_subscribed === true ? 'مشترك شهري' : ''}
                    </h1>
                    <h1 className="text-nowrap w-20 text-start">
                      {user?.yearly_subscribed === true ? 'مشترك سنوي' : ''}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center w-full">
                  <hr className="w-full h-0.5 bg-white rounded-lg border-hidden" />
                </div>
              </div>
              <div className="p-4 w-full ">
                {session?.status === 'authenticated' && (
                  <>
                    <Button
                      title={'تسجيل الخروج'}
                      path={'/'}
                      style={'shadow-xl'}
                      onClick={() => signOut()}
                    />
                  </>
                )}
              </div>
              {/* <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
                <Link href={'/favoritePosts'} className="w-full">
                  <h1 className="text-nowrap text-start w-full select-none cursor-pointer ">
                    <span className="text-one font-bold text-2xl ml-2 ">#</span>
                    مسلسلات أعجبتني
                  </h1>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

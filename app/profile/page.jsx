// 'use client';
// import CurrentUser from '../../components/CurrentUser';
// import Button from '../../components/Button';
// import { signOut, useSession } from 'next-auth/react';
// import Image from 'next/image';
// import React, { useContext, useEffect, useState } from 'react';
// import { inputsContext } from '../../components/Context';
// import toast from 'react-hot-toast';
// import CustomToast from '../../components/CustomToast';
// import SideBarMenu from '../../components/SideBarMenu';
// import { TfiMenuAlt } from 'react-icons/tfi';
// import { FaRegCreditCard } from 'react-icons/fa6';
// import { MdOutlineMarkEmailRead } from 'react-icons/md';
// import { GrContactInfo } from 'react-icons/gr';
// import LoadingPhoto from '../../components/LoadingPhoto';

// export default function Profile() {
//   const session = useSession();
//   const [isOpen, setIsOpen] = useState(false);
//   const user = CurrentUser();
//   const { profile_image, dispatch } = useContext(inputsContext);
//   const [newUserName, setNewUserName] = useState('');
//   console.log('user?.image', user?.image);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const newName = JSON.parse(localStorage.getItem('CurrentUser'));
//       setNewUserName(newName?.name);
//     }
//     editProfileImageAndUserName();
//   }, [profile_image?.image]);

//   async function editProfileImageAndUserName() {
//     if (profile_image?.image || newUserName) {
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('image', JSON.stringify(profile_image?.image));
//       }
//       // console.log('newUserName', newUserName);
//       const response = await fetch('/api/user', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: session?.data?.user?.email,
//           image: profile_image?.image,
//           name: newUserName,
//         }),
//       });
//       if (response.ok) {
//         toast.custom((t) => (
//           <CustomToast t={t} message={'تم التعديل بنجاح '} greenEmoji={'✔'} />
//         ));
//         dispatch({ type: 'PROFILE_IMAGE', payload: profile_image?.image });
//         if (typeof window !== 'undefined') {
//           const newName = JSON.parse(localStorage.getItem('CurrentUser'));
//           setNewUserName(newName?.name);
//         }
//       } else {
//         toast.custom((t) => (
//           <CustomToast t={t} message={'حدث حطأ ما حاول مرة أخرى 😐'} />
//         ));
//       }
//     }
//   }

//   return (
//     <div className="flex flex-col h-screen justify-center items-center text-md">
//       {session?.status === 'unauthenticated' && (
//         <div className="p-4 bg-four rounded-lg m-2 md:m-8 border-one text-center h-screen">
//           <h1 className=" md:text-2xl p-2 my-8 text-white">
//             يجب عليك تسجيل الدخول أولا لرؤية هذا البروفايل
//           </h1>
//           <div className="flex flex-col justify-between items-center gap-4 w-full">
//             <Button title={'تسجيل الدخول'} style={''} path="/api/aut/login" />
//           </div>
//         </div>
//       )}
//       {session?.status === 'authenticated' && (
//         <div className="relative grow bg-one text-white flex justify-center items-center w-full bg-four  xl:p-8 rounded-lg  sm: lg:text-xl sm:mt-24">
//           <div className="flex flex-col items-start gap-4  justify-start w-full 2xl:w-2/3 h-full rounded-lg overflow-hidden">
//             <div className="flex justify-center items-center w-full size-44 bg-one my-4">
//               <div className="relative size-44">
//                 {user?.image ? (
//                   <Image
//                     loading="lazy"
//                     src={session?.data?.user?.image}
//                     fill
//                     alt={'photo'}
//                     className="rounded-full"
//                   />
//                 ) : (
//                   <LoadingPhoto />
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col justify-center items-center w-full h-full text-start text-black bg-white py-4">
//               <div className="flex flex-col items-start gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
//                 <div className="flex justify-start items-start gap-1">
//                   <h4 className="flex justify-center items-center gap-2 ml-2 text-lg text-nowrap text-start w-full select-none">
//                     <GrContactInfo className="text-xl" />
//                     الإسم:
//                   </h4>
//                   <div>
//                     <h1 className="text-nowrap w-20 text-start">
//                       {user?.name}{' '}
//                     </h1>
//                   </div>
//                 </div>
//                 <div className="flex items-center w-full">
//                   <hr className="w-full h-0.5 bg-white rounded-lg border-hidden" />
//                 </div>
//               </div>
//               <div className="flex flex-col items-start gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
//                 <div className="flex justify-start items-start gap-1">
//                   <h4 className="flex justify-start gap-2 ml-2 items-center  text-nowrap text-start w-full select-none">
//                     <MdOutlineMarkEmailRead className="text-xl" />
//                     الإيميل:
//                   </h4>
//                   <div>
//                     <h1 className="text-nowrap w-20 text-start">
//                       {session?.data?.user?.email}
//                     </h1>
//                   </div>
//                 </div>
//                 <div className="flex items-center w-full">
//                   <hr className="w-full h-0.5 bg-white rounded-lg border-hidden" />
//                 </div>
//               </div>
//               <div className="flex flex-col items-start gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
//                 <div className="flex justify-start items-start gap-1">
//                   <h4 className="flex justify-start gap-2 ml-2 items-center text-nowrap text-start w-full select-none">
//                     <FaRegCreditCard />
//                     الإشتراك:
//                   </h4>
//                   <div>
//                     <h1 className="text-nowrap w-20 text-start">
//                       {user?.monthly_subscribed === false &&
//                       user?.yearly_subscribed === false
//                         ? 'غير مشترك'
//                         : ''}
//                     </h1>
//                     <h1 className="text-nowrap w-20 text-start">
//                       {user?.monthly_subscribed === true ? 'مشترك شهري' : ''}
//                     </h1>
//                     <h1 className="text-nowrap w-20 text-start">
//                       {user?.yearly_subscribed === true ? 'مشترك سنوي' : ''}
//                     </h1>
//                   </div>
//                 </div>
//                 <div className="flex items-center w-full">
//                   <hr className="w-full h-0.5 bg-white rounded-lg border-hidden" />
//                 </div>
//               </div>
//               <div className="p-4 w-full ">
//                 {session?.status === 'authenticated' && (
//                   <>
//                     <Button
//                       title={'تسجيل الخروج'}
//                       path={'/'}
//                       style={'shadow-xl'}
//                       onClick={() => signOut()}
//                     />
//                   </>
//                 )}
//               </div>
//               {/* <div className="flex flex-col items-center gap-2 justify-between rounded-lg px-8 py-2 w-full my-2">
//                 <Link href={'/favoritePosts'} className="w-full">
//                   <h1 className="text-nowrap text-start w-full select-none cursor-pointer ">
//                     <span className="text-one font-bold text-2xl ml-2 ">#</span>
//                     مسلسلات أعجبتني
//                   </h1>
//                 </Link>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import CurrentUser from '../../components/CurrentUser';
import Button from '../../components/Button';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { inputsContext } from '../../components/Context';
import toast from 'react-hot-toast';
import CustomToast from '../../components/CustomToast';
import LoadingPhoto from '../../components/LoadingPhoto';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  CreditCard,
  LogOut,
  Camera,
  Edit,
  ChevronRight,
  Star,
  Heart,
  Clock,
  Calendar,
  Settings,
  Shield,
  Sparkles,
  Check,
} from 'lucide-react';

export default function Profile() {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const user = CurrentUser();
  const { profile_image, dispatch } = useContext(inputsContext);
  const [newUserName, setNewUserName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newName = JSON.parse(localStorage.getItem('CurrentUser'));
      setNewUserName(newName?.name);
    }
    editProfileImageAndUserName();
  }, [profile_image?.image]);

  async function editProfileImageAndUserName() {
    if (profile_image?.image || newUserName) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('image', JSON.stringify(profile_image?.image));
      }

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

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveName = () => {
    setIsEditing(false);
    editProfileImageAndUserName();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-[#3a2a7d] py-12 px-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#8e44ad]/10 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-[#9b59b6]/10 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#8e44ad]/10 blur-lg"></div>
      </div>

      {session?.status === 'unauthenticated' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-[#2c1f5e] rounded-xl shadow-xl overflow-hidden p-6 text-center"
        >
          <div className="mb-6">
            <div className="w-20 h-20 bg-[#8e44ad]/20 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-[#8e44ad]" />
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-white mb-6">
            يجب عليك تسجيل الدخول أولا لرؤية هذا البروفايل
          </h1>

          <div className="flex flex-col justify-between items-center gap-4 w-full">
            <Button
              title={'تسجيل الدخول'}
              style={'bg-[#8e44ad] hover:bg-[#9b59b6] transition-colors'}
              path="/api/aut/login"
            />
          </div>
        </motion.div>
      )}

      {session?.status === 'authenticated' && (
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-[#2c1f5e] rounded-xl shadow-xl overflow-hidden"
          >
            {/* Profile header with background */}
            <motion.div
              variants={itemVariants}
              className="relative h-48 bg-gradient-to-r from-[#8e44ad] to-[#9b59b6]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-5 left-1/4 w-24 h-24 bg-white/10 rounded-full"></div>
              </div>

              {/* Profile image */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div
                  className="relative w-32 h-32 rounded-full border-4 border-[#2c1f5e] overflow-hidden"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  {user?.image ? (
                    <Image
                      src={session?.data?.user?.image || '/placeholder.svg'}
                      fill
                      alt={'profile photo'}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <LoadingPhoto />
                  )}

                  {/* Edit overlay */}
                  <AnimatePresence>
                    {isHovering && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full cursor-pointer"
                      >
                        <Camera className="w-8 h-8 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Tabs navigation */}
            <motion.div
              variants={itemVariants}
              className="mt-20 px-6 flex justify-center space-x-4 rtl:space-x-reverse border-b border-[#3a2a7d]/20"
            >
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 relative ${
                  activeTab === 'profile'
                    ? 'text-[#8e44ad] font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                الملف الشخصي
                {activeTab === 'profile' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8e44ad]"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 relative ${
                  activeTab === 'favorites'
                    ? 'text-[#8e44ad] font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                المفضلة
                {activeTab === 'favorites' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8e44ad]"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 relative ${
                  activeTab === 'settings'
                    ? 'text-[#8e44ad] font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                الإعدادات
                {activeTab === 'settings' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8e44ad]"
                  />
                )}
              </button>
            </motion.div>

            {/* Profile content */}
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {/* User info */}
                  <div className="space-y-6">
                    {/* Name */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-[#3a2a7d]/30 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="p-2 bg-[#8e44ad]/20 rounded-full">
                            <User className="w-5 h-5 text-[#8e44ad]" />
                          </div>
                          <span className="text-white/70">الإسم</span>
                        </div>

                        {!isEditing ? (
                          <div className="flex items-center">
                            <span className="text-white font-medium">
                              {user?.name}
                            </span>
                            <button
                              onClick={handleEditName}
                              className="ml-2 p-1 rounded-full hover:bg-[#8e44ad]/20 transition-colors"
                            >
                              <Edit className="w-4 h-4 text-[#8e44ad]" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={newUserName || ''}
                              onChange={(e) => setNewUserName(e.target.value)}
                              className="bg-[#3a2a7d] border border-[#8e44ad]/30 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-[#8e44ad]"
                            />
                            <button
                              onClick={handleSaveName}
                              className="ml-2 p-1 rounded-full bg-[#8e44ad]/20 hover:bg-[#8e44ad]/40 transition-colors"
                            >
                              <Check className="w-4 h-4 text-[#8e44ad]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-[#3a2a7d]/30 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="p-2 bg-[#8e44ad]/20 rounded-full">
                            <Mail className="w-5 h-5 text-[#8e44ad]" />
                          </div>
                          <span className="text-white/70">
                            البريد الإلكتروني
                          </span>
                        </div>
                        <span className="text-white font-medium">
                          {session?.data?.user?.email}
                        </span>
                      </div>
                    </motion.div>

                    {/* Subscription */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-[#3a2a7d]/30 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="p-2 bg-[#8e44ad]/20 rounded-full">
                            <CreditCard className="w-5 h-5 text-[#8e44ad]" />
                          </div>
                          <span className="text-white/70">الإشتراك</span>
                        </div>

                        <div className="flex items-center">
                          {user?.monthly_subscribed === false &&
                            user?.yearly_subscribed === false && (
                              <span className="text-white/70">غير مشترك</span>
                            )}

                          {user?.monthly_subscribed === true && (
                            <div className="flex items-center bg-[#8e44ad]/20 px-3 py-1 rounded-full">
                              <Calendar className="w-4 h-4 text-[#8e44ad] mr-1" />
                              <span className="text-white">مشترك شهري</span>
                            </div>
                          )}

                          {user?.yearly_subscribed === true && (
                            <div className="flex items-center bg-[#8e44ad]/20 px-3 py-1 rounded-full">
                              <Calendar className="w-4 h-4 text-[#8e44ad] mr-1" />
                              <span className="text-white">مشترك سنوي</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Membership info */}
                    <motion.div
                      variants={itemVariants}
                      className="bg-[#3a2a7d]/30 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="p-2 bg-[#8e44ad]/20 rounded-full">
                            <Shield className="w-5 h-5 text-[#8e44ad]" />
                          </div>
                          <span className="text-white/70">معلومات العضوية</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Clock className="w-4 h-4 text-[#8e44ad]" />
                          <span className="text-white/70">تاريخ الانضمام:</span>
                          <span className="text-white">1 يناير 2023</span>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Star className="w-4 h-4 text-[#8e44ad]" />
                          <span className="text-white/70">المستوى:</span>
                          <span className="text-white">عضو مميز</span>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Heart className="w-4 h-4 text-[#8e44ad]" />
                          <span className="text-white/70">المفضلات:</span>
                          <span className="text-white">12 فيلم</span>
                        </div>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Calendar className="w-4 h-4 text-[#8e44ad]" />
                          <span className="text-white/70">
                            تاريخ انتهاء الاشتراك:
                          </span>
                          <span className="text-white">31 ديسمبر 2023</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Sign out button */}
                    <motion.div
                      variants={itemVariants}
                      className="flex justify-center mt-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => signOut()}
                        className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] text-white px-6 py-3 rounded-full shadow-lg shadow-[#8e44ad]/30"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل الخروج</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'favorites' && (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#8e44ad]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-[#8e44ad]" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      قائمة المفضلة فارغة
                    </h3>
                    <p className="text-white/70">
                      لم تقم بإضافة أي أفلام أو مسلسلات إلى المفضلة بعد
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="space-y-4">
                    <div className="bg-[#3a2a7d]/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Settings className="w-5 h-5 text-[#8e44ad]" />
                          <span className="text-white">إعدادات الحساب</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/50" />
                      </div>
                    </div>

                    <div className="bg-[#3a2a7d]/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <Shield className="w-5 h-5 text-[#8e44ad]" />
                          <span className="text-white">الخصوصية والأمان</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/50" />
                      </div>
                    </div>

                    <div className="bg-[#3a2a7d]/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <CreditCard className="w-5 h-5 text-[#8e44ad]" />
                          <span className="text-white">إدارة الاشتراك</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/50" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Decorative element */}
          <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none">
            <Sparkles className="w-20 h-20 text-[#8e44ad]" />
          </div>
        </div>
      )}
    </div>
  );
}

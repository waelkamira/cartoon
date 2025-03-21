// 'use client';
// import Image from 'next/image';
// import React from 'react';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import LoadingPhoto from './LoadingPhoto';

// const photos = [
//   {
//     image: 'https://i.imgur.com/p7UQdQ8.png',
//     number: 'number-slide2',
//   },
//   {
//     image: 'https://i.imgur.com/EubV7nc.png',
//     number: 'number-slide3',
//   },
//   {
//     image: 'https://i.imgur.com/Aghx8tZ.png',
//     number: 'number-slide1',
//   },
//   {
//     image: 'https://i.imgur.com/1Ugllxw.png',
//     number: 'number-slide4',
//   },
//   {
//     image: 'https://i.imgur.com/4A2IYpJ.png',
//     number: 'number-slide5',
//   },
//   {
//     image: 'https://i.imgur.com/W7nzzPV.png',
//     number: 'number-slide6',
//   },
//   {
//     image: 'https://i.imgur.com/OY4UoU4.jpg',
//     number: 'number-slide7',
//   },
//   {
//     image: 'https://i.imgur.com/SOUJJ0O.png',
//     number: 'number-slide8',
//   },
//   {
//     image: 'https://i.imgur.com/1eD6a06.jpg',
//     number: 'number-slide9',
//   },
//   {
//     image: 'https://i.imgur.com/HOB8BHo.jpg',
//     number: 'number-slide10',
//   },
//   {
//     image: 'https://i.imgur.com/R7og6B0.jpg',
//     number: 'number-slide11',
//   },
//   {
//     image: 'https://i.imgur.com/VUUR6NK.png',
//     number: 'number-slide12',
//   },
//   {
//     image: 'https://i.imgur.com/tebUmkF.png',
//     number: 'number-slide13',
//   },
// ];

// export default function Categories() {
//   const [sliderRef] = useKeenSlider(
//     {
//       loop: true,
//     },
//     [
//       (slider) => {
//         let timeout;
//         let mouseOver = false;
//         function clearNextTimeout() {
//           clearTimeout(timeout);
//         }
//         function nextTimeout() {
//           clearTimeout(timeout);
//           if (mouseOver) return;
//           timeout = setTimeout(() => {
//             slider?.next();
//           }, 5000);
//         }
//         slider.on('created', () => {
//           slider.container.addEventListener('mouseover', () => {
//             mouseOver = true;
//             clearNextTimeout();
//           });
//           slider.container.addEventListener('mouseout', () => {
//             mouseOver = false;
//             nextTimeout();
//           });
//           nextTimeout();
//         });
//         slider.on('dragStarted', clearNextTimeout);
//         slider.on('animationEnded', nextTimeout);
//         slider.on('updated', nextTimeout);
//       },
//     ]
//   );
//   return (
//     <>
//       <div
//         ref={sliderRef}
//         className="keen-slider size-44 sm:size-96 lg:size-[500px] clip-arc mt-8"
//       >
//         {photos?.length > 0 &&
//           photos?.map((item) => {
//             return (
//               <>
//                 <div className={`keen-slider__slide ` + ` ${item?.number}`}>
//                   <div className="relative h-full w-full">
//                     {item?.image ? (
//                       <Image
//                         loading="lazy"
//                         src={item?.image}
//                         layout="fill"
//                         objectFit="cover"
//                         objectPosition="top"
//                         alt="photo"
//                       />
//                     ) : (
//                       <LoadingPhoto />
//                     )}
//                   </div>
//                 </div>
//               </>
//             );
//           })}
//       </div>
//     </>
//   );
// }
// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image'; // تأكد من الاستيراد الصحيح
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import LoadingPhoto from './LoadingPhoto';

// const photos = [
//   {
//     image: 'https://i.imgur.com/p7UQdQ8.png',
//     caption: 'طبق شهي من المطبخ العربي',
//     number: 'number-slide2',
//   },
//   {
//     image: 'https://i.imgur.com/EubV7nc.png',
//     caption: 'حلويات تقليدية',
//     number: 'number-slide3',
//   },
//   {
//     image: 'https://i.imgur.com/Aghx8tZ.png',
//     caption: 'وجبة غداء متكاملة',
//     number: 'number-slide1',
//   },
//   {
//     image: 'https://i.imgur.com/1Ugllxw.png',
//     caption: 'مقبلات شرقية',
//     number: 'number-slide4',
//   },
//   {
//     image: 'https://i.imgur.com/4A2IYpJ.png',
//     caption: 'أطباق رئيسية',
//     number: 'number-slide5',
//   },
//   {
//     image: 'https://i.imgur.com/W7nzzPV.png',
//     caption: 'حلويات شرقية',
//     number: 'number-slide6',
//   },
//   {
//     image: 'https://i.imgur.com/OY4UoU4.jpg',
//     caption: 'مشروبات منعشة',
//     number: 'number-slide7',
//   },
//   {
//     image: 'https://i.imgur.com/SOUJJ0O.png',
//     caption: 'وصفات سهلة وسريعة',
//     number: 'number-slide8',
//   },
//   {
//     image: 'https://i.imgur.com/1eD6a06.jpg',
//     caption: 'أطباق عالمية',
//     number: 'number-slide9',
//   },
//   {
//     image: 'https://i.imgur.com/HOB8BHo.jpg',
//     caption: 'وجبات صحية',
//     number: 'number-slide10',
//   },
//   {
//     image: 'https://i.imgur.com/R7og6B0.jpg',
//     caption: 'معجنات شهية',
//     number: 'number-slide11',
//   },
//   {
//     image: 'https://i.imgur.com/VUUR6NK.png',
//     caption: 'أطباق تقليدية',
//     number: 'number-slide12',
//   },
//   {
//     image: 'https://i.imgur.com/tebUmkF.png',
//     caption: 'وصفات عائلية',
//     number: 'number-slide13',
//   },
// ];

// export default function EnhancedCategoriesSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [sliderRef, instanceRef] = useKeenSlider(
//     {
//       loop: true,
//       initial: 0,
//       slideChanged(slider) {
//         setCurrentSlide(slider.track.details.rel);
//       },
//       created() {
//         setLoaded(true);
//       },
//     },
//     [
//       (slider) => {
//         let timeout;
//         let mouseOver = false;

//         function clearNextTimeout() {
//           clearTimeout(timeout);
//         }

//         function nextTimeout() {
//           clearTimeout(timeout);
//           if (mouseOver) return;
//           timeout = setTimeout(() => {
//             slider.next();
//           }, 5000);
//         }

//         slider.on('created', () => {
//           slider.container.addEventListener('mouseover', () => {
//             mouseOver = true;
//             clearNextTimeout();
//           });
//           slider.container.addEventListener('mouseout', () => {
//             mouseOver = false;
//             nextTimeout();
//           });
//           nextTimeout();
//         });

//         slider.on('dragStarted', clearNextTimeout);
//         slider.on('animationEnded', nextTimeout);
//         slider.on('updated', nextTimeout);
//       },
//     ]
//   );

//   // Preload images for smoother transitions
//   useEffect(() => {
//     photos.forEach((photo) => {
//       const img = new window.Image(); // استخدام window.Image لتجنب التضارب مع next/image
//       img.src = photo.image;
//     });
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="relative mx-auto my-12"
//     >
//       <div className="relative">
//         {/* السلايدر الرئيسي */}
//         <div className="relative overflow-hidden">
//           <div
//             ref={sliderRef}
//             className="keen-slider rounded-2xl overflow-hidden shadow-xl"
//             style={{
//               height: 'min(70vh, 600px)',
//               width: 'min(90vw, 800px)',
//               margin: '0 auto',
//               clipPath:
//                 'polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%)',
//             }}
//           >
//             {photos.map((item, idx) => (
//               <div
//                 key={idx}
//                 className={`keen-slider__slide ${item.number} relative`}
//               >
//                 <div className="relative h-full w-full overflow-hidden">
//                   {item.image ? (
//                     <>
//                       <Image
//                         src={item.image || '/placeholder.svg'}
//                         alt={item.caption || 'Food image'}
//                         fill
//                         style={{
//                           objectFit: 'cover',
//                           objectPosition: 'center',
//                         }}
//                         className="transition-transform duration-10000 hover:scale-110"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

//                       {/* النص التوضيحي */}
//                       <div className="absolute bottom-0 right-0 left-0 p-4 md:p-6 text-right">
//                         <motion.div
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: 0.2 }}
//                           className="bg-black/30 backdrop-blur-sm p-3 md:p-4 rounded-lg inline-block"
//                         >
//                           <h3 className="text-white text-lg md:text-xl font-bold">
//                             {item.caption}
//                           </h3>
//                         </motion.div>
//                       </div>
//                     </>
//                   ) : (
//                     <LoadingPhoto />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* أزرار التنقل */}
//           {loaded && instanceRef.current && (
//             <>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   instanceRef.current?.prev();
//                 }}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
//                 aria-label="الصورة السابقة"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>

//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   instanceRef.current?.next();
//                 }}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
//                 aria-label="الصورة التالية"
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </button>
//             </>
//           )}
//         </div>

//         {/* النقاط */}
//         {loaded && instanceRef.current && (
//           <div className="flex justify-center mt-4 gap-2">
//             {[
//               ...Array(instanceRef.current.track.details.slides.length).keys(),
//             ].map((idx) => (
//               <button
//                 key={idx}
//                 onClick={() => instanceRef.current?.moveToIdx(idx)}
//                 className={`relative p-1 focus:outline-none group`}
//                 aria-label={`انتقل إلى الصورة ${idx + 1}`}
//               >
//                 <span
//                   className={`block w-3 h-3 rounded-full transition-all duration-300 ${
//                     currentSlide === idx
//                       ? 'bg-orange-500 scale-125'
//                       : 'bg-gray-300 hover:bg-orange-300'
//                   }`}
//                 />
//                 {currentSlide === idx && (
//                   <motion.span
//                     layoutId="activeDot"
//                     className="absolute inset-0 bg-orange-500/20 rounded-full -m-1"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1.5 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* عناصر زخرفية */}
//       <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-orange-100 via-transparent to-orange-50 rounded-full opacity-50 blur-3xl" />

//       <div className="absolute -z-10 top-20 right-10 w-20 h-20 bg-orange-300 rounded-full opacity-20 blur-xl" />
//       <div className="absolute -z-10 bottom-10 left-10 w-32 h-32 bg-orange-400 rounded-full opacity-10 blur-xl" />
//     </motion.div>
//   );
// }
// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import Image from 'next/image';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// // Image data with optional captions
// const photos = [
//   {
//     image: 'https://i.imgur.com/p7UQdQ8.png',
//     caption: 'وجبات شهية',
//   },
//   {
//     image: 'https://i.imgur.com/EubV7nc.png',
//     caption: 'حلويات لذيذة',
//   },
//   {
//     image: 'https://i.imgur.com/Aghx8tZ.png',
//     caption: 'مأكولات بحرية',
//   },
//   {
//     image: 'https://i.imgur.com/1Ugllxw.png',
//     caption: 'سلطات منعشة',
//   },
//   {
//     image: 'https://i.imgur.com/4A2IYpJ.png',
//     caption: 'مشروبات طازجة',
//   },
//   {
//     image: 'https://i.imgur.com/W7nzzPV.png',
//     caption: 'وصفات تقليدية',
//   },
//   {
//     image: 'https://i.imgur.com/OY4UoU4.jpg',
//     caption: 'أطباق عالمية',
//   },
//   {
//     image: 'https://i.imgur.com/SOUJJ0O.png',
//     caption: 'معجنات شهية',
//   },
//   {
//     image: 'https://i.imgur.com/1eD6a06.jpg',
//     caption: 'وجبات صحية',
//   },
//   {
//     image: 'https://i.imgur.com/HOB8BHo.jpg',
//     caption: 'مقبلات متنوعة',
//   },
//   {
//     image: 'https://i.imgur.com/R7og6B0.jpg',
//     caption: 'حلويات شرقية',
//   },
//   {
//     image: 'https://i.imgur.com/VUUR6NK.png',
//     caption: 'أطباق رئيسية',
//   },
//   {
//     image: 'https://i.imgur.com/tebUmkF.png',
//     caption: 'وصفات سريعة',
//   },
// ];

// export default function ImageCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [lightboxImage, setLightboxImage] = useState('');
//   const [isHovering, setIsHovering] = useState(false);

//   // Configure the slider with navigation
//   const [sliderRef, instanceRef] = useKeenSlider({
//     initial: 0,
//     loop: true,
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created() {
//       setLoaded(true);
//     },
//   });

//   // Auto-advance functionality
//   useEffect(() => {
//     if (!isHovering && instanceRef.current) {
//       const interval = setInterval(() => {
//         instanceRef.current?.next();
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [instanceRef, isHovering]);

//   // Navigation functions
//   const handlePrevious = useCallback(
//     (e) => {
//       e.stopPropagation();
//       instanceRef.current?.prev();
//     },
//     [instanceRef]
//   );

//   const handleNext = useCallback(
//     (e) => {
//       e.stopPropagation();
//       instanceRef.current?.next();
//     },
//     [instanceRef]
//   );

//   // Lightbox functions
//   const openLightbox = (image) => {
//     setLightboxImage(image);
//     setLightboxOpen(true);
//   };

//   return (
//     <div className="relative w-full max-w-4xl mx-auto">
//       {/* Main Carousel */}
//       <div
//         className="relative overflow-hidden rounded-2xl shadow-2xl"
//         onMouseEnter={() => setIsHovering(true)}
//         onMouseLeave={() => setIsHovering(false)}
//       >
//         <div
//           ref={sliderRef}
//           className="keen-slider h-[300px] md:h-[400px] lg:h-[500px]"
//         >
//           {photos.map((item, idx) => (
//             <div key={idx} className="keen-slider__slide">
//               <div
//                 className="relative h-full w-full group cursor-pointer"
//                 onClick={() => openLightbox(item.image)}
//               >
//                 <Image
//                   src={item.image || '/placeholder.svg'}
//                   layout="fill"
//                   objectFit="cover"
//                   alt={item.caption || 'Carousel image'}
//                   className="transition-transform duration-700 group-hover:scale-105"
//                   priority={idx < 2}
//                 />

//                 {/* Image overlay with gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>

//                 {/* Zoom icon on hover */}
//                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
//                     <Maximize2 className="h-5 w-5 text-white" />
//                   </div>
//                 </div>

//                 {/* Caption */}
//                 {item.caption && (
//                   <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//                     <h3 className="text-xl md:text-2xl font-bold drop-shadow-md">
//                       {item.caption}
//                     </h3>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         {loaded && (
//           <>
//             <button
//               onClick={handlePrevious}
//               className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors p-2 rounded-full text-white shadow-lg z-10"
//             >
//               <ChevronLeft className="h-6 w-6" />
//             </button>

//             <button
//               onClick={handleNext}
//               className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors p-2 rounded-full text-white shadow-lg z-10"
//             >
//               <ChevronRight className="h-6 w-6" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Pagination Dots */}
//       {loaded && instanceRef.current && (
//         <div className="flex justify-center mt-4 space-x-2">
//           {[
//             ...Array(instanceRef.current.track.details.slides.length).keys(),
//           ].map((idx) => (
//             <button
//               key={idx}
//               onClick={() => instanceRef.current?.moveToIdx(idx)}
//               className={`h-2 rounded-full transition-all ${
//                 currentSlide === idx ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightboxOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
//             onClick={() => setLightboxOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: 'spring', damping: 25 }}
//               className="relative max-w-5xl max-h-[90vh]"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Image
//                 src={lightboxImage || '/placeholder.svg'}
//                 width={1200}
//                 height={800}
//                 alt="Enlarged view"
//                 className="object-contain max-h-[90vh] rounded-lg"
//               />
//               <button
//                 className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/40 transition-colors"
//                 onClick={() => setLightboxOpen(false)}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Star,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react';
import LoadingPhoto from './LoadingPhoto';

const photos = [
  {
    image: 'https://i.imgur.com/p7UQdQ8.png',
    caption: 'أفلام ديزني',
    description: 'مجموعة من أفضل أفلام ديزني الكلاسيكية والحديثة',
    number: 'number-slide2',
  },
  {
    image: 'https://i.imgur.com/EubV7nc.png',
    caption: 'مسلسلات كرتون',
    description: 'مسلسلات كرتون مميزة للأطفال من مختلف الأعمار',
    number: 'number-slide3',
  },
  {
    image: 'https://i.imgur.com/Aghx8tZ.png',
    caption: 'أفلام بيكسار',
    description: 'أفلام بيكسار الشهيرة بجودة عالية ومدبلجة للعربية',
    number: 'number-slide1',
  },
  {
    image: 'https://i.imgur.com/1Ugllxw.png',
    caption: 'أفلام مغامرات',
    description: 'أفلام مغامرات شيقة ومثيرة للأطفال والعائلة',
    number: 'number-slide4',
  },
  {
    image: 'https://i.imgur.com/4A2IYpJ.png',
    caption: 'أفلام حيوانات',
    description: 'أفلام كرتون عن عالم الحيوانات الشيق',
    number: 'number-slide5',
  },
  {
    image: 'https://i.imgur.com/W7nzzPV.png',
    caption: 'أفلام خيال علمي',
    description: 'أفلام خيال علمي ممتعة ومناسبة للأطفال',
    number: 'number-slide6',
  },
  {
    image: 'https://i.imgur.com/OY4UoU4.jpg',
    caption: 'أفلام كوميدية',
    description: 'أفلام كرتون كوميدية مضحكة للعائلة',
    number: 'number-slide7',
  },
  {
    image: 'https://i.imgur.com/SOUJJ0O.png',
    caption: 'أفلام مدبلجة',
    description: 'أفلام كرتون مدبلجة باللغة العربية بأصوات مميزة',
    number: 'number-slide8',
  },
  {
    image: 'https://i.imgur.com/1eD6a06.jpg',
    caption: 'أفلام دريم وركس',
    description: 'أفلام دريم وركس الشهيرة بجودة عالية',
    number: 'number-slide9',
  },
  {
    image: 'https://i.imgur.com/HOB8BHo.jpg',
    caption: 'أفلام أنيميشن',
    description: 'أفلام أنيميشن متنوعة من مختلف الاستديوهات العالمية',
    number: 'number-slide10',
  },
  {
    image: 'https://i.imgur.com/R7og6B0.jpg',
    caption: 'أفلام عائلية',
    description: 'أفلام كرتون مناسبة لجميع أفراد العائلة',
    number: 'number-slide11',
  },
  {
    image: 'https://i.imgur.com/VUUR6NK.png',
    caption: 'أفلام مغامرات بحرية',
    description: 'أفلام كرتون عن المغامرات البحرية والحياة تحت الماء',
    number: 'number-slide12',
  },
  {
    image: 'https://i.imgur.com/tebUmkF.png',
    caption: 'أفلام تاريخية',
    description: 'أفلام كرتون تحكي قصصاً تاريخية بأسلوب شيق',
    number: 'number-slide13',
  },
];

export default function Categories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(-1);
  const [autoplay, setAutoplay] = useState(true);
  const [thumbnailsVisible, setThumbnailsVisible] = useState(false);

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

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver || !autoplay) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }

        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  // Thumbnail slider
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 5,
        spacing: 10,
      },
      slideChanged(slider) {
        const thumbnail = slider.track.details.rel;
        if (instanceRef.current) {
          instanceRef.current.moveToIdx(thumbnail);
        }
      },
    },
    []
  );

  // Preload images for smoother transitions
  useEffect(() => {
    photos.forEach((photo) => {
      const img = new window.Image();
      img.src = photo.image;
    });
  }, []);

  // Toggle autoplay
  const toggleAutoplay = useCallback(() => {
    setAutoplay(!autoplay);
  }, [autoplay]);

  // Toggle thumbnails
  const toggleThumbnails = useCallback(() => {
    setThumbnailsVisible(!thumbnailsVisible);
  }, [thumbnailsVisible]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative mx-auto my-12 max-w-7xl px-4"
    >
      {/* Decorative background elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-[#8e44ad]/10 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-[#9b59b6]/10 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-[#8e44ad]/10 blur-lg"></div>
      </div>

      {/* Main slider */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <div className="inline-block bg-[#8e44ad]/20 px-3 py-1 rounded-full mb-2">
            <span className="text-[#9b59b6] font-medium text-sm flex items-center">
              <ImageIcon className="w-4 h-4 mr-1" />
              <span>تصنيفات الأفلام</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#3a2a7d] mb-2">
            استكشف عالم الكرتون
          </h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            مجموعة متنوعة من أفلام الكرتون المميزة للأطفال والعائلة، مصنفة حسب
            النوع والاستديو
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-2 mb-4"
        >
          <button
            onClick={toggleAutoplay}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              autoplay ? 'bg-[#8e44ad] text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {autoplay ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}
          </button>

          <button
            onClick={toggleThumbnails}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              thumbnailsVisible
                ? 'bg-[#8e44ad] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {thumbnailsVisible ? 'إخفاء المصغرات' : 'عرض المصغرات'}
          </button>
        </motion.div>

        {/* Main slider */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden"
        >
          <div
            ref={sliderRef}
            className="keen-slider rounded-2xl overflow-hidden shadow-xl"
            style={{
              height: 'min(60vh, 500px)',
              width: 'min(90vw, 900px)',
              margin: '0 auto',
              clipPath:
                'polygon(0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%)',
            }}
          >
            {photos.map((item, idx) => (
              <div
                key={idx}
                className={`keen-slider__slide ${item.number} relative`}
              >
                <div className="relative h-full w-full overflow-hidden">
                  {item.image ? (
                    <>
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.caption || 'Category image'}
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        className="transition-transform duration-10000 hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3a2a7d]/80 via-transparent to-[#3a2a7d]/30" />

                      {/* Caption */}
                      <div className="absolute bottom-0 right-0 left-0 p-4 md:p-6 text-right">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-[#3a2a7d]/60 backdrop-blur-sm p-3 md:p-4 rounded-lg inline-block"
                        >
                          <h3 className="text-white text-lg md:text-xl font-bold flex items-center">
                            <Star className="w-4 h-4 mr-2 text-[#9b59b6]" />
                            {item.caption}
                          </h3>

                          {/* Description (toggleable) */}
                          <AnimatePresence>
                            {showDetails && (
                              <motion.p
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="text-white/80 text-sm mt-2 overflow-hidden"
                              >
                                {item.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full"
                        >
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    <LoadingPhoto />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          {loaded && instanceRef.current && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Toggle details button */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Toggle details"
              >
                <Info className="h-5 w-5" />
              </button>
            </>
          )}
        </motion.div>

        {/* Dots navigation */}
        {loaded && instanceRef.current && (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-4 gap-2"
          >
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                onMouseEnter={() => setHoveredDot(idx)}
                onMouseLeave={() => setHoveredDot(-1)}
                className={`relative p-1 focus:outline-none group`}
                aria-label={`Go to image ${idx + 1}`}
              >
                <span
                  className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'bg-[#8e44ad] scale-125'
                      : 'bg-gray-300 hover:bg-[#9b59b6]'
                  }`}
                />
                {currentSlide === idx && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 bg-[#8e44ad]/20 rounded-full -m-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Tooltip on hover */}
                {hoveredDot === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#3a2a7d] text-white text-xs py-1 px-2 rounded whitespace-nowrap z-20"
                  >
                    {photos[idx].caption}
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Thumbnails slider (toggleable) */}
        <AnimatePresence>
          {thumbnailsVisible && loaded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <div ref={thumbnailRef} className="keen-slider thumbnail">
                {photos.map((item, idx) => (
                  <div key={idx} className="keen-slider__slide cursor-pointer">
                    <div
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentSlide === idx
                          ? 'border-[#8e44ad] shadow-lg shadow-[#8e44ad]/20'
                          : 'border-transparent'
                      }`}
                      onClick={() => instanceRef.current?.moveToIdx(idx)}
                    >
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.caption || 'Thumbnail'}
                        fill
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                        className={`transition-all duration-300 ${
                          currentSlide === idx
                            ? 'brightness-100'
                            : 'brightness-75'
                        }`}
                      />

                      {/* Caption overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/40 backdrop-blur-sm p-1 rounded text-xs text-white text-center w-full">
                          {item.caption}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View all button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#8e44ad] to-[#9b59b6] text-white px-6 py-2 rounded-full flex items-center shadow-lg shadow-[#8e44ad]/30"
          >
            <span>عرض جميع التصنيفات</span>
            <ExternalLink className="w-4 h-4 ml-2" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

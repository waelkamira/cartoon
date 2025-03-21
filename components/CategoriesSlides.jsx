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
      className="relative mx-auto my-12 max-w-7xl px-4 "
    >
      {/* Decorative background elements */}
      <div className="absolute -z-10 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-one/10 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-two/10 blur-xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-one/10 blur-lg"></div>
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
          <div className="inline-block bg-one/20 px-3 py-1 rounded-full mb-2">
            <span className="text-two font-medium text-sm flex items-center">
              <ImageIcon className="w-4 h-4 mr-1" />
              <span>تصنيفات الأفلام</span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
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
              autoplay ? 'bg-one text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {autoplay ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}
          </button>

          <button
            onClick={toggleThumbnails}
            className={`px-3 py-1 rounded-full text-sm flex items-center ${
              thumbnailsVisible
                ? 'bg-one text-white'
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
                      <div className="absolute inset-0" />

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
                      ? 'bg-one scale-125'
                      : 'bg-gray-300 hover:bg-two'
                  }`}
                />
                {currentSlide === idx && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 bg-one/20 rounded-full -m-1"
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
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white text-white text-xs py-1 px-2 rounded whitespace-nowrap z-20"
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
                          ? 'border-one shadow-lg shadow-one/20'
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
      </motion.div>
    </motion.div>
  );
}

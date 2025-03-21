'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Image data
const photos = [
  { image: 'https://i.imgur.com/p7UQdQ8.png' },
  { image: 'https://i.imgur.com/EubV7nc.png' },
  { image: 'https://i.imgur.com/Aghx8tZ.png' },
  { image: 'https://i.imgur.com/1Ugllxw.png' },
  { image: 'https://i.imgur.com/4A2IYpJ.png' },
  { image: 'https://i.imgur.com/W7nzzPV.png' },
  { image: 'https://i.imgur.com/OY4UoU4.jpg' },
  { image: 'https://i.imgur.com/SOUJJ0O.png' },
  { image: 'https://i.imgur.com/1eD6a06.jpg' },
];

export default function CircularCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % photos.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  return (
    <div
      className="relative w-full max-w-md mx-auto h-[500px] flex items-center justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl"></div>

      {/* Circular track */}
      <div className="relative w-64 h-64 rounded-full border-4 border-dashed border-orange-200 animate-spin-slow">
        {/* Placeholder for the circular track */}
      </div>

      {/* Images positioned around the circle */}
      {photos.map((photo, index) => {
        // Calculate position on the circle
        const angle = (index * (360 / photos.length) * Math.PI) / 180;
        const radius = 140; // Radius of the circle
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const isActive = index === activeIndex;

        return (
          <motion.div
            key={index}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ${
              isActive ? 'z-20' : ''
            }`}
            animate={{
              x: x,
              y: y,
              scale: isActive ? 1.2 : 0.8,
              opacity: isActive ? 1 : 0.7,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              opacity: { duration: 0.3 },
            }}
            onClick={() => setActiveIndex(index)}
          >
            <div
              className={`relative w-16 h-16 rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${
                isActive ? 'pulse-glow' : ''
              }`}
            >
              <Image
                src={photo.image || '/placeholder.svg'}
                layout="fill"
                objectFit="cover"
                alt="Carousel image"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
          </motion.div>
        );
      })}

      {/* Center featured image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl z-30 animate-float"
        >
          <Image
            src={photos[activeIndex].image || '/placeholder.svg'}
            layout="fill"
            objectFit="cover"
            alt="Featured image"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { signOut, useSession } from 'next-auth/react';
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
import SharePrompt from './SharePromptOnWhatsup';
import LoginMessage from './loginMessage';
import SubscriptionPage from './paypal/subscriptionPage';
import { inputsContext } from './Context';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpacetoonOpen, setIsSpacetoonOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [active, setActive] = useState(false);
  const session = useSession();
  const user = CurrentUser();
  const [open, setOpen] = useState(true);
  return (
    <div>
      {' '}
      <div className="absolute w-full z-50">
        {/* {open && session?.status === 'unauthenticated' && (
          <div
            className="fixed right-0 h-screen w-full z-40"
            onClick={() => setOpen(true)}
          >
            {open ? <LoginMessage setOpen={setOpen} /> : ''}
          </div>
        )} */}
        <div className="fixed top-0 right-0 z-30 flex items-center justify-center mb-2 gap-2 w-full text-white p-2">
          <TfiMenuAlt
            className=" p-2 rounded-lg text-5xl text-white hover:scale-101 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && <SideBarMenu setIsOpen={setIsOpen} />}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <motion.div
                className="relative h-16 w-16 mr-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Image
                  src="https://i.imgur.com/nfDVITC.png"
                  alt="Logo"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-full"
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(255, 255, 255, 0)',
                      '0 0 0 10px rgba(255, 255, 255, 0.3)',
                      '0 0 0 0 rgba(255, 255, 255, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  سبيس تون
                </h1>
                <p className="text-one-200 text-sm">عالم من المغامرات والمرح</p>
              </div>
            </div>
          </motion.div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

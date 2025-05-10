import React from 'react'
import { styles } from '../styles';
import { navLinks } from '../constants';
import { resume, menu, close } from '../assets';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-sm border-b border-purple-500/20' : 'bg-transparent'
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="/"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* <img src={logo} alt="logo" className="w-9 h-9 object-contain" /> */}
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform rotate-45 rounded-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform -rotate-45 rounded-sm"></div>
            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                ease: "linear",
                times: [0, 0.5, 1]
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50"
            />
          </div>
          <p className="text-white text-[18px] font-bold cursor-pointer">
            Mouhcine Teffahi{" "}
            <span className="sm:block hidden text-purple-400">Senior Full Stack Developer</span>
          </p>
        </a>

        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title
                  ? "text-purple-400"
                  : "text-gray-300"
              } hover:text-purple-400 text-[18px] font-medium cursor-pointer transition-colors duration-300`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <motion.a
            href={resume}
            download="Mouhcine_Teffahi_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium text-[16px] shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Download Resume
          </motion.a>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black/90 backdrop-blur-sm absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-purple-500/20 shadow-lg`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? "text-purple-400"
                      : "text-gray-300"
                  } hover:text-purple-400 text-[18px] font-medium cursor-pointer transition-colors duration-300`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <motion.a
                href={resume}
                download="Mouhcine_Teffahi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium text-[16px] shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Download Resume
              </motion.a>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
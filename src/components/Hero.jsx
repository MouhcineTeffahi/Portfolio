import React from 'react'
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-4 flex flex-row items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
        </div>
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">
            I'm <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mouhcine</span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-gray-300 font-medium">
          Senior Full Stack Developer
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl">
          I turn ideas into modern, high-performance websites and web applications.
          Specialized in both front-end and back-end development, I create exceptional digital experiences.
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-2 border-purple-500/50 flex justify-center items-start p-2 hover:border-purple-500 transition-all duration-300">
            <motion.div
              initial={{ y: 0 }}
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
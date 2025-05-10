import React from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div variants={textVariant()} className="text-center mb-12">
        <p className='text-purple-400 font-medium text-lg mb-2'>My Skills</p>
        <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Technologies
        </h2>
      </motion.div>

      <div className='flex flex-row flex-wrap justify-center gap-8'>
        {technologies.map((technology) => (
          <div 
            className='w-28 h-28 group relative' 
            key={technology.name}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative">
              <img 
                src={technology.icon} 
                alt={technology.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm text-gray-300 font-medium whitespace-nowrap">
                {technology.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");

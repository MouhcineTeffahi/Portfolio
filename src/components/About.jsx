import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'
import { resume } from '../assets'
const ServiceCard = ({ index, title, icon}) => {
  return (
    <Tilt className='xs:w-[280px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className='w-full bg-gradient-to-br from-purple-500 to-pink-500 p-[1px] rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300'
      >
        <div options={{
          max: 45,
          scale: 1,
          speed: 450
        }} className='bg-black/90 backdrop-blur-sm rounded-[20px] py-8 px-6 min-h-[300px] flex flex-col items-center justify-center gap-4 hover:bg-black/80 transition-all duration-300'>
          <div className='bg-white/10 p-4 rounded-full'>
            <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          </div>
          <h3 className='text-white text-[22px] font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <motion.div variants={textVariant()} className='text-center mb-12'>
          <p className='text-purple-400 font-medium text-lg mb-2'>Introduction</p>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>Overview</h2>
      </motion.div>

      <motion.p 
        variants={fadeIn("", "", 0.1, 1)} 
        className='text-gray-300 text-lg md:text-md max-w-3xl mx-auto text-center leading-relaxed mb-8'
      >
        With over six years of experience, I specialize in building robust and user-friendly web applications. I’m proficient in front-end technologies like JavaScript, React, HTML, CSS, and Bootstrap, and skilled in back-end development using PHP and MySQL. I work efficiently in team environments and consistently deliver high-quality results. Passionate about technology and innovation, I focus on creating exceptional user experiences that make a real impact.

      </motion.p>

      <motion.div 
        variants={fadeIn("", "", 0.2, 1)}
        className='flex justify-center mb-16'
      >
        <a 
          href={resume} 
          download="Mouhcine_Teffahi_Resume.pdf"
          className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300'
        >
          Download Resume
        </a>
      </motion.div>
      


    </div>
  )
}

export default SectionWrapper(About, "about")
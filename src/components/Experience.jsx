import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        border: "1px solid rgba(147, 51, 234, 0.2)",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        borderRadius: "20px",
        padding: "24px",
      }}
      contentArrowStyle={{ 
        borderRight: "7px solid rgba(147, 51, 234, 0.2)",
      }}
      date={experience.date}
      dateClassName="text-purple-400 font-medium"
      iconStyle={{ 
        background: "rgba(147, 51, 234, 0.2)",
        boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)",
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          {experience.title}
        </h3>
        <p
          className='text-purple-300 text-lg font-semibold mt-1'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-3'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-gray-300 text-base pl-1 tracking-wide leading-relaxed'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div variants={textVariant()} className="text-center mb-12">
        <p className='text-purple-400 font-medium text-lg mb-2'>
          What I have done so far
        </p>
        <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
          Work Experience
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline
          lineColor="rgba(147, 51, 234, 0.2)"
          animate={true}
        >
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");
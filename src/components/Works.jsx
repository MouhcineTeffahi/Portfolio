import React, { Suspense, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, useTexture } from "@react-three/drei";
import * as THREE from "three";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// 3D Moon Component
const Moon = () => {
  const { scene } = useGLTF('./moon/scene.gltf');
  
  // Load textures with correct public path
  const textures = useTexture({
    map: './moon/textures/Material__50_baseColor.jpeg',
    normalMap: './moon/textures/Material__50_normal.jpeg',
    roughnessMap: './moon/textures/Material__50_metallicRoughness.png',
    metalnessMap: './moon/textures/Material__50_metallicRoughness.png',
  });

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Apply textures and material properties
          if (child.material) {
            // Apply textures
            child.material.map = textures.map;
            child.material.normalMap = textures.normalMap;
            child.material.roughnessMap = textures.roughnessMap;
            child.material.metalnessMap = textures.metalnessMap;
            
            // Set material properties
            child.material.roughness = 0.8;
            child.material.metalness = 0.2;
            child.material.envMapIntensity = 1;
            
            // Enable normal mapping
            child.material.normalScale.set(1, 1);
            
            // Ensure textures are updated
            child.material.needsUpdate = true;
            
            // Set texture wrapping
            Object.values(textures).forEach(texture => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
            });
          }
        }
      });
    }
  }, [scene, textures]);

  return (
    <primitive 
      object={scene} 
      scale={window.innerWidth < 768 ? 0.2 : 1.5}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
};

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 1000,
          glare: true,
          "max-glare": 0.5,
        }}
        className='relative w-full sm:w-[380px] rounded-[30px] overflow-hidden'
      >
        <div className='relative bg-black/80 backdrop-blur-sm p-6 rounded-[30px] border border-purple-500/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] hover:border-purple-500/40 transition-all duration-300'>
          <div className='relative w-full h-[280px] rounded-[20px] overflow-hidden group'>
            <img
              src={image}
              alt='project_image'
              className='w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            
            <div className='absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
              <div className='flex justify-between items-center'>
                <h3 className='text-white font-bold text-[28px] tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>{name}</h3>
                <div
                  onClick={() => window.open(source_code_link, "_blank")}
                  className='bg-white/10 backdrop-blur-sm w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-white/20 transition-all duration-300 hover:scale-110'
                >
                  <img
                    src={github}
                    alt='source code'
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 space-y-4'>
            <div className='flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <span
                  key={`${name}-${tag.name}`}
                  className={`px-4 py-2 rounded-full text-[14px] font-medium ${tag.color} bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const handleShowMore = () => {
    setVisibleProjects(prevCount => prevCount === 6 ? projects.length : 6);
  };

  return (
    <div className='relative min-h-screen w-full'>
      {/* 3D Moon Background */}
      <div className='absolute inset-0 w-full h-full'>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          shadows
          gl={{ 
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
            preserveDrawingBuffer: true
          }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-5, 5, 5]} intensity={0.5} />
            <Moon />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* Projects Section */}
      <div className='relative z-10 px-4 py-16'>
        <motion.div variants={textVariant()} className="text-center mb-12">
          <p className='text-purple-400 font-medium text-lg mb-2'>My work</p>
          <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Projects
          </h2>
        </motion.div>

        <div className='w-full flex justify-center'>
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className='text-white text-lg md:text-md max-w-3xl leading-relaxed text-center mb-16'
          >
            These showcased projects represent practical examples of my development work. Each one includes source code and live demo links. They illustrate my expertise in full-stack development, adaptability with various technologies, and focus on building reliable, user-focused solutions.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center'>
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>

        {projects.length > 6 && (
          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowMore}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:shadow-lg transition-all duration-300"
            >
              {visibleProjects === 6 ? "Show More" : "Show Less"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "");
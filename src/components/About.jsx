import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [descriptionDone, setDescriptionDone] = useState(false);

  const fullTitle = "Welcome to my Portfolio";
  const fullSubtitle = "About Me";
  const fullDescription = "A passionate software developer who enjoys turning ideas into functional and easy-to-use digital solutions. Focused on continuous learning and creating systems that make work simpler and more efficient.";

  useEffect(() => {
    // Type title
    if (!titleDone) {
      if (titleText.length < fullTitle.length) {
        setTimeout(() => {
          setTitleText(fullTitle.slice(0, titleText.length + 1));
        }, 50);
      } else {
        setTitleDone(true);
      }
    } else if (!subtitleDone) {
      // Type subtitle
      if (subtitleText.length < fullSubtitle.length) {
        setTimeout(() => {
          setSubtitleText(fullSubtitle.slice(0, subtitleText.length + 1));
        }, 50);
      } else {
        setSubtitleDone(true);
      }
    } else if (!descriptionDone) {
      // Type description
      if (descriptionText.length < fullDescription.length) {
        setTimeout(() => {
          setDescriptionText(fullDescription.slice(0, descriptionText.length + 1));
        }, 30);
      } else {
        setDescriptionDone(true);
      }
    }
  }, [titleText, subtitleText, descriptionText, titleDone, subtitleDone, descriptionDone, fullTitle, fullSubtitle, fullDescription]);

  return (
    <motion.section
      ref={ref}
      id="about"
      className="min-h-screen py-20 bg-gradient-to-br from-black via-gray-900 to-black flex items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 max-w-7xl mx-auto pt-16 lg:pt-0">
        <div className="text-center lg:text-left animate-slide-in-left">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{titleText}{!titleDone && <span className="animate-pulse text-cyan-400">|</span>}</h1>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-cyan-400">{subtitleText}{titleDone && !subtitleDone && <span className="animate-pulse text-cyan-400">|</span>}</h2>
          <p className="text-lg lg:text-xl leading-relaxed text-gray-300">{descriptionText}{subtitleDone && !descriptionDone && <span className="animate-pulse text-cyan-400">|</span>}</p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <motion.a
              href="#skills"
              className="inline-block mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Show Skills →
            </motion.a>
          </motion.div>
        </div>

        {/* Profile Image Container with Callouts */}
        <div className="text-center animate-slide-in-right">
          <div 
            className="relative inline-block w-full max-w-sm lg:max-w-md mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Spy/Agent Interface Container */}
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-lg backdrop-blur-sm shadow-2xl p-4 lg:p-6">
              {/* Header Bar */}
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/30 px-3 py-2 rounded-t-lg mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-400 text-xs font-mono">DEV_PROFILE.exe</span>
                  </div>
                  <div className="text-cyan-400 text-xs font-mono">LEVEL: JUNIOR</div>
                </div>
              </div>

              {/* Profile Image Wrapper - Relative container for positioning */}
              <div className="relative w-full aspect-square max-w-xs mx-auto">
                {/* Scanning Frame */}
                <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg z-10">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                </div>

                {/* Profile Image - Fully responsive */}
                <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl">
                  <img
                    src="profile.jpg"
                    alt="Agent Profile"
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{ filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)' }}
                  />

                  {/* Glitch Effect Overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  ></div>
                </div>

                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400 z-20"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400 z-20"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400 z-20"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400 z-20"></div>

                {/* Callout 1 - Top Center - Using percentage positioning */}
                <motion.div
                  className="absolute z-30"
                  style={{
                    top: '-10%',
                    left: '40%',
                    transform: 'translateX(-50%)',
                  }}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    y: isHovered ? 0 : 10,
                    scale: isHovered ? 1 : 0.9
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="bg-gray-900/95 text-green-400 font-mono text-xs px-3 py-2 rounded border border-green-500/50 shadow-xl backdrop-blur-sm whitespace-nowrap">
                    <div className="text-green-300 mb-1">// CODING_EFFICIENCY</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400">const</span>
                      <span className="text-yellow-400">efficiency</span>
                      <span className="text-white">=</span>
                      <span className="text-orange-400">95</span>
                      <span className="text-cyan-400">%</span>
                    </div>
                    <div className="w-20 bg-gray-700 rounded-sm h-1 mt-1">
                      <motion.div
                        className="bg-gradient-to-r from-green-400 to-cyan-400 h-1 rounded-sm"
                        initial={{ width: 0 }}
                        animate={{ width: "95%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                  </div>
                  {/* Connector Line - Top - L-shaped */}
                  <svg 
                    className="absolute left-1/2 -translate-x-1/2" 
                    style={{ top: '100%', width: '80px', height: '30px' }}
                    viewBox="0 0 60 30"
                  >
                    <motion.path
                      d="M30 0 L30 20 L10 20"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                    <circle cx="10" cy="20" r="2" fill="white" />
                  </svg>
                </motion.div>

                {/* Callout 2 - Right Side - Using percentage positioning */}
                <motion.div
                  className="absolute z-30"
                  style={{
                    top: '57%',
                    right: '1%',
                    transform: 'translateY(-50%)',
                  }}
                  initial={{ opacity: 0, x: -10, scale: 0.9 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    x: isHovered ? 0 : -10,
                    scale: isHovered ? 1 : 0.9
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {/* Connector Line - Right - Straight */}
                  <svg 
                    className="absolute top-1/2 -translate-y-1/2" 
                    style={{ left: '-40px', width: '40px', height: '50px' }}
                    viewBox="0 0 40 50"
                  >
                    <motion.path
                      d="M40 25 L10 25 L10 5"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    />
                    <circle cx="0" cy="2" r="2" fill="white" />
                  </svg>
                  <div className="bg-gray-900/95 text-blue-400 font-mono text-xs px-3 py-2 rounded border border-blue-500/50 shadow-xl backdrop-blur-sm whitespace-nowrap">
                    <div className="text-blue-300 mb-1">// FULL_STACK</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-400">class</span>
                      <span className="text-yellow-400">Developer</span>
                    </div>
                    <div className="text-cyan-400">level: 88%</div>
                    <div className="w-20 bg-gray-700 rounded-sm h-1 mt-1">
                      <motion.div
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded-sm"
                        initial={{ width: 0 }}
                        animate={{ width: "88%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Callout 3 - Left Side - Using percentage positioning */}
                <motion.div
                  className="absolute z-30"
                  style={{
                    top: '50%',
                    left: '-20%',
                    transform: 'translateY(-50%)',
                  }}
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    x: isHovered ? 0 : 10,
                    scale: isHovered ? 1 : 0.9
                  }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {/* Connector Line - Left - Straight */}
                  <svg 
                    className="absolute top-1/2 -translate-y-1/2" 
                    style={{ right: '-30px', width: '30px', height: '4px' }}
                    viewBox="0 0 30 4"
                  >
                    <motion.path
                      d="M0 2 L30 2"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    />
                    <circle cx="30" cy="2" r="2" fill="white" />
                  </svg>
                  <div className="bg-gray-900/95 text-purple-400 font-mono text-xs px-3 py-2 rounded border border-purple-500/50 shadow-xl backdrop-blur-sm whitespace-nowrap">
                    <div className="text-purple-300 mb-1">// ALGORITHM_DESIGN</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-400">function</span>
                      <span className="text-yellow-400">optimize</span>
                    </div>
                    <div className="text-cyan-400">complexity: O(92%)</div>
                    <div className="w-20 bg-gray-700 rounded-sm h-1 mt-1">
                      <motion.div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-sm"
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Data Streams */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-cyan-400/0"
                      style={{
                        height: '100%',
                        left: `${25 + i * 25}%`,
                        top: 0,
                      }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        scaleY: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Developer ID */}
              <div className="text-center mt-4">
                <h3 className="text-cyan-400 font-mono text-sm mb-1">DEV ID</h3>
                <p className="text-white font-bold">EUGENE_MUSA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;

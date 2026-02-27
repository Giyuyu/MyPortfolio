import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });


  // Hardcoded global callout positions (same across all devices)
  const [callout1Pos, setCallout1Pos] = useState({ x: 70, y: 45 });
  const [callout2Pos, setCallout2Pos] = useState({ x: 22, y: 50 });
  const [callout3Pos, setCallout3Pos] = useState({ x: -121, y: -150 });
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [typedKeys, setTypedKeys] = useState('');


  // Typewriter for main text
  const fullTitle = "Welcome to my Portfolio";
  const fullSubtitle = "About Me";
  const fullDescription = "A passionate software developer who enjoys turning ideas into functional and easy-to-use digital solutions. Focused on continuous learning and creating systems that make work simpler and more efficient.";

  const [titleText, setTitleText] = useState('');
  const [subtitleText, setSubtitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [descriptionDone, setDescriptionDone] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isHovered]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setTypedKeys(prev => prev + event.key);
      if (typedKeys + event.key === 'eugene') {
        setEditMode(prev => !prev);
        setTypedKeys('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedKeys]);



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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 max-w-7xl mx-auto">
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
        <div className="text-center animate-slide-in-right relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {/* Spy/Agent Interface Container */}
          <div className="relative mx-auto w-80 h-96 lg:w-88 lg:h-104 bg-gradient-to-br from-gray-900/80 to-black/80 border border-cyan-500/30 rounded-lg backdrop-blur-sm shadow-2xl">
            {/* Header Bar */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/30 px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-400 text-xs font-mono">DEV_PROFILE.exe</span>
                </div>
                <div className="text-cyan-400 text-xs font-mono">LEVEL: JUNIOR</div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6">
              {/* Profile Image with Spy Interface */}
              <div className="relative mb-4">
                <motion.div
                  className="relative w-48 h-48 lg:w-64 lg:h-64 mx-auto"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Scanning Frame */}
                  <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                  </div>

                  {/* Profile Image */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl">
                    <img
                      src="profile.jpg"
                      alt="Agent Profile"
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110 group-hover:contrast-110"
                    />

                    {/* Glitch Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-cyan-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-cyan-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400"></div>
                </motion.div>
              </div>

              {/* Developer ID */}
              <div className="text-center">
                <h3 className="text-cyan-400 font-mono text-sm mb-1">DEV ID</h3>
                <p className="text-white font-bold">EUGENE_MUSA</p>
              </div>
            </div>

            {/* Data Streams */}
            <div className="absolute inset-0 pointer-events-none">
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
  
            {/* Floating Callouts Above Frame with White Connecting Lines */}
            <motion.div
              className={`absolute -top-12 left-1/2 transform -translate-x-1/2 z-10 ${editMode ? 'cursor-move' : ''}`}
              animate={{ opacity: isHovered ? 1 : 0, rotate: isHovered ? 1 : -5, filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ x: callout1Pos.x, y: callout1Pos.y }}
              drag={editMode}
              onDragEnd={(event, info) => { setCallout1Pos(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y })); console.log('Callout 1 position - x:', prev.x + info.offset.x, 'y:', prev.y + info.offset.y); }}
            >
              <div className="relative">
                <div className="bg-gray-900/95 text-green-400 font-mono text-xs px-3 py-2 rounded border border-green-500/50 shadow-xl backdrop-blur-sm">
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
                {/* White connecting line */}
                <motion.svg
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-40 h-20"
                  viewBox="0 0 160 80"
                  style={{ x: 0, y: 0 }}
                >
                  <motion.path
                    key={animationKey}
                    d="M40 50 L80 50 L80 0"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                  <circle cx="40" cy="50" r="3" fill="white" />
                  <circle cx="80" cy="0" r="3" fill="white" />
                </motion.svg>
              </div>
            </motion.div>
  
            <motion.div
              className={`absolute top-1/2 -right-36 transform -translate-y-1/2 z-10 ${editMode ? 'cursor-move' : ''}`}
              animate={{ opacity: isHovered ? 1 : 0, rotate: isHovered ? -1 : 5, filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              style={{ x: callout2Pos.x, y: callout2Pos.y }}
              drag={editMode}
              onDragEnd={(event, info) => { setCallout2Pos(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y })); console.log('Callout 2 position - x:', prev.x + info.offset.x, 'y:', prev.y + info.offset.y); }}
            >
              <div className="relative">
                <div className="bg-gray-900/95 text-blue-400 font-mono text-xs px-3 py-2 rounded border border-blue-500/50 shadow-xl backdrop-blur-sm">
                  <div className="text-blue-300 mb-1">// FULL_STACK_MASTERY</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400">class</span>
                    <span className="text-yellow-400">Developer</span>
                    <span className="text-white">extends</span>
                    <span className="text-green-400">FullStack</span>
                    <span className="text-white">{'{'}</span>
                  </div>
                  <div className="text-cyan-400 ml-2">level: 88%</div>
                  <div className="w-20 bg-gray-700 rounded-sm h-1 mt-1">
                    <motion.div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded-sm"
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </div>
                </div>
                {/* White connecting line */}
                <motion.svg
                  className="absolute top-1/2 -left-32 transform -translate-y-1/2 w-32 h-40"
                  viewBox="0 0 128 160"
                  style={{ x: 0, y: 0 }}
                >
                  <motion.path
                    key={animationKey}
                    d="M50 40 L50 80 L128 80"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <circle cx="50" cy="40" r="3" fill="white" />
                  <circle cx="128" cy="80" r="3" fill="white" />
                </motion.svg>
              </div>
            </motion.div>
  
            <motion.div
              className={`absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-10 ${editMode ? 'cursor-move' : ''}`}
              animate={{ opacity: isHovered ? 1 : 0, rotate: isHovered ? 1 : -5, filter: isHovered ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              style={{ x: callout3Pos.x, y: callout3Pos.y }}
              drag={editMode}
              onDragEnd={(event, info) => { setCallout3Pos(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y })); console.log('Callout 3 position - x:', prev.x + info.offset.x, 'y:', prev.y + info.offset.y); }}
            >
              <div className="relative">
                <div className="bg-gray-900/95 text-purple-400 font-mono text-xs px-3 py-2 rounded border border-purple-500/50 shadow-xl backdrop-blur-sm">
                  <div className="text-purple-300 mb-1">// ALGORITHM_DESIGN</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400">function</span>
                    <span className="text-yellow-400">optimize</span>
                    <span className="text-white">()</span>
                    <span className="text-white">{'{'}</span>
                  </div>
                  <div className="text-cyan-400 ml-2">complexity: O(92%)</div>
                  <div className="w-20 bg-gray-700 rounded-sm h-1 mt-1">
                    <motion.div
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-sm"
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </div>
                </div>
                {/* White connecting line */}
                <motion.svg
                  className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-20"
                  viewBox="0 0 160 80"
                  style={{ x: 0, y: 0 }}
                >
                  <motion.path
                    key={animationKey}
                    d="M120 30 L80 30 L80 80"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                  <circle cx="120" cy="30" r="3" fill="white" />
                  <circle cx="80" cy="80" r="3" fill="white" />
                </motion.svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
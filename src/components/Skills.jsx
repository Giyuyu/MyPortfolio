import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useInView as useIntersectionInView } from 'react-intersection-observer';

// Professional SVG Icons
const Icons = {
  Frontend: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  Backend: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  TechStacks: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Mobile: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Desktop: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Database: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  Cloud: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  Tools: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  Project: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/>
      <path d="M9 12h6"/>
      <path d="M9 16h6"/>
    </svg>
  ),
};

const getProficiencyColor = (level) => {
  if (level >= 90) return '#10b981';
  if (level >= 75) return '#3b82f6';
  if (level >= 60) return '#f59e0b';
  return '#6b7280';
};

const getProficiencyLabel = (level) => {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Beginner';
};

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: 'Frontend',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 95 },
      { name: 'JavaScript', level: 90 },
      { name: 'React.js', level: 90 },
      { name: 'Vue.js', level: 80 },
      { name: 'Bootstrap', level: 90 },
      { name: 'Tailwind', level: 85 }
    ],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    iconColor: '#ec4899'
  },
  {
    title: 'Backend Development',
    icon: 'Backend',
    skills: [
      { name: 'PHP', level: 85 },
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 80 },
      { name: 'C#', level: 75 }
    ],
    gradient: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
    iconColor: '#f97316'
  },
  {
    title: 'Tech Stacks',
    icon: 'TechStacks',
    skills: [
      { name: 'Vanilla', level: 90 },
      { name: 'MERN', level: 85 },
      { name: 'WAMP', level: 80 }
    ],
    gradient: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    iconColor: '#22c55e'
  },
  {
    title: 'Mobile Development',
    icon: 'Mobile',
    skills: [
      { name: 'Android (Java)', level: 90 },
      { name: 'Android (XML)', level: 85 }
    ],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    iconColor: '#3b82f6'
  },
  {
    title: 'Desktop Development',
    icon: 'Desktop',
    skills: [
      { name: 'Python (Tkinter)', level: 70 }
    ],
    gradient: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
    iconColor: '#eab308'
  },
  {
    title: 'Database Management',
    icon: 'Database',
    skills: [
      { name: 'MySQL', level: 90 },
      { name: 'NoSQL', level: 80 },
      { name: 'SQLite', level: 85 },
      { name: 'MS SQL', level: 85 }
    ],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    iconColor: '#a855f7'
  },
  {
    title: 'Cloud & DevOps',
    icon: 'Cloud',
    skills: [
      { name: 'Firebase', level: 80 },
      { name: 'GitHub', level: 90 }
    ],
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
    iconColor: '#0ea5e9'
  },
  {
    title: 'Tools & Design',
    icon: 'Tools',
    skills: [
      { name: 'Visual Studio', level: 80 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 75 }
    ],
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    iconColor: '#14b8a6'
  },
  {
    title: 'Project Management & Quality Assurance',
    icon: 'Project',
    skills: [
      { name: 'Scrum', level: 80 },
      { name: 'Kanban', level: 80 },
      { name: 'Automated Testing', level: 85 },
      { name: 'Manual Testing', level: 90 }
    ],
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    iconColor: '#6366f1'
  }
];

// Animation variants for lazy loading / viewport detection
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const skillTagVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Lazy loaded skill card component
const LazySkillCard = ({ category, index }) => {
  const [ref, inView] = useIntersectionInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = Icons[category.icon];

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative h-full"
    >
      {/* Main Card */}
      <div 
        className="relative overflow-visible rounded-2xl h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'rgba(17, 24, 39, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(75, 85, 99, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Gradient Top Border */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: category.gradient }}
          animate={{ 
            backgroundSize: inView ? "200% 200%" : "100% 100%" 
          }}
          transition={{ 
            backgroundSize: { duration: 3, repeat: Infinity, repeatType: "reverse" }
          }}
        />

        {/* Background Glow */}
        <motion.div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: `radial-gradient(circle at 50% 0%, ${category.iconColor}26 0%, transparent 70%)`
          }}
        />

        <div className="p-5 relative z-10">
          {/* Header */}
          <div className="flex items-center mb-4">
            <motion.div 
              className="p-2 rounded-xl mr-3"
              style={{ 
                background: `${category.iconColor}20`,
                color: category.iconColor
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <IconComponent />
            </motion.div>
            <h3 className="text-lg font-semibold text-white">{category.title}</h3>
          </div>

          {/* Skills Tags */}
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {category.skills.map((skill, skillIndex) => (
              <SkillTag 
                key={skill.name} 
                skill={skill} 
                gradient={category.gradient}
                delay={skillIndex * 0.05}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillTag = ({ skill, gradient, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={skillTagVariants}
    >
      <motion.div 
        className="px-3 py-1.5 rounded-lg text-sm text-gray-200 bg-gray-800/50 border border-gray-700 hover:border-gray-500 transition-colors flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>{skill.name}</span>
        <motion.div 
          className="w-2 h-2 rounded-full"
          animate={{ 
            boxShadow: isHovered 
              ? `0 0 12px ${getProficiencyColor(skill.level)}` 
              : `0 0 8px ${getProficiencyColor(skill.level)}`
          }}
          style={{ 
            background: getProficiencyColor(skill.level)
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-[9999] pointer-events-none"
          >
            <div 
              className="p-3 rounded-lg shadow-xl whitespace-nowrap"
              style={{
                background: 'rgba(17, 24, 39, 0.98)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${getProficiencyColor(skill.level)}40`,
                boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 20px ${getProficiencyColor(skill.level)}20`
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-semibold text-sm">{skill.name}</span>
                <span 
                  className="text-xs px-1.5 py-0.5 rounded font-medium"
                  style={{ 
                    background: getProficiencyColor(skill.level),
                    color: '#000'
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div className="w-28 h-1.5 bg-gray-700/50 rounded-full overflow-hidden mb-1">
                <motion.div 
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ background: gradient }}
                />
              </div>
              <div 
                className="text-xs font-medium"
                style={{ color: getProficiencyColor(skill.level) }}
              >
                {getProficiencyLabel(skill.level)}
              </div>
            </div>
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: `6px solid ${getProficiencyColor(skill.level)}40`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = () => {
  const { ref, inView } = useIntersectionInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      id="skills"
      className="py-24 relative overflow-visible"
      style={{
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['⚡', '🔮', '✨', '🚀', '💫', '🌟'].map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${10 + (index * 15)}%`,
              top: `${20 + (index % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            {icon}
          </motion.div>
        ))}

        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            top: '-10%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
            bottom: '-5%',
            left: '-5%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="px-4 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-4 py-1.5 rounded-full bg-gray-800/50 border border-gray-700 text-cyan-400 text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            My Expertise
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Skills & <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Hover over each skill to see the proficiency level and progress.
          </p>
        </motion.div>

        {/* Skills Grid with Lazy Loading */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, index) => (
            <LazySkillCard 
              key={category.title} 
              category={category} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <p className="text-gray-500 text-sm mb-4">Proficiency Levels</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Expert', color: '#10b981', desc: 'Production-ready' },
              { label: 'Advanced', color: '#3b82f6', desc: 'Deep knowledge' },
              { label: 'Intermediate', color: '#f59e0b', desc: 'Comfortable' },
              { label: 'Beginner', color: '#6b7280', desc: 'Learning' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span 
                  className="w-3 h-3 rounded-full"
                  animate={{ 
                    boxShadow: [`0 0 10px ${item.color}`, `0 0 20px ${item.color}`, `0 0 10px ${item.color}`]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: item.color }}
                />
                <span className="text-gray-300 text-sm font-medium">{item.label}</span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-500 text-xs">{item.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [filter, setFilter] = useState('All');
  const [expandedTech, setExpandedTech] = useState(null);

  const toggleTechExpand = (title) => {
    setExpandedTech(expandedTech === title ? null : title);
  };

  const projects = [
    {
      title: 'STI Faculty Schedule Assigner and Locator',
      description: 'A web-based system designed to assign class schedules and locate faculty members within the campus.',
      image: 'locator.png',
      link: '#',
      github: '#',
      tech: ['Python', 'React.js', 'Node.js', 'MySQL', 'Express', 'Bootstrap'],
      category: ['Web App', 'Desktop']
    },
    {
      title: 'QC Bus Tracker',
      description: 'A GPS-enabled bus tracking web and mobile application for commuters in Quezon City.',
      image: 'qc.png',
      link: '#',
      github: '#',
      tech: ['React.js', 'Firebase', 'Google Maps API'],
      category: 'Web App'
    },
    {
      title: 'POS and Sales Monitoring System',
      description: 'A point-of-sale system with integrated sales tracking, daily reports, and receipt generation.',
      image: 'POS.png',
      link: '#',
      github: '#',
      tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      category: 'Web App',
    },
    {
      title: 'StockCheck: Inventory Management System',
      description: 'Inventory management system for small businesses to monitor product levels and purchase history.',
      image: 'stockcheck.png',
      link: '#',
      github: '#',
      tech: ['Vue.js', 'Node.js', 'MySQL', 'Tailwind'],
      category: 'Web App',
    },
    {
      title: 'ToolCart: Hardware E-commerce Platform',
      description: 'An e-commerce solution tailored for small hardware businesses.',
      image: 'ecom.png',
      link: '#',
      github: '#',
      tech: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
      category: 'Web App',
    },
    {
      title: 'OWL: Open-World Learning',
      description: 'An Android-based educational quiz application designed to make learning interactive and engaging.',
      image: 'owl.png',
      link: '#',
      github: '#',
      tech: ['Java', 'XML', 'Firebase'],
      category: 'Mobile'
    },
  ];

  const categories = ['All', 'Web App', 'Mobile', 'Desktop'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter);

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="px-4 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          My Projects
        </motion.h2>

        <motion.p
          className="text-gray-400 text-center mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A showcase of my technical skills and creative solutions
        </motion.p>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 212, 255, 0.15)"
                }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  
                  {/* Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.a
                      href={project.link}
                      className="bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href={project.github}
                      className="bg-white/10 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {Array.isArray(project.category) 
                      ? project.category.map(cat => (
                          <span key={cat} className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                            {cat}
                          </span>
                        ))
                      : (
                          <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                            {project.category}
                          </span>
                        )
                    }
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-gray-500 text-sm">{project.year}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {(expandedTech === project.title ? project.tech : project.tech.slice(0, 3)).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-700/50 text-cyan-300 text-xs rounded-full border border-gray-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && expandedTech !== project.title && (
                      <button 
                        onClick={() => toggleTechExpand(project.title)}
                        className="px-2.5 py-1 bg-gray-700/50 text-cyan-400 text-xs rounded-full hover:bg-gray-600/50 transition-colors"
                      >
                        +{project.tech.length - 3} more
                      </button>
                    )}
                    {project.tech.length > 3 && expandedTech === project.title && (
                      <button 
                        onClick={() => toggleTechExpand(project.title)}
                        className="px-2.5 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full hover:bg-gray-600/50 transition-colors"
                      >
                        show less
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold shadow-lg shadow-cyan-500/30"
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 212, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;

import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header
      className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-4 border-b border-cyan-500/30 shadow-lg shadow-cyan-500/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-4" aria-label="Main navigation">
        <motion.h1
          className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          My Portfolio
        </motion.h1>
        <motion.ul
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {['About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
            <motion.li
              key={item}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <a href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors duration-300 relative group">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.header>
  );
};

export default Header;
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`group rounded-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      } shadow-md transition-all duration-300 hover:shadow-lg`}
    >
      <div className="relative overflow-hidden h-48 sm:h-56">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-between items-center">
            <div className="flex space-x-2">
              {project.tags.map((tag, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-2 py-1 text-xs font-semibold rounded-full bg-teal-500/80 text-white"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold mb-2"
        >
          {project.title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {project.description}
        </motion.p>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-3">
            {project.github && (
              <motion.a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                } transition-colors duration-300`}
                aria-label="GitHub Repository"
              >
                <Github size={18} />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                } transition-colors duration-300`}
                aria-label="Live Demo"
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>
          
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Link 
              to={`/project/${project.id}`}
              className="text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
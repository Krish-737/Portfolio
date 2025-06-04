import React from 'react';
import SectionTitle from '../components/SectionTitle';
import SkillBar from '../components/SkillBar';
import { skills, tools } from '../data/skills';
import { useTheme } from '../context/ThemeContext';

const Skills: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <section 
      id="skills" 
      className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Skills & Expertise" 
          subtitle="My technical skills and professional tools that I've acquired over the years."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-fadeIn">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="w-8 h-8 mr-3 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              Technical Skills
            </h3>
            
            <div>
              {skills.map((skill) => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  percentage={skill.percentage} 
                />
              ))}
            </div>
          </div>
          
          <div className="animate-fadeIn animation-delay-200">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="w-8 h-8 mr-3 rounded-lg bg-teal-500 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </span>
              Tools & Technologies
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 flex items-center`}
                >
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                    <span className="text-teal-500">{tool.icon}</span>
                  </div>
                  <span className="font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">{name}</h3>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{percentage}%</span>
      </div>
      <div 
        className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
      >
        <div 
          className="h-2 rounded-full bg-teal-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
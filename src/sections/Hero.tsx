import React from 'react';
import { ArrowDown } from 'lucide-react';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const { isDarkMode } = useTheme();

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-12 mb-12 md:mb-0 animate-fadeIn">
            <span className="inline-block text-teal-500 font-medium mb-2">Hello, I'm</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Kishorekumar S
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>I build </span>
              <span className="text-teal-500">amazing web experiences</span>
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-lg`}>
              A passionate Full-Stack Developer from Chennai, India. I enjoy building responsive, user-friendly web applications and creating smooth backend systems. I'm passionate about coding, automation, and cloud deployment, and I love bringing ideas to life through technology. Always eager to learn and improve, I focus on writing clean, efficient, and scalable code.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={scrollToProjects}
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Contact Me
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 animate-fadeIn animate-delay-200">
            <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-2 transform transition-all duration-500 hover:scale-[1.02]`}>
              <img
                src="https://img.freepik.com/premium-photo/businessman-looks-out-window-sees-financial-charts-economy-investments-concept-ai-generated_255605-904.jpg"
                alt="Developer coding"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <button 
            onClick={scrollToProjects}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-white' : 'bg-white text-gray-600 hover:text-gray-900'} shadow-lg hover:shadow-xl transition-all duration-300`}
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
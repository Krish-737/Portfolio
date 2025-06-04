import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { FileDown } from 'lucide-react';

interface AboutContent {
  name: string;
  email: string;
  location: string;
  bio: string;
  experience: string;
  profile_image: string;
  cv_url: string | null;
}

const About: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data, error } = await supabase
          .from('about')
          .select('*')
          .maybeSingle();

        if (error) throw error;
        setAboutContent(data);
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);
  
  const handleDownloadCV = () => {
    if (!aboutContent?.cv_url) {
      toast.error('CV is not available');
      return;
    }
    window.open(aboutContent.cv_url, '_blank');
  };

  if (loading) {
    return (
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </section>
    );
  }

  if (!aboutContent) {
    return null;
  }

  // Split bio into paragraphs
  const bioParagraphs = aboutContent.bio.split('\n').filter(p => p.trim() !== '');
  
  return (
    <section 
      id="about" 
      className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-5/12 animate-fadeIn">
            <div className="relative">
              <div className={`absolute -top-4 -left-4 w-24 h-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg -z-10`}></div>
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg -z-10`}></div>
              <img 
                src={aboutContent.profile_image}
                alt={aboutContent.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-5 -right-5 bg-teal-500 text-white py-2 px-4 rounded-lg shadow-lg">
                <span className="font-bold">{aboutContent.experience}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-7/12 animate-fadeIn animation-delay-200">
            <SectionTitle 
              title="About Me" 
              subtitle="Get to know more about me and my background."
            />
            
            <div className="space-y-6 mb-8">
              {bioParagraphs.map((paragraph, index) => (
                <p 
                  key={index} 
                  className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Name:</h4>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {aboutContent.name}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Email:</h4>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {aboutContent.email}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">From:</h4>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {aboutContent.location}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Experience:</h4>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {aboutContent.experience}
                </p>
              </div>
            </div>
            
            {aboutContent.cv_url && (
              <Button
                size="lg"
                onClick={handleDownloadCV}
                className="flex items-center gap-2"
              >
                <FileDown size={20} />
                Download CV
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
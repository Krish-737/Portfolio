import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import { Pencil } from 'lucide-react';

interface AboutContent {
  id: string;
  name: string;
  email: string;
  location: string;
  bio: string;
  experience: string;
  profile_image: string;
  cv_url: string | null;
}

const AboutManager: React.FC = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      
      setAboutContent(data);
      if (!data) {
        setIsEditing(true); // Show form for initial data entry
      }
    } catch (error) {
      toast.error('Failed to fetch about content');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedContent = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      location: formData.get('location') as string,
      bio: formData.get('bio') as string,
      experience: formData.get('experience') as string,
      profile_image: formData.get('profile_image') as string,
      cv_url: formData.get('cv_url') as string || null,
    };

    try {
      let error;
      if (aboutContent?.id) {
        const { error: updateError } = await supabase
          .from('about')
          .update(updatedContent)
          .eq('id', aboutContent.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('about')
          .insert([updatedContent]);
        error = insertError;
      }

      if (error) throw error;
      
      toast.success('About content updated successfully');
      setIsEditing(false);
      fetchAboutContent();
    } catch (error) {
      toast.error('Failed to update about content');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
const getDriveDirectLink = (url: string) => {
  if (!url) return '';
  const match = url.match(/\/d\/([^/]+)(?:\/|$)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage About Section</h2>
        {!isEditing && aboutContent && (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Pencil size={18} />
            Edit Content
          </Button>
        )}
      </div>

      {!isEditing && aboutContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Profile Image</h3>
              <div className="mt-2">
                <img
                  src={getDriveDirectLink(aboutContent.profile_image)}
                  alt={aboutContent.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
              <p className="mt-1">{aboutContent.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
              <p className="mt-1">{aboutContent.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
              <p className="mt-1">{aboutContent.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CV</h3>
              {aboutContent.cv_url ? (
                <a
                  href={aboutContent.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-teal-500 hover:text-teal-600"
                >
                  View CV
                </a>
              ) : (
                <p className="mt-1 text-gray-500">No CV uploaded</p>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</h3>
              <p className="mt-1 whitespace-pre-wrap">{aboutContent.bio}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Experience</h3>
              <p className="mt-1">{aboutContent.experience}</p>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                defaultValue={aboutContent?.name}
                className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                defaultValue={aboutContent?.email}
                className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                name="location"
                defaultValue={aboutContent?.location}
                className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience</label>
              <input
                name="experience"
                defaultValue={aboutContent?.experience}
                className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image URL</label>
            <input
              name="profile_image"
              defaultValue={aboutContent?.profile_image}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CV URL</label>
            <input
              name="cv_url"
              defaultValue={aboutContent?.cv_url || ''}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
              placeholder="URL to your CV file"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              defaultValue={aboutContent?.bio}
              className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
              rows={6}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            {aboutContent && (
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            )}
            <Button type="submit">
              {aboutContent ? 'Update Content' : 'Save Content'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AboutManager;
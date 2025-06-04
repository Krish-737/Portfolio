import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  imageUrl: string;
}

const TechNewsManager: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('tech_news')
        .select('*')
        .order('publishedAt', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      toast.error('Failed to fetch news');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newsData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      url: formData.get('url') as string,
      source: formData.get('source') as string,
      imageUrl: formData.get('imageUrl') as string,
      publishedAt: new Date().toISOString(),
    };

    try {
      let error;
      if (editingNews?.id) {
        const { error: updateError } = await supabase
          .from('tech_news')
          .update(newsData)
          .eq('id', editingNews.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('tech_news')
          .insert([newsData]);
        error = insertError;
      }

      if (error) throw error;
      
      toast.success(`News ${editingNews ? 'updated' : 'added'} successfully`);
      setIsModalOpen(false);
      setEditingNews(null);
      fetchNews();
    } catch (error) {
      toast.error(`Failed to ${editingNews ? 'update' : 'add'} news`);
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;
    
    try {
      const { error } = await supabase
        .from('tech_news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('News deleted successfully');
      fetchNews();
    } catch (error) {
      toast.error('Failed to delete news');
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Tech News</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Add News
        </Button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="border dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Source: {item.source}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingNews(item);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Pencil size={16} />
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {news.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No news found. Click "Add News" to create one.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              {editingNews ? 'Edit News' : 'Add News'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="title"
                  defaultValue={editingNews?.title}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingNews?.description}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  name="url"
                  type="url"
                  defaultValue={editingNews?.url}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Source</label>
                <input
                  name="source"
                  defaultValue={editingNews?.source}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  name="imageUrl"
                  type="url"
                  defaultValue={editingNews?.imageUrl}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingNews(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingNews ? 'Update News' : 'Add News'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechNewsManager;
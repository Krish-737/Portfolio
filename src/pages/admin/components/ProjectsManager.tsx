import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Project } from '../../../types';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      toast.error('Failed to fetch projects');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      github: formData.get('github') as string || null,
      live_url: formData.get('liveUrl') as string || null,
    };

    try {
      let error;
      if (editingProject?.id) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([projectData]);
        error = insertError;
      }

      if (error) throw error;
      
      toast.success(`Project ${editingProject ? 'updated' : 'added'} successfully`);
      setIsModalOpen(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast.error(`Failed to ${editingProject ? 'update' : 'add'} project`);
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
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
        <h2 className="text-xl font-bold">Manage Projects</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Add Project
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingProject(project);
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
                  onClick={() => handleDelete(project.id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No projects found. Click "Add Project" to create one.
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              {editingProject ? 'Edit Project' : 'Add Project'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="title"
                  defaultValue={editingProject?.title}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingProject?.description}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  name="image"
                  defaultValue={editingProject?.image}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <input
                  name="tags"
                  defaultValue={editingProject?.tags.join(', ')}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  name="github"
                  defaultValue={editingProject?.github}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Live URL</label>
                <input
                  name="liveUrl"
                  defaultValue={editingProject?.liveUrl}
                  className="w-full px-4 py-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProject(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
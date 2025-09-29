"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/admin/ProjectForm';
import { Project } from '@/components/ProjectCard';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboardPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        toast.error('Failed to fetch projects.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching projects.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleFormSubmit = async (projectData: Omit<Project, 'id'> | Project) => {
    const isEditing = 'id' in projectData;
    const url = isEditing ? `/api/projects/${projectData.id}` : '/api/projects';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    if (res.ok) {
      toast.success(`Project ${isEditing ? 'updated' : 'added'} successfully!`);
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } else {
      toast.error(`Failed to ${isEditing ? 'update' : 'add'} project.`);
    }
  };

  const handleDelete = async (projectId: number) => {
    const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Project deleted successfully!');
      fetchProjects();
    } else {
      toast.error('Failed to delete project.');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="my-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <Button onClick={handleAddNew}>Add New Project</Button>
        </div>

        {showForm && (
          <div className="mb-8">
            <ProjectForm
              project={editingProject}
              onSubmit={handleFormSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        <div className="bg-card rounded-lg shadow-md">
          {isLoading ? (
            <p className="p-8 text-center">Loading projects...</p>
          ) : (
            <ul className="divide-y divide-border">
              {projects.map((project) => (
                <li key={project.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.tags.join(', ')}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>Edit</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the project from your portfolio.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(project.id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
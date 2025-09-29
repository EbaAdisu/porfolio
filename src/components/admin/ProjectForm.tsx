"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/components/ProjectCard";

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (project: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSubmit, onCancel }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [image, setImage] = useState(project?.image || '');
  const [tags, setTags] = useState(project?.tags.join(', ') || '');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProjectData = {
      title,
      description,
      image,
      tags: tags.split(',').map(tag => tag.trim()),
      githubUrl,
      liveUrl,
    };
    // The actual submission logic will be handled by the parent component
    // For now, we just call the passed-in onSubmit function
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? 'Edit Project' : 'Add New Project'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/projects/new-project.jpg" required />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="React, Next.js, TypeScript" required />
          </div>
          <div>
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input id="githubUrl" type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="liveUrl">Live Demo URL</Label>
            <Input id="liveUrl" type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} required />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">{project ? 'Update Project' : 'Add Project'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
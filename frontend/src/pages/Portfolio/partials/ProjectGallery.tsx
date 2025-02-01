import { useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Project } from "../models/types";

interface ProjectGalleryProps {
  isEditing?: boolean;
  onEditToggle?: () => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  isEditing = false,
  onEditToggle,
}) => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB"],
      liveUrl: "https://demo.com",
      githubUrl: "https://github.com",
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Real-time task management with socket.io",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      category: "Web App",
      technologies: ["Vue.js", "Express", "Socket.io"],
      liveUrl: "https://demo.com",
      githubUrl: "https://github.com",
    },
    {
      id: 3,
      title: "AI Image Generator",
      description: "AI-powered image generation using DALL-E API",
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800",
      category: "AI/ML",
      technologies: ["Python", "OpenAI", "Flask"],
      liveUrl: "https://demo.com",
      githubUrl: "https://github.com",
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-gray-100">
          Featured Projects
        </h2>
        <button
          onClick={onEditToggle}
          className="text-emerald-600 hover:text-emerald-500 dark:hover:text-emerald-400"
        >
          <FaEdit className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/50"
          >
            {/* Project Image */}
            <div className="aspect-video relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              </div>

              {/* Edit Overlay */}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 dark:hover:bg-emerald-700">
                    Edit Project
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add New Project Button */}
        {isEditing && (
          <button className="h-full min-h-[300px] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 hover:border-emerald-600 dark:hover:border-emerald-500 transition-colors">
            <span className="text-lg">+ Add New Project</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery;

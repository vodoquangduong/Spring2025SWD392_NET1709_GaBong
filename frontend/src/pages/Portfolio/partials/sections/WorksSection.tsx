import { useState } from "react";
import {
  FaCode,
  FaEdit,
  FaEye,
  FaFilter,
  FaLink,
  FaMobile,
  FaPalette,
  FaPlus,
  FaSort,
  FaTrash,
} from "react-icons/fa";
import { WorkItem } from "../../models/types";

const WorksSection = () => {
  const [works] = useState<WorkItem[]>([
    {
      id: "1",
      title: "E-commerce Platform",
      description:
        "A modern e-commerce platform built with React and Node.js. Features include real-time inventory, payment integration, and admin dashboard.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
      category: "Web Development",
      tags: ["React", "Node.js", "MongoDB", "Redux", "AWS"],
      link: "https://project1.com",
      stats: {
        views: 1240,
        likes: 89,
        comments: 15,
      },
    },
    {
      id: "2",
      title: "Social Media Dashboard",
      description:
        "Analytics dashboard for social media management with real-time data visualization and reporting tools.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      category: "UI/UX Design",
      tags: ["Vue.js", "D3.js", "Firebase", "Tailwind"],
      link: "https://project2.com",
      stats: {
        views: 856,
        likes: 67,
        comments: 9,
      },
    },
    {
      id: "3",
      title: "Mobile Fitness App",
      description:
        "A comprehensive fitness tracking application with workout plans, nutrition tracking, and social features.",
      image:
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Mobile Development",
      tags: ["React Native", "Firebase", "Redux", "Node.js"],
      link: "https://project3.com",
      stats: {
        views: 1120,
        likes: 93,
        comments: 12,
      },
    },
    {
      id: "4",
      title: "AI-Powered Chat Platform",
      description:
        "Real-time chat application with AI-powered language translation and content moderation.",
      image:
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2106&q=80",
      category: "AI & Machine Learning",
      tags: ["Python", "TensorFlow", "WebSocket", "React"],
      link: "https://project4.com",
      stats: {
        views: 2340,
        likes: 187,
        comments: 28,
      },
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Showcase your best work to potential clients
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-lg transition-all">
          <FaPlus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter and Sort */}
      <div className="flex flex-wrap gap-4 pb-6">
        <div className="relative">
          <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500">
            <option value="">All Categories</option>
            <option value="web">
              <FaCode className="inline mr-2" /> Web Development
            </option>
            <option value="mobile">
              <FaMobile className="inline mr-2" /> Mobile Apps
            </option>
            <option value="design">
              <FaPalette className="inline mr-2" /> UI/UX Design
            </option>
          </select>
        </div>

        <div className="relative">
          <FaSort className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500">
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <div
            key={work.id}
            className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-emerald-500/10"
          >
            {/* Project Image */}
            <div className="relative aspect-video">
              <img
                src={work.image}
                alt={work.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all hover:scale-110">
                  <FaEye className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all hover:scale-110">
                  <FaEdit className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-all hover:scale-110">
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {work.title}
                  </h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {work.category}
                  </p>
                </div>
                {work.link && (
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <FaLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                {work.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-600/10 to-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer">
                  <FaEye className="w-4 h-4" />
                  {work.stats.views}
                </span>
                <span className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer">
                  👍 {work.stats.likes}
                </span>
                <span className="flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer">
                  💬 {work.stats.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksSection;

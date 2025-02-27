import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaCode,
  FaDesktop,
  FaEdit,
  FaServer,
  FaStar,
} from "react-icons/fa";
import { Service } from "../models/types";

interface ServicesOfferedProps {
  isEditing?: boolean;
  onEditToggle?: () => void;
}

const ServicesOffered: React.FC<ServicesOfferedProps> = ({
  isEditing = false,
  onEditToggle,
}) => {
  const [services] = useState<Service[]>([
    {
      id: 1,
      title: "E-commerce Platform Development",
      description:
        "Built a full-featured e-commerce platform with React and Node.js",
      icon: <FaCode />,
      price: {
        amount: 12000,
        unit: "project",
      },
      status: "completed",
      clientSatisfaction: 5,
      completionDate: "Feb 2024",
      clientName: "TechMart Solutions",
      testimonial:
        "Exceptional work and delivered ahead of schedule. Highly recommended!",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      keyAchievements: [
        "Increased conversion rate by 45%",
        "Reduced page load time by 60%",
        "Implemented secure payment gateway",
        "Built scalable microservices architecture",
      ],
    },
    {
      id: 2,
      title: "Healthcare Management System",
      description: "Developed a comprehensive healthcare management solution",
      icon: <FaDesktop />,
      price: {
        amount: 15000,
        unit: "project",
      },
      status: "completed",
      clientSatisfaction: 4.8,
      completionDate: "Dec 2023",
      clientName: "MediCare Plus",
      testimonial:
        "Outstanding attention to detail and excellent communication throughout the project.",
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
      keyAchievements: [
        "Streamlined patient management process",
        "Integrated with existing hospital systems",
        "Implemented HIPAA compliance measures",
        "Reduced administrative workload by 35%",
      ],
    },
    {
      id: 3,
      title: "Real-time Analytics Dashboard",
      description: "Currently building a real-time analytics platform",
      icon: <FaServer />,
      price: {
        amount: 8000,
        unit: "project",
      },
      status: "in-progress",
      progress: 75,
      startDate: "Jan 2024",
      expectedCompletion: "Apr 2024",
      clientName: "DataViz Pro",
      technologies: ["React", "Socket.io", "Node.js", "Redis"],
      milestones: [
        { title: "Backend Architecture", completed: true },
        { title: "Real-time Data Processing", completed: true },
        { title: "Dashboard UI Development", completed: true },
        { title: "Performance Optimization", completed: false },
      ],
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Successful Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Showcasing completed and ongoing enterprise solutions
          </p>
        </div>
        {onEditToggle && (
          <button
            onClick={onEditToggle}
            className="text-emerald-600 hover:text-emerald-500 dark:hover:text-emerald-400"
          >
            <FaEdit className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group bg-white dark:bg-[#141414] rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              {/* Service Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                    {service.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      {service.status === "completed" && (
                        <FaCheckCircle className="text-emerald-500 w-5 h-5" />
                      )}
                      {service.status === "in-progress" && (
                        <FaClock className="text-blue-500 w-5 h-5" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                    ${service.price.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {service.status === "completed"
                      ? `Completed ${service.completionDate}`
                      : `Expected: ${service.expectedCompletion}`}
                  </div>
                </div>
              </div>

              {/* Client & Technologies */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Client: {service.clientName}
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements/Progress */}
              {service.status === "completed" ? (
                <>
                  <div className="mb-4">
                    {service.clientSatisfaction && (
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Client Satisfaction:
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < service.clientSatisfaction!
                                  ? "text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {service.testimonial && (
                      <blockquote className="text-sm italic text-gray-600 dark:text-gray-300">
                        "{service.testimonial}"
                      </blockquote>
                    )}
                  </div>
                  {service.keyAchievements &&
                    service.keyAchievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Key Achievements:
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.keyAchievements.map((achievement, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </>
              ) : (
                <>
                  {service.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Project Progress
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400">
                          {service.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${service.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {service.milestones && service.milestones.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Milestones:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.milestones.map((milestone, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <FaCheckCircle
                              className={
                                milestone.completed
                                  ? "text-emerald-500"
                                  : "text-gray-400"
                              }
                            />
                            {milestone.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Edit Overlay */}
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 dark:hover:bg-emerald-700">
                  Edit Service
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add New Service Button */}
        {isEditing && (
          <button className="h-full min-h-[200px] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-500 hover:border-emerald-600 dark:hover:border-emerald-500 transition-colors">
            <span className="text-lg">+ Add New Service</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ServicesOffered;

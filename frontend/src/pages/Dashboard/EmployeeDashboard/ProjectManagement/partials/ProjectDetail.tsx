import React, { useState } from "react";
import {
  FaCalendar,
  FaClock,
  FaCode,
  FaComments,
  FaDollarSign,
  FaDownload,
  FaEdit,
  FaFileAlt,
  FaHistory,
  FaInfo,
  FaPlus,
  FaTasks,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const mockProjectDetail: any  = {
  id: "PRJ001",
  title: "E-commerce Website Development",
  description:
    "Looking for a skilled developer to build a modern e-commerce website",
  type: "fixed",
  budget: {
    min: 2000,
    max: 5000,
    currency: "USD",
  },
  duration: {
    value: 2,
    unit: "months",
  },
  skills: ["React", "Node.js", "MongoDB", "AWS"],
  status: "in_progress",
  createdAt: "2024-02-01",
  updatedAt: "2024-02-03",
  client: {
    id: "CL001",
    name: "John Smith",
    avatar: "https://www.webiconio.com/_upload/255/image_255.svg",
  },
  freelancer: {
    id: "FL001",
    name: "Jane Doe",
    avatar: "https://www.webiconio.com/_upload/255/image_255.svg",
  },
  requirements:
    "We need a modern e-commerce website with the following features:\n- User authentication\n- Product catalog\n- Shopping cart\n- Payment integration\n- Order management\n- Admin dashboard",
  attachments: [
    {
      id: "ATT001",
      name: "requirements.pdf",
      url: "https://example.com/files/requirements.pdf",
      type: "document",
    },
  ],
  proposals: [
    {
      id: "PROP001",
      freelancer: {
        id: "FL001",
        name: "Jane Doe",
        avatar: "https://example.com/avatar2.jpg",
        rating: 4.8,
        completedProjects: 25,
      },
      coverLetter:
        "I have extensive experience in building e-commerce websites using the MERN stack.",
      price: {
        amount: 4000,
        currency: "USD",
      },
      duration: {
        value: 2,
        unit: "months",
      },
      status: "accepted",
      createdAt: "2024-02-02",
    },
  ],
  milestones: [
    {
      id: "MS001",
      title: "Frontend Development",
      description: "Develop the user interface and client-side functionality",
      dueDate: "2024-03-01",
      amount: 2000,
      status: "in_progress",
      deliverables: [
        {
          id: "DEL001",
          title: "User Interface",
          description: "Complete UI implementation based on approved designs",
          attachments: [],
        },
      ],
    },
  ],
  timeline: [
    {
      id: "TL001",
      action: "Project Created",
      description: "Project was posted",
      performedBy: {
        id: "CL001",
        name: "John Smith",
        avatar: "https://example.com/avatar1.jpg",
        role: "client",
      },
      timestamp: "2024-02-01",
    },
  ],
  messages: [
    {
      id: "MSG001",
      content:
        "Hi, I have a question about the payment integration requirement.",
      sender: {
        id: "FL001",
        name: "Jane Doe",
        avatar: "https://example.com/avatar2.jpg",
        role: "freelancer",
      },
      createdAt: "2024-02-02",
    },
  ],
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStatus, setSelectedStatus] = useState<
    "open" | "in_progress" | "completed" | "cancelled"
  >(mockProjectDetail.status);
  const [newComment, setNewComment] = useState("");

  const handleUpdateStatus = () => {
    // Handle status update
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "open":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-medium";
      case "in_progress":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium";
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium";
    }
  };

  const formatBudget = (budget: any["budget"]) => {
    return `${
      budget.currency
    } ${budget.min.toLocaleString()} - ${budget.max.toLocaleString()}`;
  };
   const formatDuration = (duration: any["duration"]) => {
    return `${duration.value} ${duration.unit}`;
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#141414]">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockProjectDetail.title}
              </h1>
              <span className={getStatusClass(mockProjectDetail.status)}>
                {mockProjectDetail.status.charAt(0).toUpperCase() +
                  mockProjectDetail.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Client
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {mockProjectDetail.client.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <FaDollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Budget
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatBudget(mockProjectDetail.budget)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Duration
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDuration(mockProjectDetail.duration)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {mockProjectDetail.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {mockProjectDetail.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
                >
                  <FaCode className="w-3 h-3 mr-1" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleUpdateStatus}
              className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200"
            >
              <FaEdit className="w-4 h-4 mr-2" /> Update Status
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
              <FaTrash className="w-4 h-4 mr-2" /> Delete Project
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap -mb-px">
            <button
              className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "overview"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              <FaInfo
                className={`mr-2 ${
                  activeTab === "overview"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              Overview
            </button>
            <button
              className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "tasks"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab("tasks")}
            >
              <FaTasks
                className={`mr-2 ${
                  activeTab === "tasks"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              Tasks
            </button>
            <button
              className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "files"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab("files")}
            >
              <FaFileAlt
                className={`mr-2 ${
                  activeTab === "files"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              Files
            </button>
            <button
              className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "messages"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              <FaComments
                className={`mr-2 ${
                  activeTab === "messages"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              Messages
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Requirements */}
              <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Requirements
                </h3>
                <div className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                  {mockProjectDetail.requirements}
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Milestones
                </h3>
                <div className="space-y-4">
                  {mockProjectDetail.milestones?.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="bg-white dark:bg-zinc-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                          {milestone.title}
                        </h4>
                        <span className={getStatusClass(milestone.status)}>
                          {milestone.status.charAt(0).toUpperCase() +
                            milestone.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {milestone.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <FaCalendar className="w-4 h-4 mr-1" />
                          Due: {milestone.dueDate}
                        </div>
                        <div className="flex items-center">
                          <FaDollarSign className="w-4 h-4 mr-1" />
                          Amount: {milestone.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Timeline
                </h3>
                <div className="space-y-4">
                  {mockProjectDetail.timeline.map((event) => (
                    <div key={event.id} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                          <FaHistory className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {event.action}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {event.timestamp}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {event.description}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <img
                            src={event.performedBy.avatar}
                            alt={event.performedBy.name}
                            className="w-6 h-6 rounded-full mr-2"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/24?text=User";
                            }}
                          />
                          <span>{event.performedBy.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-4">
              {mockProjectDetail.milestones?.map((milestone) => (
                <div
                  key={milestone.id}
                  className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {milestone.title}
                    </h3>
                    <span className={getStatusClass(milestone.status)}>
                      {milestone.status.charAt(0).toUpperCase() +
                        milestone.status.slice(1)}
                    </span>
                  </div>
                  {milestone.deliverables?.map((deliverable) => (
                    <div
                      key={deliverable.id}
                      className="bg-white dark:bg-zinc-600 border border-gray-200 dark:border-gray-600 rounded-lg p-4 mt-4"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {deliverable.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {deliverable.description}
                      </p>
                      {deliverable.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {deliverable.attachments.map((attachment) => (
                            <a
                              key={attachment.id}
                              href={attachment.url}
                              className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              <FaDownload className="w-4 h-4 mr-2" />
                              {attachment.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === "files" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockProjectDetail.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                    <FaFileAlt className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white truncate">
                      {attachment.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {attachment.type}
                    </div>
                  </div>
                  <a
                    href={attachment.url}
                    className="p-2 text-gray-400 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    <FaDownload className="w-5 h-5" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-4">
              {mockProjectDetail.messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-start gap-4 bg-gray-50 dark:bg-zinc-700 rounded-lg p-4"
                >
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/40?text=User";
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {message.sender.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          ({message.sender.role})
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {message.createdAt}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Add Comment
                </h4>
                <div className="space-y-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your comment here..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    rows={4}
                  />
                  <button className="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200">
                    <FaPlus className="w-4 h-4 mr-2" /> Add Comment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

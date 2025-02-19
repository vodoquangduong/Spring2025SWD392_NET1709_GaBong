import React, { useState } from "react";
import {
  FaClock,
  FaDownload,
  FaEdit,
  FaExchangeAlt,
  FaFile,
  FaPlus,
  FaTag,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const mockReportDetail = {
  id: "RPT001",
  title: "Service Quality Issue",
  type: "service",
  priority: "high",
  status: "investigating",
  description:
    "The freelancer delivered the project late and the quality does not match the requirements specified in the contract.",
  reportedBy: {
    id: "USR001",
    name: "John Smith",
    avatar: "https://example.com/avatar1.jpg",
    email: "john.smith@example.com",
  },
  reportedItem: {
    id: "SRV001",
    name: "Website Development Service",
    type: "service",
    link: "/services/SRV001",
  },
  attachments: [
    {
      id: "ATT001",
      name: "screenshot1.png",
      type: "image",
      url: "https://example.com/files/screenshot1.png",
    },
    {
      id: "ATT002",
      name: "contract.pdf",
      type: "document",
      url: "https://example.com/files/contract.pdf",
    },
  ],
  timeline: [
    {
      id: "TML001",
      action: "Report Created",
      timestamp: "2024-02-20 10:30:00",
      actor: {
        id: "USR001",
        name: "John Smith",
        avatar: "https://example.com/avatar1.jpg",
      },
      details: "Initial report submission",
    },
    {
      id: "TML002",
      action: "Status Updated",
      timestamp: "2024-02-20 11:15:00",
      actor: {
        id: "STF001",
        name: "Admin User",
        avatar: "https://example.com/avatar2.jpg",
      },
      details: "Changed status from 'pending' to 'investigating'",
    },
    {
      id: "TML003",
      action: "Comment Added",
      timestamp: "2024-02-20 11:30:00",
      actor: {
        id: "STF001",
        name: "Admin User",
        avatar: "https://example.com/avatar2.jpg",
      },
      details: "Contacted the freelancer for clarification",
    },
  ],
  createdAt: "2024-02-20 10:30:00",
  updatedAt: "2024-02-20 11:30:00",
};

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const [newComment, setNewComment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(mockReportDetail.status);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setNewComment("");
  };

  const handleUpdateStatus = () => {
    // Handle status update
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case "service":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200";
      case "user":
        return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
      case "payment":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "low":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "investigating":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
      case "resolved":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "rejected":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
    }
  };

  const getActivityTypeClass = (type: string) => {
    switch (type) {
      case "update":
        return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300";
      case "status":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300";
      default:
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "update":
        return <FaEdit className="w-5 h-5" />;
      case "status":
        return <FaExchangeAlt className="w-5 h-5" />;
      default:
        return <FaPlus className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#141414]">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockReportDetail.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                  mockReportDetail.status
                )}`}
              >
                {mockReportDetail.status.charAt(0).toUpperCase() +
                  mockReportDetail.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <FaUser className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Reported By
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {mockReportDetail.reportedBy.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <FaTag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Type
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {mockReportDetail.type.charAt(0).toUpperCase() +
                      mockReportDetail.type.slice(1)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Created At
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {mockReportDetail.createdAt}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {mockReportDetail.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(
                  mockReportDetail.priority
                )}`}
              >
                Priority:{" "}
                {mockReportDetail.priority.charAt(0).toUpperCase() +
                  mockReportDetail.priority.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200">
              <FaExchangeAlt className="w-4 h-4 mr-2" /> Update Status
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200">
              <FaEdit className="w-4 h-4 mr-2" /> Edit Report
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
                activeTab === "details"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "attachments"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab("attachments")}
            >
              Attachments
            </button>
            <button
              className={`inline-flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "timeline"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              onClick={() => setActiveTab("timeline")}
            >
              Timeline
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Reported Item
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {mockReportDetail.reportedItem.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {mockReportDetail.reportedItem.id}
                    </div>
                  </div>
                  <a
                    href={mockReportDetail.reportedItem.link}
                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                  >
                    View Item
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === "attachments" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockReportDetail.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                    <FaFile className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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

          {activeTab === "timeline" && (
            <div className="space-y-6">
              {mockReportDetail.timeline.map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                      <FaClock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
                      {event.details}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <img
                        src={event.actor.avatar}
                        alt={event.actor.name}
                        className="w-6 h-6 rounded-full mr-2"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/24?text=User";
                        }}
                      />
                      <span>{event.actor.name}</span>
                    </div>
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

export default ReportDetail;

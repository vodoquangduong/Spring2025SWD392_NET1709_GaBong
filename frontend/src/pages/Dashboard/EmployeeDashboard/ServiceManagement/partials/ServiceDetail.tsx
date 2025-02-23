import React, { useState } from "react";
import {
  FaChartLine,
  FaCheck,
  FaClock,
  FaDollarSign,
  FaHistory,
  FaInfo,
  FaStar,
  FaTag,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ServiceDetail as IServiceDetail } from "../models/types";

const mockServiceDetail: IServiceDetail = {
  id: "SRV001",
  name: "Website Development",
  description: "Professional website development services",
  category: "Development",
  price: 500,
  status: "active",
  rating: 4.8,
  totalReviews: 125,
  createdBy: {
    id: "USR001",
    name: "John Developer",
    avatar: "https://www.cdnlogo.com/logos/r/85/react.svg",
  },
  createdAt: "2024-01-15",
  updatedAt: "2024-02-20",
  requirements: [
    "Project brief and requirements",
    "Brand guidelines if available",
    "Content and assets",
  ],
  deliverables: [
    "Responsive website",
    "Source code",
    "Documentation",
    "30 days support",
  ],
  timeline: "2-4 weeks",
  revisions: 3,
  tags: ["Web Development", "React", "Node.js", "Responsive Design"],
  images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  reviews: [
    {
      id: "REV001",
      rating: 5,
      comment: "Excellent work and great communication",
      user: {
        id: "USR002",
        name: "Sarah Client",
        avatar: "https://example.com/avatar2.jpg",
      },
      createdAt: "2024-02-18",
    },
  ],
  statistics: {
    ordersCompleted: 85,
    totalEarnings: 42500,
    averageResponseTime: "2 hours",
    completionRate: 98,
  },
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`service-tabpanel-${index}`}
      aria-labelledby={`service-tab-${index}`}
      {...other}
    >
      {value === index && <div className="tab-panel">{children}</div>}
    </div>
  );
};

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [serviceData, setServiceData] =
    useState<IServiceDetail>(mockServiceDetail);
  const [activeTab, setActiveTab] = useState("details");

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300";
      case "inactive":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300";
      case "pending":
        return "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300";
    }
  };

  const handleUpdateStatus = () => {
    // Implementation of handleUpdateStatus
  };

  return (
    <div className="p-6 bg-white dark:bg-[#141414]">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-32 h-32 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {serviceData.createdBy.avatar ? (
              <img
                src={serviceData.createdBy.avatar}
                alt={serviceData.name}
                className="w-full h-full rounded-md object-cover"
              />
            ) : (
              <FaUser className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {serviceData.name}
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                  serviceData.status
                )}`}
              >
                {serviceData.status.charAt(0).toUpperCase() +
                  serviceData.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <FaTag className="w-4 h-4" />
                <span>{serviceData.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaDollarSign className="w-4 h-4" />
                <span className="font-medium">${serviceData.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span>
                  {serviceData.rating}{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    ({serviceData.totalReviews} reviews)
                  </span>
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {serviceData.description}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-md">
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-md">
              <FaCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed Orders
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {serviceData.statistics.ordersCompleted}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
              <FaDollarSign className="w-5 h-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Earnings
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                ${serviceData.statistics.totalEarnings}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-md">
              <FaClock className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Response Time
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {serviceData.statistics.averageResponseTime}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
              <FaChartLine className="w-5 h-5 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completion Rate
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {serviceData.statistics.completionRate}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "details"
              ? "bg-emerald-500 text-white"
              : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700"
          }`}
          onClick={() => setActiveTab("details")}
        >
          <FaInfo className="w-4 h-4" /> Details
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "reviews"
              ? "bg-emerald-500 text-white"
              : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <FaStar className="w-4 h-4" /> Reviews
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            activeTab === "history"
              ? "bg-emerald-500 text-white"
              : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          <FaHistory className="w-4 h-4" /> History
        </button>
      </div>

      {/* Content */}
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-6">
        {activeTab === "details" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Service Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {serviceData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 mt-1 text-emerald-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {serviceData.tags.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {serviceData.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-[#141414] rounded-md p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      {review.user.avatar ? (
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FaUser className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {review.user.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {review.createdAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {review.rating}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-4">{/* Implementation of history tab */}</div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;

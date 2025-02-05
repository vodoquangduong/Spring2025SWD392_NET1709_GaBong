import React, { useState } from "react";
import {
  FaBriefcase,
  FaCalendar,
  FaCertificate,
  FaClock,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaImages,
  FaPhone,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FreelancerDetail as IFreelancerDetail } from "../models/types";

const mockFreelancerDetail: IFreelancerDetail = {
  id: "FL001",
  name: "John Doe",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s",
  email: "john.doe@example.com",
  phone: "+1234567890",
  skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
  rating: 4.8,
  totalProjects: 25,
  completedProjects: 23,
  status: "active",
  joinDate: "2023-01-15",
  lastActive: "2024-02-03",
  description:
    "Full-stack developer with 5+ years of experience in web development. Specialized in React and Node.js development with a strong focus on building scalable applications.",
  portfolio: [
    {
      id: "PF001",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with MERN stack",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvE8WLPuEvB6WN5Tfiw7E85blWY-WnR1Q4Kw&s",
      link: "https://example.com/project1",
    },
  ],
  education: [
    {
      id: "ED001",
      school: "University of Technology",
      degree: "Bachelor's Degree",
      field: "Computer Science",
      from: "2018",
      to: "2022",
    },
  ],
  experience: [
    {
      id: "EX001",
      company: "Tech Solutions Inc.",
      position: "Senior Developer",
      description:
        "Led a team of developers in building enterprise applications",
      from: "2022",
      to: "Present",
    },
  ],
  certificates: [
    {
      id: "CT001",
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      issueDate: "2023-05",
      expiryDate: "2026-05",
      credentialUrl: "https://example.com/cert1",
    },
  ],
  reviews: [
    {
      id: "RV001",
      rating: 5,
      comment: "Excellent work and communication. Highly recommended!",
      projectId: "PJ001",
      projectName: "Website Redesign",
      reviewerId: "CL001",
      reviewerName: "Alice Johnson",
      reviewerAvatar: "https://www.webiconio.com/_upload/255/image_255.svg",
      createdAt: "2024-01-15",
    },
  ],
};

const FreelancerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStatus, setSelectedStatus] = useState<
    "active" | "inactive" | "banned"
  >(mockFreelancerDetail.status);

  const handleUpdateStatus = () => {
    // Handle status update
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300";
      case "inactive":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300";
      case "banned":
        return "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300";
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#141414]">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {mockFreelancerDetail.avatar ? (
              <img
                src={mockFreelancerDetail.avatar}
                alt={mockFreelancerDetail.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl font-medium text-gray-600 dark:text-gray-400">
                {mockFreelancerDetail.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {mockFreelancerDetail.name}
              </h1>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                  mockFreelancerDetail.status
                )}`}
              >
                {mockFreelancerDetail.status.charAt(0).toUpperCase() +
                  mockFreelancerDetail.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                <span>{mockFreelancerDetail.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                <span>{mockFreelancerDetail.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="w-4 h-4" />
                <span>Joined {mockFreelancerDetail.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="w-4 h-4" />
                <span>Last active {mockFreelancerDetail.lastActive}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockFreelancerDetail.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {mockFreelancerDetail.rating}
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span>Rating</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {mockFreelancerDetail.completedProjects}
                <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                  /{mockFreelancerDetail.totalProjects}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-400">Projects</div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(
                e.target.value as "active" | "inactive" | "banned"
              )
            }
            className="px-4 py-2 rounded-md bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
          <button
            onClick={handleUpdateStatus}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {[
          { id: "overview", icon: FaUser, label: "Overview" },
          { id: "portfolio", icon: FaImages, label: "Portfolio" },
          { id: "education", icon: FaGraduationCap, label: "Education" },
          { id: "experience", icon: FaBriefcase, label: "Experience" },
          { id: "certificates", icon: FaCertificate, label: "Certificates" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? "bg-emerald-500 text-white"
                : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-50 dark:bg-zinc-800 rounded-md shadow-sm p-6">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                About
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {mockFreelancerDetail.description}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Reviews
              </h2>
              <div className="space-y-4">
                {mockFreelancerDetail.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white dark:bg-[#141414] rounded-md p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          {review.reviewerAvatar ? (
                            <img
                              src={review.reviewerAvatar}
                              alt={review.reviewerName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-medium text-gray-600 dark:text-gray-400">
                              {review.reviewerName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {review.reviewerName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {review.projectName}
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
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {review.createdAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "portfolio" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFreelancerDetail.portfolio.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#141414] rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaImages className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {item.description}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span>View Project</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div className="space-y-6">
            {mockFreelancerDetail.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-white dark:bg-[#141414] rounded-md p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <FaGraduationCap className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {edu.school}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {edu.degree} in {edu.field}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {edu.from} - {edu.to}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-6">
            {mockFreelancerDetail.experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-[#141414] rounded-md p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <FaBriefcase className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {exp.position}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {exp.company}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {exp.from} - {exp.to}
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="space-y-6">
            {mockFreelancerDetail.certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white dark:bg-[#141414] rounded-md p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <FaCertificate className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {cert.name}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {cert.issuer}
                        </div>
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDetail;

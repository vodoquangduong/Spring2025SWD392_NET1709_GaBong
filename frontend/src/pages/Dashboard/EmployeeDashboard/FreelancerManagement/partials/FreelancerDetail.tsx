import { Avatar, Card, Rate, Select, Space, Tabs, Tag, Typography } from "antd";
import { motion } from "framer-motion";
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
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { PAGE_ANIMATION } from "../../../../../modules/constants";
import { FreelancerDetail as IFreelancerDetail } from "../models/types";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

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
  const [selectedStatus, setSelectedStatus] = useState<
    "active" | "inactive" | "banned"
  >(mockFreelancerDetail.status);

  const handleUpdateStatus = () => {
    // Handle status update
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "warning";
      case "banned":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <motion.div {...PAGE_ANIMATION} className="p-6">
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <Avatar
            size={96}
            src={mockFreelancerDetail.avatar}
            alt={mockFreelancerDetail.name}
          />
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <Title level={3} style={{ margin: 0 }}>
                {mockFreelancerDetail.name}
              </Title>
              <Tag color={getStatusColor(mockFreelancerDetail.status)}>
                {mockFreelancerDetail.status.charAt(0).toUpperCase() +
                  mockFreelancerDetail.status.slice(1)}
              </Tag>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-400" />
                <Text>{mockFreelancerDetail.email}</Text>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-400" />
                <Text>{mockFreelancerDetail.phone}</Text>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-gray-400" />
                <Text>Joined {mockFreelancerDetail.joinDate}</Text>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-400" />
                <Text>Last active {mockFreelancerDetail.lastActive}</Text>
              </div>
            </div>

            <Space wrap className="mb-4">
              {mockFreelancerDetail.skills.map((skill) => (
                <Tag key={skill} color="blue">
                  {skill}
                </Tag>
              ))}
            </Space>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <Rate
                  disabled
                  defaultValue={mockFreelancerDetail.rating}
                  allowHalf
                />
                <Text strong className="ml-2">
                  {mockFreelancerDetail.rating}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <Text strong className="text-xl text-emerald-500">
                  {mockFreelancerDetail.completedProjects}
                </Text>
                <Text type="secondary" className="text-lg">
                  /{mockFreelancerDetail.totalProjects}
                </Text>
                <Text type="secondary" className="ml-1">
                  Projects
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6 pt-6 border-t">
          <Select
            value={selectedStatus}
            onChange={setSelectedStatus}
            style={{ width: 120 }}
          >
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
            <Select.Option value="banned">Banned</Select.Option>
          </Select>
          <button
            onClick={handleUpdateStatus}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors"
          >
            Update Status
          </button>
        </div>
      </Card>

      <Tabs defaultActiveKey="overview">
        <TabPane
          tab={
            <Space>
              <FaUser />
              Overview
            </Space>
          }
          key="overview"
        >
          <Card className="bg-white dark:bg-zinc-800">
            <Title level={4} className="dark:text-gray-200">
              About
            </Title>
            <Paragraph className="dark:text-gray-300">
              {mockFreelancerDetail.description}
            </Paragraph>

            <Title level={4} className="mt-8 mb-4 dark:text-gray-200">
              Reviews
            </Title>
            <div className="space-y-4">
              {mockFreelancerDetail.reviews.map((review) => (
                <Card
                  key={review.id}
                  size="small"
                  className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={review.reviewerAvatar}
                      alt={review.reviewerName}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Text strong className="dark:text-gray-200">
                          {review.reviewerName}
                        </Text>
                        <Rate disabled defaultValue={review.rating} />
                      </div>
                      <Text
                        type="secondary"
                        className="block mb-2 dark:text-gray-400"
                      >
                        {review.projectName}
                      </Text>
                      <Paragraph className="mb-2 dark:text-gray-300">
                        {review.comment}
                      </Paragraph>
                      <Text
                        type="secondary"
                        className="text-xs dark:text-gray-500"
                      >
                        {review.createdAt}
                      </Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <Space>
              <FaImages />
              Portfolio
            </Space>
          }
          key="portfolio"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFreelancerDetail.portfolio.map((item) => (
              <Card
                key={item.id}
                hoverable
                cover={
                  item.imageUrl ? (
                    <img
                      alt={item.title}
                      src={item.imageUrl}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <FaImages className="w-8 h-8 text-gray-400" />
                    </div>
                  )
                }
                actions={[
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <Space>
                      <FaExternalLinkAlt />
                      View Project
                    </Space>
                  </a>,
                ]}
              >
                <Card.Meta title={item.title} description={item.description} />
              </Card>
            ))}
          </div>
        </TabPane>

        <TabPane
          tab={
            <Space>
              <FaGraduationCap />
              Education
            </Space>
          }
          key="education"
        >
          <div className="space-y-4">
            {mockFreelancerDetail.education.map((edu) => (
              <Card
                key={edu.id}
                className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                    <FaGraduationCap className="text-emerald-600 dark:text-emerald-400 text-xl" />
                  </div>
                  <div>
                    <Text strong className="text-lg block dark:text-gray-200">
                      {edu.school}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400 block">
                      {edu.degree} in {edu.field}
                    </Text>
                    <Text type="secondary" className="dark:text-gray-500">
                      {edu.from} - {edu.to}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabPane>

        <TabPane
          tab={
            <Space>
              <FaBriefcase />
              Experience
            </Space>
          }
          key="experience"
        >
          <div className="space-y-4">
            {mockFreelancerDetail.experience.map((exp) => (
              <Card
                key={exp.id}
                className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <FaBriefcase className="text-blue-600 dark:text-blue-400 text-xl" />
                  </div>
                  <div>
                    <Text strong className="text-lg block dark:text-gray-200">
                      {exp.position}
                    </Text>
                    <Text className="text-gray-600 dark:text-gray-400 block">
                      {exp.company}
                    </Text>
                    <Text
                      type="secondary"
                      className="block mb-2 dark:text-gray-500"
                    >
                      {exp.from} - {exp.to}
                    </Text>
                    <Text type="secondary" className="dark:text-gray-500">
                      {exp.description}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabPane>

        <TabPane
          tab={
            <Space>
              <FaCertificate />
              Certificates
            </Space>
          }
          key="certificates"
        >
          <div className="space-y-4">
            {mockFreelancerDetail.certificates.map((cert) => (
              <Card
                key={cert.id}
                className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                    <FaCertificate className="text-yellow-600 dark:text-yellow-400 text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Text
                          strong
                          className="text-lg block dark:text-gray-200"
                        >
                          {cert.name}
                        </Text>
                        <Text className="text-gray-600 dark:text-gray-400 block">
                          {cert.issuer}
                        </Text>
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                    <Text type="secondary" className="dark:text-gray-500">
                      Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </motion.div>
  );
};

export default FreelancerDetail;

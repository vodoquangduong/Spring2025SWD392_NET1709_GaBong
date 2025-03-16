import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  message,
  Modal,
  Spin,
  Tag,
  Timeline,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  FaCertificate,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFlag,
  FaPhone,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import { MdPlace } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../../../../stores/authStore";
import { PendingPortfolio } from "../models/types";
import { portfolioService } from "../services/portfolioService";

const { Text } = Typography;

const FreelancerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { name: userName } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PendingPortfolio | null>(null);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "approve" | "reject" | null
  >(null);

  useEffect(() => {
    const fetchPortfolioDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const portfolioId = parseInt(id);
        const freelancerId =
          await portfolioService.getFreelancerIdFromPortfolio(portfolioId);

        if (!freelancerId) {
          message.error("Portfolio not found");
          return;
        }

        const portfolioData =
          await portfolioService.getPendingPortfolioByFreelancerId(
            freelancerId
          );

        if (!portfolioData) {
          message.error("Portfolio details not found");
          return;
        }

        setPortfolio(portfolioData);
        console.log("Portfolio data loaded:", portfolioData);
      } catch (error: any) {
        const errorMessage = error?.message
          ? error.message.replace("Error: ", "")
          : "Failed to fetch portfolio details. Please try again.";
        message.error(errorMessage);
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioDetails();
  }, [id]);

  const handleApprove = async () => {
    if (!portfolio) return;

    try {
      setApproving(true);
      await portfolioService.verifyPortfolio(portfolio.portfolioId, 1); // 1 = Verified
      message.success("Portfolio has been approved successfully");
      console.log(
        `Portfolio ${portfolio.portfolioId} approved by ${
          userName || "unknown user"
        }`
      );

      navigate(-1);
    } catch (error: any) {
      if (error?.message) {
        if (error.message.includes("System.InvalidOperationException")) {
          message.error("Remote database return 500 again 😥");
        } else {
          const errorMessage = error.message.replace("Error: ", "");
          message.error(errorMessage);
        }
      } else {
        message.error("Failed to approve portfolio. Please try again.");
      }
    } finally {
      setApproving(false);
      setConfirmModalVisible(false);
    }
  };

  const handleReject = async () => {
    if (!portfolio) return;

    try {
      setRejecting(true);
      await portfolioService.verifyPortfolio(portfolio.portfolioId, 2); // 2 = Rejected
      message.success("Portfolio has been rejected");

      // Ghi log người từ chối
      console.log(
        `Portfolio ${portfolio.portfolioId} rejected by ${
          userName || "unknown user"
        }`
      );

      navigate(-1);
    } catch (error: any) {
      if (error?.message) {
        if (error.message.includes("System.InvalidOperationException")) {
          message.error("Remote database return 500 again 😥");
        } else {
          const errorMessage = error.message.replace("Error: ", "");
          message.error(errorMessage);
        }
      } else {
        message.error("Failed to reject portfolio. Please try again.");
      }
    } finally {
      setRejecting(false);
      setConfirmModalVisible(false);
    }
  };

  const showConfirmModal = (action: "approve" | "reject") => {
    setConfirmAction(action);
    setConfirmModalVisible(true);
  };

  const getGenderText = (gender: number) => {
    switch (gender) {
      case 0:
        return "Male";
      case 1:
        return "Female";
      default:
        return "Other";
    }
  };

  // Helper function to get level name
  const getSkillLevelInfo = () => {
    return (
      <div className="mb-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Advanced</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Entry</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!portfolio) {
    return <div className="p-6">Portfolio not found</div>;
  }

  // Parse JSON data
  const worksData =
    portfolio.works && portfolio.works !== "string"
      ? JSON.parse(portfolio.works || "{}")
      : {};

  // Get skills from skillPerform if available, otherwise use works data
  const skills =
    portfolio.skillPerform && portfolio.skillPerform.length > 0
      ? portfolio.skillPerform.map((skillItem) => {
          const skill = skillItem.skill || skillItem.skills;
          return {
            name: skill ? skill.skillName : "Unknown Skill",
            level: skillItem.skillLevel,
          };
        })
      : worksData.skills || [];

  const experiences = worksData.experiences || [];
  const certificates = JSON.parse(portfolio.certificate || "[]");

  // Format birthday if available
  const formattedBirthday =
    portfolio.birthday && portfolio.birthday !== "0001-01-01T00:00:00"
      ? new Date(portfolio.birthday).toLocaleDateString()
      : "Not specified";

  const displayName = portfolio.name || "No name";
  const displayEmail = portfolio.email || "No email";
  const displayPhone = portfolio.phone || "No phone";
  const displayAddress = portfolio.address || "No address";
  const displayNationality = portfolio.nationality || "Not specified";
  const displayReputationPoint = portfolio.reputationPoint || 0;
  const displayGender = portfolio.gender !== undefined ? portfolio.gender : 2;

  const breadcrumbItems = [
    {
      title: <Link to="/employee/freelancers">Pending Portfolios</Link>,
    },
    {
      title: displayName,
    },
  ];

  return (
    <div>
      <div className="w-full">
        <div className="border-b dark:border-gray-500 p-6">
          <Breadcrumb
            className="pt-4 capitalize font-bold text-base"
            items={breadcrumbItems}
          />
          <div>
            <div className="flex justify-between items-start my-8">
              <div className="text-3xl font-semibold flex gap-4 items-start">
                <Avatar size={80} src={portfolio.avatarURL} alt={displayName}>
                  {displayName ? displayName.charAt(0).toUpperCase() : "U"}
                </Avatar>
                <div className="text-sm">
                  <div className="flex gap-2 items-center">
                    <div className="text-2xl leading-none">{displayName}</div>
                    {portfolio.status === 0 && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="mt-2">{portfolio.title}</div>
                  <div className="flex gap-2 items-center mt-1">
                    <MdPlace size={18} />
                    {displayAddress}
                    {displayNationality !== "Not specified" &&
                      ` • ${displayNationality}`}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-end">
                <div className="flex gap-3 items-center">
                  <Button
                    type="primary"
                    icon={<FaCheck />}
                    onClick={() => showConfirmModal("approve")}
                    loading={approving}
                    style={{
                      backgroundColor: "72e478",
                      borderColor: "72e478",
                    }}
                  >
                    Approve Portfolio
                  </Button>
                  <Button
                    danger
                    icon={<FaTimes />}
                    onClick={() => showConfirmModal("reject")}
                    loading={rejecting}
                  >
                    Reject Portfolio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 gap-8 grid grid-cols-12 p-6">
        <div className="col-span-3 border-r dark:border-gray-500">
          {/* Sidebar */}
          <div className="">
            <div className="font-bold mb-8 text-lg">Freelancer's Profile</div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <FaEnvelope />
                {displayEmail}
              </div>
              <div className="flex gap-3 items-center">
                <FaPhone />
                {displayPhone}
              </div>
              <div className="flex gap-3 items-center">
                <MdPlace />
                {displayAddress}
              </div>
              <div className="flex gap-3 items-center">
                <FaFlag />
                {displayNationality}
              </div>
              <div className="flex gap-3 items-center">
                <FaClock />
                Birthday: {formattedBirthday}
              </div>
              <div className="flex gap-3 items-center">
                <FaUser />
                Gender: {getGenderText(displayGender)}
              </div>
              <div className="flex gap-3 items-center">
                <RiShieldCheckFill />
                Reputation Points: {displayReputationPoint}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <div className="font-bold text-lg mb-2">Skills</div>
                {getSkillLevelInfo()}
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.length > 0 ? (
                    skills.map((skill: any, index: number) => (
                      <Tag
                        key={index}
                        color={portfolioService.getSkillLevelColor(skill.level)}
                        className="px-3 py-1.5 rounded text-sm mb-2"
                      >
                        {skill.name}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">No skills specified</Text>
                  )}
                </div>
              </div>
              <div className="font-bold mt-8 mb-2 text-lg">
                Portfolio Status
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <HiIdentification
                    color={
                      portfolio.status === 0
                        ? "orange"
                        : portfolio.status === 1
                        ? "green"
                        : "red"
                    }
                  />
                  {portfolio.status === 0
                    ? "Pending Verification"
                    : portfolio.status === 1
                    ? "Verified"
                    : "Rejected"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9">
          {/* Content */}
          <div>
            <div>
              <div className="text-2xl font-bold mb-8">About</div>
              <p className="text-base my-2 whitespace-pre-line tracking-wide">
                {portfolio.about}
              </p>
            </div>

            {experiences.length > 0 && (
              <div>
                <div className="text-2xl font-bold mt-12 mb-8">Experiences</div>
                <div>
                  <Timeline
                    items={experiences.map((exp: any, index: number) => ({
                      children: (
                        <div key={index}>
                          <div className="text-xl font-semibold">
                            {exp.position} | {exp.company}
                          </div>
                          <div className="my-2">
                            {exp.startDate} -{" "}
                            {exp.isCurrentPosition ? "Present" : exp.endDate}
                          </div>
                          <div className="text-base pb-8">
                            {exp.description}
                          </div>
                        </div>
                      ),
                    }))}
                  />
                </div>
              </div>
            )}

            {certificates.length > 0 && (
              <div>
                <div className="text-2xl font-bold mt-12 mb-8">
                  Certificates
                </div>
                <div className="space-y-4">
                  {certificates.map((cert: any, index: number) => (
                    <Card
                      key={index}
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
                                {cert.title}
                              </Text>
                              {cert.issueDate && (
                                <Text
                                  type="secondary"
                                  className="dark:text-gray-500"
                                >
                                  Issued: {cert.issueDate}
                                </Text>
                              )}
                            </div>
                            {cert.url && (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                              >
                                <FaExternalLinkAlt />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={
          confirmAction === "approve" ? "Approve Portfolio" : "Reject Portfolio"
        }
        open={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setConfirmModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type={confirmAction === "approve" ? "primary" : "default"}
            danger={confirmAction === "reject"}
            loading={confirmAction === "approve" ? approving : rejecting}
            onClick={confirmAction === "approve" ? handleApprove : handleReject}
          >
            {confirmAction === "approve" ? "Approve" : "Reject"}
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to{" "}
          {confirmAction === "approve" ? "approve" : "reject"} this portfolio?
          {confirmAction === "reject" &&
            " This action will require the freelancer to revise their portfolio."}
        </p>
      </Modal>
    </div>
  );
};

export default FreelancerDetail;

import useChatStore from "@/components/ChatPopup/stores/chatStore";
import { POST } from "@/modules/request";
import useUiStore from "@/stores/uiStore";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Pagination,
  Rate,
  Spin,
  Tag,
  Timeline,
  Typography,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import {
  FaCertificate,
  FaClock,
  FaComments,
  FaEdit,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFlag,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { Role } from "../../types";
import { Feedback, PublicPortfolio } from "./models/freelancerModel";
import SkillLegend from "./partials/SkillLegend";
import { freelancerService } from "./services/freelancerService";

dayjs.extend(relativeTime);

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function Freelancer() {
  const { id: freelancerId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role, accountId } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const { toogleChatPopup } = useUiStore();
  const { setCurrentRoom } = useChatStore();
  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const pageSize = 5;

  // Fetch portfolio and feedback data
  useEffect(() => {
    const fetchData = async () => {
      if (!freelancerId) return;
      try {
        setLoading(true);
        // Fetch portfolio details
        const portfolioData = await freelancerService.getPublicPortfolio(
          freelancerId
        );
        setPortfolio(portfolioData);

        // Fetch feedback
        const feedbackData = await freelancerService.getFreelancerFeedback(
          freelancerId
        );
        setFeedbacks(feedbackData);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [freelancerId]);

  // Calculate pagination
  const paginatedFeedbacks = feedbacks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Calculate average rating
  const averageRating =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
        feedbacks.length
      : 0;

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
  const worksData = JSON.parse(portfolio.works || "{}");

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

  // Get skill level color based on level number
  const getSkillLevelColor = (level?: number): string => {
    switch (level) {
      case 0:
        return "red";
      case 1:
        return "gold";
      case 2:
        return "green";
      default:
        return "default";
    }
  };

  const formattedBirthday =
    portfolio.birthday && portfolio.birthday !== "0001-01-01T00:00:00"
      ? new Date(portfolio.birthday).toLocaleDateString()
      : "Not specified";

  const breadcrumbItems = [
    { title: <Link to="/search/freelancers">Freelancers</Link> },
    { title: portfolio.name },
  ];

  return (
    <div className="mx-container">
      <div className="w-full">
        <div className="border-b dark:border-gray-500 p-6">
          <Breadcrumb
            items={breadcrumbItems}
            className="pt-4 capitalize font-bold text-base"
          />
          <div>
            <div className="flex justify-between items-start my-8">
              <div className="text-3xl font-semibold flex gap-4 items-start">
                <Avatar
                  size={80}
                  src={portfolio.avatarURL}
                  alt={portfolio.name}
                >
                  {portfolio.name?.charAt(0).toUpperCase()}
                </Avatar>
                <div className="text-sm">
                  <div className="text-2xl leading-none">{portfolio.name}</div>
                  <div className="mt-2">{portfolio.title}</div>
                  <div className="flex gap-2 items-center mt-1">
                    <MdPlace size={18} />
                    {portfolio.address}
                    {portfolio.nationality && ` • ${portfolio.nationality}`}
                  </div>
                  {feedbacks.length > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <Rate
                        value={averageRating}
                        disabled
                        allowHalf
                        character={<FaStar size={14} />}
                      />
                      <span className="text-amber-500 font-medium">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="text-gray-500">
                        ({feedbacks.length} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons section */}
              <div className="flex gap-3">
                {/* Nếu là client thì hiện nút Contact và Create Project */}
                {role === Role.CLIENT && (
                  <>
                    <Button
                      type="default"
                      icon={<FaComments />}
                      onClick={async () => {
                        let res = await POST("/api/ChatRoom", {
                          clientId: accountId,
                          freelancerId: freelancerId,
                          chatRoomName: `${accountId}-${freelancerId}`,
                        });
                        let res2 = await POST("/api/ChatRoom", {
                          clientId: accountId,
                          freelancerId: freelancerId,
                          chatRoomName: `${accountId}-${freelancerId}`,
                        });
                        toogleChatPopup();
                        setCurrentRoom(res2);
                      }}
                    >
                      Contact
                    </Button>
                  </>
                )}

                {role === Role.FREELANCER &&
                  accountId === Number(freelancerId) && (
                    <Button
                      type="primary"
                      icon={<FaEdit />}
                      onClick={() => navigate("/portfolio/edit")}
                    >
                      Edit Portfolio
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 gap-8 grid grid-cols-12 p-6">
        {/* Sidebar */}
        <div className="col-span-3 border-r dark:border-gray-500">
          <div className="font-bold mb-8 text-lg">Freelancer's Profile</div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <FaEnvelope />
              {portfolio.email}
            </div>
            <div className="flex gap-3 items-center">
              <FaPhone />
              {portfolio.phone || "No phone"}
            </div>
            <div className="flex gap-3 items-center">
              <MdPlace />
              {portfolio.address}
            </div>
            <div className="flex gap-3 items-center">
              <FaFlag />
              {portfolio.nationality}
            </div>
            <div className="flex gap-3 items-center">
              <FaClock />
              Birthday: {formattedBirthday}
            </div>
            <div className="flex gap-3 items-center">
              <RiShieldCheckFill />
              Reputation Points: {portfolio.reputationPoint}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <div className="gap-2 items-center justify-between">
              <div className="text-lg font-bold mt-8 mb-4">Skills</div>
              <div className="p-2">
                <SkillLegend />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill: any, index: number) => (
                  <Tag
                    key={index}
                    color={getSkillLevelColor(skill.level)}
                    className="px-3 py-1.5 rounded-lg text-sm mb-2"
                  >
                    {skill.name}
                  </Tag>
                ))
              ) : (
                <Text type="secondary">No skills specified</Text>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div>
            <div className="text-2xl font-bold mb-8">About</div>
            <p className="text-base my-2 whitespace-pre-line tracking-wide">
              {portfolio.about}
            </p>
          </div>

          {/* Experiences Section */}
          {experiences.length > 0 && (
            <div>
              <div className="text-2xl font-bold mt-12 mb-8">Experiences</div>
              <Timeline
                items={experiences.map((exp: any) => ({
                  children: (
                    <div>
                      <div className="text-xl font-semibold">
                        {exp.position} | {exp.company}
                      </div>
                      <div className="my-2">
                        {exp.startDate} -{" "}
                        {exp.isCurrentPosition ? "Present" : exp.endDate}
                      </div>
                      <div className="text-base pb-8">{exp.description}</div>
                    </div>
                  ),
                }))}
              />
            </div>
          )}

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div>
              <div className="text-2xl font-bold mt-12 mb-8">Certificates</div>
              <div className="space-y-4">
                {certificates.map((cert: any, index: number) => (
                  <Card key={index} className="bg-gray-50 dark:bg-zinc-800">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                        <FaCertificate className="text-yellow-600 dark:text-yellow-400 text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <Text strong className="text-lg block">
                              {cert.title}
                            </Text>
                            {cert.issueDate && (
                              <Text type="secondary">
                                Issued: {cert.issueDate}
                              </Text>
                            )}
                          </div>
                          {cert.url && (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700"
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
          {/* Feedback Section */}
          <div className="mt-12">
            <div className="text-2xl font-bold mb-8">Client Feedback</div>

            {feedbacks.length === 0 ? (
              <Card className="bg-gray-50 dark:bg-zinc-800 text-center py-8">
                <Text type="secondary" className="text-lg">
                  No feedback yet.
                </Text>
              </Card>
            ) : (
              <div className="space-y-6">
                {paginatedFeedbacks.map((feedback) => (
                  <Card
                    key={feedback.feedbackId}
                    className="bg-gray-50 dark:bg-zinc-800 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-3 items-start">
                        <Avatar src={feedback.clientAvatar} size={42}>
                          {feedback.clientName?.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                          <Text strong className="text-lg">
                            {feedback.clientName}
                          </Text>
                          {feedback.projectName && (
                            <div className="text-sm text-gray-500">
                              Project: {feedback.projectName}
                            </div>
                          )}
                          <Rate
                            value={feedback.rating}
                            disabled
                            character={<FaStar size={16} />}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <Text type="secondary" className="text-xs">
                        {dayjs(feedback.createdDate).fromNow()}
                      </Text>
                    </div>
                    <Paragraph className="mt-4">{feedback.comment}</Paragraph>
                  </Card>
                ))}

                {feedbacks.length > pageSize && (
                  <div className="mt-6 flex justify-end">
                    <Pagination
                      current={currentPage}
                      onChange={(page) => setCurrentPage(page)}
                      total={feedbacks.length}
                      pageSize={pageSize}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

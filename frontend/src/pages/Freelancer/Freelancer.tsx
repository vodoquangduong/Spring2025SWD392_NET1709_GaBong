import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Spin,
  Timeline,
  Typography,
} from "antd";
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
  FaPlus,
} from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { Role } from "../../types";
import { PublicPortfolio } from "./models/freelancerModel";
import { freelancerService } from "./services/freelancerService";

const { Text } = Typography;

export default function Freelancer() {
  const { id: freelancerId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role, accountId } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null);

  useEffect(() => {
    const fetchPortfolioDetails = async () => {
      if (!freelancerId) return;
      try {
        setLoading(true);
        // Gọi trực tiếp API public portfolio với freelancerId
        const data = await freelancerService.getPublicPortfolio(freelancerId);
        setPortfolio(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioDetails();
  }, [freelancerId]);

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
  const skills = worksData.skills || [];
  const experiences = worksData.experiences || [];
  const certificates = JSON.parse(portfolio.certificate || "[]");

  const formattedBirthday =
    portfolio.birthday && portfolio.birthday !== "0001-01-01T00:00:00"
      ? new Date(portfolio.birthday).toLocaleDateString()
      : "Not specified";

  const breadcrumbItems = [
    { title: <Link to="/search/freelancers">Freelancers</Link> },
    { title: portfolio.name },
  ];

  return (
    <div>
      <div className="w-full mx-auto">
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
                      onClick={() =>
                        navigate(`/messages/${portfolio.freelancerId}`)
                      }
                    >
                      Contact
                    </Button>
                    <Button
                      type="primary"
                      icon={<FaPlus />}
                      onClick={() =>
                        navigate("/projects/create", {
                          state: { freelancerId: portfolio.freelancerId },
                        })
                      }
                    >
                      Create Project
                    </Button>
                  </>
                )}

                {/* Nếu đang xem portfolio của chính mình thì hiện nút Edit */}
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
            <div className="text-lg font-bold mt-8 mb-4">Skills</div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: any, index: number) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-lg text-sm"
                >
                  {skill.name}
                </div>
              ))}
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
        </div>
      </div>
    </div>
  );
}

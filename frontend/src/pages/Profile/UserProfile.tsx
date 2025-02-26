import { App, Avatar, Button, Card, Spin, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  FaBirthdayCake,
  FaClock,
  FaCreditCard,
  FaEdit,
  FaEnvelope,
  FaFlag,
  FaFolder,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserProfileData } from "./models/types";
import { profileUseCase } from "./usecases/profileUseCase";

const { Title } = Typography;

const UserProfile = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileUseCase.getProfile();
      console.log("Profile data:", data);
      setProfile(data);
    } catch (error: any) {
      message.error(error.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getRoleName = (role: number): string => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Staff";
      case 2:
        return "Freelancer";
      case 3:
        return "Client";
      default:
        return "Unknown";
    }
  };

  const getStatusName = (status: number): string => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Inactive";
      case 2:
        return "Banned";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: number): string => {
    switch (status) {
      case 0:
        return "success";
      case 1:
        return "warning";
      case 2:
        return "error";
      default:
        return "default";
    }
  };

  const handleEditProfile = (): void => {
    navigate("/profile/edit");
  };

  const handleViewPortfolio = (): void => {
    navigate(`/portfolio`);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="h-full p-4">
        <Card className="h-full shadow-sm">
          <div className="flex items-center justify-center h-[600px]">
            <Spin size="large" tip="Loading profile..." />
          </div>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="h-full p-4">
        <Card className="h-full shadow-sm">
          <div className="flex items-center justify-center h-[600px] text-gray-500 dark:text-gray-400">
            No profile data available
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      <Card className="h-full shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* Left Column */}
          <div className="md:w-80 md:border-r md:dark:border-zinc-700 md:pr-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar
                  size={160}
                  src={profile.avatarURL}
                  className="border-4 border-white shadow-lg"
                />
                <Button
                  type="text"
                  icon={<FaEdit className="text-zinc-600" />}
                  className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md p-2 hover:bg-white"
                  onClick={() => message.info("Feature coming soon")}
                />
              </div>

              <Title level={3} className="!mb-1 text-center font-semibold">
                {profile.name}
              </Title>

              <div className="flex gap-2 mb-4">
                <Tag
                  color={getStatusColor(profile.status)}
                  className="px-3 py-1 text-sm font-medium rounded-full"
                >
                  {getStatusName(profile.status)}
                </Tag>
                <Tag
                  color="blue"
                  className="px-3 py-1 text-sm font-medium rounded-full"
                >
                  {getRoleName(profile.role)}
                </Tag>
              </div>

              <div className="flex gap-2 w-full mb-6">
                <Button
                  type="primary"
                  icon={<FaEdit />}
                  onClick={handleEditProfile}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 h-10 font-medium shadow-sm"
                >
                  Edit Profile
                </Button>
                {profile.role === 2 && (
                  <Button
                    icon={<FaFolder />}
                    onClick={handleViewPortfolio}
                    className="h-10 font-medium shadow-sm"
                  >
                    Portfolio
                  </Button>
                )}
              </div>

              {/* Stats Cards */}
              <div className="w-full space-y-3">
                <div className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-800 rounded-lg mr-3">
                    <FaStar className="text-2xl text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Reputation
                    </div>
                    <div className="text-xl font-semibold text-emerald-500">
                      {profile.reputationPoint}/5
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                  <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg mr-3">
                    <FaCreditCard className="text-2xl text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Available Credits
                    </div>
                    <div className="text-xl font-semibold text-blue-500">
                      ${profile.totalCredit.toLocaleString()}
                    </div>
                  </div>
                </div>

                {profile.role === 2 && (
                  <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                    <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg mr-3">
                      <FaCreditCard className="text-2xl text-red-500" />
                    </div>
                    <div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        Locked Credits
                      </div>
                      <div className="text-xl font-semibold text-red-500">
                        ${profile.lockCredit.toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-[calc(100%-320px)] md:pl-6 mt-6 md:mt-0">
            <Title level={4} className="!mb-4 font-medium flex items-center">
              <FaUser className="mr-2 text-emerald-500" />
              Personal Information
            </Title>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg space-y-1">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                    <FaEnvelope className="mr-2 text-emerald-500" />
                    Email
                  </div>
                  <div className="text-base font-medium">{profile.email}</div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg space-y-1">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                    <FaPhone className="mr-2 text-emerald-500" />
                    Phone
                  </div>
                  <div className="text-base font-medium">{profile.phone}</div>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg space-y-1">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                  Address
                </div>
                <div className="text-base font-medium">{profile.address}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg space-y-1">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                    <FaFlag className="mr-2 text-emerald-500" />
                    Nationality
                  </div>
                  <div className="text-base font-medium">
                    {profile.nationality}
                  </div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg space-y-1">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                    <FaUser className="mr-2 text-emerald-500" />
                    Gender
                  </div>
                  <div className="text-base font-medium">
                    {profile.gender === 1
                      ? "Male"
                      : profile.gender === 2
                      ? "Female"
                      : "Other"}
                  </div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg space-y-1">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                    <FaBirthdayCake className="mr-2 text-emerald-500" />
                    Birthday
                  </div>
                  <div className="text-base font-medium">
                    {formatDate(profile.birthday)}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg space-y-1">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center">
                  <FaClock className="mr-2 text-emerald-500" />
                  Member Since
                </div>
                <div className="text-base font-medium">
                  {formatDate(profile.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;

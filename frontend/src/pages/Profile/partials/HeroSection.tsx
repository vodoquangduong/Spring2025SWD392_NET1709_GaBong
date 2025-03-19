import {
  FaCheckCircle,
  FaEdit,
  FaMapMarkerAlt,
  FaPlus,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserProfileData } from "../models/types";

interface AboutProps {
  profile: UserProfileData;
}

const HeroSection = ({ profile }: AboutProps) => {
  const renderRoleSpecificActions = () => {
    switch (profile.role) {
      case "freelancer":
        return (
          <Link
            to="/portfolio"
            className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <FaUser className="w-4 h-4" />
            <span>View Portfolio</span>
          </Link>
        );
      case "client":
        return (
          <Link
            to="/projects/create"
            className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <FaPlus className="w-4 h-4" />
            <span>Post a Project</span>
          </Link>
        );
      case "staff":
        return (
          <Link
            to="/manage/verifications"
            className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <FaCheckCircle className="w-4 h-4" />
            <span>Manage Verifications</span>
          </Link>
        );
      default:
        return null;
    }
  };

  const renderRoleSpecificStats = () => {
    switch (profile.role) {
      case "freelancer":
        return (
          <>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Rating</div>
              <div className="text-gray-900 dark:text-white font-medium">
                5.0
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Reviews</div>
              <div className="text-gray-900 dark:text-white font-medium">0</div>
            </div>
          </>
        );
      case "client":
        return (
          <div>
            <div className="text-gray-600 dark:text-gray-400">
              Posted Projects
            </div>
            <div className="text-gray-900 dark:text-white font-medium">0</div>
          </div>
        );
      case "staff":
        return (
          <div>
            <div className="text-gray-600 dark:text-gray-400">
              Verifications Done
            </div>
            <div className="text-gray-900 dark:text-white font-medium">0</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-start gap-8 bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-white/10 p-8">
        {/* Left: Avatar & Basic Info */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-lg overflow-hidden ring-2 ring-white/10 bg-white/5 shadow-lg">
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Rating - Only show for freelancers */}
          {profile.role === "freelancer" && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-4 h-4 text-emerald-400" />
                ))}
              </div>
              <span className="text-gray-400">5.0</span>
            </div>
          )}
        </div>

        {/* Right: Name & Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {`${profile.firstName} ${profile.lastName}`}
              </h1>
              <p className="text-emerald-700 dark:text-emerald-400 font-medium mb-2">
                {profile.profession}
              </p>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to="/profile/edit"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"
              >
                <FaEdit className="w-4 h-4" />
                <span>Edit Profile</span>
              </Link>
              {renderRoleSpecificActions()}
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">
            {profile.bio}
          </p>

          {/* Stats */}
          <div className="mt-4 flex gap-6 text-sm">
            {renderRoleSpecificStats()}
            <div>
              <div className="text-gray-600 dark:text-gray-400">Joined</div>
              <div className="text-gray-900 dark:text-white font-medium">
                January 8, 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

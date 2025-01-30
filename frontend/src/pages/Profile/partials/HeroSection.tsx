import { FaEdit, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HeroSectionProps } from "../models/types";

const HeroSection = ({ profile }: HeroSectionProps) => {
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

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="w-4 h-4 text-emerald-400" />
              ))}
            </div>
            <span className="text-gray-400">5.0</span>
          </div>
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
            <Link
              to="/profile/edit"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <FaEdit className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 dark:text-gray-300">{profile.bio}</p>

          {/* Stats */}
          <div className="mt-4 flex gap-6">
            <div>
              <div className="text-gray-600 dark:text-gray-400">Projects</div>
              <div className="text-gray-900 dark:text-white font-medium">
                15
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Reviews</div>
              <div className="text-gray-900 dark:text-white font-medium">
                28
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400">Joined</div>
              <div className="text-gray-900 dark:text-white font-medium">
                January 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { UserProfileData } from "../models/types";

interface AboutProps {
  profile: UserProfileData;
}

const About = ({ profile }: AboutProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Họ
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            placeholder="Nhập họ của bạn"
            defaultValue={profile.firstName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tên
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            placeholder="Nhập tên của bạn"
            defaultValue={profile.lastName}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            placeholder="example@email.com"
            defaultValue={profile.email}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            placeholder="+84 123456789"
            defaultValue={profile.phone}
          />
        </div>
      </div>

      {/* Professional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nghề nghiệp
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            placeholder="Ví dụ: Senior Full Stack Developer"
            defaultValue={profile.profession}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Địa điểm
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
            placeholder="Thành phố, Quốc gia"
            defaultValue={profile.location}
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Giới thiệu
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Viết một vài dòng về bản thân..."
          defaultValue={profile.bio}
        />
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Liên kết mạng xã hội
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-2">
            <FaGithub className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              placeholder="GitHub URL"
              defaultValue={profile.socials.github}
            />
          </div>
          <div className="flex items-center gap-2">
            <FaLinkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              placeholder="LinkedIn URL"
              defaultValue={profile.socials.linkedin}
            />
          </div>
          <div className="flex items-center gap-2">
            <FaTwitter className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
              placeholder="Twitter URL"
              defaultValue={profile.socials.twitter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

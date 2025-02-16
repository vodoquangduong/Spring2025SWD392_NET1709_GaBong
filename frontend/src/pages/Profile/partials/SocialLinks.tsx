import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { UserProfileData } from "../models/types";

interface SocialLinksProps {
  profile: UserProfileData;
}

const SocialLinks = ({ profile }: SocialLinksProps) => {
  return (
    <div className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Social Links
      </h2>
      <div className="space-y-4">
        {profile.socials.github && (
          <a
            href={`https://${profile.socials.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FaGithub className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        )}
        {profile.socials.linkedin && (
          <a
            href={`https://${profile.socials.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FaLinkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        )}
        {profile.socials.twitter && (
          <a
            href={`https://${profile.socials.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <FaTwitter className="w-5 h-5" />
            <span>Twitter</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;

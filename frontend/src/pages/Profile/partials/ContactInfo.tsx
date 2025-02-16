import { UserProfileData } from "../models/types";

interface ContactInfoProps {
  profile: UserProfileData;
}

const ContactInfo = ({ profile }: ContactInfoProps) => {
  return (
    <div className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Contact Information
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
            Email
          </label>
          <p className="text-gray-900 dark:text-white">{profile.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
            Phone
          </label>
          <p className="text-gray-900 dark:text-white">{profile.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
            Location
          </label>
          <p className="text-gray-900 dark:text-white">{profile.location}</p>
        </div>
        {profile.website && (
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              Website
            </label>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700"
            >
              {profile.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;

import { FaCamera } from "react-icons/fa";
import { UserProfileData } from "../models/types";

interface EditAboutProps {
  profile: UserProfileData;
  onUpdate?: (data: Partial<UserProfileData>) => void;
}

const EditAbout: React.FC<EditAboutProps> = ({ profile, onUpdate }) => {
  return (
    <div className="space-y-6">
      {/* Avatar Edit */}
      <div className="flex justify-center">
        <div className="relative group">
          <div className="w-32 h-32 rounded-lg overflow-hidden">
            <img
              src={profile.avatarURL}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/160?text=User";
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-not-allowed rounded-lg">
            <FaCamera className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="Enter your full name"
            value={profile.name}
            onChange={(e) => onUpdate?.({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Nationality</label>
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="Enter your nationality"
            value={profile.nationality}
            onChange={(e) => onUpdate?.({ nationality: e.target.value })}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="example@email.com"
            value={profile.email}
            onChange={(e) => onUpdate?.({ email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="+1 234 567 890"
            value={profile.phone}
            onChange={(e) => onUpdate?.({ phone: e.target.value })}
          />
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Birthday</label>
          <input
            type="date"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            value={profile.birthday}
            onChange={(e) => onUpdate?.({ birthday: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Gender</label>
          <select
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            value={profile.gender}
            onChange={(e) => onUpdate?.({ gender: parseInt(e.target.value) })}
          >
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Other</option>
          </select>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-2">Address</label>
        <textarea
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
          rows={2}
          placeholder="Enter your address"
          value={profile.address}
          onChange={(e) => onUpdate?.({ address: e.target.value })}
        />
      </div>
    </div>
  );
};

export default EditAbout;

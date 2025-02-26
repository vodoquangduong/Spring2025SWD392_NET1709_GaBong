import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileData } from "./models/types";
import EditAbout from "./partials/EditAbout";

interface EditProfileProps {
  initialData?: UserProfileData;
}

const EditProfile: React.FC<EditProfileProps> = ({ initialData }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData>({
    accountId: 1,
    role: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street",
    avatarURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    birthday: "1990-01-01",
    gender: 1,
    nationality: "US",
    reputationPoint: 0,
    totalCredit: 0,
    lockCredit: 0,
    createdAt: new Date().toISOString(),
    status: 1,
  });

  const handleSave = async () => {
    try {
      // Implement save logic here
      navigate("/profile");
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleUpdate = (data: Partial<UserProfileData>) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <div className="h-full p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Edit Profile
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <EditAbout profile={profile} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

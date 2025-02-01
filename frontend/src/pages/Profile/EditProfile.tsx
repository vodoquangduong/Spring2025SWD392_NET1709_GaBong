import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabType, UserProfileData } from "./models/types";
import EditAbout from "./partials/EditAbout";
import EditCertifications from "./partials/EditCertifications";
import EditEducation from "./partials/EditEducation";
import EditLanguages from "./partials/EditLanguages";
import EditSkills from "./partials/EditSkills";

interface EditProfileProps {
  initialData?: UserProfileData;
}

const EditProfile: React.FC<EditProfileProps> = ({ initialData }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [profile, setProfile] = useState<UserProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    profession: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    website: "www.johndoe.dev",
    bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    socials: {
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
      twitter: "twitter.com/johndoe",
      facebook: "facebook.com/johndoe",
    },
    role: "freelancer",
    username: "johndoe",
    dateOfBirth: "1990-01-01",
    gender: "male",
    address: "123 Tech Street",
    accountStatus: "active",
    registrationDate: "2023-01-01",
    lastLogin: "2024-03-20",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "MongoDB",
      "GraphQL",
      "Docker",
      "Kubernetes",
    ],
    certifications: [
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
      },
      {
        name: "Professional Cloud Developer",
        issuer: "Google Cloud",
        date: "2022",
      },
    ],
    experience: [
      {
        company: "Tech Corp Inc",
        position: "Senior Software Engineer",
        duration: "2020 - Present",
        description: "Lead developer for enterprise applications...",
      },
      {
        company: "StartupXYZ",
        position: "Software Engineer",
        duration: "2018 - 2020",
        description: "Full stack development using React and Node.js...",
      },
    ],
    education: [
      {
        school: "Stanford University",
        degree: "M.S. Computer Science",
        duration: "2016 - 2018",
      },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Conversational" },
    ],
  });

  const tabs: { id: TabType; label: string }[] = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "certification", label: "Certifications" },
    { id: "skills", label: "Skills & Expertise" },
    { id: "languages", label: "Languages" },
  ];

  const handleSave = async () => {
    try {
      // Implement save logic here
      navigate("/profile");
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleUpdate = (field: keyof UserProfileData) => (value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-5xl font-semibold text-gray-900 dark:text-white">
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

          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Tab Content */}
          {activeTab === "about" && (
            <EditAbout profile={profile} onUpdate={handleUpdate("about")} />
          )}
          {activeTab === "education" && (
            <EditEducation
              education={profile.education}
              onUpdate={handleUpdate("education")}
            />
          )}
          {activeTab === "certification" && (
            <EditCertifications certifications={profile.certifications} />
          )}
          {activeTab === "skills" && <EditSkills skills={profile.skills} />}
          {activeTab === "languages" && (
            <EditLanguages languages={profile.languages} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

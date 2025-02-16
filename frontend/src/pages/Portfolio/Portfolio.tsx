import { useState } from "react";
import { TabType } from "./models/types";
import About from "./partials/About";
import ProjectGallery from "./partials/ProjectGallery";
import ServicesOffered from "./partials/ServicesOffered";
import Skills from "./partials/Skills";
import VerificationStatus from "./partials/VerificationStatus";

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("works");
  const [isEditing, setIsEditing] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: "works", label: "Works" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "works":
        return (
          <ProjectGallery
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(!isEditing)}
          />
        );
      case "skills":
        return <Skills isEditing={isEditing} />;
      case "services":
        return (
          <ServicesOffered
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(!isEditing)}
          />
        );
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </h1>
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <nav className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderContent()}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <VerificationStatus />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

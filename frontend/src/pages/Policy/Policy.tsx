import { useState } from "react";
import { TabType } from "./models/types";
import ContentSection from "./partials/ContentSection";
import Sidebar from "./partials/Sidebar";

const Policy = () => {
  const [activeTab, setActiveTab] = useState<TabType>("terms");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <ContentSection activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default Policy;

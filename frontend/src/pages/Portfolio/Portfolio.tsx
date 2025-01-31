import { useState } from "react";
import { PortfolioContent, PortfolioHeader } from "./partials";
const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<"works" | "skills" | "about">(
    "works"
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PortfolioHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <PortfolioContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Portfolio;

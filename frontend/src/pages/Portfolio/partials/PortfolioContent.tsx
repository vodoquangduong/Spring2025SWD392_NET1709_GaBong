import { PortfolioContentProps } from "../models/types";
import { AboutSection, SkillsSection, WorksSection } from "./sections";

const PortfolioContent = ({ activeTab }: PortfolioContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "works":
        return <WorksSection />;
      case "skills":
        return <SkillsSection />;
      case "about":
        return <AboutSection />;
      default:
        return <WorksSection />;
    }
  };

  return <div className="mt-6">{renderContent()}</div>;
};

export default PortfolioContent;

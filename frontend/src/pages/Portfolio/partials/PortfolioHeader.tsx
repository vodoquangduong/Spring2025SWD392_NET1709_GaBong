import { PortfolioHeaderProps } from "../models/types";

const PortfolioHeader = ({ activeTab, setActiveTab }: PortfolioHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Build Your Professional Portfolio
      </h1>

      <nav className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: "works", label: "My Works" },
          { id: "skills", label: "Skills & Expertise" },
          { id: "about", label: "About Me" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              pb-4 px-2 font-medium text-sm transition-colors
              ${
                activeTab === tab.id
                  ? "border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PortfolioHeader;

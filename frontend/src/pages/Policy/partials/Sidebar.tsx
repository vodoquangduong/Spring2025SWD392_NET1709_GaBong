import {
  FaCopyright,
  FaCreditCard,
  FaFileContract,
  FaGavel,
  FaLock,
  FaShieldAlt,
} from "react-icons/fa";
import { PolicySection, SidebarProps } from "../models/types";

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const sections: PolicySection[] = [
    {
      id: "terms",
      title: "Terms of Service",
      icon: <FaFileContract />,
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <FaLock />,
    },
    {
      id: "payment",
      title: "Payment Terms",
      icon: <FaCreditCard />,
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      icon: <FaCopyright />,
    },
    {
      id: "dispute",
      title: "Dispute Resolution",
      icon: <FaGavel />,
    },
    {
      id: "safety",
      title: "Safety & Security",
      icon: <FaShieldAlt />,
    },
  ];

  return (
    <nav className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveTab(section.id)}
          className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors
            ${
              activeTab === section.id
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                : "hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
            }
            ${
              section.id !== sections[sections.length - 1].id &&
              "border-b border-gray-200 dark:border-gray-700"
            }
          `}
        >
          <span className="text-lg">{section.icon}</span>
          <span className="font-medium">{section.title}</span>
        </button>
      ))}
    </nav>
  );
};

export default Sidebar;

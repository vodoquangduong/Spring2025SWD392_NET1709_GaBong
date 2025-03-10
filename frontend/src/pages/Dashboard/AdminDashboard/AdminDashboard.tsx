import React from "react";
import {
  FaClipboardList,
  FaCog,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Account Management",
      icon: <FaUsers className="w-5 h-5" />,
      path: "/dashboard/admin/accounts",
    },
    {
      label: "Service Management",
      icon: <FaClipboardList className="w-5 h-5" />,
      path: "/dashboard/admin/services",
    },
    {
      label: "Report Management",
      icon: <FaExclamationTriangle className="w-5 h-5" />,
      path: "/dashboard/admin/reports",
    },
    {
      label: "System Configuration",
      icon: <FaCog className="w-5 h-5" />,
      path: "/dashboard/admin/system-configuration",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400">
              {item.icon}
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage {item.label.toLowerCase()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;

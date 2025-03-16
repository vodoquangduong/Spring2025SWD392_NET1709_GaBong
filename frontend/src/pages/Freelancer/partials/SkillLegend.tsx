import { Tooltip } from "antd";
import React from "react";

const SkillLegend: React.FC = () => {
  return (
    <Tooltip title="Skill level color legend">
      <div className="cursor-help flex flex-col">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Advanced</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Intermediate</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-gray-600 dark:text-gray-300">Entry</span>
        </div>
      </div>
    </Tooltip>
  );
};

export default SkillLegend;

import { Space, Tag, Tooltip } from "antd";
import React from "react";
import { SkillLevel } from "../models/types";
import { portfolioService } from "../services/portfolioService";

const SkillLegend: React.FC = () => {
  return (
    <Tooltip title="Skill level color legend">
      <Space size="small" className="cursor-help display-block">
        <Tag
          color={portfolioService.getSkillLevelColor(SkillLevel.Entry)}
          className="m-0"
        >
          Entry
        </Tag>
        <Tag
          color={portfolioService.getSkillLevelColor(SkillLevel.Intermediate)}
          className="m-0"
        >
          Intermediate
        </Tag>
        <Tag
          color={portfolioService.getSkillLevelColor(SkillLevel.Advanced)}
          className="m-0"
        >
          Advanced
        </Tag>
      </Space>
    </Tooltip>
  );
};

export default SkillLegend;

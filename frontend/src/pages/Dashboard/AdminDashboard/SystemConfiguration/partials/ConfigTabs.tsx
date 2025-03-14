import { Tabs } from "antd";
import React from "react";
import { FaEnvelope, FaGlobe, FaLock, FaPaypal } from "react-icons/fa";

import EmailSettings from "./settings/EmailSettings";
import GeneralSettings from "./settings/GeneralSettings";
import PaymentSettings from "./settings/PaymentSettings";
import SecuritySettings from "./settings/SecuritySettings";

interface ConfigTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ConfigTabs: React.FC<ConfigTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      tabPosition="left"
      className="min-h-[500px]"
      items={[
        {
          key: "general",
          label: (
            <span className="flex items-center">
              <FaGlobe className="mr-3 text-base" /> General
            </span>
          ),
          children: <GeneralSettings />,
        },
        {
          key: "email",
          label: (
            <span className="flex items-center">
              <FaEnvelope className="mr-3 text-base" /> Email
            </span>
          ),
          children: <EmailSettings />,
        },
        {
          key: "payment",
          label: (
            <span className="flex items-center">
              <FaPaypal className="mr-3 text-base" /> Payment
            </span>
          ),
          children: <PaymentSettings />,
        },
        {
          key: "security",
          label: (
            <span className="flex items-center">
              <FaLock className="mr-3 text-base" /> Security
            </span>
          ),
          children: <SecuritySettings />,
        },
      ]}
    />
  );
};

export default ConfigTabs;

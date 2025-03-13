import React from "react";
import SettingsSection from "../SettingsSection";

const EmailSettings: React.FC = () => {
  return (
    <SettingsSection
      title="Email Settings"
      description="Configure email server and notification settings."
      category="email"
    />
  );
};

export default EmailSettings;

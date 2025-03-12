import React from "react";
import SettingsSection from "../SettingsSection";

const GeneralSettings: React.FC = () => {
  return (
    <SettingsSection
      title="General Settings"
      description="Basic configuration for your platform."
      category="general"
    />
  );
};

export default GeneralSettings;

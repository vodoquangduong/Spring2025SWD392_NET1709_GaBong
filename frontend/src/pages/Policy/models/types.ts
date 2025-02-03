export type TabType =
  | "terms"
  | "privacy"
  | "payment"
  | "intellectual"
  | "dispute"
  | "safety";

export interface PolicySection {
  id: TabType;
  title: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface ContentSectionProps {
  activeTab: TabType;
}

import { ContentSectionProps } from "../models/types";
import DisputeContent from "./content/DisputeContent";
import IntellectualContent from "./content/IntellectualContent";
import PaymentContent from "./content/PaymentContent";
import PrivacyContent from "./content/PrivacyContent";
import SafetyContent from "./content/SafetyContent";
import TermsContent from "./content/TermsContent";

const ContentSection = ({ activeTab }: ContentSectionProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "terms":
        return <TermsContent />;
      case "privacy":
        return <PrivacyContent />;
      case "payment":
        return <PaymentContent />;
      case "intellectual":
        return <IntellectualContent />;
      case "dispute":
        return <DisputeContent />;
      case "safety":
        return <SafetyContent />;
      default:
        return <TermsContent />;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default ContentSection;

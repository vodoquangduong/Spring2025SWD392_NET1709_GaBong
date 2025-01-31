import { useState } from "react";
import { UserProfileData } from "./models/types";
import AssignedTasks from "./partials/AssignedTasks";
import Certifications from "./partials/Certifications";
import ContactInfo from "./partials/ContactInfo";
import Education from "./partials/Education";
import Experience from "./partials/Experience";
import HeroSection from "./partials/HeroSection";
import Languages from "./partials/Languages";
import PaymentHistory from "./partials/PaymentHistory";
import ProjectHistory from "./partials/ProjectHistory";
import ReviewHistory from "./partials/ReviewHistory";
import Skills from "./partials/Skills";
import SocialLinks from "./partials/SocialLinks";

const UserProfile = () => {
  const [profile] = useState<UserProfileData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    profession: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    website: "www.johndoe.dev",
    bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    socials: {
      github: "github.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
      twitter: "twitter.com/johndoe",
    },
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "MongoDB",
      "GraphQL",
      "Docker",
      "Kubernetes",
    ],
    certifications: [
      {
        name: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
      },
      {
        name: "Professional Cloud Developer",
        issuer: "Google Cloud",
        date: "2022",
      },
    ],
    experience: [
      {
        company: "Tech Corp Inc",
        position: "Senior Software Engineer",
        duration: "2020 - Present",
        description: "Lead developer for enterprise applications...",
      },
      {
        company: "StartupXYZ",
        position: "Software Engineer",
        duration: "2018 - 2020",
        description: "Full stack development using React and Node.js...",
      },
    ],
    education: [
      {
        school: "Stanford University",
        degree: "M.S. Computer Science",
        duration: "2016 - 2018",
      },
    ],
    languages: [
      { name: "English", level: "Native" },
      { name: "Spanish", level: "Conversational" },
    ],
    role: "freelancer",
  });

  const hasPortfolio = false; // This should be replaced with actual logic to check if the user has a portfolio

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection profile={profile} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          {profile.role === "freelancer" && !hasPortfolio && (
            <>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <Certifications certifications={profile.certifications} />
            </>
          )}

          {profile.role === "client" && (
            <>
              <ProjectHistory />
              <PaymentHistory />
            </>
          )}

          {profile.role === "staff" && (
            <>
              <AssignedTasks />
              <ReviewHistory />
            </>
          )}
        </div>

        <div className="md:col-span-4 space-y-8">
          {profile.role === "freelancer" && !hasPortfolio && (
            <>
              <Skills skills={profile.skills} />
              <Languages languages={profile.languages} />
            </>
          )}
          <ContactInfo profile={profile} />
          <SocialLinks profile={profile} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

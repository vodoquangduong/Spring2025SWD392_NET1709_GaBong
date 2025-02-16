import { useState } from "react";
import { UserProfileData } from "./models/types";
import Certifications from "./partials/Certifications";
import Experience from "./partials/Experience";
import HeroSection from "./partials/HeroSection";
import Skills from "./partials/Skills";
import Verifications from "./partials/Verifications";

const UserProfile = () => {
  //fake data
  const [profile] = useState<UserProfileData>({
    firstName: "Jane",
    lastName: "Ferguson",
    email: "jane.ferguson@example.com",
    phone: "+1 (555) 123-4567",
    profession: "Senior Software Engineer",
    location: "San Francisco, CA",
    website: "www.janeferguson.dev",
    bio: "I'm a Front End Developer with experience in VueJS through academic projects and React through internship work. I have 2 years of software engineering studies, with a focus on front-end development. During my internship, I contributed to developing a web-based tournament management system using React and Vite, where I implemented user interfaces and resolved frontend integration challenges. With my knowledge of UI/UX design, I enjoy creating intuitive user experiences and solving complex frontend issues. I'm constantly learning new technologies and best practices to become a better engineer, building upon my strong foundation in HTML, CSS, and JavaScript, while maintaining a good understanding of backend development.",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    socials: {
      github: "github.com/janeferguson",
      linkedin: "linkedin.com/in/janeferguson",
      twitter: "twitter.com/janeferguson",
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
      {
        school: "UC Berkeley",
        degree: "B.S. Computer Science",
        duration: "2012 - 2016",
      },
    ],
    portfolio: [
      {
        title: "E-commerce Platform",
        description:
          "Built a full-scale e-commerce platform using React, Node.js, and MongoDB",
        link: "https://project1.example.com",
        image: "https://example.com/project1.jpg",
      },
      {
        title: "Task Management App",
        description:
          "Developed a real-time task management application using React and Firebase",
        link: "https://project2.example.com",
        image: "https://example.com/project2.jpg",
      },
    ],
    timezone: "UTC",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection profile={profile} />

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-3">
          <div className="sticky top-[92px] space-y-6">
            <Verifications />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-9 space-y-6">
          <Experience experience={profile.experience} />
          <Certifications certifications={profile.certifications} />
          <Skills skills={profile.skills} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

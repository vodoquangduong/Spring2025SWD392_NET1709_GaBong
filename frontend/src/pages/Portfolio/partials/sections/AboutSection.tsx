import { useState } from "react";
import { AboutInfo } from "../../models/types";

const AboutSection = () => {
  const [about] = useState<AboutInfo>({
    bio: "Passionate full-stack developer with 5+ years of experience...",
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Developer",
        duration: "2020 - Present",
        description: "Leading development of enterprise applications...",
      },
    ],
    education: [
      {
        school: "University of Technology",
        degree: "BSc Computer Science",
        duration: "2015 - 2019",
      },
    ],
  });

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          About Me
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{about.bio}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Experience
        </h3>
        <div className="space-y-6">
          {about.experience.map((exp, index) => (
            <div key={index}>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                {exp.position}
              </h4>
              <p className="text-emerald-600 dark:text-emerald-400">
                {exp.company}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {exp.duration}
              </p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Education
        </h3>
        <div className="space-y-4">
          {about.education.map((edu, index) => (
            <div key={index}>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                {edu.degree}
              </h4>
              <p className="text-emerald-600 dark:text-emerald-400">
                {edu.school}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {edu.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

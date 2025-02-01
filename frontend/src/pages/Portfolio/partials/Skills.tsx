import { useState } from "react";
import {
  FaAward,
  FaBrain,
  FaCertificate,
  FaChartLine,
  FaPlus,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { SkillCategory } from "../models/types";

interface Skill {
  name: string;
  level: number;
  years: number;
  certified?: boolean;
}

interface SkillsProps {
  isEditing?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isEditing = false }) => {
  const [categories] = useState<SkillCategory[]>([
    {
      name: "Frontend Development",
      icon: <FaBrain />,
      skills: [
        { name: "React", level: 5, years: 3, certified: true },
        { name: "TypeScript", level: 4, years: 2, certified: true },
        { name: "Tailwind CSS", level: 5, years: 2 },
        { name: "Next.js", level: 4, years: 1, certified: true },
      ],
    },
    {
      name: "Backend Development",
      icon: <FaChartLine />,
      skills: [
        { name: "Node.js", level: 5, years: 4, certified: true },
        { name: "Python", level: 4, years: 3 },
        { name: "PostgreSQL", level: 4, years: 3 },
        { name: "GraphQL", level: 3, years: 1 },
      ],
    },
    {
      name: "DevOps & Tools",
      icon: <FaTrophy />,
      skills: [
        { name: "Docker", level: 4, years: 2, certified: true },
        { name: "AWS", level: 3, years: 2, certified: true },
        { name: "Git", level: 5, years: 4 },
        { name: "CI/CD", level: 4, years: 2 },
      ],
    },
  ]);

  const certifications = [
    {
      id: 1,
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2024",
      icon: <FaAward />,
    },
    {
      id: 2,
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "January 2024",
      icon: <FaAward />,
    },
    {
      id: 3,
      name: "React Native Specialist",
      issuer: "Meta",
      date: "December 2023",
      icon: <FaAward />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Highlight your technical skills and proficiency levels
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg transition-all">
          <FaPlus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills Categories */}
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl text-emerald-500 dark:text-emerald-400">
                {category.icon}
              </span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </div>
            <div className="space-y-6">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                        {skill.certified && (
                          <FaStar className="w-4 h-4 text-yellow-400 dark:text-yellow-300" />
                        )}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {skill.years} {skill.years === 1 ? "year" : "years"} of
                        experience
                      </span>
                    </div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {skill.level}/5
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <FaCertificate className="w-6 h-6 text-emerald-500" />
          <h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
            Certifications
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group p-4 bg-white dark:bg-gray-800/50 backdrop-blur-xl border-gray-100/50 dark:border-gray-700/50 rounded-lg hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                  {cert.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    Issued: {cert.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;

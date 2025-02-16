import { FaBriefcase, FaPlus } from "react-icons/fa";
import { ExperienceProps } from "../models/types";

const Experience = ({ experience }: ExperienceProps) => {
  return (
    <section className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Experience
        </h2>
        <button className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
          <FaPlus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
              <FaBriefcase className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {exp.position}
              </h3>
              <p className="text-emerald-700 dark:text-emerald-400">
                {exp.company}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {exp.duration}
              </p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

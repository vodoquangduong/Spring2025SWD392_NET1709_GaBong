import { FaPlus } from "react-icons/fa";
import { SkillsProps } from "../models/types";

const Skills = ({ skills }: SkillsProps) => {
  return (
    <section className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Skills
        </h2>
        <button className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">
          <FaPlus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;

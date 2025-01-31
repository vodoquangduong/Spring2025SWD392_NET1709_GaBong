import { SkillsProps } from "../models/types";

const Skills = ({ skills }: SkillsProps) => {
  return (
    <section className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Skills
      </h2>

      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg"
          >
            <span className="text-sm font-medium">{skill}</span>
          </div>
        ))}
      </div>

      {(!skills || skills.length === 0) && (
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400">
            No skills added yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default Skills;

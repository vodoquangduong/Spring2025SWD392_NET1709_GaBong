import { EducationProps } from "../models/types";

const Education = ({ education }: EducationProps) => {
  return (
    <section className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Education
      </h2>

      <div className="space-y-6">
        {education?.map((edu, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {edu.degree}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {edu.duration}
            </p>
          </div>
        ))}

        {(!education || education.length === 0) && (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">
              No education history added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;

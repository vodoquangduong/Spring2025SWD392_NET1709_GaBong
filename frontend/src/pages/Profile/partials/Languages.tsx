import { UserProfileData } from "../models/types";

const Languages = ({ languages }: UserProfileData) => {
  const proficiencyLevels = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Advanced",
    "Native",
  ];

  return (
    <section className="bg-white shadow-lg dark:bg-white/5 backdrop-blur-lg rounded-xl border border-gray-200 dark:border-white/10 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Languages
      </h2>

      <div className="space-y-4">
        {languages?.map((lang, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <h3 className="font-medium text-gray-900 dark:text-white">
              {lang.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {lang.level}
            </p>
          </div>
        ))}

        {(!languages || languages.length === 0) && (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400">
              No languages added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Languages;

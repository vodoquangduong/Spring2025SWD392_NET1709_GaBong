import { FaPlus, FaTrash } from "react-icons/fa";
import { LanguagesProps } from "../models/types";

const EditLanguages = ({ languages }: LanguagesProps) => {
  const proficiencyLevels = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Advanced",
    "Native",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Languages</h2>
        <button className="text-emerald-600 hover:text-emerald-700">
          <FaPlus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {languages?.map((lang, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <div>
              <h3 className="font-medium">{lang.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lang.level}
              </p>
            </div>
            <button className="text-red-500 hover:text-red-700">
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add New Form */}
        <div className="grid grid-cols-1 gap-4 mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
          <input
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
            placeholder="Language Name"
          />
          <select className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white">
            <option value="">Select Proficiency Level</option>
            {proficiencyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <button className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLanguages;

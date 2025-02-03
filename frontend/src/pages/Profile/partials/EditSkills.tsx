import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

interface EditSkillsProps {
  skills: string[];
  onUpdate?: (skills: string[]) => void;
}

const EditSkills: React.FC<EditSkillsProps> = ({ skills, onUpdate }) => {
  const [newSkill, setNewSkill] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-6">Skills</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg"
          >
            <span className="text-sm font-medium">{skill}</span>
            <button className="hover:text-emerald-800 dark:hover:text-emerald-300">
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 bg-transparent dark:text-white"
          placeholder="Add new skill..."
        />
        <button className="px-4 py-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg">
          <FaPlus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default EditSkills;

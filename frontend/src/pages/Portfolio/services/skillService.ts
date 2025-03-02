import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export interface Skill {
  skillId: number;
  skillName: string;
}

export const skillService = {
  getSkills: async (): Promise<Skill[]> => {
    try {
      const response = await axios.get(`${API_URL}/api/SkillCategory`);
      return response.data;
    } catch (error) {
      console.error("Error fetching skills:", error);
      throw error;
    }
  },

  // Chuyển đổi danh sách skills từ API thành định dạng options cho Select component
  mapSkillsToOptions: (skills: Skill[]) => {
    return skills.map((skill) => ({
      value: skill.skillName,
      label: skill.skillName,
      id: skill.skillId,
    }));
  },
};

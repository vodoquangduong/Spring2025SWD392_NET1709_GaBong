import axios from "axios";
import { SkillLevel } from "../models/types";
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
      value: skill.skillId, // Changed from skill.skillName to skill.skillId
      label: skill.skillName,
      id: skill.skillId,
    }));
  },

  // Provide skill level options for dropdown selection
  getSkillLevelOptions: () => [
    { value: SkillLevel.Entry, label: "Entry" },
    { value: SkillLevel.Intermediate, label: "Intermediate" },
    { value: SkillLevel.Advanced, label: "Advanced" },
  ],

  // Map skill level enum to readable string
  getSkillLevelName: (level: number): string => {
    switch (level) {
      case SkillLevel.Entry:
        return "Entry";
      case SkillLevel.Intermediate:
        return "Intermediate";
      case SkillLevel.Advanced:
        return "Advanced";
      default:
        return "Unknown";
    }
  },

  // Get skill level color based on level number
  getSkillLevelColor: (level: number): string => {
    switch (level) {
      case SkillLevel.Entry:
        return "red";
      case SkillLevel.Intermediate:
        return "gold";
      case SkillLevel.Advanced:
        return "green";
      default:
        return "default";
    }
  },
};

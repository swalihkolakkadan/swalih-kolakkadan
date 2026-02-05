export interface Skill {
  name: string;
  rating: number;
  category: SkillCategory;
}

export type SkillCategory = "frontend" | "backend" | "tools" | "languages";

export const skills: Skill[] = [
  // Frontend
  { name: "React", rating: 4.5, category: "frontend" },
  { name: "TypeScript", rating: 4.5, category: "frontend" },
  { name: "JavaScript", rating: 4.5, category: "frontend" },
  { name: "HTML5", rating: 4.5, category: "frontend" },
  { name: "CSS3", rating: 4.5, category: "frontend" },
  { name: "Tailwind CSS", rating: 4, category: "frontend" },
  { name: "Material UI", rating: 4, category: "frontend" },
  { name: "Angular", rating: 3.5, category: "frontend" },
  { name: "Redux", rating: 4, category: "frontend" },
  { name: "RXJS", rating: 3.5, category: "frontend" },
  { name: "Prime React", rating: 3.5, category: "frontend" },

  // Backend
  { name: "Node.js", rating: 3, category: "backend" },
  { name: "Express.js", rating: 3, category: "backend" },
  { name: "Firebase", rating: 3.5, category: "backend" },

  // Languages
  { name: "Python", rating: 3, category: "languages" },
  { name: "C", rating: 3, category: "languages" },
  { name: "SQL", rating: 2.5, category: "languages" },

  // Tools
  { name: "Git", rating: 4, category: "tools" },
  { name: "JIRA", rating: 4, category: "tools" },
  { name: "Vite", rating: 4, category: "tools" },
  { name: "Webpack", rating: 3, category: "tools" },
];

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "languages", label: "Languages" },
  { id: "tools", label: "Tools" },
];

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills
    .filter((skill) => skill.category === category)
    .sort((a, b) => b.rating - a.rating);
};

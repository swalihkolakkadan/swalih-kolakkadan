export interface ProjectLink {
  name: string;
  href: string;
  icon?: string;
}

export interface Project {
  id: number;
  name: string;
  skills: string[];
  description: string;
  links?: ProjectLink[];
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Personal Portfolio",
    skills: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    description:
      "This project portfolio showcases my web development work with a modern, responsive design. Built with React and TypeScript, styled using Tailwind CSS, and bundled with Vite for optimized performance. Features include smooth navigation, dark mode, and a clean, minimal aesthetic.",
    links: [
      {
        name: "GitHub",
        href: "https://github.com/swalihkolakkadan/swalih-kolakkadan",
      },
      {
        name: "Live Demo",
        href: "https://swalih-kolakkadan.vercel.app",
      },
    ],
    featured: true,
  },
  {
    id: 2,
    name: "Dalu Fashion Factory",
    skills: ["ReactJS", "Firebase", "CashFreeAPI", "React-Admin"],
    description:
      "An e-commerce platform designed for boutique garment sales. Built using React with a dynamic and responsive user interface that enhances the shopping experience. Features a comprehensive admin page developed with React Admin, enabling efficient management of products, orders, and customer data.",
    featured: true,
  },
  {
    id: 3,
    name: "Prisma Dashboard",
    skills: ["Angular", "TypeScript", "RXJS", "AG-Grid"],
    description:
      "A sophisticated enterprise web application for managing advertising campaigns and orders through an integrated workflow. Led the development of the Orders Tab and optimized dashboard grid rendering, achieving a 40% improvement in loading speed.",
    featured: true,
  },
  {
    id: 4,
    name: "CircleK Admin Portal",
    skills: ["React", "Redux", "Material UI", "REST API"],
    description:
      "Admin portal for CircleK, a prominent supermarket chain. Implemented features including Ad campaign management and changelog system, enabling the marketing team to efficiently manage promotions across stores.",
    featured: false,
  },
  {
    id: 5,
    name: "Testmate Extension",
    skills: ["Chrome Extension", "JavaScript", "React"],
    description:
      "A QA automation tool that integrates a Chrome extension with the Testmate website to store and replay tests. Enables quality assurance teams to record, manage, and execute automated browser tests efficiently.",
    featured: false,
  },
];

export interface Experience {
  id: number;
  companyName: string;
  href: string;
  jobType: string;
  description: string;
  roleName: string;
  startDate: Date;
  endDate?: Date | null;
  highlights?: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    companyName: "Qburst",
    href: "https://www.qburst.com/en-in/",
    jobType: "Full time",
    roleName: "Sr Software Engineer",
    startDate: new Date(2024, 1),
    description:
      "In addition to my contract role at Mediaocean through Qburst for product development, I am actively involved in training and mentoring new joiners at QBurst.",
    endDate: null,
    highlights: [
      "Training and mentoring new joiners",
      "Product development for enterprise clients",
    ],
  },
  {
    id: 2,
    companyName: "MediaOcean (Contract from Qburst)",
    href: "https://www.mediaocean.com/",
    jobType: "Contractor",
    description:
      "Contributed to the development of the Prisma Dashboard, a sophisticated web application for managing campaigns and orders through an integrated workflow, and led the development and maintenance of the Orders Tab. Additionally, optimized the dashboard grid's rendering, resulting in a 40% improvement in loading speed.",
    roleName: "Frontend Engineer",
    startDate: new Date(2022, 9),
    endDate: null,
    highlights: [
      "Led development of Orders Tab module",
      "40% improvement in dashboard loading speed",
      "Integrated workflow management system",
    ],
  },
  {
    id: 3,
    companyName: "Qburst",
    href: "https://www.qburst.com/en-in/",
    jobType: "Full time",
    roleName: "Software Engineer",
    startDate: new Date(2020, 10),
    endDate: new Date(2023, 12),
    description:
      "Worked on the admin page of the CircleK project, a prominent supermarket chain, implementing new features like Ad campaigns and changelog. Additionally, contributed to the Testmate Extension project by integrating the Chrome extension with the Testmate website and worked on the Testmate Website, a QA automation tool used to store and replay tests.",
    highlights: [
      "CircleK admin page feature development",
      "Chrome extension integration",
      "QA automation tool development",
    ],
  },
];

export const formatDateRange = (experience: Experience): string => {
  const { startDate, endDate } = experience;
  const isPresent = !endDate;
  const startDateString = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const endDateString =
    !isPresent &&
    endDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  return `${startDateString} - ${isPresent ? "Present" : endDateString}`;
};

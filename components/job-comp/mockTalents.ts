export type JobTalent = {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  photo: string;
};

const mockTalents: JobTalent[] = Array.from({ length: 30 }, (_, i) => ({
  id: `talent-${i + 1}`,
  name: [
    "Liya Mekonnen",
    "Sara Tadesse",
    "Marta Abebe",
    "Bethel Haile",
    "Hanna Tesfaye",
    "Selamawit Kebede",
  ][i % 6],
  skills: [
    ["React", "Node.js", "UI/UX"],
    ["Python", "Data Analysis", "Machine Learning"],
    ["Project Management", "Agile", "Scrum"],
    ["Graphic Design", "Photoshop", "Illustrator"],
    ["Marketing", "SEO", "Content Writing"],
    ["Finance", "Excel", "Accounting"],
  ][i % 6],
  experience: `${2 + (i % 5)} years`,
  email: `talent${i + 1}@example.com`,
  phone: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10}${i % 10}`,
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5],
  bio: "Passionate and experienced professional ready to contribute to your team.",
  photo: "/placeholder.svg?height=120&width=120&text=Talent",
}));

export { mockTalents }; 
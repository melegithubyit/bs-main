import { StartupProject } from "./project-card";
import placeholderimg from "@/public/placeholder.png";

const mockProjects: StartupProject[] = Array.from({ length: 50 }, (_, i) => ({
  id: `project-${i + 1}`,
  projectName: [
    "EcoTech Solutions",
    "FinHub",
    "MedConnect",
    "AgriSmart",
    "EduTech Innovations",
    "CleanEnergy",
    "SmartMobility",
    "FoodTech",
    "RetailTech",
    "AIServices",
  ][i % 10],
  projectDescription: [
    "Sustainable technology solutions for environmental challenges",
    "Innovative financial technology platform for small businesses",
    "Connecting patients with healthcare providers through technology",
    "Smart agricultural solutions for improved crop yields",
    "Educational technology for accessible learning",
    "Renewable energy solutions for homes and businesses",
    "Smart transportation solutions for urban areas",
    "Innovative food technology for sustainable nutrition",
    "Technology solutions for modern retail experiences",
    "AI-powered services for business optimization",
  ][i % 10],
  projectOwner: [
    "Abebe Kebede",
    "Tigist Haile",
    "Dawit Tadesse",
    "Hiwot Tesfaye",
    "Yonas Bekele",
  ][i % 5],
  email: `contact@${[
    "ecotech",
    "finhub",
    "medconnect",
    "agrismart",
    "edutech",
  ][i % 5]}.com`,
  phoneNumber: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10}${i % 10}`,
  postDuration: 30 + (i % 5) * 30,
  goalFund: 100000 + (i % 10) * 50000,
  bank: [
    "Commercial Bank of Ethiopia",
    "Dashen Bank",
    "Awash Bank",
    "Bank of Abyssinia",
    "Zemen Bank",
  ][i % 5],
  bankAccount: `100${i}${i}${i}${i}${i}${i}`,
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5],
  address: `${i + 1} Main Street, ${["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5]}`,
  companyLogo: placeholderimg,
  nationalId: `https://storage.example.com/id/id-${i + 1}.pdf`,
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  typeOfSupport: [
    "Funding",
    "Mentorship",
    "Technical",
    "Partnership",
    "Investment",
  ][i % 5],
  fundingProgress: Math.floor(Math.random() * 100),
  supporters: Math.floor(Math.random() * 100),
  category: ["Technology", "Non-Technology"][i % 10],
}));

export type { StartupProject };
export { mockProjects }; 
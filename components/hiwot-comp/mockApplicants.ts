import { HiwotApplicant } from "./applicant-card";
import placeholder from "@/public/hiwot-placeholder.png";

const mockApplicants: HiwotApplicant[] = Array.from({ length: 50 }, (_, i) => ({
  id: `applicant-${i + 1}`,
  firstName: ["Sarah", "Meron", "Hiwot", "Tigist", "Bethel"][i % 5],
  lastName: ["Tadesse", "Abebe", "Kebede", "Haile", "Tesfaye"][i % 5],
  description: [
    "Needs support for cancer treatment",
    "Requires surgery for heart condition",
    "Seeking help for chronic kidney disease",
    "Needs assistance for diabetes treatment",
    "Requires support for physical therapy after accident",
  ][i % 5],
  phoneNumber: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10}${i % 10}`,
  email: `${["sarah", "meron", "hiwot", "tigist", "bethel"][i % 5]}.${["tadesse", "abebe", "kebede", "haile", "tesfaye"][i % 5]}@example.com`,
  postDuration: ["30", "60", "90", "120", "180"][i % 5],
  dateOfBirth: new Date(1980 + (i % 30), i % 12, (i % 28) + 1).toISOString().split("T")[0],
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  medicalDocuments: [
    `https://storage.example.com/medical/document-${i + 1}-1.pdf`,
    `https://storage.example.com/medical/document-${i + 1}-2.pdf`,
    `https://storage.example.com/medical/document-${i + 1}-3.pdf`,
  ],
  goalFund: `${(50000 + i * 10000).toString()}`,
  supporters: Math.floor(Math.random() * 100),
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5],
  address: `${i + 1} Main Street, ${["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5]}`,
  photo: placeholder,
}));

export type { HiwotApplicant };
export { mockApplicants }; 
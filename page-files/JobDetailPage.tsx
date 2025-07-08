"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Candidate } from "@/types/jobApi";
import placeholderimg from "@/public/person-placeholder.png";
import { useRouter, useParams } from "next/navigation";
import { mockTalents, JobTalent } from "@/components/job-comp/mockTalents";

// Update the Candidate interface to include bank and bankAccount
// interface Candidate {
//   id: string
//   firstName: string
//   lastName: string
//   department: string
//   field: string
//   phoneNumber: string
//   email: string
//   location: string
//   address: string
//   bank: string
//   bankAccount: string
//   educationCertificates: string[]
//   CV: string
//   identification: string
//   photo: string
//   typeOfEmployment: string
//   videoLink: string
// }

// Update the mock data to include bank and bankAccount
const mockCandidates: Candidate[] = Array.from({ length: 50 }, (_, i) => ({
  id: `candidate-${i + 1}`,
  firstName: ["Sarah", "Meron", "Hiwot", "Tigist", "Bethel"][i % 5],
  lastName: ["Tadesse", "Abebe", "Kebede", "Haile", "Tesfaye"][i % 5],
  department: [
    "Engineering",
    "Design",
    "Marketing",
    "Finance",
    "Human Resources",
  ][i % 5],
  field: [
    "Software Development",
    "UX/UI Design",
    "Digital Marketing",
    "Accounting",
    "Recruitment",
    "Data Science",
    "Project Management",
  ][i % 7],
  phoneNumber: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${
    i % 10
  }${i % 10}${i % 10}`,
  email: `${["sarah", "meron", "hiwot", "tigist", "bethel"][i % 5]}.${
    ["tadesse", "abebe", "kebede", "haile", "tesfaye"][i % 5]
  }@example.com`,
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][
    i % 5
  ],
  address: `${i + 1} Main Street, ${
    ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5]
  }`,
  bank: [
    "Commercial Bank of Ethiopia",
    "Dashen Bank",
    "Awash Bank",
    "Bank of Abyssinia",
    "Zemen Bank",
  ][i % 5],
  bankAccount: `100${i}${i}${i}${i}${i}${i}`,
  educationCertificates: [
    `https://storage.example.com/certificates/certificate-${i + 1}-1.pdf`,
    `https://storage.example.com/certificates/certificate-${i + 1}-2.pdf`,
    `https://storage.example.com/certificates/certificate-${i + 1}-3.pdf`,
  ],
  CV: `https://storage.example.com/cv/cv-${i + 1}.pdf`,
  identification: `https://storage.example.com/id/id-${i + 1}.pdf`,
  photo: placeholderimg,
  typeOfEmployment: [
    "fulltime",
    "parttime",
    "remote",
    "internship",
    "contract",
  ][i % 5],
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}));

export default function JobDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  const [talent, setTalent] = useState<JobTalent | null>(null);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  useEffect(() => {
    const found = mockTalents.find((t) => t.id === id);
    setTalent(found || null);
  }, [id]);

  if (!talent) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Candidate Not Found</h2>
          <p className="text-gray-600 mb-6">
            The candidate you are looking for does not exist.
          </p>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 "
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Candidates
          </Button>
        </div>
      </div>
    );
  }

  const getEmploymentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "fulltime":
        return "text-green-500 bg-green-50";
      case "parttime":
        return "text-blue-500 bg-blue-50";
      case "remote":
        return "text-purple-500 bg-purple-50";
      case "internship":
        return "text-purple-500 bg-purple-50";
      case "contract":
        return "text-gray-500 bg-gray-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };
  return (
    <div className="min-h-screen  pb-16 relative overflow-hidden">
      {/* Background patterns */}
      {/* <div className="absolute -left-40 top-0 opacity-10">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="200"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#FFA500"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="absolute -right-40 bottom-0 opacity-10">
        <svg
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="200"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="#3B82F6"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div> */}

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 "
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Candidates
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 pt-0">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                  <Image
                    src={talent.photo}
                    alt={talent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{talent.name}</h1>
                <div className="mt-2">
                  <span className="inline-flex items-center text-xs px-3 py-1 rounded-full text-purple-500 bg-purple-50">
                    <Briefcase size={12} className="mr-1" />
                    {talent.experience}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{talent.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{talent.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{talent.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  Contact Candidate
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 pt-0">
              <h2 className="text-xl font-bold mb-4">About {talent.name}</h2>
              <p className="text-gray-600 mb-4">{talent.bio}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Skills</h3>
                <ul className="flex flex-wrap gap-2">
                  {talent.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p>{talent.experience}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

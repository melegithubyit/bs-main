"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import type { HiwotApplicant } from "@/components/hiwot-comp/applicant-card";
import placeholderimg from "@/public/hiwot-placeholder.png";
import { useRouter, useParams } from "next/navigation";
import { mockApplicants } from "@/components/hiwot-comp/mockApplicants";

export default function HiwotDetailPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;
  const [applicant, setApplicant] = useState<HiwotApplicant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const found = mockApplicants.find((a) => a.id === id);
    setApplicant(found || null);
    setLoading(false);
  }, [id]);

  const handleBack = () => {
    router.push("/hiwot/overview");
  };
  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Applicant Not Found</h2>
          <p className="text-gray-600 mb-6">
            The applicant you are looking for does not exist.
          </p>
          <Button
            onClick={handleBack}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Link href="/hiwot">Back to Applicants</Link>
          </Button>
        </div>
      </div>
    );
  }
  const router = useRouter();
  const age = calculateAge(applicant.dateOfBirth);

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden">
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
        <div className="mb-6 m-3">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 "
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Applicants
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
                    src={placeholderimg}
                    alt={`${applicant.firstName} ${applicant.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{`${applicant.firstName} ${applicant.lastName}`}</h1>
                <p className="text-gray-600">{applicant.description}</p>
                <div className="mt-2">
                  <span className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    <Calendar size={12} className="mr-1" />
                    {age} years old
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{applicant.location}</p>
                    <p className="text-sm text-gray-500">{applicant.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{applicant.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{applicant.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Contact Applicant
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
              <Tabs defaultValue="story">
                <TabsList className="mb-6">
                  <TabsTrigger value="story">Story</TabsTrigger>
                  <TabsTrigger value="document"> Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="story" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      {applicant.firstName}'s Story
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {applicant.firstName} is seeking financial assistance for
                      medical treatment. {applicant.description}
                      and needs support from the community to cover the medical
                      expenses. Your contribution can make a significant
                      difference in {applicant.firstName}'s life and recovery
                      journey.
                    </p>
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold mb-4">Video Message</h2>
                      <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                        <iframe
                          src={applicant.videoLink.replace(
                            "watch?v=",
                            "embed/"
                          )}
                          className="absolute top-0 left-0 w-full h-full"
                          title="Applicant Video"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          <span>Open in YouTube</span>
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2"> Condition</h3>
                      <p className="text-gray-600">
                        {applicant.description} The treatment requires
                        significant financial resources that are beyond
                        {applicant.firstName}'s current means. With your help,{" "}
                        {applicant.firstName} can receive the necessary medical
                        care and have a chance at recovery.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="document">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">
                      Medical Documents
                    </h2>
                    <div className="space-y-4">
                      {applicant.medicalDocuments.map((doc, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-500 mr-3" />
                            <span>Medical Document {index + 1}</span>
                          </div>
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>National ID</span>
                      </div>
                      <a
                        href={applicant.nationalId}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        View
                      </a>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Funding Progress</h2>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    ETB {Number.parseInt(applicant.goalFund).toLocaleString()}
                  </span>
                  <span className="text-sm font-medium">
                    {applicant.fundingProgress}% Funded
                  </span>
                </div>
                <Progress
                  value={applicant.fundingProgress || 0}
                  className="h-2"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {applicant.supporters}
                  </div>
                  <div className="text-sm text-gray-600">Supporters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {applicant.postDuration}
                  </div>
                  <div className="text-sm text-gray-600">Days to Go</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">
                    ETB{" "}
                    {Number.parseInt(applicant.goalFund).toLocaleString(
                      "en-ET"
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Goal</div>
                </div>
              </div>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Support Now
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 mt-3"
              >
                <Heart size={16} />
                <span>Share with Friends</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

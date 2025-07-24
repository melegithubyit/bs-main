"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
// import Link from "next/link";
import { Upload, ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
// import { current } from "@reduxjs/toolkit";
import TermsModal from "@/components/common-comp/Terms";

export default function StartupCreatePage() {
  const { toast } = useToast();
  const [showTerms, setShowTerms] = useState(false);
  const router = useRouter();
  const [creationType, setCreationType] = useState<"self" | "team" | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Form states
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
  });

  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    companyOverview: "",
    registeredIn: "",
    capitalSought: "",
    budgetForFundraise: "",
    companyStage: "",
    fundingGoal: "",
    campaignDuration: "30",
    industry: "",
    currentStateFile: null as File | null,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [pitchDeckFile, setPitchDeckFile] = useState<File | null>(null);
  const [teamStep, setTeamStep] = useState<number>(0);
  const [startStep, setStartStep] = useState(0); // 0: email, 1: choose type, 2: flow
  const [startEmail, setStartEmail] = useState("");

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleCompanyInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyFormData({
      ...companyFormData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCompanyFormData({
      ...companyFormData,
      [name]: value,
    });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    toast({
      title: "Project submitted!",
      description: "Your project has been submitted successfully.",
    });
    router.push("/dashboard");
  };

  // Funding ranges for selection
  const fundingRanges = [
    "10,000 - 20,000 ETB",
    "20,000 - 30,000 ETB",
    "30,000 - 40,000 ETB",
    "40,000 - 50,000 ETB",
    "50,000 - 100,000 ETB",
    "100,000 - 300,000 ETB",
    "300,000 - 500,000 ETB",
    "500,000 - 1,000,000 ETB",
    "1,000,000+ ETB",
  ];

  const companies = ["Company A", "Company B", "Company C"];
  // Industry options
  const industries = [
    "Technology",
    "Non Technology"
  ];

  const fundraisercost = [
    "0- 5000ETB",
    "5,000 - 10,000 ETB",
    "10,000 - 20,000 ETB",
  ];
  if (startStep === 0) {
    // Step 0: Ask for email
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-24 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-lg w-full border border-gray-100">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Enter Your Email to Begin</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (startEmail) setStartStep(1);
            }}
            className="space-y-8"
          >
            <Input
              type="email"
              placeholder="Email Address"
              className="w-full h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={startEmail}
              onChange={(e) => setStartEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
            >
              Get Started
            </Button>
          </form>
        </div>
      </div>
    );
  }

  if (startStep === 1) {
    // Step 1: Choose flow
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-24 px-4 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-extrabold mb-4 text-blue-700">Create Your Project</h1>
            <p className="text-lg text-gray-600">
              Choose how you&apos;d like to proceed with your project creation
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Self-Direct Option */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-4 rounded-full bg-blue-100 mr-4">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-700">Self Direct</h3>
                </div>
                <p className="text-gray-600 mb-8 text-base">
                  I would like to use BoleStarter to host my fundraise to
                  collect backer commitment from BoleStarter&apos;s networks
                </p>

                <Button
                  onClick={() => {
                    setCreationType("self");
                    setStartStep(2);
                  }}
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                >
                  GET STARTED
                </Button>
              </div>
            </motion.div>

            {/* BoleStarter Team Option */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-4 rounded-full bg-blue-100 mr-4">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-700">BoleStarter Team</h3>
                </div>
                <p className="text-gray-600 mb-8 text-base">
                  I&apos;d like the BoleStarter team to create my pitch deck,
                  research prospective investors that may be interested, and
                  support my project more
                </p>

                <Button
                  onClick={() => {
                    setCreationType("team");
                    setStartStep(2);
                  }}
                  className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                >
                  GET STARTED
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (creationType === "self") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-24 px-4 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Navigation */}
          <div className="flex items-center mb-10">
            <Button
              variant="ghost"
              onClick={() => {
                setStartStep(1);
                setCreationType(null);
              }}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-blue-700">Create Your Project</h1>
              <div className="flex mt-3">
                <div
                  className={`flex items-center ${
                    currentStep === 0
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                      currentStep === 0
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    1
                  </div>
                  <span className="text-base">User Information</span>
                </div>
                <div className="mx-4 flex items-center text-gray-400">
                  <ChevronRight className="w-5 h-5" />
                </div>
                <div
                  className={`flex items-center ${
                    currentStep === 1
                      ? "text-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                      currentStep === 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-base">Company Information</span>
                </div>
              </div>
            </div>
          </div>

          {currentStep === 0 ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-8 text-blue-700">User Information</h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={userFormData.firstName}
                      onChange={handleUserInputChange}
                      required
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={userFormData.lastName}
                      onChange={handleUserInputChange}
                      required
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userFormData.email}
                      onChange={handleUserInputChange}
                      required
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="phone">Phone*</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={userFormData.phone}
                      onChange={handleUserInputChange}
                      required
                      className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="linkedIn">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedIn"
                    name="linkedIn"
                    type="url"
                    value={userFormData.linkedIn}
                    onChange={handleUserInputChange}
                    placeholder="https://www.linkedin.com/in/your-profile"
                    className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="h-11 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-8 text-blue-700">Company Information</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="companyName">Company or Product Name*</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={companyFormData.companyName}
                    onChange={handleCompanyInputChange}
                    placeholder="Example: Ethio Power Bank"
                    required
                    className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="companyOverview">
                    Quick Pitch / Company Overview*
                  </Label>
                  <Textarea
                    id="companyOverview"
                    name="companyOverview"
                    value={companyFormData.companyOverview}
                    onChange={handleCompanyInputChange}
                    placeholder="Example: Solar Charger Power Bank"
                    rows={3}
                    required
                    className="text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="industry">Category*</Label>
                    <Select
                      value={companyFormData.industry}
                      onValueChange={(value) =>
                        handleSelectChange("industry", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="fundingGoal">Funding Goal*</Label>
                    <Select
                      value={companyFormData.fundingGoal}
                      onValueChange={(value) =>
                        handleSelectChange("fundingGoal", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding range" />
                      </SelectTrigger>
                      <SelectContent>
                        {fundingRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="campaignDuration">
                    Campaign Duration (max 90 days)*
                  </Label>
                  <Input
                    id="campaignDuration"
                    name="campaignDuration"
                    type="number"
                    min="1"
                    max="90"
                    value={companyFormData.campaignDuration}
                    onChange={handleCompanyInputChange}
                    required
                    className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="videoLink">Video Pitch Link (max 3min)</Label>
                  <Input
                    id="videoLink"
                    name="videoLink"
                    type="url"
                    placeholder="Paste your video link here (YouTube, Vimeo, etc.)"
                    className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">Supported: YouTube, Vimeo, Google Drive, etc.</p>
                </div>

                {/* Banking Information Section */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">Banking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="bankName">Bank Name*</Label>
                      <Select
                        name="bankName"
                        required
                        onValueChange={(value) => handleSelectChange("bankName", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Commercial Bank of Ethiopia">Commercial Bank of Ethiopia</SelectItem>
                          <SelectItem value="Awash Bank">Awash Bank</SelectItem>
                          <SelectItem value="Dashen Bank">Dashen Bank</SelectItem>
                          <SelectItem value="Abyssinia Bank">Abyssinia Bank</SelectItem>
                          <SelectItem value="Cooperative Bank of Oromia">Cooperative Bank of Oromia</SelectItem>
                          <SelectItem value="Nib International Bank">Nib International Bank</SelectItem>
                          <SelectItem value="United Bank">United Bank</SelectItem>
                          <SelectItem value="Wegagen Bank">Wegagen Bank</SelectItem>
                          <SelectItem value="Oromia International Bank">Oromia International Bank</SelectItem>
                          <SelectItem value="Berhan Bank">Berhan Bank</SelectItem>
                          <SelectItem value="Lion International Bank">Lion International Bank</SelectItem>
                          <SelectItem value="Zemen Bank">Zemen Bank</SelectItem>
                          <SelectItem value="Enat Bank">Enat Bank</SelectItem>
                          <SelectItem value="Addis International Bank">Addis International Bank</SelectItem>
                          <SelectItem value="Bunna International Bank">Bunna International Bank</SelectItem>
                          <SelectItem value="Abay Bank">Abay Bank</SelectItem>
                          <SelectItem value="Debub Global Bank">Debub Global Bank</SelectItem>
                          <SelectItem value="Amhara Bank">Amhara Bank</SelectItem>
                          <SelectItem value="Hijra Bank">Hijra Bank</SelectItem>
                          <SelectItem value="Goh Betoch Bank">Goh Betoch Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="accountName">Account Name*</Label>
                      <Input
                        id="accountName"
                        name="accountName"
                        type="text"
                        placeholder="e.g. John Doe"
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="accountNumber">Account Number*</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        type="text"
                        placeholder="e.g. 1234567890"
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="iban">IBAN/SWIFT (optional)</Label>
                      <Input
                        id="iban"
                        name="iban"
                        type="text"
                        placeholder="e.g. SWIFT/IBAN code"
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-base">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setShowTerms(true)}
                    >
                      Terms and Conditions
                    </button>
                    <TermsModal
                      open={showTerms}
                      onClose={() => setShowTerms(false)}
                    />
                  </Label>
                </div>

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(0)}
                    className="py-2 text-md rounded-lg"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    type="submit"
                    className="py-2 text-md bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                  >
                    Create Project
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (creationType === "team") {
    return (
      <div className="min-h-screen pt-24 pb-16 relative bg-gradient-to-r from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => {
                setStartStep(1);
                setCreationType(null);
              }}
              className="mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </Button>
            <h1 className="text-2xl font-bold">BoleStarter Team Support</h1>
          </div>

          {teamStep === 0 ? (
            // STEP 1: Your Information Form
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-8 text-blue-700">Your Information</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTeamStep(1);
                }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="teamFirstName">First Name*</Label>
                    <Input id="teamFirstName" name="teamFirstName" required className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="teamLastName">Last Name*</Label>
                    <Input id="teamLastName" name="teamLastName" required className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="teamEmail">Email Address*</Label>
                    <Input id="teamEmail" name="teamEmail" type="email" required className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="teamPhone">Phone*</Label>
                    <Input id="teamPhone" name="teamPhone" type="tel" required className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <Label htmlFor="teamCompany">Company Name*</Label>
                  <Input id="teamCompany" name="teamCompany" required className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div className="space-y-3 pt-2">
                  <Label htmlFor="teamDescription">Brief Description of Your Project*</Label>
                  <Textarea id="teamDescription" name="teamDescription" rows={4} required className="text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div className="space-y-3 pt-2">
                  <Label htmlFor="currentState" className="text-sm font-medium">Upload Your Document</Label>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="currentState"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF files only (MAX. 5MB)</p>
                        </div>
                        <input
                          id="currentState"
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={(e) => handleFileChange(e, setCurrentStateFile)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  <div className="space-y-3">
                    <Label htmlFor="registeredIn">My company is registered in:</Label>
                    <Select
                      value={companyFormData.registeredIn}
                      onValueChange={(value) => handleSelectChange("registeredIn", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="capitalSought">How much capital are you seeking in the raise*</Label>
                    <Select
                      value={companyFormData.capitalSought}
                      onValueChange={(value) => handleSelectChange("capitalSought", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select capital" />
                      </SelectTrigger>
                      <SelectContent>
                        {fundingRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  <div className="space-y-3">
                    <Label htmlFor="budgetForFundraise">How much have you budgeted for costs related to your fundraise?*</Label>
                    <Select
                      value={companyFormData.budgetForFundraise}
                      onValueChange={(value) => handleSelectChange("budgetForFundraise", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding range" />
                      </SelectTrigger>
                      <SelectContent>
                        {fundraisercost.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="companyStage">My Company is:*</Label>
                    <Select
                      value={companyFormData.companyStage}
                      onValueChange={(value) => handleSelectChange("companyStage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select funding range" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Banking Information Section */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">Banking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="bankName">Bank Name*</Label>
                      <Select
                        name="bankName"
                        required
                        onValueChange={(value) => handleSelectChange("bankName", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Commercial Bank of Ethiopia">Commercial Bank of Ethiopia</SelectItem>
                          <SelectItem value="Awash Bank">Awash Bank</SelectItem>
                          <SelectItem value="Dashen Bank">Dashen Bank</SelectItem>
                          <SelectItem value="Abyssinia Bank">Abyssinia Bank</SelectItem>
                          <SelectItem value="Cooperative Bank of Oromia">Cooperative Bank of Oromia</SelectItem>
                          <SelectItem value="Nib International Bank">Nib International Bank</SelectItem>
                          <SelectItem value="United Bank">United Bank</SelectItem>
                          <SelectItem value="Wegagen Bank">Wegagen Bank</SelectItem>
                          <SelectItem value="Oromia International Bank">Oromia International Bank</SelectItem>
                          <SelectItem value="Berhan Bank">Berhan Bank</SelectItem>
                          <SelectItem value="Lion International Bank">Lion International Bank</SelectItem>
                          <SelectItem value="Zemen Bank">Zemen Bank</SelectItem>
                          <SelectItem value="Enat Bank">Enat Bank</SelectItem>
                          <SelectItem value="Addis International Bank">Addis International Bank</SelectItem>
                          <SelectItem value="Bunna International Bank">Bunna International Bank</SelectItem>
                          <SelectItem value="Abay Bank">Abay Bank</SelectItem>
                          <SelectItem value="Debub Global Bank">Debub Global Bank</SelectItem>
                          <SelectItem value="Amhara Bank">Amhara Bank</SelectItem>
                          <SelectItem value="Hijra Bank">Hijra Bank</SelectItem>
                          <SelectItem value="Goh Betoch Bank">Goh Betoch Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="accountName">Account Name*</Label>
                      <Input
                        id="accountName"
                        name="accountName"
                        type="text"
                        placeholder="e.g. John Doe"
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="accountNumber">Account Number*</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        type="text"
                        placeholder="e.g. 1234567890"
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="iban">IBAN/SWIFT (optional)</Label>
                      <Input
                        id="iban"
                        name="iban"
                        type="text"
                        placeholder="e.g. SWIFT/IBAN code"
                        className="h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 mt-6">
                  <Checkbox id="teamTerms" required />
                  <Label htmlFor="teamTerms" className="text-base">
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setShowTerms(true)}
                    >
                      Terms and Conditions
                    </button>
                    <TermsModal
                      open={showTerms}
                      onClose={() => setShowTerms(false)}
                    />
                  </Label>
                </div>
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    className="py-2 text-md bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            // STEP 2: Funding Strategy & Expandable Sections
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold mb-6">Funding Strategy</h2>
              <p className="text-gray-600 mb-6">
                This is the most preferable way to collect funds for your
                project.
              </p>
              <div className="space-y-6">
                {/* BoleStarter Committee Team - always open, steps inside are expandable */}
                <div className=" rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 ">
                    <h3 className="font-semibold text-lg">
                      BoleStarter Committee Team
                    </h3>
                  </div>
                  <div className="p-0  divide-y">
                    {/* Step 1 */}
                    <div>
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleSection("step1")}
                      >
                        <h4 className="font-medium">1. Meet your advisor</h4>
                        {expandedSection === "step1" ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                      {expandedSection === "step1" && (
                        <div className="p-4 bg-blue-50">
                          <p className="text-sm text-gray-600">
                            Pitch deck excellence + end-to-end fundraising
                            execution = your path to funding success
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Step 2 */}
                    <div>
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleSection("step2")}
                      >
                        <h4 className="font-medium">2. Deck Designer</h4>
                        {expandedSection === "step2" ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                      {expandedSection === "step2" && (
                        <div className="p-4 bg-blue-50">
                          <p className="text-sm text-gray-600">
                            Take your slides and documents - we&apos;ll craft them
                            into beautiful, persuasive pitch decks that win
                            funding.
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Step 3 */}
                    <div>
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer"
                        onClick={() => toggleSection("step3")}
                      >
                        <h4 className="font-medium">3. Investor Mapping</h4>
                        {expandedSection === "step3" ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                      </div>
                      {expandedSection === "step3" && (
                        <div className="p-4 bg-blue-50">
                          <p className="text-sm text-gray-600">
                            Analyze thousands of active investors to pinpoint
                            those most likely to fund your startup.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Live Fundraising Sessions - always open */}
                <div className=" overflow-hidden">
                  <div className="flex items-center justify-between p-4 ">
                    <h3 className="font-semibold text-lg">
                      Live Fundraising Sessions
                    </h3>
                  </div>
                  <div className="p-4 border-t">
                    <p className="text-gray-600 mb-4">
                      Monthly Sessions with our leadership team to work through
                      strategies to optimize your fundraising campaign for
                      success, from setting a valuation to choosing the right
                      investors.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Join for the coming session
                    </Button>
                  </div>
                </div>
                {/* Live Fundraising Tutor - always open */}
                <div className=" overflow-hidden">
                  <div className="flex items-center justify-between p-4 ">
                    <h3 className="font-semibold text-lg">
                      Live Fundraising Tutor
                    </h3>
                  </div>
                  <div className="p-4 border-t">
                    <p className="text-gray-600 mb-4">
                      Join our fundraising specialist live every week to learn
                      how to improve your pitch deck for success and ask any
                      questions to help improve your pitch to investors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-6">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                >
                  Submit Request
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

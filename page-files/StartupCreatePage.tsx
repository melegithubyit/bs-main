"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import Link from "next/link"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export default function StartupCreatePage() {
    const { toast } = useToast()
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    projectOwner: "",
    email: "",
    postDuration: "",
    purpose: "",
    goalFund: "",
    fundNeededFor: "One time",
    bank: "",
    bankAccount: "",
    location: "",
    addressLine: "",
    companyLogo: null as File | null,
    ndaTerms: null as File | null,
    videoLink: "",
    workWithSigma: false,
    supportType: "",
    mentorshipType: "",
    agreeTerms: false,
  })

  const [companyLogoName, setCompanyLogoName] = useState("")
  const [ndaTermsName, setNdaTermsName] = useState("")
  const [characterCount, setCharacterCount] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "projectDescription") {
      setCharacterCount(value.length)
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      supportType: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "companyLogo" | "ndaTerms") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (fileType === "companyLogo") {
        setFormData({
          ...formData,
          companyLogo: file,
        })
        setCompanyLogoName(file.name)
      } else {
        setFormData({
          ...formData,
          ndaTerms: file,
        })
        setNdaTermsName(file.name)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.projectName || !formData.projectDescription || !formData.projectOwner || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      })
      return
    }

    // Submit form
    toast({
      title: "Project submitted!",
      description: "Your startup project has been submitted successfully.",
    })

    // In a real application, you would send the data to your backend here
    console.log(formData)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -left-40 top-0 opacity-10">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" stroke="#FFA500" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="180" stroke="#FFA500" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="160" stroke="#FFA500" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="absolute -right-40 bottom-0 opacity-10">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="180" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="160" stroke="#3B82F6" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Startup</h1>
          <p className="text-gray-600">Post your technology to Sigma to get funding for your project.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold mb-6">Fill the Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-sm font-medium">
                Project Name*
              </Label>
              <Input
                id="projectName"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Project Description */}
            <div className="space-y-2">
              <Label htmlFor="projectDescription" className="text-sm font-medium">
                Project Description (Maximum 200 characters)*
              </Label>
              <Textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                maxLength={200}
                rows={4}
                required
              />
              <div className="text-xs text-right text-gray-500">{characterCount}/200</div>
            </div>

            {/* Project Owner and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectOwner" className="text-sm font-medium">
                  Project Owner*
                </Label>
                <Input
                  id="projectOwner"
                  name="projectOwner"
                  value={formData.projectOwner}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email*
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Post Duration and Purpose */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postDuration" className="text-sm font-medium">
                  Post Duration
                </Label>
                <Select
                  value={formData.postDuration}
                  onValueChange={(value) => handleSelectChange("postDuration", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="120">120 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-sm font-medium">
                  Purpose
                </Label>
                <Select value={formData.purpose} onValueChange={(value) => handleSelectChange("purpose", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="expansion">Business Expansion</SelectItem>
                    <SelectItem value="research">Research & Development</SelectItem>
                    <SelectItem value="social">Social Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Goal Fund and Fund Needed For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goalFund" className="text-sm font-medium">
                  Goal Fund (in ETB)*
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">ETB</span>
                  <Input
                    id="goalFund"
                    name="goalFund"
                    type="number"
                    value={formData.goalFund}
                    onChange={handleInputChange}
                    className="pl-12"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundNeededFor" className="text-sm font-medium">
                  Fund Needed for*
                </Label>
                <Select
                  value={formData.fundNeededFor}
                  onValueChange={(value) => handleSelectChange("fundNeededFor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="One time">One time</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bank and Bank Account */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank" className="text-sm font-medium">
                  Choose a Bank*
                </Label>
                <Select value={formData.bank} onValueChange={(value) => handleSelectChange("bank", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="commercial">Commercial Bank of Ethiopia</SelectItem>
                    <SelectItem value="dashen">Dashen Bank</SelectItem>
                    <SelectItem value="awash">Awash Bank</SelectItem>
                    <SelectItem value="abyssinia">Bank of Abyssinia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount" className="text-sm font-medium">
                  Bank Account*
                </Label>
                <Input id="bankAccount" name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} />
              </div>
            </div>

            {/* Location and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location*
                </Label>
                <Select value={formData.location} onValueChange={(value) => handleSelectChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="addis">Addis Ababa</SelectItem>
                    <SelectItem value="dire">Dire Dawa</SelectItem>
                    <SelectItem value="bahir">Bahir Dar</SelectItem>
                    <SelectItem value="hawassa">Hawassa</SelectItem>
                    <SelectItem value="mekelle">Mekelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressLine" className="text-sm font-medium">
                  Address Line
                </Label>
                <Input id="addressLine" name="addressLine" value={formData.addressLine} onChange={handleInputChange} />
              </div>
            </div>

            {/* Company Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="companyLogo" className="text-sm font-medium">
                Upload Company Logo*
              </Label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="companyLogo"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                    </div>
                    <input
                      id="companyLogo"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "companyLogo")}
                    />
                  </label>
                </div>
                {companyLogoName && <div className="mt-2 text-sm text-gray-600">Selected file: {companyLogoName}</div>}
              </div>
            </div>

            {/* National ID/Kebele ID Upload */}
            <div className="space-y-2">
              <Label htmlFor="ndaTerms" className="text-sm font-medium">
                National ID/Kebele ID*
              </Label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="ndaTerms"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF files only (MAX. 5MB)</p>
                    </div>
                    <input
                      id="ndaTerms"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, "ndaTerms")}
                    />
                  </label>
                </div>
                {ndaTermsName && <div className="mt-2 text-sm text-gray-600">Selected file: {ndaTermsName}</div>}
              </div>
            </div>

            {/* Video Link */}
            <div className="space-y-2">
              <Label htmlFor="videoLink" className="text-sm font-medium">
                Video Link*
              </Label>
              <Input
                id="videoLink"
                name="videoLink"
                value={formData.videoLink}
                onChange={handleInputChange}
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            {/* Work with Sigma */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="workWithSigma"
                checked={formData.workWithSigma}
                onCheckedChange={(checked) => handleCheckboxChange("workWithSigma", checked as boolean)}
              />
              <Label
                htmlFor="workWithSigma"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Do you want to work with Sigma?
              </Label>
            </div>

            {/* Support Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Type of support needed</Label>
              <RadioGroup
                value={formData.supportType}
                onValueChange={handleRadioChange}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mentorship" id="mentorship" />
                  <Label htmlFor="mentorship" className="text-sm">
                    Mentorship
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entrepreneurship" id="entrepreneurship" />
                  <Label htmlFor="entrepreneurship" className="text-sm">
                    Entrepreneurship
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="technical" id="technical" />
                  <Label htmlFor="technical" className="text-sm">
                    Technical Support
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="leadership" id="leadership" />
                  <Label htmlFor="leadership" className="text-sm">
                    Leadership
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Mentorship Type Dropdown */}
            {formData.supportType === "mentorship" && (
              <div className="ml-6 pl-2 border-l-2 border-gray-200 space-y-2">
                <Label htmlFor="mentorshipType" className="text-sm font-medium">
                  Mentorship Type
                </Label>
                <Select
                  value={formData.mentorshipType}
                  onValueChange={(value) => handleSelectChange("mentorshipType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select mentorship type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentorship">Mentorship</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
                required
              />
              <Label
                htmlFor="agreeTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By clicking this you are confirming that you have read, understand, and agree with the{" "}
                <Link href="/terms" className="text-orange-500 hover:underline">
                  Terms and Conditions
                </Link>
              </Label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                Submit
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

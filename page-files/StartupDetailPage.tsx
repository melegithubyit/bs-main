"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Mail, Calendar, FileText, Download, ExternalLink, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { StartupProject } from "@/components/startup-comp/project-card"

// Mock data for projects
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
  projectOwner: ["Abebe Kebede", "Tigist Haile", "Dawit Tadesse", "Hiwot Tesfaye", "Yonas Bekele"][i % 5],
  email: `contact@${["ecotech", "finhub", "medconnect", "agrismart", "edutech"][i % 5]}.com`,
  phoneNumber: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10}${i % 10}`,
  postDuration: 30 + (i % 5) * 30,
  goalFund: 100000 + (i % 10) * 50000,
  bank: ["Commercial Bank of Ethiopia", "Dashen Bank", "Awash Bank", "Bank of Abyssinia", "Zemen Bank"][i % 5],
  bankAccount: `100${i}${i}${i}${i}${i}${i}`,
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5],
  address: `${i + 1} Main Street, ${["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5]}`,
  companyLogo: `/placeholder.svg?height=128&width=128`,
  nationalId: `https://storage.example.com/id/id-${i + 1}.pdf`,
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  typeOfSupport: ["Funding", "Mentorship", "Technical", "Partnership", "Investment"][i % 5],
  fundingProgress: Math.floor(Math.random() * 100),
  supporters: Math.floor(Math.random() * 100),
  category: [
    "Technology",
    "Finance",
    "Healthcare",
    "Agriculture",
    "Education",
    "Energy",
    "Transportation",
    "Food",
    "Retail",
    "AI",
  ][i % 10],
}))

export default function StartupDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<StartupProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [investmentAmount, setInvestmentAmount] = useState("10000")

  useEffect(() => {
    // Simulate API call to fetch project details
    const fetchProject = async () => {
      setLoading(true)
      try {
        // In a real app, you would fetch from an API
        const foundProject = mockProjects.find((p) => p.id === params.id)

        if (foundProject) {
          setProject(foundProject)
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  // Get support type badge color
  const getSupportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "funding":
        return "bg-green-100 text-green-800"
      case "mentorship":
        return "bg-blue-100 text-blue-800"
      case "technical":
        return "bg-purple-100 text-purple-800"
      case "partnership":
        return "bg-orange-100 text-orange-800"
      case "investment":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-40 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you are looking for does not exist.</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
            <Link href="/startup">Back to Projects</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-40 pb-16 relative overflow-hidden">
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

      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/startup"
            className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative h-24 w-24 rounded-md overflow-hidden mb-4">
                  <Image
                    src={project.companyLogo || "/placeholder.svg?height=96&width=96"}
                    alt={project.projectName}
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{project.projectName}</h1>
                <p className="text-gray-600 mt-1">{project.category}</p>
                <div className="mt-2">
                  <Badge className={getSupportTypeColor(project.typeOfSupport)}>{project.typeOfSupport}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Project Owner</p>
                    <p className="text-gray-600">{project.projectOwner}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{project.location}</p>
                    <p className="text-sm text-gray-500">{project.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{project.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{project.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Post Duration</p>
                    <p className="text-gray-600">{project.postDuration} days</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Contact Project Owner</Button>
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
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Project Details</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Project Overview</h2>
                    <p className="text-gray-600 mb-6">{project.projectDescription}</p>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Support Needed</h3>
                      <p className="text-gray-600">
                        This project is seeking {project.typeOfSupport.toLowerCase()} support to help scale operations
                        and reach more customers. With your support, {project.projectName} can achieve its goals and
                        make a significant impact in the {project.category?.toLowerCase()} sector.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-4">Funding Progress</h2>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">ETB {project.goalFund.toLocaleString()}</span>
                        <span className="text-sm font-medium">{project.fundingProgress}% Funded</span>
                      </div>
                      <Progress value={project.fundingProgress || 0} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{project.supporters}</div>
                        <div className="text-sm text-gray-600">Supporters</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{project.postDuration}</div>
                        <div className="text-sm text-gray-600">Days to Go</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                        Support
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Project Details</h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Project Description</h3>
                        <p className="text-gray-600">
                          {project.projectDescription} Our team is dedicated to creating innovative solutions that
                          address real-world problems in the {project.category?.toLowerCase()} sector. We have
                          identified a significant market opportunity and have developed a unique approach to capitalize
                          on it.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Goals & Objectives</h3>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          <li>Develop and launch our core product within the next 6 months</li>
                          <li>Acquire 1,000+ users/customers within the first year</li>
                          <li>Establish key partnerships to accelerate growth</li>
                          <li>Create sustainable revenue streams</li>
                          <li>Make a positive impact in our community</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Funding Allocation</h3>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                          <li>Product Development: 40%</li>
                          <li>Marketing & Customer Acquisition: 25%</li>
                          <li>Operations & Infrastructure: 20%</li>
                          <li>Team Expansion: 10%</li>
                          <li>Legal & Administrative: 5%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Project Video</h2>
                    <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src={project.videoLink.replace("watch?v=", "embed/")}
                        className="absolute top-0 left-0 w-full h-full"
                        title="Project Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" className="flex items-center gap-2">
                        <ExternalLink size={16} />
                        <span>Open in YouTube</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button variant="outline">Partner with Us</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

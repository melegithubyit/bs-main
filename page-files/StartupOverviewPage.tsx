"use client"

import { useState, useEffect } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import SearchBar from "@/components/startup-comp/search-bar"
import ProjectFilters from "@/components/startup-comp/project-filters"
import ProjectList from "@/components/startup-comp/project-list"
import type { StartupProject } from "@/components/startup-comp/project-card"
import placeholderimg from "@/public/placeholder.png"

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
  companyLogo: placeholderimg,
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

// Filter options
const fundingRanges = [
  { id: "under-100k", label: "Under ETB 100,000", count: 10 },
  { id: "100k-250k", label: "ETB 100,000 - 250,000", count: 15 },
  { id: "250k-500k", label: "ETB 250,000 - 500,000", count: 12 },
  { id: "500k-1m", label: "ETB 500,000 - 1,000,000", count: 8 },
  { id: "over-1m", label: "Over ETB 1,000,000", count: 5 },
]

const supportTypes = [
  { id: "funding", label: "Funding", count: 20 },
  { id: "mentorship", label: "Mentorship", count: 15 },
  { id: "technical", label: "Technical Support", count: 10 },
  { id: "partnership", label: "Partnership", count: 8 },
  { id: "investment", label: "Investment", count: 12 },
]

const categories = [
  { id: "technology", label: "Technology", count: 15 },
  { id: "finance", label: "Finance", count: 8 },
  { id: "healthcare", label: "Healthcare", count: 10 },
  { id: "agriculture", label: "Agriculture", count: 7 },
  { id: "education", label: "Education", count: 12 },
  { id: "energy", label: "Energy", count: 6 },
  { id: "transportation", label: "Transportation", count: 5 },
  { id: "food", label: "Food", count: 8 },
  { id: "retail", label: "Retail", count: 6 },
  { id: "ai", label: "AI", count: 10 },
]

const locations = [
  { id: "addis-ababa", label: "Addis Ababa", count: 20 },
  { id: "dire-dawa", label: "Dire Dawa", count: 8 },
  { id: "bahir-dar", label: "Bahir Dar", count: 10 },
  { id: "hawassa", label: "Hawassa", count: 7 },
  { id: "mekelle", label: "Mekelle", count: 5 },
]

export default function StartupOverviewPage() {
  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("all")
  const [projects, _] = useState<StartupProject[]>(mockProjects)
  const [filteredProjects, setFilteredProjects] = useState<StartupProject[]>(mockProjects)
  const [layout, setLayout] = useState<"list" | "grid">("list")

  // Filter states
  const [selectedFundingRanges, setSelectedFundingRanges] = useState<string[]>([])
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [fundingProgress, setFundingProgress] = useState<[number, number]>([0, 100])

  // Handle checkbox changes
  const handleFundingRangeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedFundingRanges([...selectedFundingRanges, id])
    } else {
      setSelectedFundingRanges(selectedFundingRanges.filter((range) => range !== id))
    }
  }

  const handleSupportTypeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSupportTypes([...selectedSupportTypes, id])
    } else {
      setSelectedSupportTypes(selectedSupportTypes.filter((type) => type !== id))
    }
  }

  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, id])
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== id))
    }
  }

  const handleLocationChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, id])
    } else {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== id))
    }
  }

  // Apply filters
  const applyFilters = () => {
    let results = [...projects]

    // Apply search term filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()
      results = results.filter(
        (project) =>
          project.projectName.toLowerCase().includes(searchTermLower) ||
          project.projectDescription.toLowerCase().includes(searchTermLower),
      )
    }

    // Apply location filter
    if (location && location !== "all") {
      results = results.filter((project) => {
        const locationId = project.location.toLowerCase().replace(/\s+/g, "-")
        return locationId === location
      })
    }

    // Apply funding range filter
    if (selectedFundingRanges.length > 0) {
      results = results.filter((project) => {
        const fundAmount = project.goalFund
        return selectedFundingRanges.some((range) => {
          switch (range) {
            case "under-100k":
              return fundAmount < 100000
            case "100k-250k":
              return fundAmount >= 100000 && fundAmount < 250000
            case "250k-500k":
              return fundAmount >= 250000 && fundAmount < 500000
            case "500k-1m":
              return fundAmount >= 500000 && fundAmount < 1000000
            case "over-1m":
              return fundAmount >= 1000000
            default:
              return false
          }
        })
      })
    }

    // Apply support type filter
    if (selectedSupportTypes.length > 0) {
      results = results.filter((project) => {
        const supportType = project.typeOfSupport.toLowerCase()
        return selectedSupportTypes.some((type) => type === supportType.toLowerCase())
      })
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter((project) => {
        const category = project.category?.toLowerCase() || ""
        return selectedCategories.some((cat) => cat === category)
      })
    }

    // Apply location filter from checkboxes
    if (selectedLocations.length > 0) {
      results = results.filter((project) => {
        const locationId = project.location.toLowerCase().replace(/\s+/g, "-")
        return selectedLocations.includes(locationId)
      })
    }

    // Apply funding progress filter
    results = results.filter((project) => {
      const progress = project.fundingProgress || 0
      return progress >= fundingProgress[0] && progress <= fundingProgress[1]
    })

    setFilteredProjects(results)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setLocation("all")
    setSelectedFundingRanges([])
    setSelectedSupportTypes([])
    setSelectedCategories([])
    setSelectedLocations([])
    setFundingProgress([0, 100])
    setFilteredProjects(projects)
  }

  // Apply filters when any filter state changes
  useEffect(() => {
    applyFilters()
  }, [searchTerm, location])

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Discover <span className="text-orange-500">Innovative Startups</span> to Support
          </h1>
          <p className="text-gray-600 text-center py-4">Find and support promising startup projects across various industries</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <SearchBar
            searchTerm={searchTerm}
            location={location}
            locations={locations}
            onSearchChange={setSearchTerm}
            onLocationChange={setLocation}
            onSearch={applyFilters}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <ProjectFilters
                    fundingRanges={fundingRanges}
                    supportTypes={supportTypes}
                    categories={categories}
                    locations={locations}
                    selectedFundingRanges={selectedFundingRanges}
                    selectedSupportTypes={selectedSupportTypes}
                    selectedCategories={selectedCategories}
                    selectedLocations={selectedLocations}
                    fundingProgress={fundingProgress}
                    onFundingRangeChange={handleFundingRangeChange}
                    onSupportTypeChange={handleSupportTypeChange}
                    onCategoryChange={handleCategoryChange}
                    onLocationChange={handleLocationChange}
                    onFundingProgressChange={setFundingProgress}
                    onApplyFilters={applyFilters}
                    onClearFilters={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <ProjectFilters
              fundingRanges={fundingRanges}
              supportTypes={supportTypes}
              categories={categories}
              locations={locations}
              selectedFundingRanges={selectedFundingRanges}
              selectedSupportTypes={selectedSupportTypes}
              selectedCategories={selectedCategories}
              selectedLocations={selectedLocations}
              fundingProgress={fundingProgress}
              onFundingRangeChange={handleFundingRangeChange}
              onSupportTypeChange={handleSupportTypeChange}
              onCategoryChange={handleCategoryChange}
              onLocationChange={handleLocationChange}
              onFundingProgressChange={setFundingProgress}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </motion.div>

          {/* Projects List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <ProjectList projects={filteredProjects} layout={layout} onLayoutChange={setLayout} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

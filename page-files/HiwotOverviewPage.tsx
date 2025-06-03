"use client"

import { useState, useEffect } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import SearchBar from "@/components/hiwot-comp/search-bar"
import ApplicantFilters from "@/components/hiwot-comp/applicant-filters"
import ApplicantList from "@/components/hiwot-comp/applicant-list"
import type { HiwotApplicant } from "@/components/hiwot-comp/applicant-card"
import placeholder from "@/public/hiwot-placeholder.png"

// Mock data for applicants
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
  email: `${["sarah", "meron", "hiwot", "tigist", "bethel"][i % 5]}.${["tadesse", "abebe", "kebede", "haile", "tesfaye"][i % 5]
    }@example.com`,
  postDuration: ["30", "60", "90", "120", "180"][i % 5],
  dateOfBirth: new Date(1980 + (i % 30), i % 12, (i % 28) + 1).toISOString().split("T")[0],
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  medicalDocuments: [
    `https://storage.example.com/medical/document-${i + 1}-1.pdf`,
    `https://storage.example.com/medical/document-${i + 1}-2.pdf`,
    `https://storage.example.com/medical/document-${i + 1}-3.pdf`,
  ],
  goalFund: `${(50000 + i * 10000).toString()}`,
  bank: ["Commercial Bank of Ethiopia", "Dashen Bank", "Awash Bank", "Bank of Abyssinia", "Zemen Bank"][i % 5],
  bankAccount: `100${i}${i}${i}${i}${i}${i}`,
  location: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5],
  address: `${i + 1} Main Street, ${["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"][i % 5]}`,
  nationalId: `https://storage.example.com/id/id-${i + 1}.pdf`,
  photo: placeholder,
  fundingProgress: Math.floor(Math.random() * 100),
  supporters: Math.floor(Math.random() * 100),
}))

// Filter options
const fundingRanges = [
  { id: "under-50k", label: "Under ETB 50,000", count: 10 },
  { id: "50k-100k", label: "ETB 50,000 - 100,000", count: 15 },
  { id: "100k-200k", label: "ETB 100,000 - 200,000", count: 12 },
  { id: "200k-500k", label: "ETB 200,000 - 500,000", count: 8 },
  { id: "over-500k", label: "Over ETB 500,000", count: 5 },
]

const medicalConditions = [
  { id: "cancer", label: "Cancer", count: 10 },
  { id: "heart", label: "Heart Conditions", count: 12 },
  { id: "kidney", label: "Kidney Disease", count: 8 },
  { id: "diabetes", label: "Diabetes", count: 7 },
  { id: "accident", label: "Accident Recovery", count: 13 },
]

const ageRanges = [
  { id: "0-18", label: "Children (0-18)", count: 15 },
  { id: "19-35", label: "Young Adults (19-35)", count: 12 },
  { id: "36-50", label: "Adults (36-50)", count: 10 },
  { id: "51-65", label: "Middle-aged (51-65)", count: 8 },
  { id: "over-65", label: "Seniors (65+)", count: 5 },
]

const locations = [
  { id: "addis-ababa", label: "Addis Ababa", count: 10 },
  { id: "dire-dawa", label: "Dire Dawa", count: 10 },
  { id: "bahir-dar", label: "Bahir Dar", count: 10 },
  { id: "hawassa", label: "Hawassa", count: 10 },
  { id: "mekelle", label: "Mekelle", count: 10 },
]

export default function HiwotOverviewPage() {
  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("all")
  const [applicants, _] = useState<HiwotApplicant[]>(mockApplicants)
  const [filteredApplicants, setFilteredApplicants] = useState<HiwotApplicant[]>(mockApplicants)
  const [layout, setLayout] = useState<"list" | "grid">("list")

  // Filter states
  const [selectedFundingRanges, setSelectedFundingRanges] = useState<string[]>([])
  const [selectedMedicalConditions, setSelectedMedicalConditions] = useState<string[]>([])
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])

  // Handle checkbox changes
  const handleFundingRangeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedFundingRanges([...selectedFundingRanges, id])
    } else {
      setSelectedFundingRanges(selectedFundingRanges.filter((range) => range !== id))
    }
  }

  const handleMedicalConditionChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMedicalConditions([...selectedMedicalConditions, id])
    } else {
      setSelectedMedicalConditions(selectedMedicalConditions.filter((condition) => condition !== id))
    }
  }

  const handleAgeRangeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAgeRanges([...selectedAgeRanges, id])
    } else {
      setSelectedAgeRanges(selectedAgeRanges.filter((range) => range !== id))
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
    let results = [...applicants]

    // Apply search term filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()
      results = results.filter(
        (applicant) =>
          `${applicant.firstName} ${applicant.lastName}`.toLowerCase().includes(searchTermLower) ||
          applicant.description.toLowerCase().includes(searchTermLower),
      )
    }

    // Apply location filter
    if (location && location !== "all") {
      results = results.filter((applicant) => {
        const locationId = applicant.location.toLowerCase().replace(/\s+/g, "-")
        return locationId === location
      })
    }

    // Apply funding range filter
    if (selectedFundingRanges.length > 0) {
      results = results.filter((applicant) => {
        const fundAmount = Number.parseInt(applicant.goalFund)
        return selectedFundingRanges.some((range) => {
          switch (range) {
            case "under-50k":
              return fundAmount < 50000
            case "50k-100k":
              return fundAmount >= 50000 && fundAmount < 100000
            case "100k-200k":
              return fundAmount >= 100000 && fundAmount < 200000
            case "200k-500k":
              return fundAmount >= 200000 && fundAmount < 500000
            case "over-500k":
              return fundAmount >= 500000
            default:
              return false
          }
        })
      })
    }

    // Apply medical condition filter
    if (selectedMedicalConditions.length > 0) {
      results = results.filter((applicant) => {
        const description = applicant.description.toLowerCase()
        return selectedMedicalConditions.some((condition) => {
          switch (condition) {
            case "cancer":
              return description.includes("cancer")
            case "heart":
              return description.includes("heart")
            case "kidney":
              return description.includes("kidney")
            case "diabetes":
              return description.includes("diabetes")
            case "accident":
              return description.includes("accident")
            default:
              return false
          }
        })
      })
    }

    // Apply age range filter
    if (selectedAgeRanges.length > 0) {
      results = results.filter((applicant) => {
        const birthDate = new Date(applicant.dateOfBirth)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }

        return selectedAgeRanges.some((range) => {
          switch (range) {
            case "0-18":
              return age >= 0 && age <= 18
            case "19-35":
              return age >= 19 && age <= 35
            case "36-50":
              return age >= 36 && age <= 50
            case "51-65":
              return age >= 51 && age <= 65
            case "over-65":
              return age > 65
            default:
              return false
          }
        })
      })
    }

    // Apply location filter from checkboxes
    if (selectedLocations.length > 0) {
      results = results.filter((applicant) => {
        const locationId = applicant.location.toLowerCase().replace(/\s+/g, "-")
        return selectedLocations.includes(locationId)
      })
    }

    setFilteredApplicants(results)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setLocation("all")
    setSelectedFundingRanges([])
    setSelectedMedicalConditions([])
    setSelectedAgeRanges([])
    setSelectedLocations([])
    setFilteredApplicants(applicants)
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
            Hiwot Fund: <span className="text-orange-500">Health Support</span> for those in need
          </h1>
          <p className="text-gray-600 text-center py-4">Support individuals with medical conditions who need financial assistance</p>
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
                  <ApplicantFilters
                    fundingRanges={fundingRanges}
                    medicalConditions={medicalConditions}
                    ageRanges={ageRanges}
                    locations={locations}
                    selectedFundingRanges={selectedFundingRanges}
                    selectedMedicalConditions={selectedMedicalConditions}
                    selectedAgeRanges={selectedAgeRanges}
                    selectedLocations={selectedLocations}
                    onFundingRangeChange={handleFundingRangeChange}
                    onMedicalConditionChange={handleMedicalConditionChange}
                    onAgeRangeChange={handleAgeRangeChange}
                    onLocationChange={handleLocationChange}
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
            <ApplicantFilters
              fundingRanges={fundingRanges}
              medicalConditions={medicalConditions}
              ageRanges={ageRanges}
              locations={locations}
              selectedFundingRanges={selectedFundingRanges}
              selectedMedicalConditions={selectedMedicalConditions}
              selectedAgeRanges={selectedAgeRanges}
              selectedLocations={selectedLocations}
              onFundingRangeChange={handleFundingRangeChange}
              onMedicalConditionChange={handleMedicalConditionChange}
              onAgeRangeChange={handleAgeRangeChange}
              onLocationChange={handleLocationChange}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </motion.div>

          {/* Applicants List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <ApplicantList applicants={filteredApplicants} layout={layout} onLayoutChange={setLayout} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

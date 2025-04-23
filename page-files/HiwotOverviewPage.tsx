"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, MapPin, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Types
interface Candidate {
  id: number
  name: string
  location: string
  skills: Array<{
    name: string
    color: string
  }>
  image: string
}

// Mock data
const mockCandidates: Candidate[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: "Abebe Kebede",
  location: "Addis Ababa, Ethiopia",
  skills: [
    {
      name:
        i % 7 === 0
          ? "Platform"
          : i % 5 === 0
            ? "Machine"
            : i % 3 === 0
              ? "Development"
              : i % 2 === 0
                ? "Engineering"
                : "Services",
      color:
        i % 7 === 0
          ? "text-red-500 bg-red-50"
          : i % 5 === 0
            ? "text-purple-500 bg-purple-50"
            : i % 3 === 0
              ? "text-orange-500 bg-orange-50"
              : i % 2 === 0
                ? "text-green-500 bg-green-50"
                : "text-gray-500 bg-gray-50",
    },
    {
      name: "TypeScript",
      color: "text-blue-500 bg-blue-50",
    },
    {
      name: "HTML",
      color: "text-orange-500 bg-orange-50",
    },
    {
      name: "CSS",
      color: "text-blue-500 bg-blue-50",
    },
  ],
  image: "/placeholder.svg?height=50&width=50",
}))

// Filter options
const employmentTypes = [
  { id: "full-time", label: "Full-time", count: 5 },
  { id: "part-time", label: "Part-Time", count: 0 },
  { id: "remote", label: "Remote", count: 7 },
  { id: "internship", label: "Internship", count: 24 },
  { id: "contract", label: "Contract", count: 9 },
]

const categories = [
  { id: "design", label: "Design", count: 34 },
  { id: "sales", label: "Sales", count: 5 },
  { id: "marketing", label: "Marketing", count: 3 },
  { id: "business", label: "Business", count: 9 },
  { id: "human-resource", label: "Human Resource", count: 6 },
  { id: "finance", label: "Finance", count: 4 },
  { id: "engineering", label: "Engineering", count: 4 },
  { id: "technology", label: "Technology", count: 5 },
]

const jobLevels = [
  { id: "entry", label: "Entry Level", count: 17 },
  { id: "mid", label: "Mid Level", count: 9 },
  { id: "senior", label: "Senior Level", count: 5 },
]

const salaryRanges = [
  { id: "700-900", label: "$700 - $900", count: 4 },
  { id: "900-1500", label: "$900 - $1500", count: 8 },
  { id: "1500-2000", label: "$1500 - $2000", count: 10 },
  { id: "2000-plus", label: "$2000 or above", count: 4 },
]

export default function HiwotOverviewPage() {
  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("Addis Ababa")
  const [currentPage, setCurrentPage] = useState(1)
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates)
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>(mockCandidates)
  const [expandedFilters, setExpandedFilters] = useState({
    employment: true,
    categories: true,
    jobLevel: true,
    salaryRange: true,
  })

  // Filter states
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedJobLevels, setSelectedJobLevels] = useState<string[]>([])
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([])

  // Add a layout state after the other state declarations
  const [layout, setLayout] = useState<"list" | "grid">("list")

  // Pagination
  const candidatesPerPage = 7
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage)
  const indexOfLastCandidate = currentPage * candidatesPerPage
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate)

  // Toggle filter sections
  const toggleFilter = (filter: keyof typeof expandedFilters) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter],
    })
  }

  // Handle checkbox changes
  const handleEmploymentTypeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEmploymentTypes([...selectedEmploymentTypes, id])
    } else {
      setSelectedEmploymentTypes(selectedEmploymentTypes.filter((type) => type !== id))
    }
  }

  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, id])
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== id))
    }
  }

  const handleJobLevelChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedJobLevels([...selectedJobLevels, id])
    } else {
      setSelectedJobLevels(selectedJobLevels.filter((level) => level !== id))
    }
  }

  const handleSalaryRangeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSalaryRanges([...selectedSalaryRanges, id])
    } else {
      setSelectedSalaryRanges(selectedSalaryRanges.filter((range) => range !== id))
    }
  }

  // Apply filters
  const applyFilters = () => {
    let results = [...candidates]

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.skills.some((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply employment type filter
    if (selectedEmploymentTypes.length > 0) {
      // In a real app, you would filter based on the candidate's employment type
      // For this mock, we'll just filter randomly based on the candidate's ID
      results = results.filter((candidate) =>
        selectedEmploymentTypes.some((type) => {
          if (type === "full-time") return candidate.id % 5 === 0
          if (type === "part-time") return candidate.id % 7 === 0
          if (type === "remote") return candidate.id % 3 === 0
          if (type === "internship") return candidate.id % 2 === 0
          if (type === "contract") return candidate.id % 4 === 0
          return false
        }),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      // In a real app, you would filter based on the candidate's category
      // For this mock, we'll just filter randomly based on the candidate's ID
      results = results.filter((candidate) =>
        selectedCategories.some((category) => {
          const categoryIndex = categories.findIndex((c) => c.id === category)
          return candidate.id % (categoryIndex + 2) === 0
        }),
      )
    }

    // Apply job level filter
    if (selectedJobLevels.length > 0) {
      // In a real app, you would filter based on the candidate's job level
      // For this mock, we'll just filter randomly based on the candidate's ID
      results = results.filter((candidate) =>
        selectedJobLevels.some((level) => {
          if (level === "entry") return candidate.id % 3 === 0
          if (level === "mid") return candidate.id % 5 === 0
          if (level === "senior") return candidate.id % 7 === 0
          return false
        }),
      )
    }

    // Apply salary range filter
    if (selectedSalaryRanges.length > 0) {
      // In a real app, you would filter based on the candidate's salary range
      // For this mock, we'll just filter randomly based on the candidate's ID
      results = results.filter((candidate) =>
        selectedSalaryRanges.some((range) => {
          if (range === "700-900") return candidate.id % 4 === 0
          if (range === "900-1500") return candidate.id % 3 === 0
          if (range === "1500-2000") return candidate.id % 5 === 0
          if (range === "2000-plus") return candidate.id % 7 === 0
          return false
        }),
      )
    }

    setFilteredCandidates(results)
    setCurrentPage(1) // Reset to first page after filtering
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedEmploymentTypes([])
    setSelectedCategories([])
    setSelectedJobLevels([])
    setSelectedSalaryRanges([])
    setSearchTerm("")
    setFilteredCandidates(candidates)
    setCurrentPage(1)
  }

  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(page)
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

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 mt-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Find the right <span className="text-orange-500">Female Candidates</span> for your project
          </h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Profession Title"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative md:w-1/3">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="pl-10">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                <SelectItem value="Dire Dawa">Dire Dawa</SelectItem>
                <SelectItem value="Bahir Dar">Bahir Dar</SelectItem>
                <SelectItem value="Hawassa">Hawassa</SelectItem>
                <SelectItem value="Mekelle">Mekelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={applyFilters}>
            Search
          </Button>
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
                <div className="py-4 space-y-6">
                  {/* Employment Type Filter */}
                  <div className="border rounded-lg overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleFilter("employment")}
                    >
                      <h3 className="font-medium">Type of Employment</h3>
                      {expandedFilters.employment ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    <AnimatePresence>
                      {expandedFilters.employment && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 space-y-3"
                        >
                          {employmentTypes.map((type) => (
                            <div key={type.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-employment-${type.id}`}
                                checked={selectedEmploymentTypes.includes(type.id)}
                                onCheckedChange={(checked) => handleEmploymentTypeChange(type.id, checked as boolean)}
                              />
                              <label
                                htmlFor={`mobile-employment-${type.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {type.label} ({type.count})
                              </label>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Categories Filter */}
                  <div className="border rounded-lg overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleFilter("categories")}
                    >
                      <h3 className="font-medium">Categories</h3>
                      {expandedFilters.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    <AnimatePresence>
                      {expandedFilters.categories && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 space-y-3"
                        >
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                              />
                              <label
                                htmlFor={`mobile-category-${category.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.label} ({category.count})
                              </label>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Job Level Filter */}
                  <div className="border rounded-lg overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleFilter("jobLevel")}
                    >
                      <h3 className="font-medium">Job Level</h3>
                      {expandedFilters.jobLevel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    <AnimatePresence>
                      {expandedFilters.jobLevel && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 space-y-3"
                        >
                          {jobLevels.map((level) => (
                            <div key={level.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-level-${level.id}`}
                                checked={selectedJobLevels.includes(level.id)}
                                onCheckedChange={(checked) => handleJobLevelChange(level.id, checked as boolean)}
                              />
                              <label
                                htmlFor={`mobile-level-${level.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {level.label} ({level.count})
                              </label>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Salary Range Filter */}
                  <div className="border rounded-lg overflow-hidden">
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                      onClick={() => toggleFilter("salaryRange")}
                    >
                      <h3 className="font-medium">Salary Range</h3>
                      {expandedFilters.salaryRange ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    <AnimatePresence>
                      {expandedFilters.salaryRange && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 space-y-3"
                        >
                          {salaryRanges.map((range) => (
                            <div key={range.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`mobile-range-${range.id}`}
                                checked={selectedSalaryRanges.includes(range.id)}
                                onCheckedChange={(checked) => handleSalaryRangeChange(range.id, checked as boolean)}
                              />
                              <label
                                htmlFor={`mobile-range-${range.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {range.label} ({range.count})
                              </label>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Filter Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" onClick={applyFilters}>
                      Go
                    </Button>
                    <Button className="flex-1" variant="outline" onClick={clearFilters}>
                      Clear filter
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 hidden lg:block"
          >
            {/* Employment Type Filter */}
            <div className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                onClick={() => toggleFilter("employment")}
              >
                <h3 className="font-medium">Type of Employment</h3>
                {expandedFilters.employment ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              <AnimatePresence>
                {expandedFilters.employment && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 space-y-3"
                  >
                    {employmentTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`employment-${type.id}`}
                          checked={selectedEmploymentTypes.includes(type.id)}
                          onCheckedChange={(checked) => handleEmploymentTypeChange(type.id, checked as boolean)}
                        />
                        <label
                          htmlFor={`employment-${type.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type.label} ({type.count})
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categories Filter */}
            <div className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                onClick={() => toggleFilter("categories")}
              >
                <h3 className="font-medium">Categories</h3>
                {expandedFilters.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              <AnimatePresence>
                {expandedFilters.categories && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 space-y-3"
                  >
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.label} ({category.count})
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Job Level Filter */}
            <div className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                onClick={() => toggleFilter("jobLevel")}
              >
                <h3 className="font-medium">Job Level</h3>
                {expandedFilters.jobLevel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              <AnimatePresence>
                {expandedFilters.jobLevel && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 space-y-3"
                  >
                    {jobLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`level-${level.id}`}
                          checked={selectedJobLevels.includes(level.id)}
                          onCheckedChange={(checked) => handleJobLevelChange(level.id, checked as boolean)}
                        />
                        <label
                          htmlFor={`level-${level.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {level.label} ({level.count})
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Salary Range Filter */}
            <div className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                onClick={() => toggleFilter("salaryRange")}
              >
                <h3 className="font-medium">Salary Range</h3>
                {expandedFilters.salaryRange ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              <AnimatePresence>
                {expandedFilters.salaryRange && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 space-y-3"
                  >
                    {salaryRanges.map((range) => (
                      <div key={range.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`range-${range.id}`}
                          checked={selectedSalaryRanges.includes(range.id)}
                          onCheckedChange={(checked) => handleSalaryRangeChange(range.id, checked as boolean)}
                        />
                        <label
                          htmlFor={`range-${range.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {range.label} ({range.count})
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" onClick={applyFilters}>
                Go
              </Button>
              <Button className="flex-1" variant="outline" onClick={clearFilters}>
                Clear filter
              </Button>
            </div>
          </motion.div>

          {/* Candidates List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold">All Candidates</h2>
                  <p className="text-sm text-gray-500">Showing {filteredCandidates.length} results</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
                    <Select defaultValue="most-relevant">
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="most-relevant">Most relevant</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="highest-salary">Highest salary</SelectItem>
                        <SelectItem value="lowest-salary">Lowest salary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`h-8 w-8 ${layout === "grid" ? "bg-orange-50" : ""}`}
                      onClick={() => setLayout("grid")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`h-8 w-8 ${layout === "list" ? "bg-orange-50" : ""}`}
                      onClick={() => setLayout("list")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </Button>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto">
                    Create Project
                  </Button>
                </div>
              </div>

              {/* Candidates */}
              {layout === "list" ? (
                <div className="space-y-4">
                  {currentCandidates.length > 0 ? (
                    currentCandidates.map((candidate) => (
                      <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={candidate.image || "/placeholder.svg"}
                              alt={candidate.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{candidate.name}</h3>
                            <p className="text-sm text-gray-500">{candidate.location}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {candidate.skills.map((skill, index) => (
                                <span key={index} className={`text-xs px-2 py-1 rounded-full ${skill.color}`}>
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="text-orange-500 border-orange-500 hover:bg-orange-50 w-full sm:w-auto"
                        >
                          See More
                        </Button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No candidates found matching your criteria.</p>
                      <Button variant="link" onClick={clearFilters} className="mt-2">
                        Clear filters and try again
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCandidates.length > 0 ? (
                    currentCandidates.map((candidate) => (
                      <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border rounded-lg p-4 flex flex-col"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={candidate.image || "/placeholder.svg"}
                              alt={candidate.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{candidate.name}</h3>
                            <p className="text-xs text-gray-500">{candidate.location}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.skills.map((skill, index) => (
                            <span key={index} className={`text-xs px-2 py-1 rounded-full ${skill.color}`}>
                              {skill.name}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="text-orange-500 border-orange-500 hover:bg-orange-50 mt-auto"
                        >
                          See More
                        </Button>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 col-span-full">
                      <p className="text-gray-500">No candidates found matching your criteria.</p>
                      <Button variant="link" onClick={clearFilters} className="mt-2">
                        Clear filters and try again
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {filteredCandidates.length > 0 && (
                <div className="flex justify-center items-center mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 mr-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum = i + 1
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNum = currentPage - 3 + i
                      }
                      if (currentPage > totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      }
                    }

                    return pageNum <= totalPages ? (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className={`h-8 w-8 mx-1 ${
                          currentPage === pageNum ? "bg-orange-500 hover:bg-orange-600 text-white" : ""
                        }`}
                        onClick={() => goToPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    ) : null
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="mx-1">...</span>
                      <Button variant="outline" className="h-8 w-8 mx-1" onClick={() => goToPage(totalPages)}>
                        {totalPages}
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 ml-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

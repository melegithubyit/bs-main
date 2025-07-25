"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import SearchBar from "@/components/job-comp/search-bar";
import CandidateFilters from "@/components/job-comp/candidate-filters";
import { mockTalents, JobTalent } from "@/components/job-comp/mockTalents";
import { useRouter } from "next/navigation";
import CandidateList from "@/components/job-comp/candidate-list";

// Filter options
const employmentTypes = [
  { id: "fulltime", label: "Full-time", count: 10 },
  { id: "parttime", label: "Part-Time", count: 10 },
  { id: "remote", label: "Remote", count: 10 },
  { id: "internship", label: "Internship", count: 10 },
  { id: "contract", label: "Contract", count: 10 },
];

const departments = [
  { id: "engineering", label: "Engineering", count: 10 },
  { id: "design", label: "Design", count: 10 },
  { id: "marketing", label: "Marketing", count: 10 },
  { id: "finance", label: "Finance", count: 10 },
  { id: "hr", label: "Human Resources", count: 10 },
];

const fields = [
  { id: "software", label: "Software Development", count: 7 },
  { id: "ux-ui", label: "UX/UI Design", count: 7 },
  { id: "digital-marketing", label: "Digital Marketing", count: 7 },
  { id: "accounting", label: "Accounting", count: 7 },
  { id: "recruitment", label: "Recruitment", count: 7 },
  { id: "data-science", label: "Data Science", count: 7 },
  { id: "project-management", label: "Project Management", count: 8 },
];

const locations = [
  { id: "addis-ababa", label: "Addis Ababa", count: 10 },
  { id: "dire-dawa", label: "Dire Dawa", count: 10 },
  { id: "bahir-dar", label: "Bahir Dar", count: 10 },
  { id: "hawassa", label: "Hawassa", count: 10 },
  { id: "mekelle", label: "Mekelle", count: 10 },
];

export default function JobOverviewPage() {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("all");
  const [candidates, _] = useState<JobTalent[]>(mockTalents);
  const [filteredCandidates, setFilteredCandidates] =
    useState<JobTalent[]>(mockTalents);
  const [layout, setLayout] = useState<"list" | "grid">("list");

  // Filter states
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<
    string[]
  >([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Handle checkbox changes
  const handleEmploymentTypeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEmploymentTypes([...selectedEmploymentTypes, id]);
    } else {
      setSelectedEmploymentTypes(
        selectedEmploymentTypes.filter((type) => type !== id)
      );
    }
  };

  const handleDepartmentChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedDepartments([...selectedDepartments, id]);
    } else {
      setSelectedDepartments(selectedDepartments.filter((dept) => dept !== id));
    }
  };

  const handleFieldChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedFields([...selectedFields, id]);
    } else {
      setSelectedFields(selectedFields.filter((field) => field !== id));
    }
  };

  const handleLocationChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, id]);
    } else {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== id));
    }
  };

  // Apply filters
  const applyFilters = () => {
    let results = [...candidates];
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTermLower) ||
          candidate.skills.some((skill) =>
            skill.toLowerCase().includes(searchTermLower)
          ) ||
          candidate.location.toLowerCase().includes(searchTermLower)
      );
    }
    if (location && location !== "all") {
      results = results.filter((candidate) => {
        const locationId = candidate.location
          .toLowerCase()
          .replace(/\s+/g, "-");
        return locationId === location;
      });
    }
    setFilteredCandidates(results);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setLocation("all");
    setSelectedEmploymentTypes([]);
    setSelectedDepartments([]);
    setSelectedFields([]);
    setSelectedLocations([]);
    setFilteredCandidates(candidates);
  };

  // Apply filters when any filter state changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, location]);

  const router = useRouter();

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -left-40 top-0 opacity-10">
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
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Find the right{" "}
            <span className="text-blue-500">Female Candidates</span> for your
            project
          </h1>
          <p className="text-gray-600 text-center py-6">
            Browse through our talented pool of female candidates
          </p>
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
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <CandidateFilters
                    employmentTypes={employmentTypes}
                    departments={departments}
                    fields={fields}
                    locations={locations}
                    selectedEmploymentTypes={selectedEmploymentTypes}
                    selectedDepartments={selectedDepartments}
                    selectedFields={selectedFields}
                    selectedLocations={selectedLocations}
                    onEmploymentTypeChange={handleEmploymentTypeChange}
                    onDepartmentChange={handleDepartmentChange}
                    onFieldChange={handleFieldChange}
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
            <CandidateFilters
              employmentTypes={employmentTypes}
              departments={departments}
              fields={fields}
              locations={locations}
              selectedEmploymentTypes={selectedEmploymentTypes}
              selectedDepartments={selectedDepartments}
              selectedFields={selectedFields}
              selectedLocations={selectedLocations}
              onEmploymentTypeChange={handleEmploymentTypeChange}
              onDepartmentChange={handleDepartmentChange}
              onFieldChange={handleFieldChange}
              onLocationChange={handleLocationChange}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </motion.div>

          {/* Candidates List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <CandidateList
              candidates={filteredCandidates}
              layout={layout}
              onLayoutChange={setLayout}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

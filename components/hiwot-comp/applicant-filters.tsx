"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"

interface FilterOption {
    id: string
    label: string
    count: number
}

interface ApplicantFiltersProps {
    fundingRanges: FilterOption[]
    medicalConditions: FilterOption[]
    ageRanges: FilterOption[]
    locations: FilterOption[]
    selectedFundingRanges: string[]
    selectedMedicalConditions: string[]
    selectedAgeRanges: string[]
    selectedLocations: string[]
    onFundingRangeChange: (id: string, checked: boolean) => void
    onMedicalConditionChange: (id: string, checked: boolean) => void
    onAgeRangeChange: (id: string, checked: boolean) => void
    onLocationChange: (id: string, checked: boolean) => void
    onApplyFilters: () => void
    onClearFilters: () => void
}

export default function ApplicantFilters({
    fundingRanges,
    medicalConditions,
    ageRanges,
    locations,
    selectedFundingRanges,
    selectedMedicalConditions,
    selectedAgeRanges,
    selectedLocations,
    onFundingRangeChange,
    onMedicalConditionChange,
    onAgeRangeChange,
    onLocationChange,
    onApplyFilters,
    onClearFilters,
}: ApplicantFiltersProps) {
    const [expandedFilters, setExpandedFilters] = useState({
        funding: true,
        medical: true,
        age: true,
        locations: true,
    })

    const toggleFilter = (filter: keyof typeof expandedFilters) => {
        setExpandedFilters({
            ...expandedFilters,
            [filter]: !expandedFilters[filter],
        })
    }

    return (
        <div className="space-y-6">
            {/* Funding Range Filter */}
            <div className="border rounded-lg overflow-hidden">
                <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                    onClick={() => toggleFilter("funding")}
                >
                    <h3 className="font-medium">Funding Goal</h3>
                    {expandedFilters.funding ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <AnimatePresence>
                    {expandedFilters.funding && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 space-y-3"
                        >
                            {fundingRanges.map((range) => (
                                <div key={range.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`funding-${range.id}`}
                                        checked={selectedFundingRanges.includes(range.id)}
                                        onCheckedChange={(checked) => onFundingRangeChange(range.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={`funding-${range.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {range.label} ({range.count})
                                    </Label>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Medical Conditions Filter */}
            <div className="border rounded-lg overflow-hidden">
                <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                    onClick={() => toggleFilter("medical")}
                >
                    <h3 className="font-medium">Medical Conditions</h3>
                    {expandedFilters.medical ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <AnimatePresence>
                    {expandedFilters.medical && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 space-y-3"
                        >
                            {medicalConditions.map((condition) => (
                                <div key={condition.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`condition-${condition.id}`}
                                        checked={selectedMedicalConditions.includes(condition.id)}
                                        onCheckedChange={(checked) => onMedicalConditionChange(condition.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={`condition-${condition.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {condition.label} ({condition.count})
                                    </Label>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Age Ranges Filter */}
            <div className="border rounded-lg overflow-hidden">
                <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                    onClick={() => toggleFilter("age")}
                >
                    <h3 className="font-medium">Age Range</h3>
                    {expandedFilters.age ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <AnimatePresence>
                    {expandedFilters.age && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 space-y-3"
                        >
                            {ageRanges.map((range) => (
                                <div key={range.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`age-${range.id}`}
                                        checked={selectedAgeRanges.includes(range.id)}
                                        onCheckedChange={(checked) => onAgeRangeChange(range.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={`age-${range.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {range.label} ({range.count})
                                    </Label>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Locations Filter */}
            <div className="border rounded-lg overflow-hidden">
                <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                    onClick={() => toggleFilter("locations")}
                >
                    <h3 className="font-medium">Locations</h3>
                    {expandedFilters.locations ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <AnimatePresence>
                    {expandedFilters.locations && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 space-y-3"
                        >
                            {locations.map((location) => (
                                <div key={location.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`location-${location.id}`}
                                        checked={selectedLocations.includes(location.id)}
                                        onCheckedChange={(checked) => onLocationChange(location.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={`location-${location.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {location.label} ({location.count})
                                    </Label>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3 mt-6">
                <Button onClick={onApplyFilters} className="bg-orange-500 hover:bg-orange-600 text-white">
                    Apply Filters
                </Button>
                <Button variant="outline" onClick={onClearFilters}>
                    Clear Filters
                </Button>
            </div>
        </div>
    )
}

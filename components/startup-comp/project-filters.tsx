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

interface ProjectFiltersProps {
    fundingRanges: FilterOption[]
    supportTypes: FilterOption[]
    categories: FilterOption[]
    locations: FilterOption[]
    selectedFundingRanges: string[]
    selectedSupportTypes: string[]
    selectedCategories: string[]
    selectedLocations: string[]
    fundingProgress: [number, number]
    onFundingRangeChange: (id: string, checked: boolean) => void
    onSupportTypeChange: (id: string, checked: boolean) => void
    onCategoryChange: (id: string, checked: boolean) => void
    onLocationChange: (id: string, checked: boolean) => void
    onFundingProgressChange: (value: [number, number]) => void
    onApplyFilters: () => void
    onClearFilters: () => void
}

export default function ProjectFilters({
    fundingRanges,
    supportTypes,
    categories,
    locations,
    selectedFundingRanges,
    selectedSupportTypes,
    selectedCategories,
    selectedLocations,
    fundingProgress,
    onFundingRangeChange,
    onSupportTypeChange,
    onCategoryChange,
    onLocationChange,
    onFundingProgressChange,
    onApplyFilters,
    onClearFilters,
}: ProjectFiltersProps) {
    const [expandedFilters, setExpandedFilters] = useState({
        funding: true,
        support: true,
        categories: true,
        locations: true,
        progress: true,
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

            {/* Support Types Filter */}
            <div className="border rounded-lg overflow-hidden">
                <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                    onClick={() => toggleFilter("support")}
                >
                    <h3 className="font-medium">Support Types</h3>
                    {expandedFilters.support ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                <AnimatePresence>
                    {expandedFilters.support && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 space-y-3"
                        >
                            {supportTypes.map((type) => (
                                <div key={type.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`support-${type.id}`}
                                        checked={selectedSupportTypes.includes(type.id)}
                                        onCheckedChange={(checked) => onSupportTypeChange(type.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={`support-${type.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {type.label} ({type.count})
                                    </Label>
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
                                        onCheckedChange={(checked) => onCategoryChange(category.id, checked as boolean)}
                                    />
                                    <Label
                                        htmlFor={`category-${category.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category.label} ({category.count})
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

            {/* Filter Action Buttons */}
            <div className="flex gap-3">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white" onClick={onApplyFilters}>
                    Apply Filters
                </Button>
                <Button className="flex-1" variant="outline" onClick={onClearFilters}>
                    Clear Filters
                </Button>
            </div>
        </div>
    )
}

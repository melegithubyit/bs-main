"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import startup from '@/public/startup.svg';
import job from "@/public/job.svg";
import hiwot from "@/public/hiwotfund.svg"

interface CategoryProps {
    title: string
    image: string
    link: string
}

const categories: CategoryProps[] = [
    {
        title: "Start up Fund",
        image: startup,
        link: "/startup",
    },
    {
        title: "Hiwot Fund",
        image: hiwot,
        link: "/hiwot",
    },
    {
        title: "Job Applications",
        image: job,
        link: "/job",
    },
]

export default function FundingCategories() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section id="funding-categories" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Bole Starter Funding Solutions</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore flexible funding solutions tailored for your startup, project, or personal needs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <Link href={category.link} key={index} className="block group">
                            <motion.div
                                className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <Image
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 ease-in-out"></div>
                                </div>
                                <div className="p-5 bg-white">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{category.title}</h3>
                                    <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-sm font-medium">Learn More</span>
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

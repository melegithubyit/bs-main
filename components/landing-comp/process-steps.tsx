"use client"

import type React from "react"

import Link from "next/link"
import { ChevronRight, UserCircle, Search, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

interface StepProps {
  title: string
  description: string
  icon: React.ReactNode
}

const steps: StepProps[] = [
  {
    title: "Create one profile",
    description:
      "Build your reputation with a universal profile that works across hundreds of different kind of employers.",
    icon: <UserCircle className="h-12 w-12" />,
  },
  {
    title: "Explore your options",
    description:
      "Select your preferences (shift details, salary, location, etc.) and discover jobs most relevant to you.",
    icon: <Search className="h-12 w-12" />,
  },
  {
    title: "Talk on your terms",
    description:
      "Message multiple employers while keeping all communication in one, convenient place. It's so much easy.",
    icon: <MessageCircle className="h-12 w-12" />,
  },
]

export default function ProcessSteps() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute -left-40 top-0 opacity-10">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="200" stroke="#FFA500" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="180" stroke="#FFA500" strokeWidth="0.5" fill="none" />
          <circle cx="200" cy="200" r="160" stroke="#FFA500" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The fast track to your funding</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-gray-600">
              We ensure your next step is a step forward. That's why we built a funding platform that serves all kind of
              services.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-lg ${index === 1 ? "bg-blue-500 text-white" : "bg-blue-50"}`}
              variants={item}
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className={`mb-6 ${index === 1 ? "text-blue-100" : "text-gray-600"}`}>{step.description}</p>
              <Link
                href="#"
                onClick={(e) => {
                  if (index === 1) {
                    e.preventDefault(); // Prevent default link behavior
                    document.getElementById('funding-categories')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}  
                className={`inline-flex items-center ${index === 1 ? "text-white" : "text-blue-500"
                  } font-medium hover:underline`}
              >
                Get Started <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

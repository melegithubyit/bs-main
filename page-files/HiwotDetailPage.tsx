"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Share, ThumbsUp, Play, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import imgg from '@/public/collab.svg'

export default function HiwotDetailPage() {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(14)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
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
        <div className="flex items-center gap-2 mb-6 text-orange-500">
          <Link href="/start-up" className="hover:underline">
            Startup
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-600">Electrical Circuit</span>
        </div>

        {/* Top Card */}
        <div className="bg-[#FEAC5B] text-white rounded-lg p-4 flex justify-between items-center mb-6">
          <div>
            <div className="text-2xl font-bold">500</div>
            <div className="text-sm">Funding Funders so far</div>
          </div>
          <div className="bg-white rounded-md p-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-500"
                >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
          </div>
        </div>

        {/* Project Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                <Image
                  src={imgg}
                  alt="Electrical Circuit"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Electrical Circuit</h1>
                <p className="text-gray-600">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start md:justify-end">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Apply</Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-600 mb-4">
                Sigma is looking for Social Media Marketing expert to help manage our online networks. You will be
                responsible for monitoring our social media channels, curating content, finding effective ways to engage
                the community and maximize efforts to reach our channels.
              </p>
            </motion.div>

            {/* What we want */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">What we want</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1">
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
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span>You get energy from people and building the ideal work environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1">
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
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span>You have a sense for beautiful spaces and office experiences</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1">
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
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span>You are a confident office manager, ready for added responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1">
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
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span>You're detail-oriented and creative</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-4 mt-1">
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
                      className="text-green-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span>You're a growth marketer and know how to run campaigns</span>
                </li>
              </ul>

              <div className="mt-6">
                <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Create Project
                </Button>
              </div>
            </motion.div>

            {/* Project Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">Project Name</h2>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <Image
                  src={imgg}
                  alt="Project Proposal"
                  width={600}
                  height={300}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-orange-500 rounded-full p-4 cursor-pointer hover:bg-orange-600 transition-colors">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
                  Project Proposal
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 ${liked ? "text-blue-500" : "text-gray-500"}`}
                >
                  <ThumbsUp size={18} />
                  <span>{likeCount}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500">
                  <Share size={18} />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>

            {/* Project Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
                  <Image
                    src={imgg}
                    alt="Electrical Circuit"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold">Electrical Circuit</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Electrical Circuit is a start up technology that builds economic infrastructure for the internet.
                Billions of users rely on us—from startups to public companies—use our software to accept payments and
                manage their businesses online.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Image
                  src={imgg}
                  alt="Team working"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-auto"
                />
                <Image
                  src={imgg}
                  alt="Office space"
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* About this role */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">About this role</h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600">5 companies</span>
                <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5">Popularity</span>
              </div>

              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Posted Date</div>
                  <div className="font-medium">July 31, 2021</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Deadline</div>
                  <div className="font-medium">July 1, 2021</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Project Type</div>
                  <div className="font-medium">Engineering</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Expected Salary</div>
                  <div className="font-medium">$75k-$85k USD</div>
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">Engineering</Badge>
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Development</Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">API</Badge>
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Web</Badge>
              </div>
            </motion.div>

            {/* Funding Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">$ 5000</span>
                  <span className="text-sm font-medium">56% Funded</span>
                </div>
                <Progress value={56} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">$ 25K</div>
                  <div className="text-sm text-gray-600">Goal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">120</div>
                  <div className="text-sm text-gray-600">Days to Go</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">500</div>
                  <div className="text-sm text-gray-600">Supporters</div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Support Project</Button>
                <Button variant="outline" className="w-full">
                  Remind me later
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

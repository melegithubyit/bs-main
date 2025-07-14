/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, User, CheckCircle } from "lucide-react";

export default function JobsCoverPage() {
  const paths = [
    {
      title: "I'm Hiring",
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      description: "Find skilled professionals for your projects",
      features: [
        "Browse verified candidates",
        "Filter by skills and experience",
        "Direct messaging",
        "Secure hiring process",
      ],
      cta: "Browse Candidates",
      href: "/job/overview",
    },
    {
      title: "I'm a Freelancer",
      icon: <User className="w-8 h-8 text-blue-500" />,
      description: "Find work that matches your skills",
      features: [
        "Create your professional profile",
        "Showcase your portfolio",
        "Get matched with projects",
        "Secure payments",
      ],
      cta: "Create Profile",
      href: "/job/add",
    },
  ];

  // const benefits = [
  //   {
  //     icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
  //     title: "Verified Profiles",
  //     description: "All candidates are thoroughly vetted",
  //   },
  //   {
  //     icon: <Search className="w-6 h-6 text-blue-500" />,
  //     title: "Smart Matching",
  //     description: "Find the perfect fit quickly",
  //   },
  //   {
  //     icon: <FileText className="w-6 h-6 text-blue-500" />,
  //     title: "Secure Contracts",
  //     description: "Protected agreements for both parties",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-0">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold">
            <span className="text-blue-600">Talent Connect</span>: Where
            Opportunities Meet Skills
          </h1>
        </motion.div>
      </section>

      {/* Dual Path Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {paths.map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-100 rounded-full">{path.icon}</div>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-center">
                {path.title}
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                {path.description}
              </p>

              <ul className="space-y-3 mb-8">
                {path.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={path.href} className="flex justify-center">
                <Button className="w-full">{path.cta}</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

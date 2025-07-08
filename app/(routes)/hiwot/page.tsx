"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Upload, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function HiwotCoverPage() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const paths = [
    {
      title: "You want to help?",
      icon: <HeartHandshake className="w-8 h-8" />,
      description: "Browse cases and support those in need of medical assistance.",
      steps: [
        "Browse medical cases",
        "Read their stories",
        "Donate to support",
      ],
      cta: "Browse Cases",
      href: "/hiwot/overview",
    },
    {
      title: "You want to post your case?",
      icon: <Upload className="w-8 h-8" />,
      description: "Request assistance by posting your medical case for support.",
      steps: [
        "Create your case profile",
        "Share your medical need",
        "Receive support",
      ],
      cta: "Post Your Case",
      href: "/hiwot/add",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 ">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-purple-600"> Hiwot fund:</span>
            Extending a helping hand
          </h1>
        </motion.div> 

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paths.map((path, index) => (
            <div
              key={index}
              className="relative h-96 perspective-1000"
              onMouseEnter={() => setFlippedIndex(index)}
              onMouseLeave={() => setFlippedIndex(null)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                  flippedIndex === index ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center backface-hidden border-2 border-gray-100">
                  <div className="text-purple-500 mb-4">{path.icon}</div>
                  <h2 className="text-center text-3xl font-bold mb-2 text-wrap">
                    {path.title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    {path.description}
                  </p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-md p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 border-2 border-purple-100">
                  <h3 className="text-xl font-semibold mb-4">How it works</h3>
                  <ul className="space-y-3 mb-6 text-center">
                    {path.steps.map((step, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-purple-500">✓</span> {step}
                      </li>
                    ))}
                  </ul>
                  <Link href={path.href}>
                    <Button className="gap-2">
                      {path.cta} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

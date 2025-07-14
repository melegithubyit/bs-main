"use client";

import {
  Lightbulb,
  UserPlus,
  Send,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="h-10 w-10 text-blue-500 mb-4" />,
    title: "1. Create Your Project Profile",
    description:
      "Sign up and set up your startup profile. Tell us about your team, your vision, and what makes your project unique.",
  },
  {
    icon: <Send className="h-10 w-10 text-blue-500 mb-4" />,
    title: "2. Post Your Project",
    description:
      "Share your project details, goals, and funding needs. Add images, videos, and a compelling story to attract supporters.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-blue-500 mb-4" />,
    title: "3. Raise Capital",
    description:
      "Launch your campaign and start raising funds from the Bole Starter community. Engage with backers and keep them updated.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-blue-500 mb-4" />,
    title: "4. Grow Your Startup",
    description:
      "Use the capital you’ve raised to build your business. Share your progress and celebrate your milestones with your supporters.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          How Our Startup Platform Works
        </h1>
        <p className="text-gray-600 text-lg">
          New to Bole Starter? Here’s how you can launch your startup and get
          support from our community.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {step.icon}
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              {step.title}
            </h2>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          Ready to get started?
        </h2>
        <p className="text-gray-700 mb-6">
          Join Bole Starter today and turn your vision into reality!
        </p>
        {/* Replace href with your actual signup or start page */}
        <a
          href="/startup/add"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow transition"
        >
          Launch Your Startup
        </a>
      </div>
    </div>
  );
}

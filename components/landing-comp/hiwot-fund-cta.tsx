"use client";

import Image from "next/image";
// import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";
import hiwot from "@/public/hiwotfund2.svg";
import Link from "next/link";

export default function HiwotFundCTA() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src={hiwot}
            alt="Hiwot Fund"
            width={1200}
            height={500}
            className="w-full h-auto object-cover"
          />

          <div className="absolute inset-0 flex items-center">
            <motion.div
              className="bg-white rounded-lg p-8 ml-8 md:ml-16 max-w-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Are You Looking for Hiwot Fund?
              </h2>
              <p className="text-gray-600 mb-6">
                Your search for your hiwot fund begins here
              </p>
              <Link
                href="/hiwot"
                className="bg-orange-500 p-3 rounded-md hover:bg-orange-600 text-white"
              >
                Learn more
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

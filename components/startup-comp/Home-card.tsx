import { Button } from "@/components/ui/button";
import Image from "next/image";
import imgg from "@/public/herosection.svg";
import Link from "next/link";

export default function HomeCard() {
  return (
    <div className="container text-center w-screen">
      <p className="text-2xl font-semibold pt-5 ">
        Launch your vision into reality
      </p>
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 md:rounded-xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg text-start m-6">
        <div className="max-w-md">
          <p className="text-sm font-medium text-blue-200 mb-2">
            Startup & Project Hub
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Fuel your startup journey
          </h2>
          <p className="text-lg text-blue-100 mb-6">
            Connect, fund, and grow—together.
          </p>

          {/* Modern Button Group */}
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="ghost"
              className="bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20"
            >
              <Link href="/startup/projects">Back Startups</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20"
            >
              <Link href="/startup/add">Post Your Project</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20"
            >
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
        <div className="flex-shrink-0 relative">
          <Image
            src={imgg}
            alt="Startup Illustration"
            className="max-w-[150px] md:max-w-[300px] hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import imgg from "@/public/funding-startup.svg"

export default function HomeCard() {
  return (
    <div className="container bg-gradient-to-r from-purple-600 via via-purple-700 to-purple-800 md:rounded-xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg w-full">
      <div className="max-w-md">
        <p className="text-sm font-medium text-gray-300 mb-2">Kickstarter Pledge Manager</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">More power to your project</h2>
        <p className="text-lg text-gray-200 mb-5">Raise more. Stress less. Finish strong.</p>
        <Button variant="secondary" className="bg-white text-black hover:bg-gray-200">
          Learn more
        </Button>
      </div>
      <div className="flex-shrink-0 relative">
        <Image
          src={imgg}
          alt="Pledge Manager Graphic"
          className="max-w-[200px] md:max-w-[300px]"
        />
      </div>
    </div>
  );
}

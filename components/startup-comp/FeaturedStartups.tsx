"use client";
import { useState } from "react";
import { mockProjects } from "./mockProjects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const RECOMMENDATIONS_PER_PAGE = 6; // Changed to show 6 items (3 rows)

export default function FeaturedStartups() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const featured = mockProjects[0];
  const additionalProjects = mockProjects.slice(1, 3); // Get 2 projects for bottom row
  const recommendations = mockProjects.slice(3); // Remaining projects for recommendations
  const totalPages = Math.ceil(
    recommendations.length / RECOMMENDATIONS_PER_PAGE
  );
  const pagedRecommendations = recommendations.slice(
    (page - 1) * RECOMMENDATIONS_PER_PAGE,
    page * RECOMMENDATIONS_PER_PAGE
  );

  return (
    <section className="container py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Featured + 2 projects below */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Featured Project (takes 2 rows height) */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                Featured Project
              </h3>
              <div className="relative group">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-0 overflow-hidden">
                  <div
                    className="relative w-full h-80 cursor-pointer"
                    onClick={() =>
                      router.push(`/startup/detail/${featured.id}`)
                    }
                  >
                    <Image
                      src={featured.companyLogo}
                      alt={featured.projectName}
                      fill
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                        Featured
                      </Badge>
                      <span className="text-gray-500 text-xs">
                        {featured.projectOwner}
                      </span>
                    </div>
                    <h2
                      className="text-xl font-bold mb-1 cursor-pointer hover:text-blue-700"
                      onClick={() =>
                        router.push(`/startup/detail/${featured.id}`)
                      }
                    >
                      {featured.projectName}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                      <Calendar size={16} />
                      <span>{featured.daysLeft} days left</span>
                      <span>•</span>
                      <span>{featured.fundingProgress}% funded</span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-3">
                      {featured.projectDescription}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {featured.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {featured.location}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Hover overlay for featured */}
                <div
                  className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-xl border border-gray-200 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200 transform group-hover:scale-105 
                    z-50 overflow-auto flex flex-col"
                >
                  <div className="relative w-full h-80">
                    <Image
                      src={featured.companyLogo}
                      alt={featured.projectName}
                      fill
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                        Featured
                      </Badge>
                      <span className="text-gray-500 text-xs">
                        {featured.projectOwner}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-1">
                      {featured.projectName}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Calendar size={16} />
                      <span>{featured.daysLeft} days left</span>
                      <span>•</span>
                      <span>{featured.fundingProgress}% funded</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {featured.projectDescription}
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        {featured.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {featured.location}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Support
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-600 text-blue-600"
                        onClick={() =>
                          router.push(`/startup/detail/${featured.id}`)
                        }
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Projects Row (2 projects) */}
            <div className="grid grid-cols-2 gap-6">
              {additionalProjects.map((project) => (
                <div className="relative group" key={project.id}>
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full transition-all duration-100">
                    <div className="relative w-full h-32 md:h-28">
                      <Image
                        src={project.companyLogo}
                        alt={project.projectName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          Recommended
                        </Badge>
                        <span className="text-gray-500 text-xs truncate">
                          {project.projectOwner}
                        </span>
                      </div>
                      <h4 className="font-semibold text-md mb-1 truncate">
                        {project.projectName}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Calendar size={14} />
                        <span>{project.daysLeft} days left</span>
                        <span>•</span>
                        <span>{project.fundingProgress}% funded</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.location}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute top-0 left-0 w-full h-auto bg-white rounded-xl shadow-xl border border-gray-200 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 transform group-hover:scale-110 
                    z-50 overflow-hidden"
                  >
                    <div className="relative w-full h-40">
                      <Image
                        src={project.companyLogo}
                        alt={project.projectName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </Badge>
                        <span className="text-gray-500 text-xs truncate">
                          {project.projectOwner}
                        </span>
                      </div>
                      <h4 className="font-semibold text-md mb-1">
                        {project.projectName}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                        <Calendar size={14} />
                        <span>{project.daysLeft} days left</span>
                        <span>•</span>
                        <span>{project.fundingProgress}% funded</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {project.projectDescription}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          Support
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-blue-600 text-blue-600"
                          onClick={() =>
                            router.push(`/startup/detail/${project.id}`)
                          }
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Recommendations (3 rows) */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">
              Recommended For You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pagedRecommendations.map((project) => (
                <div className="relative group" key={project.id}>
                  <div className="bg-white rounded-xl shadow-md border border-gray-200 h-full transition-all duration-100">
                    <div className="relative w-full h-32 md:h-28">
                      <Image
                        src={project.companyLogo}
                        alt={project.projectName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          Recommended
                        </Badge>
                        <span className="text-gray-500 text-xs truncate">
                          {project.projectOwner}
                        </span>
                      </div>
                      <h4 className="font-semibold text-md mb-1 truncate">
                        {project.projectName}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                        <Calendar size={14} />
                        <span>{project.daysLeft} days left</span>
                        <span>•</span>
                        <span>{project.fundingProgress}% funded</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.location}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {/* Expanding Overlay (appears on hover) */}
                  <div
                    className="absolute top-0 left-0 w-full h-auto bg-white rounded-xl shadow-xl border border-gray-200 
                 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                 transition-all duration-200 transform group-hover:scale-110 
                 z-50 overflow-hidden"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className="relative w-full h-32 md:h-28">
                      <Image
                        src={project.companyLogo}
                        alt={project.projectName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                          Recommended
                        </Badge>
                        <span className="text-gray-500 text-xs truncate">
                          {project.projectOwner}
                        </span>
                      </div>
                      <h4 className="font-semibold text-md mb-1">
                        {project.projectName}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                        <Calendar size={14} />
                        <span>{project.daysLeft} days left</span>
                        <span>•</span>
                        <span>{project.fundingProgress}% funded</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {project.projectDescription}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          Support
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-blue-600 text-blue-600"
                          onClick={() =>
                            router.push(`/startup/detail/${project.id}`)
                          }
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 items-center">
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                }`}
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              {/* Show up to 3 page numbers centered on current page */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    totalPages <= 3 ||
                    (page <= 2 && p <= 3) ||
                    (page >= totalPages - 1 && p >= totalPages - 2) ||
                    (p >= page - 1 && p <= page + 1)
                )
                .map((p) => (
                  <button
                    key={p}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors ${
                      page === p
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                    }`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                }`}
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* // section 2  */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">
            Trending This Week
          </h3>

          <Button variant="link" className="text-blue-600 p-0">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockProjects.slice(0, 4).map((project) => (
            <div
              key={`trending-${project.id}`}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer hover:scale-105"
              onClick={() => router.push(`/startup/detail/${project.id}`)}
            >
              <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={project.companyLogo}
                  alt={project.projectName}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-white/90 text-orange-600 text-xs">
                  {Math.floor(Math.random() * 100) + 1}%
                </Badge>
              </div>
              <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                {project.projectName}
              </h4>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{project.category}</span>
                <span>${(Math.random() * 500).toFixed(1)}k</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* section 3 */}
      <div className="container mx-auto px-4 my-12">
        <h3 className="text-xs font-semibold text-gray-500 mb-4 uppercase">
          Featured Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-0 overflow-hidden hover:scale-105">
            <div
              className="relative w-full h-64  cursor-pointer"
              onClick={() => router.push(`/startup/detail/${featured.id}`)}
            >
              <Image
                src={featured.companyLogo}
                alt={featured.projectName}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                  Featured
                </Badge>
                <span className="text-gray-500 text-xs">
                  {featured.projectOwner}
                </span>
              </div>
              <h2
                className="text-xl font-bold mb-1 cursor-pointer hover:text-blue-700"
                onClick={() => router.push(`/startup/detail/${featured.id}`)}
              >
                {featured.projectName}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Calendar size={16} />
                <span>{featured.daysLeft} days left</span>
                <span>•</span>
                <span>{featured.fundingProgress}% funded</span>
              </div>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {featured.projectDescription}
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {featured.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {featured.location}
                </Badge>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-0 overflow-hidden hover:scale-105">
            <div
              className="relative w-full h-64 cursor-pointer"
              onClick={() => router.push(`/startup/detail/${featured.id}`)}
            >
              <Image
                src={featured.companyLogo}
                alt={featured.projectName}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                  Featured
                </Badge>
                <span className="text-gray-500 text-xs">
                  {featured.projectOwner}
                </span>
              </div>
              <h2
                className="text-xl font-bold mb-1 cursor-pointer hover:text-blue-700"
                onClick={() => router.push(`/startup/detail/${featured.id}`)}
              >
                {featured.projectName}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Calendar size={16} />
                <span>{featured.daysLeft} days left</span>
                <span>•</span>
                <span>{featured.fundingProgress}% funded</span>
              </div>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {featured.projectDescription}
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {featured.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {featured.location}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Button
          className="px-8 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-lg shadow-lg"
          onClick={() => router.push("/startup/projects")}
        >
          Explore More
        </Button>
      </div>
    </section>
  );
}

"use client";
import { useState } from "react";
import { mockProjects, StartupProject } from "./mockProjects";
import placeholderimg from "@/public/placeholder.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const RECOMMENDATIONS_PER_PAGE = 4;

export default function FeaturedStartups() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const featured = mockProjects[0];
  const recommendations = mockProjects.slice(1);
  const totalPages = Math.ceil(recommendations.length / RECOMMENDATIONS_PER_PAGE);
  const pagedRecommendations = recommendations.slice(
    (page - 1) * RECOMMENDATIONS_PER_PAGE,
    page * RECOMMENDATIONS_PER_PAGE
  );

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-start relative">
          {/* Featured Project (50%) */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Featured Project</h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-0 overflow-hidden">
              <div className="relative w-full h-64 md:h-80 cursor-pointer" onClick={() => router.push(`/startup/detail/${featured.id}`)}>
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
                  <Badge className="bg-green-100 text-green-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">Featured</Badge>
                  <span className="text-gray-500 text-xs">{featured.projectOwner}</span>
                </div>
                <h2 className="text-xl font-bold mb-1 cursor-pointer hover:text-purple-700" onClick={() => router.push(`/startup/detail/${featured.id}`)}>{featured.projectName}</h2>
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                  <Calendar size={16} />
                  <span>{featured.daysLeft} days left</span>
                  <span>•</span>
                  <span>{featured.fundingProgress}% funded</span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{featured.projectDescription}</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">{featured.category}</Badge>
                  <Badge variant="outline" className="text-xs">{featured.location}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations (50%) */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Recommended For You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pagedRecommendations.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-0 overflow-hidden cursor-pointer flex flex-col"
                  onClick={() => router.push(`/startup/detail/${project.id}`)}
                >
                  <div className="relative w-full h-32 md:h-28">
                    <Image
                      src={project.companyLogo}
                      alt={project.projectName}
                      fill
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500" />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-green-100 text-green-700 font-semibold text-xs px-2 py-0.5 rounded-full shadow-sm">Recommended</Badge>
                      <span className="text-gray-500 text-xs truncate">{project.projectOwner}</span>
                    </div>
                    <h4 className="font-semibold text-md mb-1 truncate hover:text-purple-700" onClick={e => {e.stopPropagation(); router.push(`/startup/detail/${project.id}`)}}>{project.projectName}</h4>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <Calendar size={14} />
                      <span>{project.daysLeft} days left</span>
                      <span>•</span>
                      <span>{project.fundingProgress}% funded</span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Badge variant="outline" className="text-xs">{project.category}</Badge>
                      <Badge variant="outline" className="text-xs">{project.location}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 items-center">
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors ${page === 1 ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"}`}
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              {/* Show up to 3 page numbers centered on current page */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p =>
                  totalPages <= 3 ||
                  (page <= 2 && p <= 3) ||
                  (page >= totalPages - 1 && p >= totalPages - 2) ||
                  (p >= page - 1 && p <= page + 1)
                )
                .map(p => (
                  <button
                    key={p}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors ${page === p ? "bg-purple-600 text-white border-purple-600" : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
              <button
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border transition-colors ${page === totalPages ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"}`}
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        {/* Explore More Button below all cards */}
        <div className="flex justify-center mt-12">
          <Button
            className="px-8 py-3 text-lg bg-purple-600 text-white hover:bg-purple-700 font-semibold rounded-lg shadow-lg"
            onClick={() => router.push('/startup')}
          >
            Explore More
          </Button>
        </div>
      </div>
    </section>
  );
} 
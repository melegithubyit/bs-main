"use client";
import { mockProjects, StartupProject } from "./mockProjects";
import placeholderimg from "@/public/placeholder.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FeaturedStartups() {
  const featured = mockProjects.slice(0, 4);
  const router = useRouter();

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Featured <span className="text-purple-600">Startups</span>
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Discover and support innovative projects, Click a card to learn more and help them grow!
        </p>
        {featured.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No featured startups yet.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map((project: StartupProject, idx: number) => (
                <div
                  key={project.id}
                  className="relative bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-purple-400 transition-colors p-6 flex flex-col items-center group cursor-pointer min-h-[380px]"
                  onClick={() => router.push(`/startup/detail/${project.id}`)}
                >
                  <Badge className="absolute top-4 left-4 bg-purple-100 text-purple-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                    Featured
                  </Badge>
                  <img
                    src={project.companyLogo.src}
                    alt={project.projectName}
                    className="w-20 h-20 object-cover rounded-full border-4 border-purple-100 mb-4 shadow"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center group-hover:text-purple-700 transition-colors">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-center line-clamp-3">
                    {project.projectDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    <Badge className="bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded">
                      {project.typeOfSupport}
                    </Badge>
                    {project.category && (
                      <Badge variant="outline" className="border-purple-200 text-purple-600">
                        {project.category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-gray-400">Goal:</span>
                    <span className="font-semibold text-purple-700 text-lg">ETB {project.goalFund.toLocaleString()}</span>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full bg-purple-600 text-white hover:bg-purple-700 font-semibold rounded-lg mt-auto"
                    onClick={e => { e.stopPropagation(); router.push(`/startup/detail/${project.id}`); }}
                  >
                    See More
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10">
              <Button
                variant="outline"
                className="px-8 py-3 text-lg border-purple-200 text-purple-700 hover:bg-purple-50 font-semibold"
                onClick={() => router.push('/startup')}
              >
                Explore More
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
} 
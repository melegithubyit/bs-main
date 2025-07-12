"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Heart,
  ExternalLink,
  MessageSquare,
  Lock,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { StartupProject } from "@/components/startup-comp/project-card";
import placeholderimg from "@/public/placeholder.png";
import { useRouter, useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { mockProjects } from "@/components/startup-comp/mockProjects";

export default function StartupDetailPage() {
  const params = useParams();
  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;
  const [project, setProject] = useState<StartupProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const userComment = {
      id: Date.now().toString(),
      author: "Anonymous",
      avatar: "",
      content: newComment,
      date: "Just now",
      isBacker: true,
    };

    setComments([...comments, userComment]);
    setNewComment("");
  };
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        // Debug log
        console.log("id:", id);
        console.log(
          "mockProjects ids:",
          mockProjects.map((p) => p.id)
        );
        // In a real app, you would fetch from an API
        const foundProject = mockProjects.find((p) => p.id === id);

        if (foundProject) {
          setProject(foundProject);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Get support type badge color
  const getSupportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "funding":
        return "bg-green-100 text-green-800";
      case "mentorship":
        return "bg-blue-100 text-blue-800";
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "partnership":
        return "bg-blue-100 text-blue-800";
      case "investment":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  const handleBack = () => {
    router.push("/startup/projects");
  };
  if (!project) {
    return (
      <div className="min-h-screen pt-0 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-600 mb-6">
            The project you are looking for does not exist.
          </p>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleBack}
          >
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-0 pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Back to Projects button at the top left */}
        <div className="mb-6 flex items-center">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2"
            onClick={handleBack}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </div>
        {/* Project Header: Logo, Name, Description */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-blue-100 shadow">
            <Image
              src={project.companyLogo}
              alt={project.projectName}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{project.projectName}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mb-2">
            {project.projectDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Project Video or Image */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center">
            <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {project.videoLink ? (
                <iframe
                  src={project.videoLink.replace("watch?v=", "embed/")}
                  className="w-full h-full min-h-[300px]"
                  allowFullScreen
                />
              ) : (
                <Image
                  src={project.companyLogo}
                  alt={project.projectName}
                  width={480}
                  height={320}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>

          {/* Right: Funding Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-blue-100 text-blue-700 font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
                  {project.typeOfSupport}
                </Badge>
                {project.category && (
                  <Badge
                    variant="outline"
                    className="border-blue-200 text-blue-600"
                  >
                    {project.category}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="border-gray-200 text-gray-600"
                >
                  {project.location}
                </Badge>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">
                  ETB {project.goalFund.toLocaleString()} goal
                </span>
                <span className="text-sm font-medium">
                  {project.fundingProgress || 0}% Funded
                </span>
              </div>
              <Progress value={project.fundingProgress || 0} className="h-3" />
            </div>
            <div className="flex items-center gap-8 text-lg font-semibold mb-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-700">
                  {project.backers ?? 0}
                </span>
                <span className="text-xs text-gray-500">Backers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-700">
                  {project.daysLeft ?? 0}
                </span>
                <span className="text-xs text-gray-500">Days To Go</span>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-4 font-bold mb-4">
              Support This Project
            </Button>
            {/* Share and Like Buttons */}
            <div className="flex gap-4 items-center justify-between mt-2 w-full">
              <Button
                variant="ghost"
                aria-label="Like"
                className="flex items-center gap-2 text-red-500 hover:bg-red-100 transition"
              >
                <Heart size={22} /> Like
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <ExternalLink size={20} />
                Share Link
              </Button>
            </div>
          </div>
        </div>
        {/* Comments Section */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="text-blue-500" size={20} />
            Community Discussion
          </h2>
          {/* Comments List */}
          <div className="space-y-6 mb-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="flex-shrink-0">
                    {comment.avatar ? (
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {comment.author.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{comment.author}</p>
                      {comment.isBacker && (
                        <Badge variant="outline" className="text-xs">
                          Backer
                        </Badge>
                      )}
                      <span className="text-sm text-gray-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
          {/* Add Comment Box (now below comments) */}
          <div className="mb-6">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this project..."
              className="mb-3"
            />
            <Button
              onClick={handleAddComment}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

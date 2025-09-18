"use client"
import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation";
import Data from "@/components/dashboard/addPageComponents/Data";
import KeyInformation from "@/components/dashboard/addPageComponents/KeyInformation";
import Facts from "@/components/dashboard/addPageComponents/Facts";
import Articles from "@/components/dashboard/addPageComponents/Articles";
import ImagesSwiper from "@/components/dashboard/addPageComponents/ImagesSwiper";
import { Project } from "@/app/(main)/types/project";

export default function EditProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const params = useParams();

  // 1️⃣ Load projects from JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/projects.json");
        const json = await res.json();
        setProjects(json);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  // 2️⃣ Find current project by id
  const project = projects.find(p => String(p.data.id) === params.id);

  if (!project) return <div className="ml-20 p-4">Loading project...</div>;

  // 3️⃣ Update project inside projects array
  const updateProject: React.Dispatch<React.SetStateAction<Project>> = (value) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.data.id === project.data.id) {
          return typeof value === "function" ? value(p) : value;
        }
        return p;
      })
    );
  };

  // 4️⃣ Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(project); // هذا المشروع بعد التعديل
    // هنا ممكن تبعت بيانات المشروع للسيرفر (PUT / PATCH)
  };

  return (
    <div className="ml-20 p-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Edit Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full flex items-start justify-between gap-4">
          <Data project={project} setProject={updateProject} />
          <div className="w-6/12 h-full flex flex-col gap-4">
            <ImagesSwiper project={project} setProject={updateProject} />
            <KeyInformation project={project} setProject={updateProject} />
          </div>
        </div>

        <Facts project={project} setProject={updateProject} />
        <Articles project={project} setProject={updateProject} />

        <button
          type="submit"
          className="px-4 w-16 py-2 bg-blue-600 text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save
        </button>
      </form>
    </div>
  );
}

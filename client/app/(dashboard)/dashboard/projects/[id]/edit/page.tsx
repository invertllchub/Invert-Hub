"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import EditProjectForm from "@/components/dashboard/projectsComponents/EditProjectForm";
import { Project } from "@/types/project";

export default function EditProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const params = useParams();

  const fetchData = async () => {
    try {
      const res = await fetch("/projects.json");
      const json = await res.json();
      setProjects(json);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const project = projects.find((p) => String(p.id) === params.id);

  if (!project) return <div className="ml-20 p-4">Loading project...</div>;

  return (
    <div className="pl-0 md:pl-30 pr-0 md:pr-15 py-10 overflow-hidden bg-gray-200/75">
      <div className="w-full flex md:flex-row items-center justify-between gap-6 p-6 md:p-12">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">Edit Project</h1>
        <button
          form="edit-project-form"
          type="submit"
          className="px-4 w-42 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
      <div >
        <EditProjectForm project={project}  />
      </div>
    </div>
  );
}

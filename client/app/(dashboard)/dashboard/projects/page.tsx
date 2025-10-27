"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import ToolBar from "@/components/dashboard/ToolBar";
import DeleteBtn from "@/components/dashboard/DeleteBtn";
import UpdateBtn from "@/components/dashboard/UpdateBtn";
import { Project } from "@/types/project";

function ProjectsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://localhost:7253/api/Projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { allSelected, someSelected } = useMemo(() => {
    const all = selected.length === projects.length && projects.length > 0;
    const some = selected.length > 0 && !all;
    return { allSelected: all, someSelected: some };
  }, [selected, projects]);


  useEffect(() => {
    if (headerCheckboxRef.current)
      headerCheckboxRef.current.indeterminate = someSelected;
  }, [someSelected]);

  const toggleAll = () => {
    setSelected(allSelected ? [] : projects.map((p) => p.id));
  };

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDeleteOne = (id: string) => {
    setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
    setSelected((prev) => prev.filter((x) => String(x) !== String(id))); 
  };

  const handleDeleteAll = () => {
    setProjects((prev) => prev.filter((p) => !selected.includes(p.id)));
    setSelected([]);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-200/75 pl-0 md:pl-30 pr-0 md:pr-15 pb-20 md:pb-10 pt-5 md:pt-10 overflow-hidden">
      <ToolBar
      title="Projects"
      allSelected={allSelected}
      someSelected={someSelected}
      setSearchValue={setSearchValue}
      >
        <DeleteBtn selectedIds={selected} onDeleted={handleDeleteAll} page={'projects'}/>
      </ToolBar>

      {/* 🖥️ TABLE VIEW (Desktop) */}
      <div className="hidden md:block w-full mt-8 rounded-lg bg-white p-12 shadow-sm overflow-x-auto">
        <div className="grid grid-cols-[50px_1fr_200px] gap-8 mb-3 font-semibold text-gray-700 border-b pb-2">
          <div className="flex justify-center">
            <input
              type="checkbox"
              ref={headerCheckboxRef}
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 cursor-pointer accent-blue-700"
            />
          </div>
          <div>Name</div>
          <div className="text-center">Actions</div>
        </div>

        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`grid grid-cols-[50px_1fr_200px] gap-8 py-3 border-b text-gray-600 hover:bg-gray-50 transition-all duration-150 ${
              selected.includes(project.id) ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={selected.includes(project.id)}
                onChange={() => toggleOne(project.id)}
                className="w-4 h-4 cursor-pointer accent-blue-700"
              />
            </div>
            <div className="flex items-center font-medium">{project.title}</div>
            <div className="flex justify-center gap-4">
              <DeleteBtn page={'projects'} id={project.id} onDeleted={() => handleDeleteOne(project.id)} />
              <UpdateBtn page="projects" id={project.id} />
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-10">No projects found.</div>
        )}
      </div>

      {/* 📱 CARD VIEW (Mobile) */}
      <div className="block md:hidden mt-6 space-y-4 p-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`relative bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 ${
              selected.includes(project.id) ? "border-blue-500" : "border-gray-200"
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selected.includes(project.id)}
              onChange={() => toggleOne(project.id)}
              className="absolute top-4 left-4 w-4 h-4 accent-blue-700 cursor-pointer"
            />

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 pl-6 mb-2">
              {project.title}
            </h3>

            {/* Optional Description */}
            {project.description && (
              <p className="text-sm text-gray-500 pl-6 mb-4 line-clamp-2">
                {project.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <DeleteBtn page={'projects'} id={project.id} onDeleted={() => handleDeleteOne(project.id)} />
              <UpdateBtn page="projects" id={project.id} />
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 py-10">No projects found.</div>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;

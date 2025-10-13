"use client";
import React from "react";
import AddProjectForm from "@/components/dashboard/projectsComponents/AddProjectForm";


export default function AddProjectPage() {

  return (
    <div className="pl-30 pr-15 py-10 bg-gray-200/75 overflow-hidden">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">
            ADD YOUR PROJECT
          </h1>
          <button
            form="add-project-form"
            type="submit"
            className="px-6 w-20 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg col-start-1 cursor-pointer"
          >
            Save
          </button>
        </div>

        <div className="w-full flex items-start justify-between gap-4">
          <AddProjectForm />
        </div>
    </div>
  );
}

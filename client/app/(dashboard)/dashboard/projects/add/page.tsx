"use client"
import React, { useState } from "react"
import Data from "@/components/dashboard/addPageComponents/Data";
import KeyInformation from "@/components/dashboard/addPageComponents/KeyInformation";
import Facts from "@/components/dashboard/addPageComponents/Facts";
import { Project } from "@/app/(main)/types/project";
import Articles from "@/components/dashboard/addPageComponents/Articles";
import ImagesSwiper from "@/components/dashboard/addPageComponents/ImagesSwiper";

export default function AddProjectPage() {
const [project, setProject] = useState<Project>({
  data: {
    id: 0,
    title: "",
    slug: "",
    date: "",
    description: "",
    img: "",
    animatedText: "",
    overview: "",
  },
  keyInformation: [
    { label: "client", value: "" },
    { label: "status", value: "" },
    { label: "location", value: "" },
    { label: "sectors", value: [] },
    { label: "services", value: [] },
    { label: "programmes", value: [] },
  ],
  images: [],
  facts: [
    {
      id: 1,
      type: "text",
      value: { number: 0, label: "K" },
      text: "",
    },
    {
      id: 2,
      type: "text",
      value: { number: 0, label: "K" },
      text: "",
    },
    {
      id: 3,
      type: "image",
      value: { number: 0, label: "img" }, 
      text: "", 
      img: "",
    },
    {
      id: 4,
      type: "text",
      value: { number: 0, label: "K" },
      text: "",
    }
  ],
  articles: [
    {
      title: "",
      content: "",
      type: "",
      media: ""
    },
  ],
})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    
  const cleanedProject = {
    ...project,
    articles: project.articles.filter(
      (a) => a.type !== "" || a.content.trim() !== "" || a.media !== ""
    ),
  }
    console.log(cleanedProject)
    // هنا المفروض تبعت للسيرفر (API POST)
  }


  return (
    <div className="pl-30 pr-15 py-10 overflow-hidden">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-gray-800">ADD YOUR PROJECT</h1>
        <button
          type="submit"
          className="px-6 w-20 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save
        </button>
      </div>
      <form onSubmit={handleSubmit}>

      <div className="w-full flex items-start justify-between gap-4">
        <Data project={project} setProject={setProject} />
        <div className="w-6/12 h-full flex flex-col gap-4">
          <ImagesSwiper project={project} setProject={setProject}/>
          <KeyInformation project={project} setProject={setProject} />
        </div>
      </div>
      <Facts project={project} setProject={setProject} />
      <Articles project={project} setProject={setProject} />

      </form>
    </div>
  )
}


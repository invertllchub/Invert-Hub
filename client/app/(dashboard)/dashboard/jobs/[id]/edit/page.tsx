"use client";
import EditJobForm from "@/components/dashboard/jobsComponents/EditjobForm";
import { Job } from "@/types/jobs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const params = useParams();

  const fetchData = async () => {
    try {
      const res = await fetch("/jobs.json");
      const json: Job[] = await res.json();
      setJobs(json);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const job = jobs.find((j) => String(j.id) === params.id);

  if (!job) {
    return <p className="p-6">Loading job data...</p>;
  }

  return (
    <div className="pl-30 pr-15 py-10 overflow-hidden bg-gray-200/75">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">Edit Job</h1>
        <button
          form="edit-job-form"
          type="submit"
          className="px-4 w-16 py-2 bg-blue-600 text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save
        </button>
      </div>
      <div>
        <EditJobForm job={job} />
      </div>
    </div>
  );
}

export default Page;

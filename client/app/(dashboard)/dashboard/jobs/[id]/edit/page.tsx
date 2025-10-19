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
    <div className="pl-0 md:pl-30 pr-0 md:pr-15 py-10 overflow-hidden bg-gray-200/75">
      <div className="w-full flex md:flex-row items-center justify-between gap-6 p-6 md:p-12">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">Edit Job</h1>
        <button
          form="edit-job-form"
          type="submit"
          className="px-4 w-42 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg col-start-1 cursor-pointer"
        >
          Save Changes
        </button>
      </div>
      <div className="mb-10">
        <EditJobForm job={job} />
      </div>
    </div>
  );
}

export default Page;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Job } from "../../../types/jobs";
import Link from "next/link";

function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/jobs.json");
      const json = await res.json();
      setJobs(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-[90vh] md:h-[100vh]">
        <Link href="/" aria-label="Home">
          <div className="absolute top-5 left-5 w-[120px] h-[40px] sm:w-[170px] sm:h-[60px] z-10">
            <Image
              src="https://res.cloudinary.com/dntdescqh/image/upload/v1755689582/logo_dppoxr.png"
              alt="Invert-Hub Logo"
              priority
              fill
              className="object-contain origin-left cursor-pointer transition-transform duration-[800ms] hover:[transform:scale(1.3)]"
            />
          </div>
        </Link>

        <Image
          alt="jobs picture"
          src="https://res.cloudinary.com/dyfregti9/image/upload/v1758050567/Ourservices_Sec1_02_avnr2t.png"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
          <h1 className="w-8/12 text-center text-3xl md:text-6xl font-bold text-white drop-shadow-lg">
            Your Next Step Starts Here:
            <br /> Create, Collaborate, Innovate
          </h1>
        </div>
      </div>

      <div className="w-full flex flex-col items-center my-20 px-4 sm:px-10">
        <h1 className="text-3xl md:text-5xl font-semibold mb-10 text-center">
          Open Positions
        </h1>

        {/* Desktop Table */}
        <div className="w-full hidden md:block">
          <div className="w-10/12 mx-auto rounded-lg p-8">
            <div className="grid grid-cols-5 gap-8 mb-3 font-semibold text-gray-800">
              <div>Title</div>
              <div>Location</div>
              <div>Employment Type</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            <hr />
            {jobs.map((job, i) => (
              <div
                key={i}
                className="grid grid-cols-5 gap-8 py-3 border-b last:border-b-0 text-gray-600"
              >
                <div className="flex items-center">{job.title}</div>
                <div className="flex items-center">{job.location}</div>
                <div className="flex items-center">{job.employmentType}</div>
                <div className="flex items-center">{job.status}</div>
                <div className="flex items-center">
                  <Link
                    href={
                      job?.status === "Not Available" ? "#" : `/jobs/${job.id}`
                    }
                    onClick={(e) => {
                      if (job?.status === "Not Available") {
                        e.preventDefault();
                      }
                    }}
                    className={`py-2 px-4 rounded-md shadow-md text-white font-bold text-lg
                    ${
                      job?.status === "Not Available"
                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                        : "bg-black hover:bg-gray-900"
                    }
                  `}
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="w-full flex flex-col gap-4 md:hidden">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-md mx-auto"
            >
              <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
              <p className="text-gray-600">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-600">
                <strong>Employment Type:</strong> {job.employmentType}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {job.status}
              </p>
              <Link
                href={job?.status === "Not Available" ? "#" : `/jobs/${job.id}`}
                onClick={(e) =>
                  job?.status === "Not Available" && e.preventDefault()
                }
                className={`mt-2 inline-block py-2 px-4 rounded-md shadow-md text-white font-bold
                  ${
                    job?.status === "Not Available"
                      ? "bg-gray-400 cursor-not-allowed opacity-70"
                      : "bg-black hover:bg-gray-900"
                  }`}
              >
                View Job
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;

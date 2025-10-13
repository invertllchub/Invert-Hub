"use client";
import React, { useEffect, useState } from "react";
import { Job } from "@/types/jobs";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Hourglass, MapPin, Calendar, Clock } from "lucide-react";
import JobApplication from "@/components/jobs/JobApplication";
import JobDetails from "@/components/jobs/JobDetails";

function Page() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const params = useParams();

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

  const job = jobs.find((j) => String(j.id) === params.id);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh]">
        {/* Logo */}
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

        {/* Panner */}
        <Image
          alt="jobs picture"
          src="https://res.cloudinary.com/dyfregti9/image/upload/v1758050776/Home-Sec2_invertstudios_p72g4j.png"
          fill
          priority
          className="object-cover"
        />

        <div
          className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm
                bg-white/10 border border-white/30 shadow-lg text-white"
        >
          <h1 className="w-7/12 text-start mx-auto text-3xl md:text-5xl font-bold drop-shadow-lg">
            {job?.title} - {job?.location}
          </h1>
          <div className="w-7/12 mx-auto mt-5 flex flex-col md:flex-row items-start gap-6">
            <p className="flex gap-2">
              <Hourglass size={20} /> {job?.employmentType}
            </p>
            <p className="flex gap-2">
              <MapPin size={20} /> {job?.location}
            </p>
            <p className="flex gap-2">
              <Calendar size={20} /> {job?.datePosted}
            </p>
            <p className="flex gap-2">
              <Clock size={20} /> {job?.closingDate}
            </p>
          </div>
          <div className="w-7/12 mx-auto mt-10">
            <p className="text-md md:text-xl font-semibold">
              We are currently looking for an Advanced {job?.title} to join us.
            </p>
          </div>
        </div>
      </div>

      <div className="py-4 mb-2">
        <div className="w-full md:w-9/12 flex items-center justify-center md:justify-normal  gap-4 mx-auto">
          <button onClick={() => setShowForm(false)}>
            <p
              className={`text-lg font-semibold cursor-pointer p-4
                            ${!showForm ? "border-b-2" : ""}`}
            >
              Job details
            </p>
          </button>
          <button
            onClick={() => setShowForm(true)}
            className={`p-4 font-bold text-lg text-center cursor-pointer 
                        ${
                          showForm
                            ? "rounded-none shadow-none bg-transparent text-black border-b-2"
                            : "rounded-md shadow-md bg-black text-white hover:bg-gray-800 transition"
                        }
                        `}
          >
            {!showForm ? "Apply" : "Application"}
          </button>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-gray-600" />
      </div>

      {/* Conditional UI */}
      {job ? (
        showForm ? (
          <JobApplication job={job} />
        ) : (
          <JobDetails job={job} setShowForm={setShowForm} />
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;

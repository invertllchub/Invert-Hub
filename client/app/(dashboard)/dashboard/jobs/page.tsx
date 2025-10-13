"use client";
import React, { useState, useEffect, useRef } from "react";
import ToolBar from "@/components/dashboard/ToolBar";
import type { Job } from "@/types/jobs";
import DeleteBtn from "@/components/dashboard/DeleteBtn";
import UpdateBtn from "@/components/dashboard/UpdateBtn";

function JobsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  // ✅ Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/jobs.json");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Selection logic
  const allSelected = selected.length === jobs.length && jobs.length > 0;
  const someSelected = selected.length > 0 && !allSelected;

  useEffect(() => {
    if (headerCheckboxRef.current)
      headerCheckboxRef.current.indeterminate = someSelected;
  }, [someSelected]);

  const toggleAll = () => {
    setSelected(allSelected ? [] : jobs.map((p) => String(p.id)));
  };

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDeleteOne = (id: string) => {
    setJobs((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteAll = () => {
    setJobs((prev) => prev.filter((p) => !selected.includes(p.id)));
    setSelected([]);
  };

  const filteredJobs = jobs.filter((job) => {
    const search = searchValue.toLowerCase();
    return (
      job.title.toLowerCase().includes(search) ||
      job.employmentType.toLowerCase().includes(search) ||
      job.datePosted.toLowerCase().includes(search)
    );
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gray-200/75 pl-30 pr-15 py-10">
      <ToolBar
      title="Projects"
      allSelected={allSelected}
      someSelected={someSelected}
      setSearchValue={setSearchValue}
      >
        <DeleteBtn selectedIds={selected} onDeleted={handleDeleteAll} page={'jobs'}/>
      </ToolBar>

      {/* 🖥️ TABLE VIEW (Desktop) */}
      <div className="hidden md:block w-full mt-8 rounded-lg bg-white p-8 shadow-sm overflow-x-auto">
        <div className="grid grid-cols-[50px_1fr_150px_150px_150px_150px] gap-8 mb-3 font-semibold text-gray-700 border-b pb-2">
          <div className="flex justify-center">
            <input
              type="checkbox"
              ref={headerCheckboxRef}
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 cursor-pointer accent-blue-700"
            />
          </div>
          <div>Title</div>
          <div>Employment Type</div>
          <div>Date Posted</div>
          <div>Closing Date</div>
          <div className="text-center">Actions</div>
        </div>

        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className={`grid grid-cols-[50px_1fr_150px_150px_150px_150px] gap-8 py-3 border-b text-gray-600 hover:bg-gray-50 transition-all duration-150 ${
              selected.includes(job.id) ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={selected.includes(job.id)}
                onChange={() => toggleOne(job.id)}
                className="w-4 h-4 cursor-pointer accent-blue-700"
              />
            </div>
            <div className="flex items-center font-medium">{job.title}</div>
            <div className="flex items-center">{job.employmentType}</div>
            <div className="flex items-center">{job.datePosted}</div>
            <div className="flex items-center">{job.closingDate}</div>
            <div className="flex justify-center gap-4">
              <DeleteBtn page={'jobs'} id={job.id} onDeleted={() => handleDeleteOne(job.id)} />
              <UpdateBtn page="jobs" id={job.id} />
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No jobs found.
          </div>
        )}
      </div>

      {/* 📱 CARD VIEW (Mobile) */}
      <div className="block md:hidden mt-6 space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className={`relative bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 ${
              selected.includes(job.id)
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selected.includes(job.id)}
              onChange={() => toggleOne(job.id)}
              className="absolute top-4 left-4 w-4 h-4 accent-blue-700 cursor-pointer"
            />

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 pl-6 mb-2">
              {job.title}
            </h3>

            <p className="text-sm text-gray-600 pl-6">
              <span className="font-medium">Type:</span> {job.employmentType}
            </p>
            <p className="text-sm text-gray-600 pl-6">
              <span className="font-medium">Posted:</span> {job.datePosted}
            </p>
            <p className="text-sm text-gray-600 pl-6 mb-4">
              <span className="font-medium">Closing:</span> {job.closingDate}
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <DeleteBtn page={'jobs'} id={job.id} onDeleted={() => handleDeleteOne(job.id)} />
              <UpdateBtn page="jobs" id={job.id} />
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center text-gray-500 py-10">No jobs found.</div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;

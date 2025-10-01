"use client";
import React, { useState } from "react";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    employmentType: "",
    experienceLevel: "",
    salary: "",
    status: "",
    datePosted: "",
    closingDate: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    const jobData = {
        ...formData,
        requirements: parseMultilineText(formData.requirements),
        benefits: parseMultilineText(formData.benefits),
    };

        console.log("Job Data:", jobData);
        alert("Job Submitted ✅");
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col"
        >
            <div className="w-full flex items-start gap-6 mt-10">
                <div className="w-1/2 flex flex-col gap-8">
                    <div>
                        <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1">Location</label>
                        <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="border p-3 rounded-lg w-full"
                        />
                    </div>
                    <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    required
                    className="border p-3 rounded-lg"
                    >
                        <option value="">Select Employment Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                    </select>

                    <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                    className="border p-3 rounded-lg"
                    >
                        <option value="">Select Experience Level</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid-level">Mid-level</option>
                        <option value="Senior">Senior</option>
                    </select>

                    <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    className="border p-3 rounded-lg"
                    />

                    <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="border p-3 rounded-lg"
                    >
                        <option value="">Select Status</option>
                        <option value="open">Open</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                    </select>

                    <div className="flex-1">
                        <label className="block text-gray-600 mb-1">Date Posted</label>
                        <input
                        type="date"
                        name="datePosted"
                        value={formData.datePosted}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-600 mb-1">Closing Date</label>
                        <input
                        type="date"
                        name="closingDate"
                        value={formData.closingDate}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full"
                        />
                    </div>
                </div>


                <div className="w-1/2 flex flex-col gap-8">

                    {/* Description */}
                    <div>
                        <textarea
                        name="description"
                        placeholder="Job Description"
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-3 rounded-lg w-full"
                        />
                    </div>

                    {/* Requirements */}
                    <div>
                        <label className="block text-gray-600 mb-1">
                            Requirements (one per line)
                        </label>
                        <textarea
                        name="requirements"
                        rows={7}
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder={"e.g.\n3+ years experience with React\nKnowledge of Tailwind CSS"}
                        className="border p-3 rounded-lg w-full"
                        />
                    </div>

                    {/* Benefits */}
                    <div>
                        <label className="block text-gray-600 mb-1">
                            Benefits (one per line)
                        </label>
                        <textarea
                        name="benefits"
                        rows={7}
                        value={formData.benefits}
                        onChange={handleChange}
                        placeholder={"e.g.\nHealth insurance\nRemote work flexibility"}
                        className="border p-3 rounded-lg w-full"
                        />
                    </div>
                </div>
            </div>
    </form>
);
}

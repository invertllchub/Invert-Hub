"use client";
import React from "react";
import { Job } from "@/types/jobs";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from "@/components/schemas/EditJobSchema";
import { EditJobSchema } from "@/components/schemas/EditJobSchema";
// Toast
import { showToast } from "@/components/jobs/Toast";
// Functions
import { parseMultilineText } from "@/utils/ParseMultilineText";

type JobProps = {
  job: Job;
};

export default function EditJobForm({ job }: JobProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(EditJobSchema),
    defaultValues: {
      title: job.title,
      location: job.location,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      salary: job.salary,
      status: job.status,
      datePosted: job.datePosted,
      closingDate: job.closingDate,
      description: job.description,
      requirements: (job.requirements || []).join("\n"),
      benefits: (job.benefits || []).join("\n"),
    } as any,
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const toastId = showToast("loading", {
      message: "Editing Job Application",
    });

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("location", data.location);
      formData.append("employmentType", data.employmentType);
      formData.append("experienceLevel", data.experienceLevel);
      formData.append("salary", String(data.salary));
      formData.append("status", data.status);
      formData.append("datePosted", data.datePosted);
      formData.append("closingDate", data.closingDate);
      formData.append("description", data.description);
      const requirementsArray = parseMultilineText(data.requirements || "");
      const benefitsArray = parseMultilineText(data.benefits || "");


      formData.append("requirements", JSON.stringify(requirementsArray));
      formData.append("benefits", JSON.stringify(benefitsArray));


                  for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

      const response = await fetch("", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showToast("success", {
          message: "Application submitted successfully!",
          toastId,
        });
        reset();
      } else {
        showToast("error", {
          message: "Something went wrong. Please try again.",
          toastId,
        });
      }
    } catch (error) {
      console.error(error);
      showToast("error", {
        message: "Failed to submit the application, please try again later.",
        toastId,
      });
    }
  };

  return (
    <form id="edit-job-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col md:flex-row items-start gap-6 p-6 md:p-12">
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div>
            <label className="block text-gray-600 mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Job Title"
              {...register("title")}
              className="border p-3 rounded-lg w-full"
            />
            {errors.title && (
              <div className="text-red-500">
                {errors.title.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Location</label>
            <input
              type="text"
              placeholder="Location"
              {...register("location")}
              className="border p-3 rounded-lg w-full"
            />
            {errors.location && (
              <div className="text-red-500">
                {errors.location.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Employment Type</label>
            <select
              {...register("employmentType")}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Select Employment Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Full-Time / Part-Time">Full-Time / Part-Time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.employmentType && (
              <div className="text-red-500">
                {errors.employmentType.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Experience Level</label>
            <select
              {...register("experienceLevel")}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Select Experience Level</option>
              <option value="Entry-level">Entry-level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
            </select>
            {errors.experienceLevel && (
              <div className="text-red-500">
                {errors.experienceLevel.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Salary</label>
            <input
              type="text"
              placeholder="Salary"
              {...register("salary")}
              className="border p-3 rounded-lg w-full"
            />
            {errors.salary && (
              <div className="text-red-500">
                {errors.salary.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Status</label>
            <select
              {...register("status")}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            {errors.status && (
              <div className="text-red-500">
                {errors.status.message?.toString()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Date Posted</label>
            <input
              type="date"
              {...register("datePosted")}
              className="border p-3 rounded-lg w-full"
            />
            {errors.datePosted && (
              <div className="text-red-500">
                {errors.datePosted.message?.toString()}
              </div>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Closing Date</label>
            <input
              type="date"
              {...register("closingDate")}
              className="border p-3 rounded-lg w-full"
            />
            {errors.closingDate && (
              <div className="text-red-500">
                {errors.closingDate.message?.toString()}
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <textarea
              placeholder="Job Description"
              rows={6}
              {...register("description")}
              className="border p-3 rounded-lg w-full"
            />
            {errors.description && (
              <div className="text-red-500">
                {errors.description.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Requirements (one per line)
            </label>
            <textarea
              rows={7}
              {...register("requirements")}
              placeholder={
                "e.g.\n3+ years experience with React\nKnowledge of Tailwind CSS"
              }
              className="border p-3 rounded-lg w-full"
            />
            {errors.requirements && (
              <div className="text-red-500">
                {errors.requirements.message?.toString()}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Benefits (one per line)
            </label>
            <textarea
              rows={7}
              {...register("benefits")}
              placeholder={"e.g.\nHealth insurance\nRemote work flexibility"}
              className="border p-3 rounded-lg w-full"
            />
            {errors.benefits && (
              <div className="text-red-500">
                {errors.benefits.message?.toString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

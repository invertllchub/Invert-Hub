import React, { useState } from "react";
// React-hook-form and validation with Zod
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProjectSchema } from "@/components/schemas/EditProjectSchema";
import { FormFields } from "@/components/schemas/AddProjectSchema";
// Toast
import { showToast } from "@/components/jobs/Toast";
// Cloudinary function
import { uploadToCloudinary } from "@/utils/CloudinaryUpload";
import { Project } from "@/types/project";
//
type ProjectProp = {
    project: Project;
};

function EditProjectForm({project}: ProjectProp) {
  const [preview, setPreview] = useState<string>(project.img || "");
  const [file, setFile] = useState<File | null>(null); 

  const handleFileChange = (newFile: File) => {
    setFile(newFile);
    setPreview(URL.createObjectURL(newFile));
  };


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      projectName: project.title,
      projectDescription: project.description,
      projectLink: project.link
    }
  });

  
  const onSubmit: SubmitHandler<FormFields> = async (data) => {

    const toastId = showToast("loading", {
      message: "Editing Project Application...",
    });

    let uploadedImageUrl = preview; 

    if (file) {
      uploadedImageUrl = await uploadToCloudinary(file); 
    }

    try {
      const payload = {
        ...data,
        projectImage: uploadedImageUrl
      };
      
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        showToast("success", {
          message: "Application submitted successfully!",
          toastId,
        });
        reset();
        setPreview("");
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
    <form
    id="edit-project-form"
    onSubmit={handleSubmit(onSubmit)}
    >
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-12">

      <div className="w-full">
        <label className="block mb-1 font-medium">Project Name</label>
        <input
          type="text"
          placeholder="Project Title"
          { ...register("projectName")}
          required
          className="border p-3 rounded-lg w-full"
        />
        {errors.projectName && (
          <div className="text-red-500">
            {errors.projectName.message?.toString()}
          </div>
        )}
      </div>

      <div className="w-full">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          placeholder="Project Description"
          { ...register("projectDescription")}
          required
          className="border p-3 rounded-lg w-full h-28"
        />
        {errors.projectDescription && (
          <div className="text-red-500">
            {errors.projectDescription.message?.toString()}
          </div>
        )}
      </div>


      <div className="w-full">
        <label className="block mb-1 font-medium">Project Image</label>
        <div
        className="relative border-2 border-dashed rounded-md p-4 text-center cursor-pointer 
        min-h-[200px] flex items-center justify-center"
        onClick={() => document.getElementById("fileInput")?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) {
            handleFileChange(file);
          }
        }}
        >
          {!preview ? (
            <p>Drag & drop image here or click to upload</p>
          ) : (
            <>
              <img src={preview} className="w-full h-full object-cover rounded-md" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview("");
                }}
                type="button"
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex 
                items-center justify-center opacity-100 hover:opacity-90 transition cursor-pointer z-10"
              >
                ✕
              </button>
            </>
          )}

          <input
          type="file"
          accept="image/*"
          id="fileInput"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileChange(file);
            }
          }}
          />
        </div>
          {errors.projectImage && (
            <div className="text-red-500">
              {errors.projectImage.message?.toString()}
            </div>
          )}
      </div>

      <div className="w-full">
        <label className="block mb-1 font-medium">Project Link</label>
        <input
          type="text"
          placeholder="https://example.com"
          { ...register("projectLink")}
          className="border p-3 rounded-lg w-full"
        />
        {errors.projectLink && (
          <div className="text-red-500">
            {errors.projectLink.message?.toString()}
          </div>
        )}
      </div>
  
    </div>
    </form>
  );
}

export default EditProjectForm;

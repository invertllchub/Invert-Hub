import React from 'react'
import { Job } from '@/app/(main)/types/jobs'
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FormFields } from './schemas/JobApplySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schemas/JobApplySchema';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { uploadToCloudinary } from '@/utils/CloudinaryUpload';


type JobProps = {
    job: Job
}

function JobApplication({job}: JobProps) {
    const { 
        register, 
        handleSubmit,
        setError,
        control,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });



const onSubmit: SubmitHandler<FormFields> = async (data) => {
  try {
    let cvUrl = "";

    // ✅ استخرج الملف الأول
    const file = (data.CV as FileList)[0]; // الملف اللي هنرفعه
    console.log("File to upload:", file);
    if (file) {
      console.log("Uploading CV to Cloudinary...");
      cvUrl = await uploadToCloudinary(file); // ⬅️ هنا لازم نستنى
      console.log("CV uploaded:", cvUrl);
    }

    // ✅ بعد ما يخلص، جهز بيانات Web3Forms
    const formData = new FormData();
    formData.append("access_key", "ded1253b-03e7-4112-a8fb-38f556c9bd59");
    formData.append("FullName", data.fullName);
    formData.append("Gender", data.gender);
    formData.append("Email", data.email);
    formData.append("PhoneNumber", data.phoneNumber);
    formData.append("JobTitle", data.jobTitle);
    formData.append("CoverLetter", data.coverLetter);

    if (cvUrl) {
        formData.append("CVLink", cvUrl); 
    }

    console.log("Submitting form to Web3Forms...");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log("Web3Forms response:", result);

    if (result.success) {
      alert("Form submitted successfully!");
      reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    setError("root", {
      message: "Failed to submit the application, please try again later",
    });
  }
};


    return (
        <div className='w-full flex flex-row-reverse gap-4 justify-between my-10 bg-white py-6 px-12'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-7/12 mx-auto flex flex-col gap-4 mt-10 bg-white rounded-md shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Apply for {job?.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                        id='fullName'
                        type="text"
                        { ...register("fullName")}
                        placeholder="Full Name"
                        className="border p-3 rounded-lg focus:outline-none"
                        />
                        {errors.fullName && (
                            <div className='text-red-500'>{errors.fullName.message?.toString()}</div>
                        )}
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="gender">Gender</label>
                        <select
                        id="gender"
                        { ...register("gender")}
                        className="border p-3 rounded-lg focus:outline-none cursor-pointer"
                        >
                            <option value="" hidden >Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && (
                            <div className='text-red-500'>{errors.gender.message?.toString()}</div>
                        )}
                    </div>
                </div>

                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                { ...register("email")}
                placeholder="Email Address"
                className="border p-3 rounded-lg focus:outline-none"
                />
                {errors.email && (
                    <div className='text-red-500'>{errors.email.message?.toString()}</div>
                )}
                <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Phone Number</label>
                    <div className='w-full flex gap-2'>
                    <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                        <PhoneInput
                        {...field}
                        defaultCountry="EG"     
                        international           
                        countryCallingCodeEditable={false}
                        placeholder="Enter phone number"
                        className="border p-3 rounded-lg focus:outline-none w-full"
                        />
                    )}
                    />
                    </div>
                    {errors.phoneNumber && (
                        <div className='text-red-500'>{errors.phoneNumber.message?.toString()}</div>
                    )}
                </div>

                <label htmlFor="position">Job Title</label>
                <select
                id="position"
                { ...register("jobTitle")}
                defaultValue={job?.title}
                className="border p-3 rounded-lg focus:outline-none cursor-pointer"
                >
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
                    <option value="Data Analyst">Data Analyst</option>
                </select>

                <label htmlFor="coverLetter">Cover Letter</label>
                <textarea
                id="coverLetter"
                { ...register("coverLetter")}
                placeholder="Cover Letter..."
                rows={6}
                className="border p-3 rounded-lg focus:outline-none"
                />

                <label htmlFor="cv">Upload your CV</label>
                <input
                id='cv'
                type="file"
                { ...register("CV")}
                accept=".pdf,.doc,.docx"
                className="
                block w-full text-sm text-gray-600 border rounded-lg 
                file:mr-4 file:py-2 file:px-4 file:cursor-pointer
                file:rounded-l-lg file:border
                file:text-sm file:font-semibold
                file:bg-black file:text-white"
                />
                {errors.CV && (
                    <div className='text-red-500'>{errors.CV.message?.toString()}</div>
                )}
                <button
                type="submit"
                disabled={isSubmitting}
                className="w-3/12 mx-auto my-10 bg-black text-white py-3 rounded-lg cursor-pointer"
                >
                    {isSubmitting ? 'Loading...' : 'Send Application'}
                </button>
            </form>
        </div>
    )
}

export default JobApplication

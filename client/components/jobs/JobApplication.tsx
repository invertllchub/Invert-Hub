import React from 'react'
import { Job } from '@/app/(main)/types/jobs'
import Image from 'next/image'

type JobProps = {
    job: Job
}

function JobApplication({job}: JobProps) {
    return (
        <div className='w-full flex flex-row-reverse gap-4 justify-between my-10 bg-white py-6 px-12'>
            <form className="w-7/12 mx-auto flex flex-col gap-4 mt-10 bg-white rounded-md shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Apply for {job?.title}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                        id='fullName'
                        type="text"
                        placeholder="Full Name"
                        required
                        className="border p-3 rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="gender">Gender</label>
                        <select
                        id="lastName"
                        required
                        className="border p-3 rounded-lg focus:outline-none cursor-pointer"
                        >
                            <option value="" hidden >Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                <label htmlFor="email">Email</label>
                <input
                id="email"
                type="email"
                placeholder="Email Address"
                required
                className="border p-3 rounded-lg focus:outline-none"
                />



                <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Phone Number</label>
                    <div className='w-full flex gap-2'>
                    <select
                    name="countryCode"
                    className="border p-3 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 w-28"
                    defaultValue="+20"
                    >
                        <option value="+20">🇪🇬 +20</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+1">🇺🇸 +1</option>
                    </select>

                    <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="border p-3 rounded-lg focus:outline-none flex-1"
                    />
                    </div>
                </div>

                <label htmlFor="position">Job Title</label>
                <select
                id="position"
                defaultValue={job?.title}
                required
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
                placeholder="Cover Letter..."
                rows={6}
                className="border p-3 rounded-lg focus:outline-none"
                />

                <label htmlFor="cv">Upload your CV</label>
                <input
                id='cv'
                type="file"
                accept=".pdf,.doc,.docx"
                className="
                block w-full text-sm text-gray-600 border rounded-lg 
                file:mr-4 file:py-2 file:px-4 file:cursor-pointer
                file:rounded-l-lg file:border
                file:text-sm file:font-semibold
                file:bg-black file:text-white"
                />

                <button
                type="submit"
                className="w-3/12 mx-auto my-10 bg-black text-white py-3 rounded-lg cursor-pointer"
                >
                    Send Application
                </button>
            </form>
        </div>
    )
}

export default JobApplication

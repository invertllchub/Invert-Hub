import AddJobForm from '@/components/dashboard/jobsComponents/AddJobForm'
import React from 'react'

function page() {
    return (
        <div className="pl-30 pr-15 py-10 overflow-hidden bg-gray-200/75">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800">ADD NEW JOB</h1>
                <button
                form='add-job-form'
                type="submit"
                className="px-6 w-20 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg col-start-1 cursor-pointer"
                >
                    Save
                </button>
            </div>
            <AddJobForm />
        </div>
    )
}

export default page

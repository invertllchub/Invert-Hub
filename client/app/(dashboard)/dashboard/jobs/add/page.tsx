import JobForm from '@/components/jobs/AddJobApplication'
import React from 'react'

function page() {
    return (
        <div className="pl-30 pr-15 py-10 overflow-hidden">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-4xl font-extrabold text-gray-800">ADD NEW JOB</h1>
                <button
                type="submit"
                className="px-6 w-20 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg col-start-1 cursor-pointer"
                >
                    Save
                </button>
            </div>
            <JobForm />
        </div>
    )
}

export default page

"use client"
import { Job } from '@/app/(main)/types/jobs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() { 
    const [jobs, setJobs] = useState<Job[]>([]);
    const params = useParams()

    const fetchData = async () => {
        try {
            const res = await fetch('/jobs.json');
            const json: Job[] = await res.json();
            setJobs(json);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const job = jobs.find((j) => String(j.id) === params.id)

    return (
        <div className='ml-30'>{job?.title}</div>
    )
}

export default page

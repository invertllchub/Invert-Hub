"use client"
import React, { useState, useEffect, useRef } from 'react'
import SearchBar from '@/components/dashboard/ToolBar'
import type { Job } from '@/app/(main)/types/jobs';
import DeleteBtn from '@/components/dashboard/DeleteBtn';
import UpdateBtn from '@/components/dashboard/UpdateBtn';


function page() {
    const [selected, setSelected] = useState<number []>([])
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const headerCheckboxRef = useRef<HTMLInputElement>(null)

        // fetch data
        const fetchData = async () => {
            try {
                const res = await fetch('/jobs.json');
                const json: Job[] = await res.json();
                setJobs(json);   
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
        useEffect(() => {
            fetchData()
        }, [])

        const allSelected = selected.length === jobs.length && jobs.length > 0
        const someSelected = selected.length > 0 && !allSelected

        useEffect(() => {
            if(headerCheckboxRef.current){
                headerCheckboxRef.current.indeterminate = someSelected
            }
        }, [someSelected])

        const toggleAll = () => {
            if (allSelected) {
                setSelected([])
            } else {
                setSelected(jobs.map((_, i) => i))
            }
        }

    const toggleOne = (i: number) => {
        setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])
    }

    const handleDeleteOne = (i: number) => {
        setJobs(prev => prev.filter((_, index) => index !== i))
    }

    const handleDeleteAll = () => {
        setJobs((prev) => prev.filter((_, i) => !selected.includes(i)))
        setSelected([])  
    }

    const filteredProjects = jobs.filter((job) => {
        if (!searchValue) return true;
        const search = searchValue.toLowerCase();
        return (
            job.title.toLowerCase().includes(search) ||
            job.datePosted.includes(search)
        )
    })


    return (
        <div className="w-full min-h-screen bg-gray-200/75 pl-30 pr-15 py-10">
            <div>
                <SearchBar handleDeleteAll={handleDeleteAll} allSelected={allSelected} someSelected={someSelected} setSearchValue={setSearchValue} title={"jobs"}/>
            </div>
            <div className='w-full h-fit mt-10 rounded-lg bg-white p-8'>
                <div className='grid grid-cols-[50px_250px_150px_150px_150px_200px] gap-8 mb-3'>
                    <div className='h-[40px] flex items-center justify-center'>
                        <input
                        type="checkbox"
                        id="agree"
                        ref={headerCheckboxRef}
                        checked={allSelected}
                        onChange={toggleAll}
                        className="w-4 h-4 cursor-pointer accent-blue-700"
                        />
                    </div>
                    <div className='h-[40px] flex items-center'>Title</div>
                    <div className='h-[40px] flex items-center'>Employment Type</div>
                    <div className='h-[40px] flex items-center'>Date Posted</div>
                    <div className='h-[40px] flex items-center justify-center'>Closing Date</div>
                    <div className='h-[40px] flex items-center justify-center'>Edit</div>
                </div>
                <hr />

                {/* Table Rows */}
                {filteredProjects.map((job, i) => (
                    <div
                    key={i}
                    className="grid grid-cols-[50px_250px_150px_150px_150px_200px] gap-8 py-3 border-b last:border-b-0 text-gray-600"
                    >
                        <div className="flex items-center justify-center">
                            <input 
                            type="checkbox" 
                            checked={selected.includes(i)}
                            onChange={() => toggleOne(i)}
                            className="w-4 h-4 cursor-pointer accent-blue-700"
                            />
                        </div>
                        <div className="flex items-center">{job.title}</div>
                        <div className="flex items-center">{job.employmentType}</div>
                        <div className="flex items-center">{job.datePosted}</div>
                        <div className="flex items-center justify-center">{job.closingDate}</div>
                        <div className="flex items-center justify-center gap-5">
                            <DeleteBtn handleDeleteOne={() => handleDeleteOne(i)} />
                            <UpdateBtn page={'jobs'} id={job.id}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page

"use client"
import React, { useState, useEffect, useRef } from 'react'
import SearchBar from '@/components/dashboard/ToolBar'
import { Project } from '@/app/(main)/types/project';
import DeleteBtn from '@/components/dashboard/DeleteBtn';
import UpdateBtn from '@/components/dashboard/UpdateBtn';


function page() {
    const [selected, setSelected] = useState<number []>([])
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const headerCheckboxRef = useRef<HTMLInputElement>(null)

        // fetch data
        const fetchData = async () => {
            try {
                const res = await fetch('/projects.json');
                const json = await res.json();
                setProjects(json)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        
        useEffect(() => {
            fetchData()
        }, [])

        const allSelected = selected.length === projects.length && projects.length > 0
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
                setSelected(projects.map((_, i) => i))
            }
        }

    const toggleOne = (i: number) => {
        setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])
    }

    const handleDeleteOne = (i: number) => {
        setProjects(prev => prev.filter((_, index) => index !== i))
    }

    const handleDeleteAll = () => {
        setProjects((prev) => prev.filter((_, i) => !selected.includes(i)))
        setSelected([])  
    }

    const filteredProjects = projects.filter((project) => {
        if (!searchValue) return true;
        const search = searchValue.toLowerCase();
        return (
            project.data.title.toLowerCase().includes(search) ||
            project.keyInformation.some((info) =>
                String(info.value).toLowerCase().includes(search)
            )
        )
    })


    return (
        <div className="w-full h-[200vh] bg-gray-200/75 pl-30 pr-15 py-10">
            <div>
                <SearchBar handleDeleteAll={handleDeleteAll} allSelected={allSelected} someSelected={someSelected} setSearchValue={setSearchValue} title={"Projects"}/>
            </div>
            <div className='w-full h-full mt-10 rounded-lg bg-white p-8'>
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
                    <div className='h-[40px] flex items-center'>Name</div>
                    <div className='h-[40px] flex items-center'>Client</div>
                    <div className='h-[40px] flex items-center'>Location</div>
                    <div className='h-[40px] flex items-center justify-center'>Status</div>
                    <div className='h-[40px] flex items-center justify-center'>Edit</div>
                </div>
                <hr />

                {/* Table Rows */}
                {filteredProjects.map((project, i) => (
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
                        <div className="flex items-center">{project.data.title}</div>
                        <div className="flex items-center">{project.keyInformation[0].value}</div>
                        <div className="flex items-center">{project.keyInformation[1].value}</div>
                        <div className="flex items-center justify-center">{project.keyInformation[2].value}</div>
                        <div className="flex items-center justify-center gap-5">
                            <DeleteBtn handleDeleteOne={() => handleDeleteOne(i)} />
                            <UpdateBtn project={project} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page

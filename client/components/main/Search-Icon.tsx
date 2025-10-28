import React, { useEffect } from 'react'
import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Project } from '@/types/project'
import ProjectCard from './projectPage/ProjectCard'



const SearchIcon = ({ isDark }: { isDark: boolean }) => {
    const [openSearch, setOpenSearch] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const [searchValue, setSearchValue] = useState("");
    

    const fetchData = async () =>{
        try {
            const res = await fetch('https://localhost:7253/api/Projects')
            const json = await res.json()
            setProjects(json)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const filteredProjects = projects.filter((project) => {
        if (!searchValue) return true;
        const search = searchValue.toLowerCase();
        const title = project.title.toLowerCase();

        return title.includes(search);
    });

    return (
        <>
        <div aria-label="Open Search" onClick={() => setOpenSearch(true)} className='p-1 rounded-full cursor-pointer hover:bg-black/30'>
            <Search 
            className={`
                ${isDark ? 'text-white' : 'text-black'}
                hover:scale-75 transition duration-500
                `} 
            size={25} aria-hidden="true" />
        </div>
        {/* overLay */}
        <div className={`fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-md  z-50
            transform transition-all duration-500 ease-in-out
            ${openSearch ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}>

            <div className={`w-10/12 h-10/12 bg-white rounded-lg shadow-lg transition-transform duration-500 transform 
            ${openSearch ? 'scale-100' : 'scale-95'} overflow-y-auto`}>
                <div className='p-8 flex flex-col justify-between h-full'>
                    <div className='flex items-center justify-between w-full'>
                        <input 
                        type="text" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search' 
                        className="w-6/12 border-b border-gray-400 outline-none text-2xl lg:text-3xl px-2 pb-3 focus:border-black transition"
                        />
                        <X aria-label="Close Search" onClick={() => setOpenSearch(false)} className='cursor-pointer' size={35}/>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold my-8'>Featured Projects</h1>
                        <div className='w-full grid grid-cols-1  lg:grid-cols-3 gap-8'>
                            {filteredProjects?.slice(0, 3).map((p, i) => {
                                return (
                                    <div key={i}>
                                        <ProjectCard project={p}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchIcon

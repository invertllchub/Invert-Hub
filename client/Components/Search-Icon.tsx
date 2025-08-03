import React from 'react'
import { useState } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'


function SearchIcon() {
        const [openSearch, SetOpenSearch] = useState(false)
    
    return (
        <>
        <div onClick={() => SetOpenSearch(true)} className='p-1 rounded-full cursor-pointer hover:bg-black/30'>
            <Search className='text-white hover:scale-75 transition duration-500' size={25}/>
        </div>
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
                        placeholder='Search projects' 
                        className="w-6/12 border-b border-gray-400 outline-none text-2xl lg:text-3xl px-2 pb-3 focus:border-black transition"
                        />
                        <X onClick={() => SetOpenSearch(false)} className='cursor-pointer' size={35}/>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold my-8'>Featured Projects</h1>
                        <div className='w-full grid grid-cols-1  lg:grid-cols-3 gap-8'>
                            {Array(3).fill(0).map((_, i) => {
                                return (
                                    <div key={i}>
                                        <div className="relative w-full h-[250px]">
                                            <Image 
                                            src="/pic1.jpg" 
                                            alt="Remode" 
                                            fill 
                                            className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <h1>Remode</h1>
                                                <p>2019 - 2024</p>
                                            </div>
                                            <ArrowRight className='relative -left-1 cursor-pointer transition-all duration-300 hover:left-1'/>
                                        </div>
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

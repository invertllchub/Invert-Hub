"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Swiper4 } from '@/components/Swipers'
import { CareersType } from '../types/careers'

function Page() {
    const [hiddenOverlay, setHiddenOverlay] = useState<{ [key: number]: boolean }>({})
    const [careers, setCareers] = useState<CareersType | null>(null);

    const handleClick = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
        const video = e.currentTarget.querySelector("video") as HTMLVideoElement
        if (video) {
            if (video.paused) {
                video.play()
                setHiddenOverlay((prev) => ({ ...prev, [i]: true }));  
            } else {
                video.pause()
                setHiddenOverlay((prev) => ({ ...prev, [i]: false })); 
            }
        }
    }

    // fetch data
    const fetchData = async () => {
        try {
            const res = await fetch('/careers.json');
            const json = await res.json();
            setCareers(json)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className='w-full py-30'>
            <section className='px-4 md:px-16'>
                <h1 className='w-full text-4xl md:text-9xl font-extrabold'>CAREERS</h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    Join us to venture into the unexpected – and discover how big picture thinking and collective
                    intelligence are always at play.
                </p>
            </section>
            <section className='w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 mt-12 px-4 md:px-16'>
                <div  className="relative w-full h-[300px] md:h-[700px]">
                    <Image
                    alt="Careers picture"
                    src="https://res.cloudinary.com/dntdescqh/image/upload/v1756121225/careers-00_men20g.webp"
                    fill
                    className="object-cover rounded-md"
                    />
                </div>
                <div  className="relative w-full h-[300px] md:h-[700px]">
                    <Image
                    alt="Careers picture"
                    src="https://res.cloudinary.com/dntdescqh/image/upload/v1756121224/careers-01_gacoge.webp"
                    fill
                    className="object-cover rounded-md"
                    />
                </div>
            </section>

            {/* Articles-1 section */}
            <section className='w-full mt-10 md:mt-32 px-4 md:px-16'>
                <div  className='flex flex-col md:flex-row items-start justify-between mt-64 mb-24'>
                    <h1 className='text-2xl md:text-4xl font-bold '>{careers?.articles[0].label}</h1>
                    <div  className="w-full md:w-6/12">
                        <h3 className='text-xl font-semibold mt-6'>
                            {careers?.articles[0].content}
                        </h3>
                        <div className='mt-6'>
                            <Link href="/" className="relative text-xl group">
                                FIND OUT MORE
                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-[300px] md:h-[100vh] mt-16">
                    <video 
                    src='https://res.cloudinary.com/dntdescqh/video/upload/v1756148349/career-video-02_tx2qhm.mp4'
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    />
                </div>
            </section>

            {/* Articles-2 section */}
            <section className='px-4 md:px-16'>
                <div  className='flex flex-col md:flex-row items-start justify-between mt-32 mb-24'>
                    <h1 className='text-2xl md:text-4xl font-bold '>{careers?.articles[1].label}</h1>
                    <div  className="w-full md:w-6/12 mt-6">
                        <h3 className='text-xl font-semibold'>
                            {careers?.articles[1].content}
                        </h3>
                    </div>
                </div>
                <div  className='flex flex-col md:flex-row items-start justify-between mt-24 mb-24'>
                    <h1 className='text-2xl md:text-4xl font-bold '>{careers?.articles[2].label}</h1>
                    <div  className="w-full md:w-6/12 mt-6">
                        <h3 className='text-xl font-semibold'>
                            {careers?.articles[2].content}
                        </h3>
                        <div className='mt-6'>
                            <Link href="/" className="relative text-xl group">
                                FIND OUT MORE
                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our employees section */}
            <section className='px-4 md:px-16'>
                <h1 className='text-2xl md:text-5xl font-semibold'>Hear from our employees</h1>
                <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-6'>
                {careers?.Employees.map((employee ,i) => {
                    return(
                        <div 
                        key={i} 
                        className="relative w-full h-[300px] md:h-[70vh] mt-16"
                        onClick={(e) => handleClick(i, e)}
                        >
                            <video 
                            src={employee.video}
                            poster={employee.poster}
                            playsInline
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            />
                            <div 
                            className={`absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-lg transition-opacity duration-300
                            ${hiddenOverlay[i] ? "opacity-0 pointer-events-none" : "opacity-100"}
                            `}>
                                <h1 className="text-lg font-semibold">{employee.name}</h1>
                                <h2 className="text-sm">{employee.jopDescription}</h2>
                            </div>
                        </div>
                    )
                })}
                </div>
            </section>
            <section className='p-12 md:p-32 mt-32'>
                <p className='text-2xl md:text-5xl font-semibold'>
                    <span>“</span>
                        From exploring new technologies to addressing global challenges, 
                        every project is an opportunity to innovate. Collaborating with a talented team and 
                        global partners to turn ambitious ideas into impactful solutions is both inspiring 
                        and fulfilling.
                    <span>”</span>
                </p>
                <div className='mt-16'>
                    <h1 className='font-bold'>Adam Tarr</h1>
                    <h3 className='text-gray-700'>Head of Research and Innovation</h3>
                </div>
            </section>

            {/* The team section */}
            <section className='w-full mt-32'>
                <div className='px-4 md:px-16'>
                    <h1 className='w-full text-4xl md:text-7xl font-extrabold'>JOIN THE TEAM</h1>
                    <p className='text-2xl md:text-5xl font-semibold mt-6'>
                        Join us – and let’s start thinking about the big picture together.
                    </p>
                    <div className='mt-12'>
                        <Link href="/" className="relative text-md font-semibold group">
                            VIEW OPEN RULES
                            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                        </Link>
                    </div>
                </div>
                <div  className="relative w-full h-[300px] md:h-[700px] mt-12">
                    <Image
                    alt="Team picture"
                    src="https://res.cloudinary.com/dntdescqh/image/upload/v1756131130/careers-02_lhxwa5.webp"
                    fill
                    className="object-cover"
                    />
                </div>
            </section>

            {/* swiper section */}
            <section className='px-4 md:px-12 mt-48'>
                <h1 className='w-full text-4xl md:text-7xl font-extrabold'>OUR LOCATIONS</h1>
                <Swiper4 locations={careers?.locations || []} />
            </section>
            <section className='w-full h-full flex flex-col md:flex-row items-center mt-48'>
                <div className='w-full md:w-6/12 h-full mb-auto px-8'>
                    <h1 className='text-2xl md:text-5xl font-semibold'>Our recruitment team</h1>
                </div>
                <div  className="relative mx-auto md:mx-0 w-10/12 md:w-3/12 h-[300px] md:h-[400px] mt-12 md:mt-0">
                    <Image
                    alt="recruitment team picture"
                    src="https://res.cloudinary.com/dntdescqh/image/upload/v1756029274/consulting-00_jamh0m.webp"
                    fill
                    className="object-cover"
                    />
                    <h4 className='absolute -bottom-10 left-0'>Marjolein 't Jong</h4>
                </div>
            </section>
        </div>
    )
}

export default Page

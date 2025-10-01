"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
// components
import { Swiper4 } from '@/components/main/Swipers'
// types
import { CareersType } from '../types/careers'


function Page() {
    
    const [careers, setCareers] = useState<CareersType | null>(null);

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
                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 
                                origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
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
                <div  className='mt-32 mb-24'>
                    <h1 className='text-2xl md:text-4xl font-bold '>Growing Together, Building the Future</h1>
                    <div  className="w-full mt-6">
                        <h3 className='text-xl font-semibold'>
                            come from tools or systems alone, but from individuals who feel supported, 
                            inspired, and empowered to push boundaries. That’s why we’ve built a culture where 
                            growth is not an option, it’s a given. From mentorship and skill development 
                            programs to cross-disciplinary collaborations, we create pathways for 
                            every team member to expand their knowledge and impact. 
                            You’ll work on international projects that stretch your creativity and 
                            sharpen your problem-solving skills, while being surrounded by 
                            colleagues who share the same passion for excellence and progress. 
                            We believe in open dialogue, shared learning, and giving you the 
                            freedom to shape ideas into reality. Flexibility, trust, 
                            and support are at the heart of how we operate, ensuring you can balance 
                            ambition with well-being. At Invert Hub, success is measured not only 
                            by the projects we deliver, but by the people we help grow into leaders, 
                            innovators, and changemakers. Here, you’ll find more than a workplace, 
                            you’ll find a hub where your voice matters, your ideas count, 
                            and your future is built together with us.
                        </h3>
                    </div>
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
                        <Link href="/jobs" target='_blanck' className="relative text-md font-semibold group">
                            VIEW OPEN RULES
                            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 
                            origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
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


        </div>
    )
}

export default Page

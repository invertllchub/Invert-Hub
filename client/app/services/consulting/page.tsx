"use client"
import React from 'react'
import { useState } from 'react';
import Image from 'next/image'
import YellowCard from '@/components/YellowCard';
import { MoveRight } from 'lucide-react';
import { useRouter } from "next/navigation";

function page() {
    const [currentImg, setCurrentImg] = useState<string | null>("https://res.cloudinary.com/dntdescqh/image/upload/v1755898383/urban_byugdk.webp");
    const router = useRouter();

    const designPatterns = [
        {label: "Sustainability", img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756029274/consulting-00_jamh0m.webp"},
        {label: "Economics", img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756029274/consulting-01_k62vkd.webp"},
        {label: "Health", img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756029273/consulting-02_ydidyc.webp"},
        {label: "Technology", img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756029273/consulting-03_iyiaot.webp"}
    ]
    return (
        <div className='w-full py-30 px-4 md:px-16 mt-12'>
            <p className='my-4 font-semibold'>SERVICES / <span className='font-normal text-gray-500'>CONSULTING</span></p>
            <section className='w-full'>
                <h1 className='w-full text-4xl md:text-9xl font-bold'>CONSULTING</h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    We solve design problems of all sizes, seize opportunities to strike forwards,
                    and blend commercial sense with creative flair to craft ideas that were never thought possible.
                </p>
                <div  className="relative w-full h-[300px] md:h-[700px] mt-12">
                    <Image
                    alt="Design picture"
                    src="https://res.cloudinary.com/dntdescqh/image/upload/v1755803839/Consulting_acsyvt.webp"
                    fill
                    className="object-cover rounded-md"
                    />
                </div>
                <p className='text-2xl font-semibold mt-16 w-full md:w-6/12'>
                    With a future-focused, multifaceted approach, we develop tailored strategies that go beyond the expected,
                    delivering proposals that are as resilient as they are impactful.
                    By blending cutting-edge insights with a commitment to innovation,
                    we help clients push boundaries, achieve their goals, and shape a future defined by well-being,
                    sustainable growth, and extraordinary potential.
                </p>
            </section>
            <section className='w-full h-[60vh] md:h-[100vh] flex items-center justify-between mt-32'>
                <div className='w-full md:w-6/12 h-full flex flex-col gap-6'>
                    <h1 className='md:mb-10 text-xl md:text-2xl font-semibold'>Design Services</h1>
                    <div className='max-h-[80vh] overflow-y-auto scrollbar-hide'>
                        {designPatterns.map((item, i) => {
                            return (
                                <div 
                                className={`py-4 w-fit cursor-pointer
                                ${currentImg === item.img
                                    ? 'md:opacity-100'
                                    : 'md:opacity-40'
                                }`}
                                key={i}
                                onMouseEnter={() => {setCurrentImg(item.img)}}
                                onClick={() => {
                                    setCurrentImg(item.img);
                                    router.push(`/services/consulting/${item.label.toLowerCase()}`);
                                }}
                                >
                                    <h1 className='text-2xl md:text-5xl font-bold flex items-end justify-between gap-4'>
                                        {item.label}
                                        <span className='w-12 h-8 rounded-full bg-gray-300/70 px-2'>
                                            <MoveRight size={30}/>
                                        </span>
                                    </h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="relative w-6/12 h-full overflow-hidden hidden md:block">
                {currentImg && (
                    <Image 
                    src={currentImg} 
                    alt="big picture for the project"
                    fill 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                )}
                </div>
            </section>
            <section className='w-full h-[90vh] mt-32'>
                <YellowCard 
                p={`We integrate architecture, urban planning, interior design, product and experience design
                    with consulting services that tackle every-day challenges. Curious to know more?`}
                link={`GET IN TOUCH`}
                img={`https://res.cloudinary.com/dntdescqh/image/upload/v1755806302/Services_iitw04.webp`}
                alt={`Sevices get in touch`}
                />
            </section>
        </div>
    )
}

export default page

"use client"
import React from 'react'
import { useState } from 'react';
import Image from 'next/image'
import YellowCard from '@/components/main/YellowCard';
import { MoveRight } from 'lucide-react';
import { useRouter } from "next/navigation";

function page() {
    const [currentImg, setCurrentImg] = useState<string | null>("https://res.cloudinary.com/dntdescqh/image/upload/v1756331311/research-swipe-00_tihmdq.webp");
    const router = useRouter();

    const Researchs = [
        {
            label: "Sustainability innovation", 
            slug: "sustainability-innovation", 
            img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756331311/research-swipe-00_tihmdq.webp"
        },
        {
            label: "Digital innovation", 
            slug: "digital-innovation", 
            img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756331292/research-swipe-01_wlh3pk.webp"
        }
    ]
    return (
        <div className='w-full py-30 px-4 md:px-16 mt-12'>
            <section className='w-full'>
                <h1 className='w-full text-4xl md:text-9xl font-extrabold'>RESEARCH AND INNOVATION</h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    We apply intellectual rigour, an open, honest and collaborative approach and deep
                    practice expertise to every project and problem.
                </p>
                <div className="relative w-full h-[300px] md:h-[100vh] mt-16">
                    <video
                    src="https://res.cloudinary.com/dntdescqh/video/upload/v1756373784/research-video_kx39us.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <p className='text-2xl font-semibold mt-16 w-full md:w-6/12'>
                    Research & Innovation are central to our mission of creating healthier,
                    more sustainable, and future-ready environments.
                    By combining forward-thinking research with innovative practices,
                    we transform knowledge into solutions that address today’s
                    challenges while preparing for tomorrow’s needs.
                </p>
                <p className='text-2xl font-semibold mt-16 w-full md:w-6/12 ml-auto'>
                    Our work is driven by purpose, placing human needs at the heart of every design
                    to create projects and services that are not only impactful and forward-looking
                    but also deliver lasting value for clients, communities, and the planet.
                    Through our globally connected Centers of Expertise,
                    which bring specialised knowledge and innovation into our work,
                    we contribute to shaping a smarter, greener, and more inclusive future.
                </p>
            </section>
            <section className='w-full h-[60vh] md:h-[100vh] flex items-center justify-between mt-32'>
                <div className='w-full md:w-6/12 h-full flex flex-col gap-6'>
                    <h1 className='md:mb-10 text-xl md:text-2xl font-semibold'>Centers of Expertise</h1>
                    <div className='max-h-[80vh] overflow-y-auto scrollbar-hide'>
                        {Researchs.map((item, i) => {
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
                                    router.push(`/research/${item.slug.toLowerCase()}`);
                                }}
                                >
                                    <h1 className='text-2xl md:text-4xl font-bold flex items-end justify-between gap-4'>
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

"use client"
import React from 'react'
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {id: 0, img: "/pic1.jpg", title: "Panorama", description: "Italy, 2024"},
    {id: 1, img: "/pic2.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 2, img: "/pic3.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 3, img: "/pic4.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 4, img: "/pic5.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 5, img: "/pic6.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 6, img: "/pic7.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 7, img: "/pic8.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 8, img: "/pic9.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 9, img: "/pic10.webp", title: "Panorama", description: "Italy, 2024"},
    {id: 10, img: "/pic11.webp", title: "Panorama", description: "Italy, 2024"},

]

function page() {
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const [currentImg, setCurrentImg] = useState(projects[0].img);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    

    useEffect(() => {
        imagesRef.current.forEach((img, i) => {gsap.fromTo(img,
            { scaleY: 0, opacity: 0, transformOrigin: "bottom" },
            {
                scaleY: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 130%",
                    end: "bottom 20%", 
                    once: true
                },
            }
        );
    });
    }, []);

    return (
        <div className='py-16 md:py-30 px-4 md:px-16 bg-[#f6f6f6] text-center md:text-start'>
            {/* Featured Projects */}
            <div className='w-full'>
                <h1 className='my-20 text-2xl md:text-5xl font-semibold'>Featured Projects</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4'>
                    {projects.map((project, i) => {
                        return (
                            <div key={project.id} className={`h-[70vh] cursor-pointer
                                ${i % 3 === 0 ? "md:col-start-1" : ""}
                                ${i % 3 === 1 ? "md:col-start-3" : ""}
                                ${i % 3 === 2 ? "md:col-start-2" : ""}
                                `}
                                >
                                <div className="relative w-full h-10/12 overflow-hidden"
                                ref={(img) => {
                                    if (img) {
                                        imagesRef.current[project.id] = img;
                                    } else {
                                        delete imagesRef.current[project.id];
                                    }
                                }}
                                >
                                    <Image 
                                    src={project.img} 
                                    alt={project.title} 
                                    fill 
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                </div>
                                <div className='py-4'>
                                    <h1 className='font-semibold text-[18px]'>{project.title}</h1>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* seperator */}
            <hr className='my-40'/> 

            {/* Further  Projects */}
            <div className='w-full h-[100vh] flex items-center justify-between'>
                <div className='w-6/12 h-full flex flex-col gap-6'>
                    <h1 className='md:mb-10 text-xl md:text-5xl font-semibold'>Further  Projects</h1>
                    <div className='max-h-[80vh] overflow-y-auto scrollbar-hide'>
                        {projects.map((item) => {
                            return (
                                <div 
                                className={`py-4 w-fit cursor-pointer
                                ${hoveredProject === item.img
                                    ? 'opacity-100'
                                    : 'opacity-40'
                                }`}
                                key={item.id}
                                onMouseEnter={() => {setCurrentImg(item.img), setHoveredProject(item.img)}}
                                >
                                    <h1 className='font-semibold text-[18px]'>{item.title}</h1>
                                    <p>{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="relative w-6/12 h-full overflow-hidden hidden md:block">
                    <Image 
                    src={currentImg} 
                    alt="big picture for the project"
                    fill 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                </div>
            </div>
        </div>
    )
}

export default page

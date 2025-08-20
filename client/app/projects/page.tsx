"use client"
// React Hooks
import React from 'react'
import { useRef, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
// gsap animation
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from "gsap/Flip";
import { flipState } from '@/lib/flipState';
// components
import Image from 'next/image';
// types
import { Project } from '../types/project';

gsap.registerPlugin(ScrollTrigger, Flip);


function Page() {
    const [projects, setProjects] = useState<Project[]>([]);
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const [currentImg, setCurrentImg] = useState<string | null>("https://res.cloudinary.com/dntdescqh/image/upload/v1755689587/pic2_ydbgaw.webp");
    const router = useRouter();

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


    // Projects Animation
    useEffect(() => {
        if (!projects.length) return;
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
    }, [projects]);


    const handleClick = (e: React.MouseEvent, title: string) => {
        const container = e.currentTarget as HTMLElement;
        const imgDiv = container.querySelector("div");
        if (!imgDiv) {
            router.push(`/projects/${title}`);
            return;
        }

        const rect = imgDiv.getBoundingClientRect();

        Object.assign(imgDiv.style, {
            position: "fixed",
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            margin: "0",
            zIndex: "9999",
        });

        const projectRect = flipState.projectPageRect;

        if (!projectRect) {
            router.push(`/projects/${title}`);
            return;
        }

        gsap.to(imgDiv, {
            top: projectRect.top,
            left: projectRect.left,
            width: projectRect.width,
            height: projectRect.height,
            duration: 1.5,
            ease: "power1.inOut",
            onComplete: () => {
                router.push(`/projects/${title}`);
            },
        });
    };

    return (
        <div className='py-16 md:py-30 px-4 md:px-16 bg-[#f6f6f6] text-center md:text-start'>

            {/* Featured Projects */}
            <div className='w-full'>
                <h1 className='my-20 text-2xl md:text-5xl font-semibold'>Featured Projects</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4'>
                    {projects.map((project, i) => {
                        return (
                            <div  
                            onClick={(e) => handleClick(e, project.data.title)}
                            key={project.data.id} 
                            className={`h-[70vh] cursor-pointer
                                ${i % 3 === 0 ? "md:col-start-1" : ""}
                                ${i % 3 === 1 ? "md:col-start-3" : ""}
                                ${i % 3 === 2 ? "md:col-start-2" : ""}
                            `}
                                >
                                <div className="relative w-full h-10/12"
                                ref={(img) => {
                                    if (img) {
                                        imagesRef.current[i] = img;
                                    }
                                }}
                                >
                                    <Image 
                                    src={project.data.img} 
                                    alt={project.data.title} 
                                    priority={i < 3}
                                    fill 
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className='py-4'>
                                    <h1 className='font-semibold text-[18px]'>{project.data.title}</h1>
                                    <p>{project.data.description}</p>
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
                                ${currentImg === item.data.img
                                    ? 'opacity-100'
                                    : 'opacity-40'
                                }`}
                                key={item.data.id}
                                onMouseEnter={() => {setCurrentImg(item.data.img)}}
                                onClick={() => {
                                    setCurrentImg(item.data.img);
                                    router.push(`/projects/${item.data.title}`);
                                }}
                                >
                                    <h1 className='font-semibold text-[18px]'>{item.data.title}</h1>
                                    <p>{item.data.description}</p>
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
            </div>
        </div>
    )
}

export default Page

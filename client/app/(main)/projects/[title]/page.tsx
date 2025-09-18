"use client";

// React Hooks
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
//gsap animation
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { flipState } from "@/lib/flipState";
// components
import { Swiper1, Swiper2 } from "@/components/main/Swipers";
import Image from "next/image";
//types
import { Project } from "../../types/project";


gsap.registerPlugin(Flip, ScrollTrigger);



export default function ProjectDetailPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef(null);
    const params = useParams(); 
    const slug = decodeURIComponent(params?.title as string);
    const project = projects.find((p) => p.data.slug.toLowerCase() === slug.toLowerCase());

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


    useLayoutEffect(() => {
        if (flipState.state && containerRef.current && flipState.projectPageRect) {
            Flip.from(flipState.state, {
                duration: 1,
                ease: "power2.inOut",
                absolute: true,
                immediateRender: false,
                onComplete: () => {
                    flipState.state = null;
                },
            });
        }
    }, [project]);


    useLayoutEffect(() => {
        if (!textRef.current || !containerRef.current) return;

        const containerHeight = containerRef.current.offsetHeight;

        if(window.innerWidth >= 1024) {
            gsap.fromTo(textRef.current,
            { y: window.innerHeight * 0.6 },
            {
            y: containerHeight - 140, 
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",   
                end: "bottom bottom", 
                scrub: true, 
            },
            });
        } else {
            // text fixed in mobile view
            gsap.set(textRef.current, { y: containerHeight - 120 });
        }

    }, [projects]);

    return (
    <>
    {!project ? (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl">Loading...</p>
        </div>
    ) : (
    <section className="w-full flex flex-col items-center justify-center overflow-hidden
    bg-gradient-to-r from-sky-200 via-sky-100 to-sky-50 pt-16 md:pt-32 px-3 md:px-16">

        <div
        ref={containerRef}
        className="relative w-full h-[60vh] md:h-[200vh] rounded-lg shadow-lg cursor-pointer text-center"
        >
            <Image 
            src={project.data.img} 
            alt={project.data.title} 
            fill 
            priority 
            className="project-image object-cover"
            onLoad={() => {
                if (containerRef.current) {
                    gsap.delayedCall(0.05, () => {
                    flipState.projectPageRect = containerRef.current!.getBoundingClientRect();
                });}
            }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <h1 className="absolute top-1/2 -translate-y-1/2 md:top-[7%] md:-translate-y-0 left-1/2 -translate-x-1/2 text-5xl md:text-8xl 
            font-bold text-white w-10/12 text-center break-words text-wrap">
                {project.data.title}
            </h1>

            <h2 
            ref={textRef} 
            className="absolute right-12 text-3xl md:text-6xl font-bold text-white"
            >
                {project.data.animatedText}<p className="text-6xl text-white w-full text-end">●</p>
            </h2>
        </div>

        <div className="w-full h-[60vh] md:h-[100vh] flex flex-col items-center justify-center ">
            <h1 className="mt-6 text-xl md:text-3xl font-semibold">{project.data.title}</h1>
            <h3 className="mt-2 text-lg">{project.data.date}</h3>
            <p className="w-full text-center uppercase text-3xl md:text-7xl font-bold break-words mt-12">
                {project.data.description}
            </p>
        </div>
    </section>
    )}

    {/* Section2 */}
    <section className="w-full p-4 md:p-8 mt-8">

        <p className="text-2xl md:text-5xl font-semibold p-2 md:p-8 leading-7 md:leading-none">
            {project?.data.overview}
        </p>

        <div>
            <h1 className="text-3xl md:text-5xl font-semibold mt-30 mb-20 ">Key Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {project?.keyInformation.map((item, i) => (
                    <div key={i}>
                        <h3 className="font-semibold text-gray-700 mb-2">{item.label}</h3>
                        {Array.isArray(item.value) ? (
                            <ul className="list-disc list-inside text-gray-600">
                                {item.value.map((val: string, idx: number) => (
                                    <li key={idx}>{val}</li>
                                ))}
                            </ul>
                        ) : (
                        <p className="text-gray-600">{item.value}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </section>

    {/* Section3- Swipers */}
    <section className="w-full p-4 md:p-8 mt-8">
        {project && <Swiper1 project={project} />}

        <h2 className="text-3xl text-center md:text-start md:text-5xl font-semibold px-0 md:px-8 mt-16 ">Facts and figures</h2>
 
        <div className="p-0 md:px-8">
            {project && <Swiper2 project={project} />}
        </div>
    </section>

    {/* Section4 */}
    <section className="w-full p-2 md:p-8 mt-0 md:mt-8">
        {project?.articles.map((article,i) => (
            <div key={i} className="mb-12">
                {article.type === "image" ? (
                    <div>
                        <div className="relative w-full">
                            <Image
                            src={article.media}
                            alt={article.title || "Article image"}
                            width={1920}
                            height={1080}
                            priority
                            className="w-full h-auto rounded-lg object-contain"
                            />
                        </div>
                        <h1 className="w-full text-xl md:text-5xl font-semibold p-6 md:p-30">
                            <span>“</span>
                            {article.content}
                            <span>”</span>
                        </h1>
                    </div>
                ) : (
                <div>
                    <div className="relative w-full h-[80vh] md:h-[100vh]">
                        <video
                        src={article.media}
                        controls
                        className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <h1 className="w-full text-xl md:text-5xl font-semibold p-6 md:p-30">
                        <span>“</span>
                        {article.content}
                        <span>”</span>
                    </h1>
                </div>
                )}
            </div>
        ))}
    </section>
    </>
);
}



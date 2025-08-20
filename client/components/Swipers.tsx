"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
// Import gsap animation
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// Types
import { SwiperProps } from "@/app/types/project";


gsap.registerPlugin(ScrollTrigger);

// The first Swiper

export function Swiper1 ({ project }: SwiperProps) {
  if (!project || !project.images) return null;

    return (
        <Swiper
        className='w-full h-[50vh] md:h-[100vh] mt-36 cursor-grab'
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
            768: {slidesPerView: 2},
            1024: {slidesPerView: 1.1},
        }}
        >
        {project.images.map((src, i) => (
            <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                    <Image
                        src={src}
                        alt={`slide-${i}`}
                        priority
                        fill
                        className="w-full h-full object-cover"
                    />
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
    );
};

// The second Swiper

export function Swiper2({project}: SwiperProps) {
    if (!project || !project.images) return null;

    const animateCounter = (
        ref: HTMLHeadingElement | null,
        value: number,
        duration: number
    ) => {
        if (!ref) return;

        let obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration,
            ease: "power1.out",
            onUpdate: () => {
                if (ref) ref.innerText = Math.floor(obj.val).toString();
            },
        });
    };

    const numberRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  
    useEffect(() => {
        const refs = project.facts.map((fact, i) => ({
            ref: numberRefs.current[i],
            value: fact?.value?.number || 0,
            duration: 0.5 + i * 0.2,
        }));
  
        const triggers = refs.map(({ ref, value, duration }) => {
        if (!ref) return null;
  
        return ScrollTrigger.create({
            trigger: ref,
            start: "top 80%",
            once: true,
            onEnter: () => animateCounter(ref, value, duration),
        });
    });
  
    return () => {
        triggers.forEach((t) => t && t.kill());
    };
    }, [project.facts]);

    return (
        <Swiper
        className="w-full h-[70vh] mt-16 cursor-grab"
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
        }}
        >
      
        {project.facts.map((fact, i) => (
            <SwiperSlide key={fact.id}>
                {fact.type === "text" ? (
                    <div className={`bg-gradient-to-r h-[400px] flex flex-col items-start justify-end gap-3 p-4
                    ${i % 2 === 0 ? "from-sky-200 to-sky-100" : "from-yellow-200 to-yellow-100"}
                    `}>
                        <div className="flex items-center justify-center">
                            <h1
                                ref={(el) => {numberRefs.current[i] = el;}}
                                className="text-8xl font-semibold"
                            />
                                <span className="text-8xl font-semibold">
                                    {fact.value.string}
                                </span>
                        </div>
                        <p className="font-semibold leading-5 h-14">{fact.text}</p>
                    </div>
                ) : fact.type === "image" ? (
                    <div className="relative w-full h-[400px]">
                        <Image
                        src={fact.img}
                        alt="fact-image"
                        fill
                        className="object-cover"
                        />
                    </div>
                ) : null}
            </SwiperSlide>
        ))}
    </Swiper>
    );
}
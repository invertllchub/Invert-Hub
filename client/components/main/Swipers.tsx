"use client";
import { useEffect, useRef } from "react";
import Image from 'next/image';
// Import gsap animation
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination";
// Types
import { SwiperProps } from "@/app/(main)/types/project";
import { Swiper4Props } from "@/app/(main)/types/careers";
import { Clock } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";


gsap.registerPlugin(ScrollTrigger);

// The first Swiper

export function Swiper1 ({ project }: SwiperProps) {
  if (!project || !project.images) return null;

    return (
        <Swiper
        className='w-full h-[60vh] md:h-[110vh] mt-36  cursor-grab'
        spaceBetween={40}
        modules={[Pagination]}
        pagination={{ clickable: true }} 
        slidesPerView={1}
        breakpoints={{
            768: {slidesPerView: 2},
            1024: {slidesPerView: 1.1},
        }}
        >
            {project.images.map((img, i) => {
                if (!img) return null;

                const src = typeof img === "string" ? img : URL.createObjectURL(img);

                return (
                    <SwiperSlide key={i}>
                        <div className="relative w-full h-[50vh] md:h-[100vh]">
                            <Image
                            src={src}
                            alt={`slide-${i}`}
                            priority
                            fill
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                );
            })}
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
        modules={[Pagination]}
        pagination={{ clickable: true }}  
        slidesPerView={1}
        breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
        }}
        >
      
        {project.facts.map((fact, i) => (
            <SwiperSlide key={fact.id}>
                {fact.type === "text" ? (
                    <div className={`bg-gradient-to-r h-[60vh] flex flex-col items-start justify-end gap-3 p-4
                    ${i % 2 === 0 ? "from-sky-200 to-sky-100" : "from-yellow-200 to-yellow-100"}
                    `}>
                        <div className="flex items-center justify-center">
                            <h1
                                ref={(el) => {numberRefs.current[i] = el;}}
                                className="text-8xl font-semibold"
                            />
                                <span className="text-8xl font-semibold">
                                    {fact.value.label}
                                </span>
                        </div>
                        <p className="font-semibold leading-5 h-14">{fact.text}</p>
                    </div>
                ) : fact.type === "image" ? (
                    <div className="relative w-full h-[60vh]">
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

type ThirdSwiperItem = {
  title: string;
  description: string;
  img: string;
};

type Swiper3Props = {
  thirdSwiper: ThirdSwiperItem[];
};

// The third Swiper

export function Swiper3 ({thirdSwiper}: Swiper3Props) {

    return (
        <Swiper
        className='w-full h-[50vh] md:h-[100vh] mt-36 cursor-grab'
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
            768: {slidesPerView: 2},
            1024: {slidesPerView: 1},
        }}
        modules={[Navigation]}
        navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }}
        >
        {thirdSwiper.map((swipe, i, arr) => (
            <SwiperSlide key={i} >
                <div className="w-full h-full md:h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-6/12 h-6/12 md:h-full align-text-top md:p-4">
                        <p className="md:mb-12 font-semibold">
                            {`${String(i + 1).padStart(2, "0")} / ${String(arr.length).padStart(2, "0")}`}
                        </p>
                        <h1 className="text-xl md:text-5xl font-semiblod">{swipe.title}</h1>
                        <h3 className="text-bold mt-3 md:mt-6 text-sm">{swipe.description}</h3>
                        <div className="flex gap-4 mt-4 md:mt-8">
                            <button 
                            className="swiper-button-prev bg-gray-200 hover:bg-gray-300 rounded-full p-2 md:p-3 shadow cursor-pointer">
                                ←
                            </button>
                            <button 
                            className="swiper-button-next bg-gray-200 hover:bg-gray-300 rounded-full p-2 md:p-3 shadow cursor-pointer">
                                →
                            </button>
                        </div>
                    </div>
                    <div className="relative w-full md:w-6/12 h-6/12 md:h-full">
                        <Image
                            src={swipe.img}
                            alt={`slide-${i}`}
                            priority
                            fill
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
    );
};


// The Fourth Swiper

export function Swiper4({locations}: Swiper4Props) {

    return (
        <Swiper
        className="w-full h-[60vh] md:h-[80vh] mt-16 cursor-grab"
        spaceBetween={10}
        modules={[Pagination]}
        pagination={{ clickable: true }}  
        slidesPerView={1.15}
        breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4.15 },
        }}
        >
        {locations.map((location, i) => (
            <SwiperSlide key={i}>
                <div className={`bg-gradient-to-r h-[50vh] md:h-[70vh] flex flex-col items-start justify-end p-4
                ${i % 2 === 0 ? "from-sky-100 to-sky-50" : "from-yellow-100 to-yellow-50"}`}
                >
                        <div className="absolute top-4 left-4">
                            <Clock strokeWidth={0.5} size={72} color="gray"/>
                        </div>
                        <div className="text-md font-semibold">
                            <p className="mb-5">{location.capitalCity}</p>
                            <p>{location.street}</p>
                            <p>{location.postalCode}</p>
                            <p>{location.country}</p>
                            <p>{location.tele}</p>
                            <p>{location.domain}</p>
                        </div>
                        <div className='mt-8'>
                            <Link href="/" className="relative text-md font-semibold group">
                                <div className="flex items-center gap-1">
                                    VIEW OPEN RULES
                                    <span><ArrowUpRight size={20}/></span>
                                </div>
                                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                            </Link>
                        </div>
                    </div>
            </SwiperSlide>
        ))}
    </Swiper>
    );
}
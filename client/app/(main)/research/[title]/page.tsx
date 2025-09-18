"use client"
import React from 'react'
import Image from 'next/image'
import { useParams } from "next/navigation";
import { Swiper3 } from '@/components/main/Swipers';


function page() {
    const params = useParams()

        const thirdSwiper = [
    {
        title: "Across All Design Phases",
        description: "Spanning every stage of landscape design, from the initial idea to design development, technical planning, execution, and final aesthetic supervision.",
        img: "https://res.cloudinary.com/dntdescqh/image/upload/v1755960634/swipe-00_jjojbg.webp"
    },
    {
        title: "Across All Design Phases",
        description: "Spanning every stage of landscape design, from the initial idea to design development, technical planning, execution, and final aesthetic supervision.",
        img: "https://res.cloudinary.com/dntdescqh/image/upload/v1755960595/swipe-01_qe2ygk.webp"
    },
    {
        title: "Across All Design Phases",
        description: "Spanning every stage of landscape design, from the initial idea to design development, technical planning, execution, and final aesthetic supervision.",
        img: "https://res.cloudinary.com/dntdescqh/image/upload/v1755960629/swipe-02_gjamws.webp"
    }
]

    
    const designPatterns  = [
        {
            label: "Sustainability innovation", 
            slug: "sustainability-innovation", 
            img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756331311/research-swipe-00_tihmdq.webp",
            overView: "Unlocking the unseen potential of urban spaces and transforming everyday moments into extraordinary experiences.",
            firsArticle: `We see cities as living ecosystems, where people, nature, infrastructure,
            and culture intersect. Shaped by history and driven by innovation, cities are constantly evolving,
            and we embrace this complexity with curiosity and bold ideas.
            From the revitalisation of a site closed off for over forty-five years at
            FOUR Frankfurt to a master plan two decades in the making at Arnhem Central Station,
            our urban design projects drive economic growth, foster human connection, and celebrate
            environmental resilience.`,
            secondArticle: `Our team of urban designers, planners, placemakers,
            mobility, and sustainability experts approach every project with a comprehensive understanding
            of the city as a dynamic and evolving ecosystem. We integrate visionary thinking with practical,
            context-specific solutions to create designs that address today’s challenges and shape the future.
            With health, inclusivity, and sustainability at the core of our approach,
            we design spaces where people and communities can thrive – from neighbourhood blocks
            and university campuses to entirely new cities.`
        },
        {
            label: "Digital innovation", 
            slug: "digital-innovation", 
            img: "https://res.cloudinary.com/dntdescqh/image/upload/v1756331292/research-swipe-01_wlh3pk.webp",
            overView: "Unlocking the unseen potential of urban spaces and transforming everyday moments into extraordinary experiences.",
            firsArticle: `We see cities as living ecosystems, where people, nature, infrastructure,
            and culture intersect. Shaped by history and driven by innovation, cities are constantly evolving,
            and we embrace this complexity with curiosity and bold ideas.
            From the revitalisation of a site closed off for over forty-five years at
            FOUR Frankfurt to a master plan two decades in the making at Arnhem Central Station,
            our urban design projects drive economic growth, foster human connection, and celebrate
            environmental resilience.`,
            secondArticle: `Our team of urban designers, planners, placemakers,
            mobility, and sustainability experts approach every project with a comprehensive understanding
            of the city as a dynamic and evolving ecosystem. We integrate visionary thinking with practical,
            context-specific solutions to create designs that address today’s challenges and shape the future.
            With health, inclusivity, and sustainability at the core of our approach,
            we design spaces where people and communities can thrive – from neighbourhood blocks
            and university campuses to entirely new cities.`
        }
    ]

    const designPattern = designPatterns.find((d) => d.slug.toLowerCase() === params.title)

    return (
        <div className='w-full py-30 px-4 md:px-16 mt-12'>
            <p className='my-4 font-semibold'>
                RESEARCH / <span className='font-normal text-gray-500'>{designPattern?.label.toUpperCase()}</span>
            </p>
            <section className='w-full'>
                <h1 className='w-full text-4xl md:text-9xl font-extrabold'>
                    <span>{designPattern?.label.toUpperCase()}</span> 
                </h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    {designPattern?.overView}
                </p>
                {designPattern && (
                    <div className="relative w-full h-[300px] md:h-[150vh] mt-12">
                        <Image
                        alt={designPattern.label}
                        src={designPattern.img}
                        fill
                        className="object-cover rounded-md"
                        />
                    </div>
                )}
                <p className='text-xl md:text-2xl font-semibold mt-16 w-full md:w-6/12'>
                {designPattern?.firsArticle}
                </p>
                <p className='text-xl md:text-2xl font-semibold mt-16 w-full md:w-6/12 ml-auto'>
                {designPattern?.secondArticle}
                </p>
            </section>

            {/* Swiper */}
            <section>
                <Swiper3 thirdSwiper={thirdSwiper}/>
            </section>
        </div>
    )
}

export default page

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import YellowCard from '@/components/main/YellowCard'

function Page() {
    return (
        <div className='w-full py-30 px-4 md:px-16'>
            <h1 className='w-full text-4xl md:text-9xl font-extrabold'>OUR SERVICES</h1>
            <p className='text-2xl md:text-4xl font-semibold mt-6'>
                Our ambition knows no bounds. If building a sustainable city in space is the goal,
                we’ll plan it, design it, and engineer it. With our expanding services and global expertise,
                we go far beyond architecture.
            </p>
            <div className="relative w-full h-[300px] md:h-[100vh] mt-16">
                <video
                src="https://res.cloudinary.com/dntdescqh/video/upload/v1755814047/video-services_ioeffa.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <section className='w-full mt-32'>
                <h1 className='w-full text-4xl md:text-8xl font-bold'>DESIGN</h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    Delivering transformative design solutions across all scales and disciplines,
                    blending decades of expertise with a global reach.
                </p>
                <div className='mt-12'>
                    <Link href="/services/design" className="relative text-xl group">
                        FIND OUT MORE
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                    </Link>
                </div>
                <div  className="relative w-full h-[300px] md:h-[700px] mt-12">
                    <Image
                    alt="Design picture"
                    src="https://res.cloudinary.com/dyfregti9/image/upload/v1758050583/Ourservices_Sec1_01_kjfbpn.png"
                    fill
                    className="object-cover rounded-md"
                    />
                </div>
            </section>
            <section className='w-full mt-32'>
                <h1 className='w-full text-4xl md:text-8xl font-bold'>CONSULTING</h1>
                <p className='text-2xl md:text-4xl font-semibold mt-6'>
                    Unlocking new possibilities in sustainability, economics, technology,
                    and health to guide clients to navigate and increase impact and seize upon
                    opportunities that others might overlook.
                </p>
                <div className='mt-12'>
                    <Link href="/services/consulting" className="relative text-xl group">
                        FIND OUT MORE
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-black scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
                    </Link>
                </div>
                <div  className="relative w-full h-[300px] md:h-[700px] mt-12">
                    <Image
                    alt="Consulting picture"
                    src="https://res.cloudinary.com/dyfregti9/image/upload/v1758050567/Ourservices_Sec1_02_avnr2t.png"
                    fill
                    className="object-cover rounded-md"
                    />
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

export default Page

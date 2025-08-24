"use client"
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';



function SideBarNav() {
    const [openSideBar, setOpenSideBar] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isMiniHovered, setIsMiniHovered] = useState(false);
    const router = useRouter()

    const links = [
        { href: '/projects', label: 'PROJECTS' },
        { href: '/services', label: 'SERVICES' },
        { href: '/careers', label: 'CAREERS' },
        { href: '/about', label: 'ABOUT US'},
        { href: '/research', label: 'RESEARCH & INNOVATION'},
        { href: '/news', label: 'NEWS & INSIGHTS'},
        { href: '/team', label: 'OUR GLOBAL TEAM'},
        { href: '/awards', label: 'AWARDS'},
        { href: '/contact', label: 'CONTACT US'},
    ];

    return (
        <div >
            <div onClick={() => setOpenSideBar(true)} className='p-1 rounded-full cursor-pointer hover:bg-black/30'>
                <Menu aria-hidden="true" className='text-black hover:scale-75 transition duration-500' size={35}/>
            </div>

            {/* Overlay */}
            {openSideBar && (
                <div 
                    onClick={() => setOpenSideBar(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-500"
                />
            )}

            {/* sideNav */}
            <div className={`fixed top-0 right-0 h-full w-6/12 z-50 bg-black text-white transition-transform ease-in-out duration-500
            ${openSideBar ? "translate-x-0" : "translate-x-full"}`}>

                <div className='w-full flex items-center justify-end p-6' >
                    <X aria-hidden="true" onClick={() => setOpenSideBar(false)} className='cursor-pointer' size={35}/>
                </div>

                <nav >
                    {/* NavLinks */}
                    <ul className='w-full mt-5 p-6 flex flex-col justify-start items-start gap-6'>
                        {links.slice(0, 3).map(link => (
                            <li key={link.href} 
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className={`bg-black py-1 px-2 rounded-4xl w-full cursor-pointer 
                                transition-opacity duration-400 
                                ${
                                    hoveredLink
                                    ? hoveredLink === link.href
                                        ? 'opacity-100'
                                        : 'opacity-40'
                                    : 'opacity-100'
                                }
                                `}
                            >
                                <Link 
                                    href={link.href}
                                    onClick={() => setOpenSideBar(false)}
                                    className={`font-semibold text-2xl lg:text-4xl`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* NavLinks */}
                    <ul className='p-6 flex flex-col justify-start items-start gap-2'>
                        {links.slice(3).map(link => (
                            <li key={link.href} 
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className={`w-full cursor-pointer transition-opacity duration-400
                                ${
                                    hoveredLink
                                    ? hoveredLink === link.href
                                        ? 'opacity-100'
                                        : 'opacity-40'
                                    : 'opacity-100'
                                }
                                `}
                            >
                                <Link 
                                    href={link.href}
                                    onClick={() => setOpenSideBar(false)}
                                    className={`font-semibold text-md transition`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className='absolute bottom-8 left-6 w-[70%] sm:w-auto'>
                    <Link href={"/"} className='underline underline-offset-8 break-words'>INFO@INVERTSTUDIO.COM</Link>
                </div>

                {/* Mini sidebar */}
                <div  className={`absolute group top-0 h-full py-6 z-40 text-black bg-white origin-right
                transition-all duration-500 flex flex-col items-center justify-center gap-10
                ${openSideBar ?  `${isMiniHovered ? "w-45 lg:w-70 lg:left-[-17rem] left-[-11rem]" : "w-24 left-[-6rem]"}`  : "left-0"}
                    `}
                    onMouseEnter={() => setIsMiniHovered(true)}
                    onMouseLeave={() => setIsMiniHovered(false)}
                    onTouchStart={() => setIsMiniHovered(prev => !prev)}
                    >
                        <div className={`absolute inset-0 ${isMiniHovered ? "bg-transparent" : "bg-black/40"} z-10 pointer-events-none transition-all duration-500`}></div>
                        <div className='relative z-20 w-11/12 h-6/12'>
                            <div className="relative w-full h-9/12">
                                <Image 
                                src="https://res.cloudinary.com/dntdescqh/image/upload/v1755803840/Design_kflncf.webp" 
                                alt="design" 
                                fill 
                                className="object-cover rounded-lg"
                                />
                            </div>
                            <div className='flex items-center justify-between z-20 mt-1.5'>
                                <h1 className='font-semibold'>Design</h1>
                                <ArrowRight 
                                className='relative -left-1 cursor-pointer transition-all duration-300 hover:left-1'
                                onClick={()=> {router.push('/services/design'), setOpenSideBar(false)}}
                                />
                            </div>
                            <p className="truncate w-full">Creation of design solutions</p>
                        </div>
                        <div 
                        className='relative z-20 w-11/12 h-6/12'>
                            <div className="relative w-full h-9/12">
                                <Image 
                                src="https://res.cloudinary.com/dntdescqh/image/upload/v1755803839/Consulting_acsyvt.webp"
                                alt="consulting" 
                                fill 
                                className="object-cover rounded-lg"
                                />
                            </div>
                            <div className='flex items-center justify-between z-20 mt-1.5'>
                                <h1 className='font-semibold'>Consulting</h1>
                                <ArrowRight 
                                className='relative -left-1 transition-all duration-300 hover:left-1 cursor-pointer'
                                onClick={()=> {router.push('/services/consulting'), setOpenSideBar(false)}}
                                />
                            </div>
                            <p className="truncate w-full">Advice and strategic guidance</p>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default SideBarNav
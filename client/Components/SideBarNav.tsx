import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react'
import Image from 'next/image';



function SideBarNav() {
    const [openSideBar, setOpenSideBar] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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
                <Menu className='text-white hover:scale-75 transition duration-500' size={35}/>
            </div>

            {/* Overlay */}
            {openSideBar && (
                <div 
                    onClick={() => setOpenSideBar(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-500"
                />
            )}

            {/* sideNav */}
            <div className={`fixed top-0 right-0 h-full w-6/12 z-50 bg-black text-white transition-transform ease-in-out duration-600
            ${openSideBar ? "translate-x-0" : "translate-x-full"}`}>

                <div className='w-full flex items-center justify-end p-6'>
                    <X onClick={() => setOpenSideBar(false)} className='cursor-pointer' size={35}/>
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
                                    className={`font-semibold text-4xl`}
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
                                    className={`font-semibold text-md transition`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className='absolute bottom-8 left-6'>
                    <Link href={"/"} className='underline underline-offset-8'>INFO@INVERTSTUDIO.COM</Link>
                </div>

                {/* Mini sidebar */}
                <div  className={`absolute group top-0 h-full z-40 text-black bg-white origin-right
                transition-all duration-500 hover:w-60 flex flex-col items-center justify-center gap-6
                ${openSideBar ? "left-[calc(-5rem)] w-24 hover:w-70 hover:left-[calc(-17rem)]" : "left-0"}
                    `}>
                        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none transition-all duration-500 group-hover:bg-transparent"></div>
                        <div className='relative z-20 w-11/12 h-[300px]'>
                            <div className="relative w-full h-[250px]">
                                <Image 
                                src="/pic1.jpg" 
                                alt="Remode" 
                                fill 
                                className="object-cover rounded-lg"
                                />
                            </div>
                            <div className='flex items-center justify-between z-20 mt-1.5'>
                                <h1 className='font-semibold'>Design</h1>
                                <ArrowRight className='relative -left-1 cursor-pointer transition-all duration-300 hover:left-1'/>
                            </div>
                            <p>Creation of design solutions</p>
                        </div>
                        <div className='relative z-20 w-11/12 h-[300px]'>
                            <div className="relative w-full h-[250px]">
                                <Image 
                                src="/pic1.jpg" 
                                alt="Remode" 
                                fill 
                                className="object-cover rounded-lg"
                                />
                            </div>
                            <div className='flex items-center justify-between z-20 mt-1.5'>
                                <h1 className='font-semibold'>Consulting</h1>
                                <ArrowRight className='relative -left-1 transition-all duration-300 hover:left-1 cursor-pointer'/>
                            </div>
                            <p>Advice and strategic guidance</p>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default SideBarNav

'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SideBarNav from './SideBarNav'
import SearchIcon from './Search-Icon'

function NavBar() {
    const pathname = usePathname(); 

    const links = [
        { href: '/projects', label: 'PROJECTS' },
        { href: '/services', label: 'SERVICES' },
        { href: '/careers', label: 'CAREERS' },
    ];

    return (
        <>

        <nav className="fixed w-full flex items-center justify-between px-8 py-2 top-0 left-0 z-40 bg-transparent">

            {/* Logo */}
            <Link href="/" aria-label="Home">
                <Image 
                src="/logo.png" 
                alt="Invert-Hub Logo"  
                priority 
                width={170} height={140}
                className="origin-left hover:scale-130 transition-transform duration-800 cursor-pointer"
                />
            </Link>

            {/* NavLinks */}
            <div className='flex items-center justify-center gap-10'>
                <ul className='hidden md:flex justify-center items-center gap-6'>
                    {links.map(link => (
                        <li key={link.href} className='bg-black py-0.5 px-2 rounded-4xl'>
                            <Link 
                                href={link.href}
                                className={`font-semibold transition-colors duration-300 ${
                                    pathname === link.href 
                                        ? 'text-yellow-400' 
                                        : 'text-white hover:text-yellow-300'
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Icons */}
                <div className='flex items-center gap-3'>
                    <SearchIcon />
                    <SideBarNav />
                </div>

            </div>
        </nav>
        </>
    )
}

export default NavBar;

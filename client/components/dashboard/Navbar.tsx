"use client";
import React from "react";
import Link from "next/link";
import '../../app/(main)/globals.css'
import { Newspaper, House, Building2, User, Briefcase } from 'lucide-react';

function NavBar() {

  const links = [
    { href: "/dashboard/user", label: "User", icon: <User size={20} /> },
    // { href: "/dashboard/home", label: "Home Page", icon: <House size={20} /> },
    { href: "/dashboard/projects", label: "Projects", icon: <Building2 size={20} /> },
    { href: "/dashboard/articles", label: "Articles", icon: <Newspaper size={20} /> },
    { href: "/dashboard/jobs", label: "Jobs", icon: <Briefcase size={20} /> },
  ];

  return (
    <>
    <nav className="fixed top-0 left-0 h-full rounded-tr-lg rounded-br-lg bg-blue-600 z-40 group transition-all duration-300 w-16 hover:w-42 overflow-hidden">
      <ul className="flex flex-col items-center gap-6 mt-20 px-2">
        {links.map((link) => (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              className="flex items-center h-10 gap-6 text-white font-semibold px-3 py-2"
            >
              <span>{link.icon}</span>
              <span className="whitespace-nowrap">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
    </>
  );
}

export default NavBar;


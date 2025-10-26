"use client";
import React from "react";
import Link from "next/link";
import '../../app/(main)/globals.css'
import { Newspaper, Building2, User, Briefcase } from 'lucide-react';
import LogoutButton from "./LogoutButton";

function NavBar() {

  const links = [
    { href: "/dashboard/user", label: "User", icon: <User size={20} /> },
    { href: "/dashboard/projects", label: "Projects", icon: <Building2 size={20} /> },
    { href: "/dashboard/articles", label: "Articles", icon: <Newspaper size={20} /> },
    { href: "/dashboard/jobs", label: "Jobs", icon: <Briefcase size={20} /> },
  ];

  return (
    <>
    <nav className="fixed bottom-0 md:top-0 left-0 h-16 md:h-full w-full md:w-16 md:hover:w-42 rounded-tr-lg rounded-br-lg bg-blue-600 z-40 group transition-all duration-300  overflow-hidden">
      <ul className="w-full flex flex-row md:flex-col items-center gap-1 md:gap-6 mt-0 md:mt-20 px-2">
        {links.map((link) => (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              className="flex flex-col md:flex-row items-center h-10 gap-2 md:gap-6 text-white font-semibold px-3 py-2"
            >
              <span>{link.icon}</span>
              <span className="whitespace-nowrap">
                {link.label}
              </span>
            </Link>
          </li>
        ))}
        <li 
        onClick={() => document.getElementById("logout-btn")?.click()}
        className="relative md:absolute md:bottom-10 w-full flex flex-col md:flex-row items-center h-10 gap-0 md:gap-3 text-white font-semibold cursor-pointer">
          <LogoutButton id="logout-btn"/> <span className="whitespace-nowrap">Log out</span>
        </li>
      </ul>
    </nav>
    </>
  );
}

export default NavBar;


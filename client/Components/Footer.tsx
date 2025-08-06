"use client";
import React, { useState } from "react";
import Link from "next/link";

interface NavLink {
    href: string;
    label: string;
}

function Footer() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const links: NavLink[] = [
        { href: "/projects", label: "PROJECTS" },
        { href: "/services", label: "SERVICES" },
        { href: "/careers", label: "CAREERS" },
        { href: "/about", label: "ABOUT US" },
        { href: "/research", label: "RESEARCH & INNOVATION" },
        { href: "/news", label: "NEWS & INSIGHTS" },
        { href: "/team", label: "OUR GLOBAL TEAM" },
        { href: "/awards", label: "AWARDS" },
        { href: "/contact", label: "CONTACT US" },
    ];

    return (
        <footer className="w-full bg-black text-white p-10">

            <div className="flex flex-col md:flex-row justify-between gap-10">
               {/* Navigation Links */}
                <nav className="w-full md:w-8/12" aria-label="Footer Navigation">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                        {links.map((link) => (
                            <li
                            key={link.href}
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className={`transition-opacity duration-300 ${
                                hoveredLink
                                    ? hoveredLink === link.href
                                        ? "opacity-100"
                                        : "opacity-40"
                                    : "opacity-100"
                                }`}
                            >
                                <Link
                                href={link.href}
                                className="font-semibold text-lg sm:text-xl transition focus:underline"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contact + Legal */}
                <div className="w-full md:w-4/12 space-y-4">
                    <div>
                        <Link
                            href="mailto:INFO@INVERTSTUDIO.COM"
                            className="text-lg underline underline-offset-8 break-words"
                            aria-label="Email Info"
                        >
                            INFO@INVERTSTUDIO.COM
                        </Link>
                    </div>
                    <p className="text-sm text-gray-400">
                        © 2025 United Network Studio •{" "}
                        <Link href="/terms" className="underline underline-offset-4">
                            Terms & Conditions
                        </Link>
                    </p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;

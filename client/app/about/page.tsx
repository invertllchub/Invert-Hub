"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const companyTitleRef = useRef<HTMLHeadingElement>(null);
  const teamTitleRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(companyTitleRef.current, {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".company-paragraph", {
        duration: 1.2,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: ".company-section",
          start: "top 80%",
        },
      });

      // Team section animation
      gsap.from(teamTitleRef.current, {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamTitleRef.current,
          start: "top 100%",
        },
      });

      gsap.from(".team-paragraph", {
        duration: 1.2,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 90%",
        },
      });

      // Quote animation
      gsap.from(quoteRef.current, {
        duration: 1.2,
        scale: 0,
        opacity: 0,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 75%",
        },
      });

      // Philosophy paragraphs
      gsap.from(".philosophy-paragraph", {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".philosophy-section",
          start: "top 70%",
        },
      });

      // Divider animations
      gsap.from(".divider", {
        duration: 1,
        scaleX: 0,
        transformOrigin: "left center",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".divider",
          start: "top 85%",
        },
      });

      // Hover animation for the meet team link
      const meetTeamLink = document.querySelector(".meet-team-link");
      if (meetTeamLink) {
        meetTeamLink.addEventListener("mouseenter", () => {
          gsap.to(meetTeamLink, {
            duration: 0.3,
            x: 10,
            ease: "power2.out",
          });
        });

        meetTeamLink.addEventListener("mouseleave", () => {
          gsap.to(meetTeamLink, {
            duration: 0.3,
            x: 0,
            ease: "power2.out",
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:py-24 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-black">
        {/* Company Section */}
        <section className="company-section mb-20">
          <h2
            ref={companyTitleRef}
            className="font-black mb-8 leading-none tracking-tight"
            style={{
              fontSize: "clamp(2rem, 0.7rem + 5.33vw, 5.5rem)",
            }}
          >
            A Company Built to Scale Creativity
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-gray-800 [&>p]:font-bold [&>p]:tracking-tight">
            <p className="company-paragraph [word-spacing:-0.5px]">
              <span className="font-semibold text-black">INVERT LLC</span> is a
              global design and consulting company operating at the intersection
              of architecture, publishing, and systems innovation.
            </p>
            <p className="company-paragraph [word-spacing:-0.5px]">
              We work with forward-thinking founders, studios, artists, and
              organizations to turn ideas into structured, scalable realities.
              From the foundations of physical space to the architecture of
              digital business models, we support those who create, and those
              who want to grow.
            </p>
            <p className="company-paragraph italic border-l-2 border-gray-300 pl-4 py-1 mt-6 [word-spacing:-0.5px]">
              We are based in Berlin and Dubai, with collaborators across
              Europe, the Middle East, and beyond.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="divider border-t border-gray-200 my-16"></div>

        {/* Team Section */}
        <section className="mb-20">
          <h2
            ref={teamTitleRef}
            className="font-black mb-8 leading-none tracking-tight"
            style={{
              fontSize: "clamp(2rem, 0.7rem + 5.33vw, 5.5rem)",
            }}
          >
            A Collective of Designers,
            <br />
            Strategists, and System Builders
          </h2>
          <div className="team-section space-y-5 text-lg leading-relaxed text-gray-800 [&>p]:font-bold [&>p]:tracking-tight">
            <p className="team-paragraph [word-spacing:-0.5px]">
              Our team combines backgrounds in architecture, creative direction,
              business strategy, automation, publishing, and software
              development.
            </p>
            <p className="team-paragraph font-medium text-black border-l-2 border-black pl-4 py-1 my-6 [word-spacing:-0.5px]">
              We don't believe in departments, we believe in cross-functional
              thinking.
            </p>
            <p className="team-paragraph [word-spacing:-0.5px]">
              Each project is supported by a curated mix of talent across
              disciplines, handpicked to fit the vision.
            </p>
          </div>
          <p className="meet-team-link mt-8 text-lg font-light border-l-2 border-black pl-4 py-1 transition-all duration-300 cursor-pointer [word-spacing:-0.5px]">
            → Meet the people behind WOW WORLD, ArchYards, and From Zero to
            Hero.
          </p>
        </section>

        {/* Divider */}
        <div className="divider border-t border-gray-200 my-16"></div>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <blockquote ref={quoteRef} className="text-center mb-16">
            <p
              className="italic leading-tight max-w-2xl mx-auto"
              style={{
                fontSize: "clamp(1.5rem, 0.5rem + 4vw, 4rem)",
              }}
            >
              "Design isn't what we do, it's how we think."
            </p>
          </blockquote>
          <div className="space-y-5 text-lg leading-relaxed text-gray-800 max-w-3xl mx-auto [&>p]:font-bold [&>p]:tracking-tight">
            <p className="philosophy-paragraph [word-spacing:-0.5px]">
              At INVERT, we treat every problem as a system, every opportunity
              as a structure to be shaped.
            </p>
            <p className="philosophy-paragraph [word-spacing:-0.5px]">
              Whether it's visual, spatial, digital, or strategic, our work aims
              to elevate creativity through clarity.
            </p>
            <p className="philosophy-paragraph font-medium text-black py-4 border-t border-b border-gray-300 text-center [word-spacing:-0.5px]">
              We don't chase trends,
              <br />
              We build tools, platforms, and identities that stand the test of
              evolution.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

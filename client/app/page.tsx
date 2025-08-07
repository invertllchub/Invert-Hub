"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScreenText from "@/components/ScreenText";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface VerticalItem {
  number: number;
  title: string;
  desc: string;
  video: string;
  img: string;
}

export default function HomePage() {
  // ✅ تحديد نوع الـ ref كـ HTMLDivElement
  const verticalRef = useRef<HTMLDivElement>(null);

  const verticalItems: VerticalItem[] = [
    {
      number: 1,
      title: "MERCEDES-BENZ MUSEUM",
      desc: "TURN A SHOW ROOM INTO A MUSEUM",
      video:
        "https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4",
      img: "/pic2.webp",
    },
    {
      number: 2,
      title: "BOOKING.COM CITY CAMPUS",
      desc: "MAKE AN OFFICE BUILDING FEEL LIKE A RESORT",
      video:
        "https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4",
      img: "/pic4.webp",
    },
    {
      number: 3,
      title: "DOHA METRO NETWORK",
      desc: "CONVERT A SINGLE DESIGN MANUAL INTO ENDLESS POSSIBILITIES",
      video:
        "https://videos.pexels.com/video-files/4328514/4328514-uhd_2560_1440_30fps.mp4",
      img: "/pic3.webp",
    },
    {
      number: 4,
      title: "WESTK PERFORMING ARTS CENTER",
      desc: "TRANSFORM A THREAT COMPLEX INTO A PERFOMANCE",
      video:
        "https://videos.pexels.com/video-files/2871916/2871916-hd_1920_1080_30fps.mp4",
      img: "/pic5.webp",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Reset scroll on refresh

    const ctx = gsap.context(() => {
      // 🔥 Animation 1: تصغير أول سيكشن
      gsap.fromTo(
        ".section1",
        { opacity: 1, scale: 1, transformOrigin: "bottom center" },
        {
          opacity: 0.7,
          scale: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section1",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 🔥 Animation 2: Parallax للـ yellow
      gsap.fromTo(
        ".yellow",
        { y: 0 },
        {
          y: -50,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".yellow",
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      // 🔥 Animation 3: Vertical Scroll (stacking items)
      const section = verticalRef.current;
      if (!section) return; // ✅ تفادي null error

      // ✅ typing للعناصر كـ HTMLElement
      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".item")
      );

      items.forEach((item, index) => {
        gsap.set(item, { scale: 0.9, y: 15 });
        if (index !== 0) gsap.set(item, { yPercent: 100 });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${items.length * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power1.inOut" },
      });

      items.forEach((item, index) => {
        timeline.to(item, { scale: 0.7, borderRadius: "10px", opacity: 0 });
        if (items[index + 1]) {
          timeline.to(items[index + 1], { yPercent: 0 }, "<");
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-black text-[#292929] overflow-x-hidden">
      {/* Section 1 */}
      <section className="section1 relative overflow-hidden h-[100vh]">
        <div className="wrapper h-full relative flex justify-center items-center p-4 md:justify-start md:p-1">
          <div className="absolute inset-0 w-full h-full shadow-lg">
            <div className="relative w-full h-screen overflow-hidden">
              <video
                src="https://videos.pexels.com/video-files/2871916/2871916-hd_1920_1080_30fps.mp4"
                autoPlay
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
              <ScreenText />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-[#f6f6f6] via-sky-100 to-sky-200">
        {/* Section 2 */}
        <section className="w-full py-10 md:py-16 text-start">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-black px-4 md:px-16">
            We’ve always thrived on thinking differently — because that’s where
            true progress lies. We look beyond architecture. We explore
            limitless ideas. We discover unseen potential. We are UNS, we see
            what others miss.
          </h2>
          <div className="w-full text-start px-4 md:px-16 mt-6 md:mt-10">
            <div className="w-full md:w-6/12 md:ml-auto">
              <p className="text-lg md:text-xl font-semibold text-gray-700">
                The best ideas are born from collaboration. With seven offices
                spanning four continents, our dedicated teams are not afraid to
                challenge themselves, our clients and our collaborators to go
                beyond the predictable. In this quest, we uncover hidden
                opportunities to transform the built environment all around the
                world.
              </p>
              <h1 className="text-lg md:text-xl font-semibold mt-4 md:mt-10">
                ABOUT US
              </h1>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="w-full min-h-[100vh]  flex flex-col items-center justify-center gap-6 px-4 py-12">
          <h1 className="text-sm sm:text-base md:text-lg font-semibold">
            OUR PROJECTS
          </h1>
          <h2 className="font-sans text-3xl sm:text-5xl md:text-[88px] font-[900] leading-tight text-black text-center">
            WE SAW THE <br /> OPPORTUNITY <br /> TO...
          </h2>
        </section>

        {/* Section 4 - Vertical Scroll */}
        <section
          ref={verticalRef}
          className="vertical-section relative overflow-hidden h-screen z-10"
        >
          <div className="wrapper h-full relative flex flex-col gap-[20vh] items-center p-1">
            {verticalItems.map((item, index, arr) => (
              <div
                key={item.number}
                className="item bg-white absolute w-full h-full flex flex-col sm:flex-row shadow-lg overflow-hidden p-5"
              >
                <div className="relative w-full sm:w-1/2 h-[60vh] md:h-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div
                  className="item_content relative flex flex-col justify-center text-center 
                md:text-start bg-white text-[#292929] p-6 sm:p-12 sm:w-1/2 w-full h-[40vh] sm:h-full"
                >
                  <h2 className="text-sm md:text-lg font-bold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-2xl sm:text-5xl md:text-7xl font-bold">
                    {item.desc}
                  </p>
                  <div className="w-full h-10 flex items-center justify-between absolute bottom-0 left-0 p-6">
                    <p>{`${String(index + 1).padStart(2, "0")} / ${String(
                      arr.length
                    ).padStart(2, "0")}`}</p>
                    <p className="text-base sm:text-lg font-semibold underline underline-offset-8">
                      ALL PROJECTS
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Section 5 - Architecture */}
      <section className="yellow w-full bg-[#f6f6f6] text-black p-6 sm:p-10 md:p-16 mt-12">
        <h1 className="font-sans text-3xl sm:text-5xl md:text-[88px] font-[900] leading-tight">
          ARCHITECTURE <br /> AND BEYOND
        </h1>
        <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold mt-6">
          Our studio is fueled by a passion to question and provoke. Our melting
          pot of expertises leads to interwoven design and consultancy solutions
          that deliver beyond the brief.
        </h2>
        <p className="text-lg md:text-xl font-semibold underline underline-offset-8 mt-16">
          OUR SERVICES
        </p>
        <div className="relative mt-10 w-full object-cover h-[400px] md:h-[800px] rounded-md overflow-hidden">
          <Image alt="" src="/pic7.webp" fill className="object-cover" />
        </div>

        <div className="w-full mt-12 space-y-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
              Design
            </h1>
            <div className="w-full md:w-6/12">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                Delivering transformative design solutions across all scales and
                disciplines.
              </p>
              <p className="text-lg md:text-xl font-semibold underline underline-offset-8 mt-10">
                FIND OUT MORE
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold">
              Consulting
            </h1>
            <div className="w-full md:w-6/12">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold">
                Unlocking new possibilities in sustainability, economics,
                technology, and health
              </p>
              <p className="text-lg md:text-xl font-semibold underline underline-offset-8 mt-10">
                FIND OUT MORE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 - Research */}
      <section className="yellow w-full bg-black text-white p-6 sm:p-10 md:p-16 mt-10">
        <h1 className="text-3xl sm:text-5xl md:text-[88px] font-[900] ">
          RESEARCH AND <br /> INNOVATION
        </h1>
        <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold mt-6">
          We see no reason to limit our ambition. We always ask ourselves, this
          and..? What can we do next and how can we offer greater value? Our
          expanding capabilities and Research & Innovation teams set us up to
          grow beyond architecture. And then some.
        </h2>
        <p className="sm:text-lg md:text-xl font-semibold underline underline-offset-8 mt-16">
          FIND OUT MORE
        </p>
        <div className="relative mt-10 w-full object-cover h-[400px] md:h-[800px] rounded-md overflow-hidden">
          <Image alt="" src="/pic7.webp" fill className="object-cover" />
        </div>
      </section>

      <div className=" bg-[#f6f6f6]">
        {/* Section 7 - Join the Team */}
        <section className="yellow w-full bg-[#f6f6f6] text-black mt-10">
          <div className="p-6 sm:p-10 md:p-14">
            <h1 className="font-sans text-3xl sm:text-5xl md:text-[88px] font-[900]">
              JOIN THE TEAM
            </h1>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-semibold mt-6">
              Join us on a journey where perspective is everything and where the
              usual angles are just the starting point.
            </h2>
            <p className="sm:text-lg md:text-xl font-semibold underline underline-offset-8 mt-6">
              CAREERS
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 p-6 gap-4">
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <div key={index} className="relative w-full aspect-[3/4]">
                  <Image
                    alt={`Team Member ${index + 1}`}
                    src="/pic6.webp"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 8 - Contact */}
        <section className="yellow w-full h-[100vh] bg-[#f6f6f6] text-black p-6 md:p-16">
          <div
            className="w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8 mt-10 py-10 px-4 
    bg-gradient-to-r from-yellow-200/70 to-yellow-100 rounded-lg"
          >
            <div className="w-full md:w-8/12 h-full flex flex-col justify-between text-start p-4">
              <p className="text-xl md:text-5xl font-semibold">
                We integrate architecture, urban planning, interior design,
                product and experience design with consulting services that
                tackle every-day challenges. Curious to know more?
              </p>
              <p className="sm:text-lg md:text-xl font-semibold underline underline-offset-8 mt-6">
                GET IN TOUCH
              </p>
            </div>
            <div className="relative w-full md:w-4/12 h-[500px] md:h-[600px] rounded-md overflow-hidden">
              <Image
                alt="Description"
                src="/pic7.webp"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

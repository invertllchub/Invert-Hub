import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper4 } from "../Swipers";
import { CareersType } from "@/types/careers";

function SwiperSection() {
  const [careers, setCareers] = useState<CareersType | null>(null);

  // fetch data
  const fetchData = async () => {
    try {
      const res = await fetch("/careers.json");
      const json = await res.json();
      setCareers(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {/* swiper section */}
      <section className="px-4 md:px-12 mt-48">
        <h1 className="w-full text-4xl md:text-7xl font-extrabold">
          OUR LOCATIONS
        </h1>
        <Swiper4 locations={careers?.locations || []} />
      </section>
      <section className="w-full h-full flex flex-col md:flex-row items-center mt-48">
        <div className="w-full md:w-6/12 h-full mb-auto px-8">
          <h1 className="text-2xl md:text-5xl font-semibold">
            Our recruitment team
          </h1>
        </div>
        <div className="relative mx-auto md:mx-0 w-10/12 md:w-3/12 h-[300px] md:h-[400px] mt-12 md:mt-0">
          <Image
            alt="recruitment team picture"
            src="https://res.cloudinary.com/dntdescqh/image/upload/v1756029274/consulting-00_jamh0m.webp"
            fill
            className="object-cover"
          />
          <h4 className="absolute -bottom-10 left-0">Marjolein 't Jong</h4>
        </div>
      </section>
    </div>
  );
}

export default SwiperSection;

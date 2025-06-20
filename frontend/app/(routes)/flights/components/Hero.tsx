"use client";

import { useState } from "react";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/selectComponents/SelectFieldA";
import { Search } from "lucide-react";
import FlightSearchBox from "./FlightSearchBox";

const Hero = ({filters  , setFilters} : any) => {


  return (
    <section className="relative w-full md:h-[80vh] h-[110vh]">
      <Image
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80"
        priority
        alt="hero image"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Search Box */}
     <FlightSearchBox filters={filters} setFilters={setFilters}  />
    </section>
  );
};

export default Hero;

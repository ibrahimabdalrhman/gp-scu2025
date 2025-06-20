"use client";
import { use } from "react";
import Breadcrumb from "@/components/BreadCrumb";
import Hero from "../components/Hero";
import HotelGallery from "../components/HotelGallery";
import HotelDescription from "../components/HotelDescription";
import RoomSelection from "../components/roomSelection/RoomSelection";
import FAQ from "../components/FAQ";
import { useFetchData } from "@/hooks/useFetchData";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { data } = useFetchData(`hotel/${unwrappedParams.id}`, "hotelDetail");
  console.log("city name : => s",data?.city);
  return (
    <section className="">
      <Hero />

      {/* <Breadcrumb/> */}
      <div className="mt-32"></div>
      <HotelGallery 
        name={data?.name} 
        city={data?.city?.name} 
        country={data?.country?.name} 
        images={data?.images}
        stayType={data?.stayType}
        type={data?.type}
        id={data?._id}
        
        />
      <HotelDescription 

        desc={data?.description} 
        features={data?.featured} 
        totalRooms={data?.totalRooms}
        availableRooms={data?.availableRooms}
        reservedRooms={data?.reservedRooms}
        availableStatus={data?.availableStatus}
        price={data?.price}
      />
      {/* <RoomSelection hotelId={unwrappedParams.id} /> */}
      <FAQ />
    </section>
  );
}

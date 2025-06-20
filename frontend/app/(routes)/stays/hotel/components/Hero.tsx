import SearchBox from "@/components/SearchBox";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="relative w-full md:h-[20vh] h-[70vh]"
    >
      <Image src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80" priority={true} alt="hero image" width={800} height={800} className="absolute inset-0 w-full h-full object-cover"/>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>



        {/* Search Box */}
        <div className="w-full max-w-[80%] mx-auto absolute md:bottom-0 bottom-1/2 translate-y-1/2 t left-0 right-0 z-10">
       <SearchBox/>
   
      </div>
    </section>
  );
};

export default Hero;

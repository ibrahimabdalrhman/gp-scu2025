import SearchBox from "@/components/SearchBox";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full md:h-[500px] h-full bg-cover bg-center">
      <Image
        src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80"
        priority={true}
        alt="hero image"
        width={800}
        height={800}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative container h-full flex flex-col items-center md:justify-center md:py-0 py-10 text-center">
        <h1 className="heading-one mb-6 text-white">
          From dream destinations to real experiences,
          <br />
          start your journey today
        </h1>

        <div className="w-full max-w-3xl mt-8">
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default Hero;

import Image from "next/image";

const OurStory = () => (
  <div className="container py-8 md:py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <Image
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          alt="Hotel Staff"
          width={500}
          height={500}
          className="rounded-lg w-full object-cover shadow-lg"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="heading-two mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          Founded in 2005, our hotel has been providing exceptional service and comfort to guests from around the world. We believe in creating memorable experiences through personalized service and attention to detail.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Our team of dedicated professionals is committed to ensuring that every aspect of your stay exceeds your expectations, from the moment you arrive until your departure.
        </p>
      </div>
    </div>
  </div>
);

export default OurStory;

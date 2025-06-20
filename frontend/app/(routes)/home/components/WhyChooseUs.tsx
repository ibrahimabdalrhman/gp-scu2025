import { featuresData } from "@/data";
const WhyChooseUs = () => {
  return (
    <section className="container md:py-16 py-6">
      <h2 className="heading-two mb-10 text-center">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto w-16 h-16 bg-lightText rounded-full flex items-center justify-center mb-4">
              <feature.icon className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-lightText">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

import ContactForm from "./components/ContactForm";
import ContactInfoCard from "./components/ContactInfoCard";
import SectionHeader from "./components/SectionHeader";

const page = () => {
  return (
    <div className="container md:py-16 py-6">
      <div className="flex flex-col space-y-6 ">
        <SectionHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ContactForm />
          <ContactInfoCard />
        </div>
      </div>
    </div>
  );
};

export default page;

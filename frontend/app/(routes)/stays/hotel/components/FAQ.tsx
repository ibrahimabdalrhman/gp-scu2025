import FAQITEM from "@/components/FAQITEM";
import { faqData } from "@/data";
import { IFaqItemProps } from "@/types";

const FAQ = () => {
  return (
    <section className="container md:py-16 py-6">
      <h2 className="heading-three mb-8">Frequently Asked Questions</h2>

      <div className="">
        {faqData.map((faq, index) => (
          <FAQITEM 
            key={index}
            question={faq.question}
            answer={faq.answer}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;

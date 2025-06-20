import TourCard from "@/components/tourCard/TourCard";
import { toursData } from "@/data";
import { ITourType } from "@/types";
import Link from "next/link";

const RecommendedTours = () => {
  return (
    <section className="container md:py-16 py-6">
      <h2 className="mb-10  heading-two">Recommended Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toursData.map((tour: ITourType) => (
          <Link href={`/stays`} key={tour.id}>
            <TourCard
              image={tour.image}
              name={tour.name}
              hotels={tour.hotels}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedTours;

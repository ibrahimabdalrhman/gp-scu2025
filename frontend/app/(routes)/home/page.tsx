import Hero from "./components/Hero";
import RecommendedTours from "./components/RecommendedTours";
import Testimonials from "./components/Testimonials";
import TopDestination from "./components/TopDestination";
import WhyChooseUs from "./components/WhyChooseUs";
import ExploreStays from "./components/ExploreStays";
import PopularCities from "./components/PopularCities";
import VoiceToText from "@/components/A";
import Dictaphone from "@/components/A";

const HomePage =  () => {
    
    return (
        <section className="homePage">
            {/* <VoiceToText/> */}
            <Hero/>
            <ExploreStays/>
            <PopularCities/>
            <RecommendedTours/>
            <TopDestination/>
            <WhyChooseUs/>
            <Testimonials/>
        </section>
    );
}

export default HomePage
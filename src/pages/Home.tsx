import Hero from "../components/Hero";
import BoostEnergy from "../components/BoostEnergy";
import Productshowcase from "../components/ProductShowcase";
import ScienceBacked from "../components/ScienceBacked";
import OurMission from "../components/OurMission";
import ParallexSection from "../components/ParallexSection";
import FeaturedOn from "../components/FeaturedOn";
import HeroMissionVideo from "../components/HeroMissionVideo";
import ReviewTemplate from "../components/ReviewTemplate";
import HomeNewsletter from "../components/HomeNewsletter";
import Cart from "../components/Cart";

const Home = () => {
  const review = [
    {
      image: "/homereview/pexels-danxavier-1212984.jpg",
      name: "Aura W.",
      comment:
        "Finally,a product that delivers on its promises.My skin glows, and i feel amazing inside and out.",
    },

    {
      image: "/homereview/testimonial-lady.webp",
      name: "Kavya S.",
      comment:
        "A game-changer for my daily routine.I wake up refreshed and ready to take on the day like never before!",
    },
  ];
  return (
    <main>
      <Hero />
      <Productshowcase />
      <div className="w-full">
        <BoostEnergy />
      </div>
      <ScienceBacked />
      <OurMission />
      <ParallexSection />
      <FeaturedOn />
      <HeroMissionVideo />
      <div>
        <ReviewTemplate review={review} />
      </div>
      <HomeNewsletter />
    </main>
  );
};

export default Home;

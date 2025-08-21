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
import Profile from "./Profile";

const Home = () => {
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
      <ReviewTemplate />
      <HomeNewsletter />
      <Profile />
    </main>
  );
};

export default Home;

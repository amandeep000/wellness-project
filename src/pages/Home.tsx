import Hero from "../components/Hero";
import BoostEnergy from "../components/BoostEnergy";
import Productshowcase from "../components/ProductShowcase";
import ScienceBacked from "../components/ScienceBacked";
import OurMission from "../components/OurMission";
import ParallexSection from "../components/ParallexSection";
import FeaturedOn from "../components/FeaturedOn";

const Home = () => {
  return (
    <main>
      <Hero />
      <Productshowcase />
      <BoostEnergy />
      <OurMission />
      <ScienceBacked />
      <ParallexSection />
      <FeaturedOn />
    </main>
  );
};

export default Home;

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
import Footer from "../components/Footer";
import ResponsiveNav from "../components/ResponsiveNav";
import ShopHover from "../components/ShopHover";
import Search from "../components/Search";
import OurBestsellers from "../components/OurBestsellers";

const Home = () => {
  return (
    <main>
      <Hero />
      <Productshowcase />
      <BoostEnergy />
      <ScienceBacked />
      <OurMission />
      <ParallexSection />
      <FeaturedOn />
      <HeroMissionVideo />
      <ReviewTemplate />
      <HomeNewsletter />
      {/* <OurBestsellers /> */}
      {/* <Footer /> */}
      {/* <Search /> */}
      {/* <ShopHover /> */}
      {/* <ResponsiveNav /> */}
    </main>
  );
};

export default Home;

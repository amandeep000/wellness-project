import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import Science from "../pages/Science";
import About from "../pages/About";
import Shop from "../pages/Shop";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/science" element={<Science />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
    </Route>
  )
);
export default Router;

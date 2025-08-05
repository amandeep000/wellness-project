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

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/science" element={<Science />} />
    </Route>
  )
);
export default Router;

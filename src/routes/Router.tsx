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
import ProductPage from "../pages/ProductPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import SearchPage from "../pages/SearchPage";
import MyOrdersPage from "../pages/MyOrders";
import AdminPanel from "../pages/AdminPage";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/science" element={<Science />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop/:categorySlug" element={<Shop />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/success" element={<CheckoutSuccess />} />
      <Route path="/order" element={<MyOrdersPage />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Route>
  )
);
export default Router;

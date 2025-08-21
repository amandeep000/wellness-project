import Header from "./Header";
import CartSlider from "./CartSlider";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Overlay from "./Overlay";
import ScrollLock from "./ScrollLock";

const Layout = () => {
  return (
    <div>
      <Header />
      <Overlay />
      <CartSlider />
      <ScrollLock />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

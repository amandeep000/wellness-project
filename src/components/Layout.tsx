import Header from "./Header";
import Cart from "./Cart";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Overlay from "./Overlay";
import ScrollLock from "./ScrollLock";

const Layout = () => {
  return (
    <div>
      <Header />
      <Overlay />
      <Cart />
      <ScrollLock />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

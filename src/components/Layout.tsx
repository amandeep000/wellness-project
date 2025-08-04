import Header from "./Header";
import CartSlider from "./CartSlider";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <CartSlider />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

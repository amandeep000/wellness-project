import Header from "./Header";
import CartSlider from "./CartSlider";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <CartSlider />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

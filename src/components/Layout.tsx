import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col gradient-bg-mesh">
      <Navbar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
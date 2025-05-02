import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Outlet />
      {location.pathname !== "/inbox" && <Footer />}
    </>
  );
}

export default Layout;

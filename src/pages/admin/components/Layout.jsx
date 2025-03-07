import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="w-full  h-[100vh] flex bg-[#F2F7FB]">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`h-full transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[15%] md:w-[30%] sm:w-[50%] xs:w-[65%] fixed lg:static z-50`}
      >
        <Sidebar
          toggleSidebar={toggleSidebar}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Main Content */}
      <div className="overflow-y-scroll md:h-full h-auto flex-1 lg:w-[85%] w-full transition-all duration-300 pb-14 md:pb-0">
        <Navbar toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

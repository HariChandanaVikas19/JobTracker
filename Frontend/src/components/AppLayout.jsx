import { Outlet } from "react-router-dom";
import SiteNavbar from "./SiteNavbar";


const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#F4F8FB] font-body text-slate-800">
      <SiteNavbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;

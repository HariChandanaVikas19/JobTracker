import { NavLink, Outlet } from "react-router-dom";
import Logo from "./Logo";

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-blue-700 text-white" : "text-blue-800 hover:bg-blue-100"}`;

export default function NavbarLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <aside className="w-full shrink-0 bg-blue-50 px-4 py-4 md:min-h-screen md:w-60 md:px-5 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 md:flex-col md:items-stretch md:justify-start md:gap-10">
          <Logo />
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2 md:flex-col md:items-stretch">
            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/profile" className={navClass}>Profile</NavLink>
            <NavLink to="/signup" className={navClass}>Signup</NavLink>
            <NavLink to="/login" className={navClass}>Login</NavLink>
          </nav>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

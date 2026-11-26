import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/useAuth";

const linkBase =
  "rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";

const navLinkClass = ({ isActive }) =>
  `${linkBase} ${
    isActive
      ? "bg-blue-100 text-blue-800"
      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
  }`;

const sectionLinkClass = `${linkBase} text-slate-600 hover:bg-blue-50 hover:text-blue-700`;
const signupClass = `${linkBase} bg-blue-700 px-4 text-white hover:bg-blue-800`;

const SiteNavbar = () => {
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const showSections = !isLoggedIn && pathname === "/";
  const showLogin = !isLoggedIn && pathname !== "/signup";
  const showSignup = !isLoggedIn && pathname !== "/login";

  const links = (
    <>
      <NavLink to="/" end className={navLinkClass} onClick={close}>
        Home
      </NavLink>

      {isLoggedIn && (
        <>
          <NavLink to="/jobs" className={navLinkClass} onClick={close}>
            Jobs
          </NavLink>
          <NavLink to="/profile" className={navLinkClass} onClick={close}>
            Profile
          </NavLink>
        </>
      )}

      {showSections && (
        <>
          <a href="#features" className={sectionLinkClass} onClick={close}>
            Features
          </a>
          <a href="#how-it-works" className={sectionLinkClass} onClick={close}>
            How it works
          </a>
        </>
      )}

      {showLogin && (
        <NavLink to="/login" className={navLinkClass} onClick={close}>
          Log in
        </NavLink>
      )}
      {showSignup && (
        <NavLink to="/signup" className={signupClass} onClick={close}>
          Sign up
        </NavLink>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-[#F4F8FB]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links}
        </nav>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-800 transition hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="flex flex-col gap-1 border-t border-blue-100 bg-[#F4F8FB] px-4 py-3 md:hidden"
        >
          {links}
        </nav>
      )}
    </header>
  );
};

export default SiteNavbar;

import { Link } from "react-router-dom";
import Logo from "../Logo";

const Footer = ({ loggedIn }) => {
  return (
    <footer className="border-t border-blue-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Logo />

        <nav
          aria-label="Footer"
          className="flex gap-6 text-sm font-medium text-slate-600"
        >
          {loggedIn ? (
            <Link to="/jobs" className="transition hover:text-blue-700">
              My jobs
            </Link>
          ) : (
            <>
              <Link to="/login" className="transition hover:text-blue-700">
                Log in
              </Link>
              <Link to="/signup" className="transition hover:text-blue-700">
                Sign up
              </Link>
            </>
          )}
        </nav>

        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} JobTracker
        </p>
      </div>
    </footer>
  );
};

export default Footer;

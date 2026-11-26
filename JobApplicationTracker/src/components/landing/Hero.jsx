import { Link } from "react-router-dom";
import PipelineDemo from "./PipelineDemo";

const Hero = ({ loggedIn }) => {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
      <div>
        <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
          Know where every job application stands.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-600">
          Add each job you apply for, move it from Applied to Interview to
          Offer, and see your whole search on one screen.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {loggedIn ? (
            <Link
              to="/jobs"
              className="rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            >
              Open my jobs
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="rounded-lg bg-blue-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-blue-200 bg-white px-6 py-3 text-base font-semibold text-blue-800 transition hover:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>

      <PipelineDemo />
    </section>
  );
};

export default Hero;

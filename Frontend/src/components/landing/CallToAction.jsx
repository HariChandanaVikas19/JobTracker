import { Link } from "react-router-dom";

const CallToAction = ({ loggedIn }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="rounded-2xl bg-blue-700 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="font-display mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Start with the job you applied to today.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-blue-100">
          Add it now, and your next update takes one click.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {loggedIn ? (
            <Link
              to="/add-job-form"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
            >
              Add job
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-blue-300 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

const STATUS_PILLS = [
  { label: "Applied", style: "bg-cyan-100 text-cyan-800" },
  { label: "Interview", style: "bg-amber-100 text-amber-800" },
  { label: "Offer", style: "bg-blue-100 text-blue-800" },
  { label: "Rejected", style: "bg-red-100 text-red-700" },
];

const Features = () => {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24"
    >
      <h2
        id="features-title"
        className="font-display max-w-xl text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
      >
        Everything about an application, on one card.
      </h2>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col rounded-2xl bg-blue-950 p-6 text-white sm:p-8 lg:col-span-7">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Update a status from the job card.
          </h3>
          <p className="mt-3 max-w-md leading-relaxed text-blue-100">
            Choose Edit on any job, pick the new status, and save. The list
            changes right away, so you always see what needs follow-up.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5 lg:mt-auto lg:pt-8">
            {STATUS_PILLS.map((pill) => (
              <li
                key={pill.label}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${pill.style}`}
              >
                {pill.label}
              </li>
            ))}
          </ul>
        </div>
        <ul className="divide-y divide-blue-100 lg:col-span-5">
          <li className="pb-6">
            <h3 className="font-display text-lg font-bold text-blue-950">
              Details you will need later
            </h3>
            <p className="mt-1 leading-relaxed text-slate-600">
              Save the company, role, location, and package for each
              application, so you don&rsquo;t dig through old emails.
            </p>
          </li>

          <li className="py-6">
            <h3 className="font-display text-lg font-bold text-blue-950">
              Skills on every job
            </h3>
            <p className="mt-1 leading-relaxed text-slate-600">
              Tag the skills a posting asks for and spot what roles have in
              common.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React", "Redux", "Node.js"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </li>

          <li className="pt-6">
            <h3 className="font-display text-lg font-bold text-blue-950">
              Behind your own login
            </h3>
            <p className="mt-1 leading-relaxed text-slate-600">
              Log in to see your list. It&rsquo;s only for you.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Features;

const STEPS = [
  {
    title: "Add the job",
    text: "Enter the company, role, location, package, and skills when you apply.",
  },
  {
    title: "Update the status",
    text: "Move it to Interview, Offer, or Rejected as you hear back.",
  },
  {
    title: "Review your search",
    text: "Open your list to see every application and where it stands.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="scroll-mt-20 border-y border-blue-100 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2
          id="how-title"
          className="font-display max-w-xl text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
        >
          From applying to offer in three steps.
        </h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative">
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-12 right-[-1rem] top-5 hidden h-px bg-blue-200 md:block"
                />
              )}
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-display text-lg font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-blue-950">
                {step.title}
              </h3>
              <p className="mt-1 max-w-xs leading-relaxed text-slate-600">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;

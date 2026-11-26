import { useState } from "react";
const STAGES = ["Applied", "Interview", "Offer"];

const PILL_STYLES = {
  Applied: "bg-cyan-100 text-cyan-800",
  Interview: "bg-amber-100 text-amber-800",
  Offer: "bg-blue-100 text-blue-800",
};

const COUNT_STYLES = {
  Applied: "text-cyan-700",
  Interview: "text-amber-700",
  Offer: "text-blue-700",
};

const SAMPLE_JOBS = [
  {
    id: 1,
    company: "Northwind Labs",
    role: "React Developer",
    location: "Hyderabad",
    status: "Applied",
    skills: ["React", "Redux"],
  },
  {
    id: 2,
    company: "Brightloop",
    role: "Frontend Engineer",
    location: "Remote",
    status: "Applied",
    skills: ["Tailwind", "REST"],
  },
  {
    id: 3,
    company: "Kestrel Systems",
    role: "UI Developer",
    location: "Bengaluru",
    status: "Interview",
    skills: ["JavaScript", "Figma"],
  },
];

const nextStage = (status) =>
  STAGES[(STAGES.indexOf(status) + 1) % STAGES.length];

const PipelineDemo = () => {
  const [jobs, setJobs] = useState(SAMPLE_JOBS);

  const advance = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: nextStage(job.status) } : job
      )
    );
  };

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-blue-700 sm:translate-x-4 sm:translate-y-4"
      />

      <div className="relative rounded-2xl border border-blue-100 bg-white p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-blue-950">
            My job applications
          </h2>
          <span className="text-xs text-slate-500">
            {jobs.length} applications
          </span>
        </div>
        <dl
          aria-live="polite"
          className="mt-4 grid grid-cols-3 divide-x divide-blue-100 rounded-xl bg-[#F4F8FB]"
        >
          {STAGES.map((stage) => (
            <div key={stage} className="px-3 py-3">
              <dt className="text-xs font-medium text-slate-500">{stage}</dt>
              <dd
                className={`font-display text-3xl font-extrabold tabular-nums ${COUNT_STYLES[stage]}`}
              >
                {jobs.filter((job) => job.status === stage).length}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 space-y-3">
          {jobs.map((job) => {
            const next = nextStage(job.status);
            return (
              <li
                key={job.id}
                className="rounded-xl border border-slate-200 p-3 sm:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {job.company}
                    </p>
                    <p className="truncate text-sm text-slate-600">
                      {job.role} &middot; {job.location}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                      PILL_STYLES[job.status]
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => advance(job.id)}
                    aria-label={`Move ${job.company} to ${next}`}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-blue-700 transition hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    Move to {next}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-xs text-slate-500">
          This is a demo. Select &ldquo;Move to&rdquo; on a job and watch the
          counts change.
        </p>
      </div>
    </div>
  );
};

export default PipelineDemo;

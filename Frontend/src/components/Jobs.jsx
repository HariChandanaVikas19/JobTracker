import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseURL from "../Axios/AxiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const STATUS_STYLES = {
  Applied: "bg-cyan-100 text-cyan-800",
  Interview: "bg-amber-100 text-amber-800",
  Offer: "bg-blue-100 text-blue-800",
  Rejected: "bg-red-100 text-red-700",
};

const STATUS_LABELS = {
  Applied: "Applied",
  Interview: "Interview scheduled",
  Offer: "Technical round done",
  Rejected: "Rejected",
};

const Jobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      if (!localStorage.getItem("userToken")) {
        navigate("/login");
        return;
      }
      try {
        const res = await BaseURL.get("/api/jobs");
        setJobs(Array.isArray(res.data) ? res.data : res.data.jobs ?? []);
      } catch (err) {
        if (err.response?.status === 401) {
          dispatch(logout());
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Could not load jobs");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [navigate, dispatch]);

  const removeJob = async (id) => {
    try {
      await BaseURL.delete(`/api/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete the job");
    }
  };

  const startEdit = (job) => {
    setEditingId(job._id);
    setDraftStatus(job.status);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftStatus("");
  };

  const saveStatus = async (id) => {
    try {
      const res = await BaseURL.put(`/api/jobs/${id}`, {
        status: draftStatus,
      });
      setJobs((prev) => prev.map((job) => (job._id === id ? res.data : job)));
      cancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update the status");
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-blue-700 sm:text-2xl lg:text-3xl">
              My job applications
            </h1>
            {!loading && (
              <p className="mt-1 text-sm text-gray-500">
                {jobs.length}{" "}
                {jobs.length === 1 ? "application" : "applications"}
              </p>
            )}
          </div>

          <Link
            to="/add-job-form"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-bold text-white shadow transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            + Add job
          </Link>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-16 text-center text-gray-500">Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white px-4 py-16 text-center">
            <p className="text-base font-medium text-gray-700">
              No applications yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Click "Add job" to track your first one.
            </p>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="flex flex-col rounded-2xl bg-white p-4 shadow-md
                           transition hover:shadow-lg sm:p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold text-gray-900">
                      {job.company}
                    </h2>
                    <p className="truncate text-sm text-gray-600">{job.role}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeJob(job._id)}
                    aria-label={`Delete ${job.company} application`}
                    className="flex h-7 w-7 shrink-0 items-center justify-center
                               rounded-full text-lg text-gray-400 transition
                               hover:bg-red-50 hover:text-red-600"
                  >
                    &times;
                  </button>
                </div>
                {editingId === job._id ? (
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <select
                      autoFocus
                      value={draftStatus}
                      onChange={(e) => setDraftStatus(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveStatus(job._id);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      aria-label={`Change status for ${job.company}`}
                      className="rounded-lg border border-gray-300 bg-white px-2 py-1.5
                                 text-xs font-medium text-gray-800 focus:outline-none
                                 focus:ring-2 focus:ring-cyan-300"
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => saveStatus(job._id)}
                      className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold
                                 text-white transition hover:bg-blue-600"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500
                                 transition hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        STATUS_STYLES[job.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {STATUS_LABELS[job.status] || job.status}
                    </span>

                    <button
                      type="button"
                      onClick={() => startEdit(job)}
                      aria-label={`Edit status for ${job.company}`}
                      className="rounded-md px-2 py-1 text-xs font-medium text-blue-700
                                 transition hover:bg-cyan-50"
                    >
                      Edit
                    </button>
                  </div>
                )}
                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-20 shrink-0 text-gray-500">Location</dt>
                    <dd className="min-w-0 break-words text-gray-800">
                      <span>📍</span> {job.location || "—"}
                    </dd>
                  </div>

                  <div className="flex gap-2">
                    <dt className="w-20 shrink-0 text-gray-500">Package</dt>
                    <dd className="min-w-0 break-words text-gray-800">
                      <span>💰</span> {job.package || "—"}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Skills
                  </p>

                  {!job.skills || job.skills.length === 0 ? (
                    <p className="text-sm text-gray-400">No skills added</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-cyan-100 px-3 py-1
                                     text-xs font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
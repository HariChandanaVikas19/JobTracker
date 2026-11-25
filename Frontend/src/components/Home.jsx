import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseURL from "../Axios/AxiosInstance";

const STATUS_STYLES = {
  Applied: "bg-cyan-100 text-cyan-800",
  Interview: "bg-amber-100 text-amber-800",
  Offer: "bg-blue-100 text-blue-800",
  Rejected: "bg-red-100 text-red-700",
};

const STATUS_LABELS = {
  Applied: "Applied",
  Interview: "Interview scheduled",
  Offer: "Offer",
  Rejected: "Rejected",
};

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || error.response?.data?.error || fallback;

export default function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draftStatus, setDraftStatus] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      setLoading(false);
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await BaseURL.get("/api/jobs");
      const result = response.data;
      setJobs(Array.isArray(result) ? result : result?.jobs || []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("userToken");
        navigate("/login", { replace: true });
      } else {
        setError(getErrorMessage(err, "Could not load job applications."));
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const removeJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    setError("");
    try {
      await BaseURL.delete(`/api/jobs/${id}`);
      setJobs((current) => current.filter((job) => job._id !== id && job.id !== id));
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete the job."));
    }
  };

  const startEdit = (job) => {
    setEditingId(job._id || job.id);
    setDraftStatus(job.status || "Applied");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftStatus("");
  };

  const saveStatus = async (id) => {
    setActionLoading(true);
    setError("");
    try {
      const response = await BaseURL.put(`/api/jobs/${id}`, { status: draftStatus });
      const updatedJob = response.data?.job || response.data;
      setJobs((current) => current.map((job) =>
        (job._id || job.id) === id ? { ...job, ...updatedJob, status: updatedJob?.status || draftStatus } : job
      ));
      cancelEdit();
    } catch (err) {
      setError(getErrorMessage(err, "Could not update the application status."));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="min-h-screen min-w-0 flex-1 bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pr-1">
          <div>
            <h1 className="text-xl font-bold text-blue-700 sm:text-2xl lg:text-3xl">My job applications</h1>
            {!loading && <p className="mt-1 text-sm text-gray-500">{jobs.length} {jobs.length === 1 ? "application" : "applications"}</p>}
          </div>
          <Link to="/add-job-form" className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-300">
            + Add job
          </Link>
        </div>

        {error && <div role="alert" className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => setError("")} aria-label="Dismiss error">×</button></div>}

        {loading ? (
          <p className="py-16 text-center text-gray-500">Loading applications...</p>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white px-4 py-16 text-center">
            <p className="text-base font-medium text-gray-700">No applications yet</p>
            <p className="mt-1 text-sm text-gray-500">Select “Add job” to track your first application.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {jobs.map((job) => {
              const id = job._id || job.id;
              return (
                <article key={id} className="flex min-w-0 flex-col rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0"><h2 className="truncate text-lg font-semibold text-gray-900">{job.company || "Company not specified"}</h2><p className="truncate text-sm text-gray-600">{job.role || "Role not specified"}</p></div>
                    <button type="button" onClick={() => removeJob(id)} aria-label={`Delete ${job.company || "job"} application`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600">×</button>
                  </div>

                  {editingId === id ? (
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <select value={draftStatus} onChange={(event) => setDraftStatus(event.target.value)} aria-label={`Change status for ${job.company}`} className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-300">
                        {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                      </select>
                      <button type="button" disabled={actionLoading} onClick={() => saveStatus(id)} className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-600 disabled:opacity-60">{actionLoading ? "Saving..." : "Save"}</button>
                      <button type="button" onClick={cancelEdit} className="rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100">Cancel</button>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-2"><span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[job.status] || "bg-gray-100 text-gray-700"}`}>{STATUS_LABELS[job.status] || job.status || "Unknown"}</span><button type="button" onClick={() => startEdit(job)} className="rounded-md px-2 py-1 text-xs font-medium text-blue-700 hover:bg-cyan-50">Edit</button></div>
                  )}

                  <dl className="mt-4 space-y-1 text-sm">
                    <div className="flex gap-2"><dt className="w-20 shrink-0 text-gray-500">Location</dt><dd className="min-w-0 break-words text-gray-800">📍 {job.location || "—"}</dd></div>
                    <div className="flex gap-2"><dt className="w-20 shrink-0 text-gray-500">Package</dt><dd className="min-w-0 break-words text-gray-800">💰 {job.package || "—"}</dd></div>
                  </dl>

                  <div className="mt-4"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Skills</p>{!Array.isArray(job.skills) || job.skills.length === 0 ? <p className="text-sm text-gray-400">No skills added</p> : <div className="flex flex-wrap gap-2">{job.skills.map((skill, index) => <span key={`${skill}-${index}`} className="max-w-full break-words rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-blue-700">{skill}</span>)}</div>}</div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

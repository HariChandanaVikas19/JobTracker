import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseURL from "../Axios/AxiosInstance";

const STATUS_OPTIONS = [
  { value: "Applied", label: "Applied" },
  { value: "Interview", label: "Interview" },
  { value: "Offer", label: "Offer" },
  { value: "Rejected", label: "Rejected" },
];

const initialForm = {
  company: "",
  role: "",
  location: "",
  package: "",
  status: "Applied",
};

const TOKEN_KEY = "userToken"; 

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 " +
  "placeholder-gray-400 shadow-sm transition focus:border-cyan-600 focus:outline-none " +
  "focus:ring-2 focus:ring-cyan-200";

const labelClass = "mb-1 block text-sm font-medium text-gray-700";

const AddJobForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    const exists = skills.some((s) => s.toLowerCase() === value.toLowerCase());
    if (!exists) setSkills((prev) => [...prev, value]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // stop Enter from submitting the form
      addSkill();
    } else if (e.key === "Backspace" && !skillInput && skills.length > 0) {
      // backspace on empty input removes the last skill
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // include a skill that was typed but not yet added with Enter
    const pending = skillInput.trim();
    const finalSkills =
      pending && !skills.some((s) => s.toLowerCase() === pending.toLowerCase())
        ? [...skills, pending]
        : skills;

    const jobData = { ...form, skills: finalSkills };
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await BaseURL.post("/api/jobs", jobData);
      setForm(initialForm);
      setSkills([]);
      setSkillInput("");
      navigate("/jobs"); // back to the jobs list
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-gray-100 p-2 sm:max-w-xl sm:rounded-3xl sm:p-4 md:max-w-2xl lg:max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 rounded-xl bg-white p-4 shadow-lg sm:space-y-5 sm:rounded-2xl sm:p-6 lg:p-8"
        >
          <h2 className="text-lg font-semibold text-blue-700 sm:text-xl lg:text-2xl">
            Add job application
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="company" className={labelClass}>
                Company
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Enter company name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="role" className={labelClass}>
                Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Role you applied for"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter the location"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="package" className={labelClass}>
                Package
              </label>
              <input
                type="text"
                name="package"
                id="package"
                value={form.package}
                onChange={handleChange}
                placeholder="Enter the package"
                className={inputClass}
              />
            </div>
          </div>

          {/* Skills tag input */}
          <div>
            <label htmlFor="skills" className={labelClass}>
              Skills
            </label>
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 shadow-sm transition focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-200">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex max-w-full items-center gap-1 rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-blue-700 sm:text-sm"
                >
                  <span className="break-all">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-blue-700 transition hover:bg-cyan-200 hover:text-blue-900"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                name="skills"
                id="skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder={
                  skills.length === 0
                    ? "Type a skill and press Enter"
                    : "Add more..."
                }
                className="min-w-[6rem] flex-1 border-none bg-transparent px-1 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none sm:min-w-[8rem]"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Press Enter to add a skill, click × to remove it.
            </p>
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select
              name="status"
              id="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="block w-full rounded-lg bg-cyan-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 sm:inline-block sm:w-auto"
          >
            {loading ? "Saving..." : "Add job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;
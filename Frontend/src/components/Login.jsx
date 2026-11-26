import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BaseURL from "../Axios/AxiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { getToken } from "../utils/getToken";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { email, password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await BaseURL.post("/api/users/login", userData);
      dispatch(login(getToken(res.data)));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-1.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className="flex justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-96 max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-6"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Login account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Start tracking your job applications
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className={inputClass}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-500">
          don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

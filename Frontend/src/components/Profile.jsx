import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseURL from "../Axios/AxiosInstance";

const TOKEN_KEY = "userToken"; 

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await BaseURL.get("/api/users/current");
        setUser(res.data?.user || res.data?.data || res.data);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
        localStorage.removeItem(TOKEN_KEY);
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
  };

  if (!user) {
    return <p className="p-8 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex min-w-0 flex-1 px-4 py-8 ml-[500px]">
      <div className="w-full h-[500px] max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="flex flex-col items-center bg-indigo-600 px-6 py-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-indigo-600">
            {(user.username || user.name || user.email || "U").charAt(0).toUpperCase()}
          </div>
          <h1 className="mt-3 text-xl font-semibold text-white">
            {user.username || user.name || "User"}
          </h1>
          <p className="text-sm text-indigo-100">{user.email || "—"}</p>
        </div>

        {/* Details */}
        <div className="divide-y divide-gray-100 px-6">
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-500">Username</span>
            <span className="text-sm font-medium text-gray-900">
              {user.username || user.name || "User"}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-900">
              {user.email || "—"}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-500">Joined</span>
            <span className="text-sm font-medium text-gray-900">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg border border-red-200 py-2 font-medium text-red-600 transition hover:bg-red-50"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
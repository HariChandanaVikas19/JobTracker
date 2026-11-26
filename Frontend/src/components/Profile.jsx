import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseURL from "../Axios/AxiosInstance";
import { useAuth } from "../context/useAuth";

const TOKEN_KEY = "userToken"; 

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
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
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };
    fetchProfile();
  }, [navigate, logout]);

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <p className="p-8 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full min-h-[500px] max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex flex-col items-center bg-indigo-600 px-6 py-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-indigo-600">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <h1 className="mt-3 text-xl font-semibold text-white">
            {user.username}
          </h1>
          <p className="text-sm text-indigo-100">{user.email}</p>
        </div>
        <div className="divide-y divide-gray-100 px-6">
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-500">Username</span>
            <span className="text-sm font-medium text-gray-900">
              {user.username}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium text-gray-900">
              {user.email}
            </span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-500">Joined</span>
            <span className="text-sm font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
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
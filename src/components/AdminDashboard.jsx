import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-stone-800">
          Admin Dashboard
        </h1>

        <p className="text-stone-600 mt-3">
          Welcome, {user.name}!
        </p>

        <p className="mt-2 text-pink-600 font-semibold">
          Role: {user.role}
        </p>

        <button
          onClick={logout}
          className="mt-6 bg-stone-900 text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
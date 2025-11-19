import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Briefcase, GraduationCap, Shield } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student", // default
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password, formData.role);
      alert("Login successful!");
      if (formData.role === "student") navigate("/student/dashboard");
      else if (formData.role === "company") navigate("/company/dashboard");
      else navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-80 flex flex-col space-y-3"
      >
        {/* Role Select */}
        <div className="flex justify-center mb-4 space-x-3">
          <button
            type="button"
            className={`flex items-center px-3 py-2 rounded-lg border ${
              formData.role === "student"
                ? "bg-green-600 border-green-400"
                : "border-gray-500"
            }`}
            onClick={() => setFormData({ ...formData, role: "student" })}
          >
            <GraduationCap className="mr-1" size={20} />
            Student
          </button>

          <button
            type="button"
            className={`flex items-center px-3 py-2 rounded-lg border ${
              formData.role === "company"
                ? "bg-blue-600 border-blue-400"
                : "border-gray-500"
            }`}
            onClick={() => setFormData({ ...formData, role: "company" })}
          >
            <Briefcase className="mr-1" size={20} />
            Company
          </button>

          <button
            type="button"
            className={`flex items-center px-3 py-2 rounded-lg border ${
              formData.role === "admin"
                ? "bg-yellow-600 border-yellow-400"
                : "border-gray-500"
            }`}
            onClick={() => setFormData({ ...formData, role: "admin" })}
          >
            <Shield className="mr-1" size={20} />
            Admin
          </button>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded border border-gray-500 bg-gray-700 text-white"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded border border-gray-500 bg-gray-700 text-white"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Login
        </button>

        {/* Back to Register */}
        <p className="text-center text-sm text-gray-400 mt-3">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

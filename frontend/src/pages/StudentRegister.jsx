import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { GraduationCap } from "lucide-react";

export default function StudentRegister() {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    resumeLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };
    try {
      await register("student", formattedData);
      alert("Student registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <div className="flex items-center justify-center mb-5 space-x-2">
          <GraduationCap size={28} className="text-green-400" />
          <h2 className="text-2xl font-bold text-green-400">
            Student Registration
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
          <input
            type="text"
            placeholder="Resume Link"
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            value={formData.resumeLink}
            onChange={(e) =>
              setFormData({ ...formData, resumeLink: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-3">
          Already have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

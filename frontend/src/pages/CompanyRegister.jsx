import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Briefcase } from "lucide-react";

export default function CompanyRegister() {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    logoLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register("company", formData);
      alert("Company registered successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <div className="flex items-center justify-center mb-5 space-x-2">
          <Briefcase size={28} className="text-blue-400" />
          <h2 className="text-2xl font-bold text-blue-400">
            Company Registration
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Company Name"
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
          <textarea
            placeholder="Company Description"
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white h-24 resize-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            placeholder="Company Logo Link"
            className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
            value={formData.logoLink}
            onChange={(e) =>
              setFormData({ ...formData, logoLink: e.target.value })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-3">
          Already have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

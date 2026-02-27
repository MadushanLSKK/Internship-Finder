import { useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap,ShieldUser } from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8 bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Choose Your Role</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Student Card */}
        <div
          onClick={() => navigate("/register/student")}
          className="cursor-pointer bg-green-800 hover:bg-green-600 transition-all p-8 rounded-2xl shadow-lg text-center"
        >
          <GraduationCap className="mx-auto mb-4 text-black" size={48} />
          <h2 className="text-xl font-semibold mb-2">I’m a Student</h2>
          <p className="text-gray-300">
            Register to explore internship opportunities and apply easily.
          </p>
        </div>

        {/* Company Card */}
        <div
          onClick={() => navigate("/register/company")}
          className="cursor-pointer bg-blue-800 hover:bg-blue-600 transition-all p-8 rounded-2xl shadow-lg text-center"
        >
          <Briefcase className="mx-auto mb-4 text-black" size={48} />
          <h2 className="text-xl font-semibold mb-2">I’m a Company</h2>
          <p className="text-gray-300">
            Register your company to post internships and manage applicants.
          </p>
        </div>

        <div
          onClick={() => navigate("/login")}
          className="cursor-pointer bg-yellow-800 hover:bg-yellow-600 transition-all p-8 rounded-2xl shadow-lg text-center"
        >
          <ShieldUser className="mx-auto mb-4 text-black" size={48} />
          <h2 className="text-xl font-semibold mb-2">I’m a Admin</h2>
          <p className="text-gray-300">
           
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import useAdminStore from "../../store/useAdminStore";

const AdminDashboard = () => {
  const {
    stats,
    students,
    companies,
    internships,
    applications,
    fetchDashboardStats,
    fetchStudents,
    fetchCompanies,
    fetchInternships,
    fetchApplications,
    deleteStudent,
    deleteCompany,
    deleteInternship,
  } = useAdminStore();

  useEffect(() => {
    fetchDashboardStats();
    fetchStudents();
    fetchCompanies();
    fetchInternships();
    fetchApplications();
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen mt-12 text-white">
     
      {/* ===== Stats Section ===== */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-700 p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold ">Students</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.totalStudents}</p>
        </div>
        <div className="bg-gray-700  p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold ">Companies</h2>
          <p className="text-3xl font-bold text-green-500">{stats.totalCompanies}</p>
        </div>
        <div className="bg-gray-700  p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold ">Internships</h2>
          <p className="text-3xl font-bold text-purple-500">{stats.totalInternships}</p>
        </div>
        <div className="bg-gray-700  p-6 rounded-2xl shadow text-center">
          <h2 className="text-xl font-semibold ">Applications</h2>
          <p className="text-3xl font-bold text-orange-500">{stats.totalApplications}</p>
        </div>
      </div>

      {/* ===== Manage Students ===== */}
      <section className="bg-gray-800 p-6 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4 ">Students</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="border-b hover:bg-gray-500">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => deleteStudent(s._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ===== Manage Companies ===== */}
      <section className="bg-gray-800 p-6 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4 ">Companies</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Company Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-500">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">
                  <button
                    onClick={() => deleteCompany(c._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ===== Manage Internships ===== */}
      <section className="bg-gray-800 p-6 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4 ">Internships</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((i) => (
              <tr key={i._id} className="border-b hover:bg-gray-500">
                <td className="p-3">{i.title}</td>
                <td className="p-3">{i.companyName || "N/A"}</td>
                <td className="p-3">
                  <button
                    onClick={() => deleteInternship(i._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ===== View Applications ===== */}
      <section className="bg-gray-800 p-6 rounded-2xl shadow mb-10">
        <h2 className="text-2xl font-bold mb-4">Applications</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-3">Student</th>
              <th className="p-3">Internship</th>
               <th className="p-3">Company</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a._id} className="border-b hover:bg-gray-500">
                <td className="p-3">{a.studentName || "N/A"}</td>
                <td className="p-3">{a.internshipTitle || "N/A"}</td>
                <td className="p-3">{a.companyName || "N/A"}</td>
                <td className="p-3">{a.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;

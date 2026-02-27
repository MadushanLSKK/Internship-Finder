import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import useCompanyStore from "../../store/useCompanyStore";

export default function CompanyDashboard() {
  const { user } = useAuthStore();
  const {
    internships,
    applications,
    fetchCompanyInternships,
    fetchApplications,
    createInternship,
    updateInternship,
    updateApplicationStatus,
    deleteInternship, 
  } = useCompanyStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    duration: "",
  });
  const [editingInternship, setEditingInternship] = useState(null);

  // ✅ Load data when component mounts
  useEffect(() => {
    fetchCompanyInternships();
    fetchApplications();
  }, [fetchCompanyInternships, fetchApplications]);

  // ✅ Handle submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    if (editingInternship) {
      // Update existing internship
      await updateInternship(editingInternship._id, formattedData);
      alert("Internship updated successfully!");
    } else {
      // Create new internship
      await createInternship(formattedData);
      alert("Internship posted successfully!");
    }

    // Reset form
    setFormData({
      title: "",
      description: "",
      skills: "",
      location: "",
      duration: "",
    });
    setEditingInternship(null);

    // Refresh data
    fetchCompanyInternships();
  };

  // ✅ Handle edit click
  const handleEdit = (internship) => {
    setEditingInternship(internship);
    setFormData({
      title: internship.title,
      description: internship.description,
      skills: internship.skills.join(", "),
      location: internship.location,
      duration: internship.duration,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Cancel edit
  const handleCancelEdit = () => {
    setEditingInternship(null);
    setFormData({
      title: "",
      description: "",
      skills: "",
      location: "",
      duration: "",
    });
  };

  // ✅ Handle delete internship
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?"
    );
    if (confirmDelete) {
      await deleteInternship(id);
      alert("Internship deleted successfully!");
      fetchCompanyInternships();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 mt-12">
      

      {/* ========== POST / EDIT INTERNSHIP ========== */}
      <section className="bg-gray-800 p-5 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingInternship ? "Edit Internship" : "Post New Internship"}
        </h2>

        {editingInternship && (
          <div className="bg-yellow-500 text-black p-3 mb-4 rounded-lg flex justify-between items-center">
            <p>✏️ You are editing an existing internship.</p>
            <button
              onClick={handleCancelEdit}
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-900"
            >
              Cancel Edit
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Internship Title"
            className="p-2 rounded bg-gray-700"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className="p-2 rounded bg-gray-700"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Duration (e.g. 3 months)"
            className="p-2 rounded bg-gray-700"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Required Skills (comma-separated)"
            className="p-2 rounded bg-gray-700 md:col-span-2"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            className="p-2 rounded bg-gray-700 md:col-span-2"
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>

          <button
            type="submit"
            className={`${
              editingInternship
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-600 hover:bg-green-700"
            } p-2 rounded col-span-2`}
          >
            {editingInternship ? "Update Internship" : "Post Internship"}
          </button>
        </form>
      </section>

      {/* ========== MY INTERNSHIPS ========== */}
      <section className="bg-gray-800 p-5 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Internships</h2>
        {internships.length === 0 ? (
          <p>No internships posted yet.</p>
        ) : (
          <ul className="space-y-3">
            {internships.map((internship) => (
              <li
                key={internship._id}
                className="bg-gray-700 p-3 rounded-lg shadow-md flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{internship.title}</h3>
                  <p>{internship.description}</p>
                  <p className="text-sm text-gray-400">
                    📍 {internship.location} | ⏱ {internship.duration}
                  </p>
                  <p className="text-green-400 text-sm">
                    Skills: {internship.skills.join(", ")}
                  </p>
                </div>
                <div className="flex gap-2 mt-3 md:mt-0">
                  <button
                    onClick={() => handleEdit(internship)}
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(internship._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ========== APPLICATIONS ========== */}
      <section className="bg-gray-800 p-5 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Applications</h2>
        {applications.length === 0 ? (
          <p>No student applications yet.</p>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-gray-700 p-3 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between"
              >
                <div>
                  <p>
                    <span className="font-semibold">Student:</span>{" "}
                    {app.studentId?.name || "Unknown"}
                  </p>
                  <p>
                    <span className="font-semibold">Internship:</span>{" "}
                    {app.internshipId?.title}
                  </p>
                  <p>
                    <span className="font-semibold">Cover Letter:</span>{" "}
                    {app.coverLetter || "No cover letter"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span
                      className={`${
                        app.status === "accepted"
                          ? "text-green-400"
                          : app.status === "rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {app.status}
                    </span>
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex space-x-2">
                  <button
                    onClick={() => updateApplicationStatus(app._id, "accepted")}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateApplicationStatus(app._id, "rejected")}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

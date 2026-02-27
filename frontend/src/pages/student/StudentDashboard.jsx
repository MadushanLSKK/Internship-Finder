import { useEffect, useState } from "react";
import useStudentStore from "../../store/studentStore";
import useAuthStore from "../../store/authStore";

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const {
    internships,
    applications,
    fetchInternships,
    fetchApplications,
    applyForInternship,
    withdrawApplication,
  } = useStudentStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchInternships();
      await fetchApplications();
      setLoading(false);
    };
    loadData();
  }, [fetchInternships, fetchApplications]);

  const openModal = (internship) => {
    setSelectedInternship(internship);
    setShowModal(true);
  };

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      alert("Please write a cover letter before applying.");
      return;
    }
    await applyForInternship(selectedInternship._id, coverLetter);
    setShowModal(false);
    setCoverLetter("");
  };

  const handleWithdraw = async (id) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      await withdrawApplication(id);
      fetchApplications();
    }
  };

  const filteredInternships = filter
    ? internships.filter((i) =>
        i.location.toLowerCase().includes(filter.toLowerCase())
      )
    : internships;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center text-gray-300 text-lg">
        Loading internships and applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 mt-12">

      {/* Filter */}
      <div className="mb-6 flex justify-end">
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="bg-gray-800 text-white p-2 rounded-lg border border-gray-700"
        >
          <option value="">All Locations</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Galle">Galle</option>
          <option value="Jaffna">Jaffna</option>
          
          
        </select>
      </div>

      {/* Internships List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Internships</h2>
        {filteredInternships.length === 0 ? (
          <p className="text-gray-400">No internships available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredInternships.map((internship) => (
              <div
                key={internship._id}
                className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-green-500/30 transition"
              >
                <h3 className="text-lg font-semibold text-green-400">
                  {internship.title}
                </h3>
                <p>{internship.description}</p>
                <p className="text-gray-400 text-sm">
                  🏢 {internship.companyName || "Unknown Company"}
                </p>
                <p className="text-gray-400 text-sm">📍 {internship.location}</p>
                <p className="text-gray-400 text-sm">⏱️ {internship.duration}</p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => openModal(internship)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Applications List */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
        <div className="space-y-3">
          {applications.length === 0 ? (
            <p className="text-gray-400">
              You haven’t applied for any internships yet.
            </p>
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                className="bg-gray-800 p-3 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p>
                    Internship:{" "}
                    <span className="text-green-400">
                      {app.internshipId?.title || "Deleted Internship"}
                    </span>
                  </p>
                  <p>
                    Status:{" "}
                    <span
                      className={
                        app.status === "Pending"
                          ? "text-yellow-400"
                          : app.status === "accepted"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {app.status}
                    </span>
                  </p>
                  <p>
                    Company Name:{" "}
                    <span className="text-green-400">
                      {app.companyName || "Deleted Internship"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleWithdraw(app._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm"
                >
                  Withdraw
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              {selectedInternship?.title}
            </h3>
            <p className="text-gray-300 mb-2">
              🏢 {selectedInternship?.companyName || "Unknown Company"}
            </p>
            <p className="text-gray-400 mb-2">
              📍 {selectedInternship?.location}
            </p>
            <p className="text-gray-400 mb-4">
              ⏱️ Duration: {selectedInternship?.duration}
            </p>

            <textarea
              className="w-full h-32 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
              placeholder="Write your cover letter here..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>

            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

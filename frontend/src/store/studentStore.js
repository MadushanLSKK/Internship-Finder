import { create } from "zustand";
import api from "../utils/axiosConfig";

const useStudentStore = create((set) => ({
  internships: [],
  applications: [],
  loading: false,
  error: null,

  // ✅ Fetch all internships
  fetchInternships: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/internships");
      set({ internships: res.data, loading: false });
    } catch (err) {
      console.error("Error fetching internships:", err);
      set({ error: "Failed to load internships", loading: false });
    }
  },

  // ✅ Fetch student's applications
  fetchApplications: async () => {
    try {
      const res = await api.get("/applications/my");
      set({ applications: res.data.applications });
    } catch (err) {
      console.error("Error fetching applications:", err);
      set({ error: "Failed to load applications" });
    }
  },

  // ✅ Apply for internship
  applyForInternship: async (internshipId, coverLetter) => {
    try {
      await api.post("/applications/apply", { internshipId, coverLetter });
      // Refresh applications after applying
      const res = await api.get("/applications/my");
      set({ applications: res.data.applications });
      alert("✅ Application submitted successfully!");
    } catch (err) {
      console.error("Error applying for internship:", err);
      alert(err.response?.data?.error || "Failed to apply for internship!");
    }
  },

  // ✅ Withdraw application
  withdrawApplication: async (applicationId) => {
    try {
      await api.delete(`/applications/${applicationId}`);
      // Refresh applications after withdraw
      const res = await api.get("/applications/my");
      set({ applications: res.data.applications });
      alert("❌ Application withdrawn successfully.");
    } catch (err) {
      console.error("Error withdrawing application:", err);
      alert(err.response?.data?.error || "Failed to withdraw application!");
    }
  },
}));

export default useStudentStore;

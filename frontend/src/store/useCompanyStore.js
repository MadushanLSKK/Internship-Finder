import { create } from "zustand";
import api from "../utils/axiosConfig";

const useCompanyStore = create((set) => ({
  internships: [],
  applications: [],
  loading: false,
  error: null,

  // ✅ 1. Create new internship
  createInternship: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await api.post("/internships", data);
      set((state) => ({
        internships: [...state.internships, res.data],
        loading: false,
      }));
      alert("Internship posted successfully!");
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to post internship", loading: false });
    }
  },

  // ✅ 2. Get company’s internships
  fetchCompanyInternships: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/internships/company");
      set({ internships: res.data, loading: false });
    } catch (err) {
      set({ error: "Failed to load internships", loading: false });
    }
  },

  // ✅ 3. Get applications for all internships
  fetchApplications: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/applications/company");
      set({ applications: res.data.applications, loading: false });
    } catch (err) {
      set({ error: "Failed to load applications", loading: false });
    }
  },

  // ✅ 4. Update application status (accept / reject)
  updateApplicationStatus: async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}/status`, { status });
      set((state) => ({
        applications: state.applications.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        ),
      }));
      alert(`Application ${status} successfully!`);
    } catch (err) {
      set({ error: "Failed to update application status" });
    }
  },

  // update internships
   updateInternship: async (id, updatedData) => {
    try {
      await api.put(`/internships/${id}`, updatedData);
      await get().fetchCompanyInternships(); // refresh list
      alert("Internship updated successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update internship!");
    }
  },

deleteInternship :async (id)=>{
  try {
    await api.delete(`/internships/${id}`);
     set((state) => ({
      internships: state.internships.filter((i) => i._id !== id),
    }));

    
  } catch (error) {
     console.error("Error deleting internship:", error);
  }

}



}));

export default useCompanyStore;

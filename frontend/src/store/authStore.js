import { create } from "zustand";
import api from "../utils/axiosConfig";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  // 🔹 Dynamic Register Function
  register: async (role, formData) => {
    let endpoint = "";
    if (role === "student") endpoint = "/auth/register/student";
    else if (role === "company") endpoint = "/auth/register/company";
    else if (role === "admin") endpoint = "/auth/register/admin";

    await api.post(endpoint, formData);
  },

  // 🔹 Login Function
  login: async (email, password, role) => {
    let endpoint = "";
    if (role === "student") endpoint = "/auth/login/student";
    else if (role === "company") endpoint = "/auth/login/company";
    else if (role === "admin") endpoint = "/auth/login/admin";

    const res = await api.post(endpoint, { email, password });
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;

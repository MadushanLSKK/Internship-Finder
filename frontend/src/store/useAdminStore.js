import{create} from 'zustand'
import api from '../utils/axiosConfig.js'
import { deleteStudent } from '../../../backend/controllers/admin.controller.js';

const useAdminStore =create ((set)=>({
    stats:{},
    companies :[],
    students : [],
    internships:[],
    applications:[],
    loading:false,
    error:false,

    fetchDashboardStats :async()=>{
        try {
            const res =await api.get('/admin/stats');
            set({stats: res.data ,loading:false});

        } catch (error) {
            set({error:"Failed to load dashboard stats" , loading:false})
        }

    },

    fetchCompanies :async()=>{
        try {
            const res = await api.get('/admin/companies');
            set({companies:res.data});
        } catch (error) {
            set({error:"Failed to load companies" })
        }
    },

    
    fetchStudents :async()=>{
        try {
            const res = await api.get('/admin/students');
            set({students:res.data});
        } catch (error) {
            set({error:"Failed to load students" })
        }
    },

    fetchApplications :async()=>{
        try {
            const res = await api.get('/admin/applications');
            set({applications:res.data});
        } catch (error) {
            set({error:"Failed to load applications" });
        }
    },

     fetchInternships:async()=>{
        try {
            const res = await api.get('/admin/internships');
            set({internships:res.data});
        } catch (error) {
            set({error:"Failed to load internships" });
        }
    },

    deleteStudent:async (id)=>{
        try {
            await api.delete(`admin/students/${id}`);
            set((state) => ({
              students: state.students.filter((s) => s._id !== id),
            }));
      alert("Student deleted successfully!");
        } catch (error) {
             alert("Failed to delete student");
        }
    },

    deleteCompany:async (id)=>{
        try {
            await api.delete(`/admin/companies/${id}`);
            set((state) => ({
                companies: state.companies.filter((c) => c._id !== id),
            }));
      alert("Company deleted successfully!");
        } catch (error) {
            alert("Failed to delete company");
        }
    },

    deleteInternship:async (id)=>{
        try {
            await api.delete(`/admin/internships/${id}`);
            set((state) => ({
            internships: state.internships.filter((i) => i._id !== id),
      }));
      alert("Internship deleted successfully!");
        } catch (error) {
            alert("Failed to delete internship");
        }
    },





}))

export default useAdminStore
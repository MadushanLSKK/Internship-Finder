import Student from "../models/student.model.js"
import Company from "../models/company.model.js"
import Internship from "../models/internship.model.js"
import Application from "../models/application.model.js";

export const getAllStudents= async (req,res)=>{
    try {
        const allusers= await Student.find();
        res.status(200).json(allusers);
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const getAllCompanies= async (req,res)=>{
    try {
        const allcompanies= await Company.find();
        res.status(200).json(allcompanies);
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const deleteStudent = async(req,res)=>{
    try {
        const {id} = req.params;
        await Student.findByIdAndDelete(id);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const deleteCompany = async(req,res)=>{
    try {
        const {id} = req.params;
        await Company.findByIdAndDelete(id);
        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

export const getAllInternships =async (req,res)=>{
    try {
        const internships =await Internship.find();
        res.status(200).json(internships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export const deleteInternship =async (req,res)=>{
    try {
        const {id}= req.params;
        await Internship.findByIdAndDelete(id);
        res.status(200).json({ message: "Internship deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllApplication = async (req , res)=>{
    try {
        const applications = await Application.find()
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

export const getDashboardStats =async (req , res)=>{
    try {
        const totalStudents =await Student.countDocuments();
        const totalCompanies =await Company.countDocuments();
        const totalInternships =await Internship.countDocuments();
        const totalApplications =await Application.countDocuments();

        res.status(200).json(
            {totalStudents,
            totalCompanies,
            totalInternships,
            totalApplications}
        );
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }

};
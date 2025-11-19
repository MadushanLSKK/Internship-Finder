import { json } from "express";
import Internship from "../models/internship.model.js";
import Company from "../models/company.model.js"

export const createInternship = async (req, res) => {
  try {
    const { title, description, skills, location, duration } = req.body;
    const companyId = req.user.id; // ✅ from JWT

    // ✅ Fetch the logged-in company's details
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    const internship = new Internship({
      title,
      description,
      skills,
      location,
      duration,
      companyId,
      companyName: company.name, // ✅ store the company name directly too
    });

    await internship.save();
    res
      .status(200)
      .json({ message: "Internship created successfully", internship });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getInternships = async (req , res)=>{

    try {
        const internships = await Internship.find().populate("companyId" , "name email");
        res.json(internships);
        
    } catch (error) {
        res.status(500).json({error : error.message});
    }

};

export const getInternshipById = async (req ,res)=>{
    try {
        const internship = await Internship.findById(req.params.id).populate("companyId", "name email");
        if (!internship) return res.status(404).json({ message: "Internship not found" });
        res.json(internship);
        
    } catch (error) {
        res.status(500).json({error : error.message});
    }

};

export const updateInternship = async(req ,res)=>{
    try {
        const internship = await Internship.findByIdAndUpdate(req.params.id , req.body , {new:true});
        if(!internship){
            return res.status(404).json({message : "Internship not found"});
        } 
         res.status(200).json(internship);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }

};

export const deleteInternship = async (req , res)=>{
    try {
        
        const internship = await Internship.findByIdAndDelete(req.params.id);
        if(!internship){
            return res.status(404).json({message : "Internship not found"});
            
        }
        res.json({message : "Internship deleted successfully"});

    } catch (error) {
        res.status(500).json({error : error.message});
    }

};

// ✅ Get internships posted by the logged-in company
export const getCompanyInternships = async (req, res) => {
  try {
    const companyId = req.user.id; // comes from token
    const internships = await Internship.find({ companyId });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch company internships" });
  }
};

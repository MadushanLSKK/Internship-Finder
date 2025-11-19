import Application from "../models/application.model.js";
import Internship from "../models/internship.model.js"
import Student from "../models/student.model.js";

export const applyForInternship = async(req , res)=>{
    try {
        const {internshipId , coverLetter} = req.body;
        const studentId = req.user.id;
        const student = await Student.findById(studentId);
        const internship = await Internship.findById(internshipId);

        const existing =await Application.findOne({internshipId , studentId});
        if(existing){
           return res.status(400).json({error: "Already applied for this internship"});

        }
        const application = new Application({
            internshipId,
            internshipTitle : internship.title,
            studentId,
            studentName :student.name,
            companyName:internship.companyName,
            coverLetter,

        });

        await application.save();
        res.status(201).json({message:"Application submitted successfully" , application})
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }


}

export const getCompanyApplications = async (req, res) => {
  try {
    const companyId = req.user.id; 

   
    const internships = await Internship.find({ companyId }).select("_id");

    
    const internshipIds = internships.map((internship) => internship._id);


    const applications = await Application.find({
      internshipId: { $in: internshipIds },
    })
      .populate("internshipId", "title location") 
      .populate("studentId", "name email") 
      .sort({ createdAt: -1 }); 

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyApplication =async (req , res)=>{
    try {
        const studentId = req.user.id;
        const applications =await Application.find({studentId}).populate("internshipId", "title companyName location");
        res.status(200).json({applications});
        
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

export const updateApplicationStatus =async (req , res)=>{
  try {
    const {applicationId}= req.params ;
    const {status}= req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const application = await Application.findById(applicationId).populate("internshipId");

    if(!application){
      return res.status(404).json({error: "Application not found"})
    };
     if (application.internshipId.companyId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(applicationId, {status} , { new: true });
    res.status(200).json({
      message: `Application ${status} successfully`,
      application: updatedApplication,
    });

    
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }

}

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedApplication = await Application.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error.message);
    res.status(500).json({ error: error.message });
  }
};

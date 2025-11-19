import Student from '../models/student.model.js'
import Company from '../models/company.model.js'
import Admin from '../models/admin.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerStudent =async(req , res )=>{

    try {
        const {name , email , password , skills } = req.body;


        const existingStudent = await Student.findOne({email});
        if (existingStudent){
            return res.status(400).json({message : "Email already registered "});
        }

        const hashedPassward = await bcrypt.hash(password , 10);

        const student = new Student({
            name,
            email,
            password : hashedPassward,
            skills,
        });

        await student.save();

        res.status(201).json({message : "Student registered sucessfully"});

    } catch (error) {
        res.status(500).json({error : error.message});
    };

};

export const loginStudent = async(req , res)=>{

    try {
        const {email , password } = req.body;

        const student = await Student.findOne({email});

        if(!student){
            return res.status(400).json({message : "Invalid Email"});
        };

        const  isMatch = await bcrypt.compare(password , student.password);

        if (!isMatch){
             return res.status(400).json({message : "Invalid Email"});
        };

        const token = jwt.sign(
            {id : student._id , role:student.role},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
        );

        res.json({
            token,
            user :{
                id: student._id,
                name: student.name,
                email: student.email,
                skills:student.skills,
                role : student.role
               
            },
        });




        
    } catch (error) {
         res.status(500).json({error : error.message});
    }

};

export const registerCompany = async(req , res)=>{
    try {

        const {name ,email ,password ,description}= req.body;

        const existingCompany = await Company.findOne({email});
        if(existingCompany){
            return res.status(400).json({message:"Email already registered"})
        };

        const hashedPassward = await bcrypt.hash(password , 10);

        const company = new Company({
            name,
            email,
            password : hashedPassward,
            description
        });

        await company.save();

        res.status(201).json({ message: "Company registered successfully" });
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
};

export const loginCompany = async(req , res)=>{

    try {

        const {email , password} = req.body;

        const company = await Company.findOne({email});

        if(!company){
            return res.status(400).json({message : "Invalid credentials"});
        };

        const isMatch = await bcrypt.compare(password , company.password);
        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"});
        };

        const token = jwt.sign(
            {id: company._id, role: company.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"},
        );

        res.json({
            token,
            user:{
                id:company._id,
                name:company.name,
                email: company.email,
                description: company.description,
                role:company.role
            },
        });

        
    } catch (error) {
        res.status(500).json({error : error.message});
    }

};

export const loginAdmin = async (req , res)=>{
    try {
        const {email , password}= req.body;
        const admin =await Admin.findOne({email})

        if(!admin){
             return res.status(400).json({message : "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password , admin.password);
        if (!isMatch){
            return res.status(400).json({message : "Invalid credentials"});
        }

        const token = jwt.sign(
            {id: admin._id, role: admin.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"},
        );

        res.status(200).json({
            token ,
            user :{
                id: admin.id,
                email : admin.email,
                name  : admin.name,
                role : admin.role
            }
        });
        
    } catch (error) {
        res.status(500).json({error : error.message});
    };

};

export const registerAdmin = async(req , res)=>{
    try {

        const {name ,email ,password }= req.body;

        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            return res.status(400).json({message:"Email already registered"})
        };

        const hashedPassward = await bcrypt.hash(password , 10);

        const admin = new Admin({
            name,
            email,
            password : hashedPassward,
           
        });

        await admin.save();

        res.status(201).json({ message: "Admin registered successfully" });
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }
};
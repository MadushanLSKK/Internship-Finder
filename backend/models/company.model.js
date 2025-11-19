import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
   role: {
    type: String,
    default: "company",
    enum: ["student", "company", "admin"]
  },
  logoLink: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const Company = mongoose.model("Company",companySchema);

export default Company;

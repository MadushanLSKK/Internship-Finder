import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  skills: {
    type: [String],
    default: [],
  },
  role: {
    type: String,
    default: "student",   // default role
    enum: ["student", "company", "admin"]
  },
  resumeLink: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;

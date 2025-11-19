import express from 'express'
import { registerStudent , loginStudent , registerCompany , loginCompany , loginAdmin , registerAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register/student" , registerStudent);
router.post("/login/student" , loginStudent );

router.post("/register/company" , registerCompany);
router.post("/login/company" , loginCompany);

router.post("/login/admin", loginAdmin);
router.post("/register/admin", registerAdmin);

export default   router;


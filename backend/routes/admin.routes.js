import express from 'express'
import { authorizeRole } from '../middleware/authorizeRole.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { getAllStudents,getAllCompanies,getAllInternships,deleteCompany,deleteInternship,deleteStudent , getAllApplication , getDashboardStats } from '../controllers/admin.controller.js'

const router = express.Router()

router.get("/companies",authMiddleware,authorizeRole(["admin"]),getAllCompanies);
router.get("/students",authMiddleware,authorizeRole(["admin"]),getAllStudents);
router.get("/internships",authMiddleware,authorizeRole(["admin"]),getAllInternships);
router.get("/applications",authMiddleware,authorizeRole(["admin"]),getAllApplication);
router.get("/stats",authMiddleware,authorizeRole(["admin"]),getDashboardStats);
router.delete("/companies/:id",authMiddleware,authorizeRole(["admin"]),deleteCompany);
router.delete("/students/:id",authMiddleware,authorizeRole(["admin"]),deleteStudent);
router.delete("/internships/:id",authMiddleware,authorizeRole(["admin"]),deleteInternship);


export default router

import express from 'express';
import { createInternship , getInternships , getInternshipById , updateInternship , deleteInternship ,getCompanyInternships} from '../controllers/internship.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {authorizeRole } from '../middleware/authorizeRole.js'
const router = express.Router();

router.post("/",authMiddleware, authorizeRole(["company"]), createInternship);
router.get("/", getInternships);
router.get("/company",authMiddleware,authorizeRole(["company"]),getCompanyInternships);
router.get("/:id", getInternshipById);
router.put("/:id",authMiddleware, authorizeRole(["company"]), updateInternship);
router.delete("/:id",authMiddleware , authorizeRole(["company"]),deleteInternship);


export default router;
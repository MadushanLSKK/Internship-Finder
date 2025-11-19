import express from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { authorizeRole } from '../middleware/authorizeRole.js'
import { applyForInternship , getCompanyApplications ,getMyApplication ,updateApplicationStatus , deleteApplication } from '../controllers/application.controller.js'

const router = express.Router();

router.post("/apply",authMiddleware,authorizeRole(["student"]),applyForInternship);
router.get("/company", authMiddleware, authorizeRole(["company"]), getCompanyApplications);
router.get("/my",authMiddleware,authorizeRole(["student"]),getMyApplication);
router.delete("/:id",authMiddleware,authorizeRole(["student"]),deleteApplication);
router.put("/:applicationId/status",authMiddleware, authorizeRole(["company"]),updateApplicationStatus);

export default router;

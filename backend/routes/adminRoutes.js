import express from "express";
import {
  manageUsers,
  suspendAccount,
  verifyFreelancer,
  approveGig,
  getAdminAnalytics,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", manageUsers);
router.put("/users/:id/suspend", suspendAccount);
router.put("/freelancer/:id/verify", verifyFreelancer);
router.put("/gigs/:id/approve", approveGig);
router.get("/analytics", getAdminAnalytics);

export default router;

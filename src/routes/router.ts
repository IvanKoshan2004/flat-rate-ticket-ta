import { Router } from "express";
import { getPackageTicketsFromMyLaphil as getTicketsFromMyLaphilEvent } from "../controllers/controller";
const router = Router();
router.get("/api", getTicketsFromMyLaphilEvent);

export default router;

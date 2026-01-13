import { Router } from "express";
import {
  handleUpdateStatusToEmpty,
  handleUpdateToAvailable,
  handleUpdateAllToAvailable,
  handleGetAllBoxes,
} from "./box.controller";
import { requireRole } from "../middleware/guard";

const router = Router();

router.get("/", handleGetAllBoxes);

router.patch(
  "/all/available",
  requireRole("admin"),
  handleUpdateAllToAvailable
);

router.patch("/:id/empty", handleUpdateStatusToEmpty);

router.patch("/:id/available", requireRole("admin"), handleUpdateToAvailable);

export default router;

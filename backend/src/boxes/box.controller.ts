import { Request, Response } from "express";
import {
  updateBoxStatusToEmpty,
  updateBoxToAvailable,
  updateAllBoxesToAvailable,
  getAllBoxes,
  getBoxById,
} from "./box.service";

export const handleUpdateStatusToEmpty = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Box ID is required" });
    }

    const updatedBox = await updateBoxStatusToEmpty(Number(id));

    return res.status(200).json({
      message: "Box status updated to empty",
      data: updatedBox,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Box not found") {
      return res.status(404).json({ error: error.message });
    }
    console.error("Error updating box status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUpdateToAvailable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Box ID is required" });
    }

    const updatedBox = await updateBoxToAvailable(Number(id));

    return res.status(200).json({
      message: "Box status updated to available",
      data: updatedBox,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Box not found") {
      return res.status(404).json({ error: error.message });
    }
    console.error("Error updating box status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleUpdateAllToAvailable = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await updateAllBoxesToAvailable();

    return res.status(200).json({
      message: "All boxes updated to available",
      data: { count: result.count },
    });
  } catch (error) {
    console.error("Error updating all boxes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const handleGetAllBoxes = async (req: Request, res: Response) => {
  try {
    const boxes = await getAllBoxes();

    return res.status(200).json({
      message: "Boxes retrieved successfully",
      data: boxes,
    });
  } catch (error) {
    console.error("Error fetching boxes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

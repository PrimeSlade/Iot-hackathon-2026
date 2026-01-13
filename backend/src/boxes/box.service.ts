import { BoxStatus } from "../../generated/prisma/client";
import {
  findBoxById,
  updateBoxStatus,
  updateAllBoxesStatus,
  findAllBoxes,
} from "./box.repository";

export const updateBoxStatusToEmpty = async (id: number) => {
  const box = await findBoxById(id);

  if (!box) {
    throw new Error("Box not found");
  }

  return updateBoxStatus(id, BoxStatus.empty);
};

export const updateBoxToAvailable = async (id: number) => {
  const box = await findBoxById(id);

  if (!box) {
    throw new Error("Box not found");
  }

  return updateBoxStatus(id, BoxStatus.available);
};

export const updateAllBoxesToAvailable = async () => {
  return updateAllBoxesStatus(BoxStatus.available);
};

export const getAllBoxes = async () => {
  return findAllBoxes();
};

export const getBoxById = async (id: number) => {
  const box = await findBoxById(id);

  if (!box) {
    throw new Error("Box not found");
  }

  return box;
};

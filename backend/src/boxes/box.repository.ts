import prisma from "../lib/prisma";
import { BoxStatus } from "../../generated/prisma/client";

export const findBoxById = async (id: number) => {
  return await prisma.box.findUnique({
    where: { id },
  });
};

export const updateBoxStatus = async (id: number, status: BoxStatus) => {
  return await prisma.box.update({
    where: { id },
    data: { status },
  });
};

export const updateAllBoxesStatus = async (status: BoxStatus) => {
  return await prisma.box.updateMany({
    data: { status },
  });
};

export const findAllBoxes = async () => {
  return await prisma.box.findMany({
    orderBy: { id: "asc" },
  });
};

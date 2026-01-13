import axiosInstance from "@/lib/axios";
import axios from "axios";

export type BoxStatus = "available" | "empty";

export interface Box {
  id: number;
  status: BoxStatus;
}

export interface BoxResponse {
  message: string;
  data: Box | Box[] | { count: number };
}

export const getAllBoxes = async (): Promise<Box[]> => {
  try {
    const response = await axiosInstance.get<BoxResponse>("/boxes");
    return response.data.data as Box[];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to fetch boxes");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateBoxToEmpty = async (id: number): Promise<Box> => {
  try {
    const response = await axiosInstance.patch<BoxResponse>(
      `/boxes/${id}/empty`
    );
    return response.data.data as Box;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to update box status"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateBoxToAvailable = async (id: number): Promise<Box> => {
  try {
    const response = await axiosInstance.patch<BoxResponse>(
      `/boxes/${id}/available`
    );
    return response.data.data as Box;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to update box status"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const updateAllBoxesToAvailable = async (): Promise<{
  count: number;
}> => {
  try {
    const response = await axiosInstance.patch<BoxResponse>(
      "/boxes/all/available"
    );
    return response.data.data as { count: number };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to update all boxes"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

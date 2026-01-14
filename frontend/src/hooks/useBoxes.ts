import { useQuery } from "@tanstack/react-query";
import { getAllBoxes } from "@/api/api";

export const useGetBoxes = () => {
  return useQuery({
    queryKey: ["boxes"],
    queryFn: getAllBoxes,
  });
};

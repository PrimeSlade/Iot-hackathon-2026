import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { useGetBoxes } from "@/hooks/useBoxes";
import {
  updateBoxToEmpty,
  updateBoxToAvailable,
  updateAllBoxesToAvailable,
} from "@/api/api";
import { Spinner } from "@/components/ui/spinner";
import { Header } from "@/components/home/Header";
import { Statistics } from "@/components/home/Statistics";
import { Legend } from "@/components/home/Legend";
import { BoxCard } from "@/components/home/BoxCard";
import { AdminControlsPanel } from "@/components/home/AdminBox";
import { toast } from "sonner";

const Home = () => {
  const queryClient = useQueryClient();
  const { data: boxes = [], isLoading: isLoadingBoxes } = useGetBoxes();

  const { data: session, isPending } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  const { mutate, isPending: isUpdatingToEmpty } = useMutation({
    mutationFn: (id: number) => updateBoxToEmpty(id),
    onMutate: () => {
      toast.loading("Dispensing pad...", { id: "dispensing-pad" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      toast.success("Pad added successfully!", { id: "dispensing-pad" });
    },
    onError: (error: Error) => {
      toast.error("Failed to dispense pad", {
        id: "dispensing-pad",
      });
    },
  });

  // Single box
  const { mutate: refillBox, isPending: isRefilling } = useMutation({
    mutationFn: (id: number) => updateBoxToAvailable(id),
    onMutate: () => {
      toast.loading("Refilling pad...", { id: "refill-box" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      toast.success("Box refilled successfully!", { id: "refill-box" });
    },
    onError: (error: Error) => {
      toast.error("Failed to refill pad", { id: "refill-box" });
    },
  });

  // All boxes
  const { mutate: refillAllBoxes, isPending: isRefillingAll } = useMutation({
    mutationFn: () => updateAllBoxesToAvailable(),
    onMutate: () => {
      toast.loading("Refilling all boxes...", { id: "refill-all" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      toast.success("All boxes refilled successfully!", { id: "refill-all" });
    },
    onError: (error: Error) => {
      toast.error("Failed to refill all boxes", { id: "refill-all" });
    },
  });

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoadingBoxes || isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner className="text-orange-500 size-10" />
      </div>
    );
  }

  const availableCount = boxes.filter((b) => b.status === "available").length;
  const emptyCount = boxes.filter((b) => b.status === "empty").length;

  return (
    <div className="min-h-screen text-gray-900 font-sans p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <Header />
        <Statistics availableCount={availableCount} emptyCount={emptyCount} />
        <Legend />

        {/* Boxes Grid */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 p-4 sm:p-6 lg:p-10 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {boxes.map((box) => (
              <BoxCard
                key={box.id}
                box={box}
                onDispense={mutate}
                isDisabled={isUpdatingToEmpty}
              />
            ))}
          </div>
        </div>

        {/* Admin Controls - Only visible to admins */}
        {isAdmin && (
          <AdminControlsPanel
            onRefillBox={refillBox}
            onRefillAll={refillAllBoxes}
            isRefilling={isRefilling}
            isRefillingAll={isRefillingAll}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

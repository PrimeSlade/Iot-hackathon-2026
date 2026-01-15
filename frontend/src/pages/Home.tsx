import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "../lib/auth-client";
import { useGetBoxes } from "@/hooks/useBoxes";
import {
  updateBoxToEmpty,
  updateBoxToAvailable,
  updateAllBoxesToAvailable,
} from "@/api/api";
import { Spinner } from "@/components/ui/spinner";
import { Statistics } from "@/components/home/Statistics";
import { BoxCard } from "@/components/home/BoxCard";
import { AdminControlsPanel } from "@/components/home/AdminBox";
import { ContactPanel } from "@/components/home/ContactPanel";
import { DispenseSuccessDialog } from "@/components/home/DispenseSuccessDialog";
import { toast } from "sonner";
import { useState } from "react";

const Home = () => {
  const queryClient = useQueryClient();
  const { data: boxes = [], isLoading: isLoadingBoxes } = useGetBoxes();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [dispensedBoxNumber, setDispensedBoxNumber] = useState<number>(0);

  const { data: session, isPending } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  const { mutate, isPending: isUpdatingToEmpty } = useMutation({
    mutationFn: (id: number) => updateBoxToEmpty(id),
    onMutate: (id) => {
      setDispensedBoxNumber(id);
      toast.loading("Dispensing pad...", { id: "dispensing-pad" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      toast.dismiss("dispensing-pad");
      setShowSuccessDialog(true);
    },
    onError: () => {
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
    onError: () => {
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
    onError: () => {
      toast.error("Failed to refill all boxes", { id: "refill-all" });
    },
  });

  if (isLoadingBoxes || isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner className="size-10 text-(--primary-brand)" />
      </div>
    );
  }

  const availableCount = boxes.filter((b) => b.status === "available").length;
  const emptyCount = boxes.filter((b) => b.status === "empty").length;

  return (
    <div className="text-gray-900 font-sans py-6 sm:py-8">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <Statistics availableCount={availableCount} emptyCount={emptyCount} />

        {/* Boxes Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 border border-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
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
        {isAdmin ? (
          <AdminControlsPanel
            onRefillBox={refillBox}
            onRefillAll={refillAllBoxes}
            isRefilling={isRefilling}
            isRefillingAll={isRefillingAll}
          />
        ) : (
          <ContactPanel />
        )}

        {/* Success Dialog */}
        <DispenseSuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          boxNumber={dispensedBoxNumber}
        />
      </div>
    </div>
  );
};

export default Home;

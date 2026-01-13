import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { useGetBoxes } from "@/hooks/useBoxes";
import { updateBoxToEmpty } from "@/api/api";
import { Spinner } from "@/components/ui/spinner";
import { ItemContent, ItemTitle } from "@/components/ui/item";
import { Header } from "@/components/home/Header";
import { Statistics } from "@/components/home/Statistics";
import { Legend } from "@/components/home/Legend";
import { BoxCard } from "@/components/home/BoxCard";

const Home = () => {
  const queryClient = useQueryClient();
  const { data: boxes = [], isLoading: isLoadingBoxes } = useGetBoxes();

  const { mutate, isPending: isUpdatingToEmpty } = useMutation({
    mutationFn: (id: number) => updateBoxToEmpty(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoadingBoxes) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner className="text-orange-500 size-10" />
      </div>
    );
  }

  const availableCount = boxes.filter((b) => b.status === "available").length;
  const emptyCount = boxes.filter((b) => b.status === "empty").length;

  return (
    <>
      {isUpdatingToEmpty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex justify-center items-center gap-5">
            <Spinner className="text-orange-500 size-8" />
            <ItemContent>
              <ItemTitle className="line-clamp-1 text-orange-500">
                Dispensing Pad...
              </ItemTitle>
            </ItemContent>
          </div>
        </div>
      )}

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
        </div>
      </div>
    </>
  );
};

export default Home;

import { Package, RefreshCw } from "lucide-react";
import type { Box } from "@/api/api";

interface AdminControlsPanelProps {
  selectedBox: number | null;
  box: Box | null;
  onRefillBox: (id: number) => void;
  onRefillAll: () => void;
  isRefilling: boolean;
  isRefillingAll: boolean;
}

export const AdminControlsPanel = ({
  selectedBox,
  box,
  onRefillBox,
  onRefillAll,
  isRefilling,
  isRefillingAll,
}: AdminControlsPanelProps) => {
  if (!box) return null;
  if (!selectedBox) return null;
  if (box.id !== selectedBox) return null;

  const isDisabled = isRefilling || isRefillingAll;
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <Package className="w-6 h-6 text-orange-600" />
        <h3 className="text-lg font-bold text-gray-900">Manage Box {box.id}</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Current Status:
          </span>
          <span
            className={`
            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
            ${
              box.status === "available"
                ? "bg-orange-100 text-orange-700"
                : "bg-gray-100 text-gray-600"
            }
          `}
          >
            {box.status === "available" ? "Available" : "Empty"}
          </span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onRefillBox(selectedBox)}
            disabled={isDisabled}
            className={`
              flex-1 flex items-center justify-center gap-2
              bg-orange-600 text-white px-6 py-3 rounded-xl 
              font-semibold transition-all shadow-md
              ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-700 hover:shadow-lg active:scale-[0.98]"
              }
            `}
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefilling ? "animate-spin" : ""}`}
            />
            {isRefilling ? "Processing..." : "Refill This Box"}
          </button>

          <button
            onClick={onRefillAll}
            disabled={isDisabled}
            className={`
              flex-1 flex items-center justify-center gap-2
              bg-gray-800 text-white px-6 py-3 rounded-xl 
              font-semibold transition-all shadow-md
              ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900 hover:shadow-lg active:scale-[0.98]"
              }
            `}
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefillingAll ? "animate-spin" : ""}`}
            />
            {isRefillingAll ? "Processing..." : "Refill All Boxes"}
          </button>
        </div>
      </div>
    </div>
  );
};

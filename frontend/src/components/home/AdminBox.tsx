import { Package, RefreshCw } from "lucide-react";
import { useState } from "react";

interface AdminControlsPanelProps {
  onRefillBox: (id: number) => void;
  onRefillAll: () => void;
  isRefilling: boolean;
  isRefillingAll: boolean;
}

export const AdminControlsPanel = ({
  onRefillBox,
  onRefillAll,
  isRefilling,
  isRefillingAll,
}: AdminControlsPanelProps) => {
  const [selectedBoxId, setSelectedBoxId] = useState<number>(1);

  const isDisabled = isRefilling || isRefillingAll;

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <Package className="w-6 h-6 text-(--primary-brand)" />
        <h3 className="text-lg font-bold text-gray-900">Admin Controls</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-600">
            Select Box:
          </label>
          <select
            value={selectedBoxId}
            onChange={(e) => setSelectedBoxId(Number(e.target.value))}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-brand)] focus:border-transparent"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                Box {num}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onRefillBox(selectedBoxId)}
            disabled={isDisabled}
            className={`
              flex-1 flex items-center justify-center gap-2
              bg-[var(--primary-brand)] text-white px-6 py-3 rounded-xl 
              font-semibold transition-all shadow-md
              ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[var(--primary-brand-hover)] hover:shadow-lg active:scale-[0.98]"
              }
            `}
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefilling ? "animate-spin" : ""}`}
            />
            {isRefilling ? "Processing..." : "Refill Selected Box"}
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

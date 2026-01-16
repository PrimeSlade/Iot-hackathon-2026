import { Package } from "lucide-react";
import type { Box } from "@/api/api";

interface BoxCardProps {
  box: Box;
  onDispense: (id: number) => void;
  isDisabled: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

export const BoxCard = ({
  box,
  onDispense,
  isDisabled,
  onClick,
  isSelected,
}: BoxCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (box.status === "available" && !isDisabled) {
      onDispense(box.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        backgroundColor:
          box.status === "available"
            ? "var(--primary-brand)"
            : "var(--empty-box)",
      }}
      className={`
        relative group overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8 
        flex flex-col items-center justify-center gap-2 transition-all duration-300
        ${
          box.status === "available"
            ? "hover:shadow-xl text-white shadow-lg cursor-pointer transform hover:-translate-y-1"
            : "border-2 border-gray-200 text-gray-400 cursor-not-allowed"
        }
        ${isSelected ? "ring-4 ring-blue-500 ring-offset-2" : ""}
      `}
    >
      <Package
        className={`
          w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-1
          ${box.status === "empty" ? "opacity-20" : "opacity-100"}
        `}
      />
      <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
        {box.id}
      </span>
      <span
        className={`
          text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full
          ${
            box.status === "available"
              ? "bg-white/20"
              : "bg-gray-100 text-gray-400"
          }
        `}
      >
        {box.status === "available" ? "Ready" : "Empty"}
      </span>
    </button>
  );
};

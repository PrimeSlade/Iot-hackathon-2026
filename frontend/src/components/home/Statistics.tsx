import { CheckCircle2, XCircle } from "lucide-react";

interface StatisticsProps {
  availableCount: number;
  emptyCount: number;
}

export const Statistics = ({ availableCount, emptyCount }: StatisticsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 mb-8 lg:mb-12 max-w-4xl mx-auto">
      {/* Available Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium uppercase tracking-wider mb-1">
            Available
          </p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--primary-brand)]">
            {availableCount}
          </p>
        </div>
        <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[var(--primary-brand)] opacity-80" />
      </div>

      {/* Empty Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium uppercase tracking-wider mb-1">
            Empty
          </p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-300">
            {emptyCount}
          </p>
        </div>
        <XCircle className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-300 opacity-80" />
      </div>
    </div>
  );
};

export const Legend = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-gray-200 shadow-sm flex items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full"></div>
          <span className="text-xs sm:text-sm font-semibold text-gray-700">
            Available
          </span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 border border-gray-300 rounded-full"></div>
          <span className="text-xs sm:text-sm font-semibold text-gray-500">
            Empty
          </span>
        </div>
      </div>
    </div>
  );
};

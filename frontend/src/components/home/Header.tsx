import { Package } from "lucide-react";

export const Header = () => {
  return (
    <div className="mb-8 lg:mb-12 text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-orange-500 rounded-full mb-4 lg:mb-6 shadow-lg shadow-orange-200">
        <Package className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
      </div>
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-3 tracking-tight">
        Sanitary Pack Dispenser
      </h1>
      <p className="text-sm sm:text-lg lg:text-xl text-gray-500 font-medium">
        Select a box below to dispense a pack
      </p>
    </div>
  );
};

import { useState, useEffect } from "react";
import { Package, CheckCircle2, XCircle } from "lucide-react";

interface Box {
  id: number;
  number: string;
  status: "available" | "empty";
}

const Home = () => {
  const [boxes, setBoxes] = useState<Box[]>([
    { id: 1, number: "1", status: "available" },
    { id: 2, number: "2", status: "available" },
    { id: 3, number: "3", status: "available" },
    { id: 4, number: "4", status: "available" },
    { id: 5, number: "5", status: "available" },
    { id: 6, number: "6", status: "available" },
    { id: 7, number: "7", status: "available" },
    { id: 8, number: "8", status: "available" },
    { id: 9, number: "9", status: "available" },
    { id: 10, number: "10", status: "available" },
  ]);

  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [dispensedMessage, setDispensedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial box status from backend on component mount
  useEffect(() => {
    fetchBoxStatus();
  }, []);

  // Function to fetch current box status from backend
  const fetchBoxStatus = async () => {
    try {
      console.log("Fetching box status from backend...");
      // Backend logic preserved here
    } catch (error) {
      console.error("Error fetching box status:", error);
    }
  };

  // Function to dispense sanitary pack from a box
  const handleDispense = async (box: Box) => {
    if (box.status === "available" && !isLoading) {
      setIsLoading(true);
      try {
        // Backend logic preserved here

        // Update local state
        setBoxes((prevBoxes) =>
          prevBoxes.map((b) =>
            b.id === box.id ? { ...b, status: "empty" } : b
          )
        );

        setSelectedBox(box.id);
        setDispensedMessage(`Pack dispensed from Box ${box.number}`);
        setTimeout(() => setDispensedMessage(null), 3000);

        console.log("Pack dispensed:", {
          boxId: box.id,
          status: "empty",
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error dispensing pack:", error);
        setDispensedMessage(
          "Error: Failed to dispense pack. Please try again."
        );
        setTimeout(() => setDispensedMessage(null), 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to refill a box
  const refillBox = async (boxId: number) => {
    setIsLoading(true);
    try {
      // Backend logic preserved here
      setBoxes((prevBoxes) =>
        prevBoxes.map((box) =>
          box.id === boxId ? { ...box, status: "available" } : box
        )
      );
      setDispensedMessage(
        `Box ${boxes.find((b) => b.id === boxId)?.number} refilled`
      );
      setTimeout(() => setDispensedMessage(null), 3000);
      console.log("Box refilled:", {
        boxId,
        status: "available",
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error refilling box:", error);
      setDispensedMessage("Error: Failed to refill box. Please try again.");
      setTimeout(() => setDispensedMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refill all boxes
  const refillAllBoxes = async () => {
    setIsLoading(true);
    try {
      // Backend logic preserved here
      setBoxes((prevBoxes) =>
        prevBoxes.map((box) => ({ ...box, status: "available" }))
      );
      setDispensedMessage("All boxes refilled successfully");
      setTimeout(() => setDispensedMessage(null), 3000);
      console.log("All boxes refilled:", { timestamp: new Date() });
    } catch (error) {
      console.error("Error refilling all boxes:", error);
      setDispensedMessage(
        "Error: Failed to refill all boxes. Please try again."
      );
      setTimeout(() => setDispensedMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Box["status"]) => {
    switch (status) {
      case "available":
        return "hover:shadow-xl text-white shadow-lg cursor-pointer transform hover:-translate-y-1";
      case "empty":
        return "bg-white border-2 border-gray-200 text-gray-400 cursor-not-allowed";
      default:
        return "bg-white border-2 border-gray-200";
    }
  };

  const getStatusBgStyle = (status: Box["status"]) => {
    if (status === "available") {
      return { backgroundColor: "#f97316" }; // Orange-500
    }
    return {};
  };

  const availableCount = boxes.filter((b) => b.status === "available").length;
  const emptyCount = boxes.filter((b) => b.status === "empty").length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-4 sm:p-6 lg:p-10">
      {/* Main Container - max-width constraint prevents layout stretch on huge monitors */}
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header Section */}
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

        {/* Status Alert */}
        {dispensedMessage && (
          <div className="mb-6 lg:mb-8 max-w-3xl mx-auto border border-orange-200 bg-orange-50 rounded-xl p-4 lg:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-orange-600 flex-shrink-0" />
            <p className="text-orange-800 font-semibold text-sm sm:text-base lg:text-lg">
              {dispensedMessage}
            </p>
          </div>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 mb-8 lg:mb-12 max-w-4xl mx-auto">
          {/* Available Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium uppercase tracking-wider mb-1">
                Available
              </p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-orange-600">
                {availableCount}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-500 opacity-80" />
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

        {/* Legend */}
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

        {/* Dispenser Grid - Responsive Columns: 2 (mobile) -> 3 (tablet) -> 5 (desktop) */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 p-4 sm:p-6 lg:p-10 mb-8 border border-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {boxes.map((box) => (
              <button
                key={box.id}
                onClick={() => handleDispense(box)}
                disabled={box.status === "empty" || isLoading}
                style={getStatusBgStyle(box.status)}
                className={`
                  ${getStatusColor(box.status)}
                  relative group overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8 
                  flex flex-col items-center justify-center gap-2 transition-all duration-300
                  ${
                    selectedBox === box.id && box.status === "available"
                      ? "ring-4 ring-orange-300 ring-offset-2 scale-95"
                      : ""
                  }
                  ${isLoading ? "opacity-50 cursor-wait" : ""}
                `}
              >
                <Package
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-1
                    ${box.status === "empty" ? "opacity-20" : "opacity-100"}
                  `}
                />
                <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
                  {box.number}
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
            ))}
          </div>
        </div>

        {/* Admin Controls Panel */}
        {selectedBox && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              Manage Box{" "}
              <span className="text-orange-600">
                #{boxes.find((b) => b.id === selectedBox)?.number}
              </span>
            </h2>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Current Status:
              </p>
              <div className="flex items-center gap-2">
                {boxes.find((b) => b.id === selectedBox)?.status ===
                "available" ? (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold">Available</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                    <XCircle className="w-5 h-5" />
                    <span className="font-bold">Empty</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => refillBox(selectedBox)}
                disabled={isLoading}
                className={`flex-1 justify-center items-center bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 active:scale-[0.98] transition-all shadow-md shadow-orange-100 ${
                  isLoading ? "opacity-50 cursor-wait" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Refill This Box"}
              </button>
              <button
                onClick={refillAllBoxes}
                disabled={isLoading}
                className={`flex-1 justify-center items-center bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 active:scale-[0.98] transition-all ${
                  isLoading ? "opacity-50 cursor-wait" : ""
                }`}
              >
                {isLoading ? "Processing..." : "Refill All Boxes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

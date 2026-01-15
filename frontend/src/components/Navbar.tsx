import { Package, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const Navbar = () => {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Only show navbar if user is logged in
  if (!session) return null;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[var(--primary-brand)] rounded-full shadow-md">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-md sm:text-lg font-bold text-gray-900 tracking-tight">
                Sanitary Pad Dispenser
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Welcome, {session.user?.name || session.user?.email}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg active:scale-95 text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

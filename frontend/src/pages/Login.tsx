import { authClient } from "@/lib/auth-client";
import { Package } from "lucide-react";

export function Login() {
  const handleMicrosoftLogin = async () => {
    await authClient.signIn.social({
      provider: "microsoft",
      callbackURL: import.meta.env.VITE_FRONTEND_URL,
    });
  };

  return (
    <div className="w-screen min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-[var(--primary-brand)] rounded-full mb-6 shadow-xl shadow-[var(--primary-brand)]/20">
            <Package className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Sanitary Pads Dispenser
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-medium">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 p-6 sm:p-8 lg:p-10">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500">
                Please sign in with your Microsoft @ad.sit account
              </p>
            </div>

            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex items-center justify-center gap-3 bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-hover)] text-white px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 21 21"
                className="flex-shrink-0"
              >
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              Sign in with Microsoft
            </button>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-center text-gray-400">
                Secure authentication powered by Microsoft
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2026 Sanitary Pads Dispenser. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

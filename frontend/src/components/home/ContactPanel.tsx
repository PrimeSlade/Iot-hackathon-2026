import { Mail, Phone, AlertCircle } from "lucide-react";

export const ContactPanel = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <AlertCircle className="w-6 h-6 text-[var(--primary-brand)]" />
        <h3 className="text-lg font-bold text-gray-900">Need Help?</h3>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          If all boxes are empty or you need assistance, please contact us:
        </p>

        <div className="space-y-3">
          <a
            href="mailto:support@sanitarydispenser.com"
            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-[var(--primary-brand)]/5 rounded-xl transition-all border border-gray-200 hover:border-[var(--primary-brand)] group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--primary-brand)]/10 group-hover:bg-[var(--primary-brand)] rounded-lg transition-all">
              <Mail className="w-5 h-5 text-[var(--primary-brand)] group-hover:text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Email Us</p>
              <p className="text-sm font-semibold text-gray-900">
                support@sanitarydispenser.com
              </p>
            </div>
          </a>

          <a
            href="tel:+1234567890"
            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-[var(--primary-brand)]/5 rounded-xl transition-all border border-gray-200 hover:border-[var(--primary-brand)] group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[var(--primary-brand)]/10 group-hover:bg-[var(--primary-brand)] rounded-lg transition-all">
              <Phone className="w-5 h-5 text-[var(--primary-brand)] group-hover:text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Call Us</p>
              <p className="text-sm font-semibold text-gray-900">
                +1 (234) 567-890
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

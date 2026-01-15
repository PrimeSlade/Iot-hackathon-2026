import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Package } from "lucide-react";

interface DispenseSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boxNumber: number;
}

export const DispenseSuccessDialog = ({
  open,
  onOpenChange,
  boxNumber,
}: DispenseSuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Pad Dispensed!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-lg">
                <Package className="h-5 w-5 text-[var(--primary-brand)]" />
                <span className="font-semibold text-gray-700">
                  Box #{boxNumber}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Your sanitary pad has been dispensed from Box {boxNumber}.
                Please collect it from the dispenser.
              </p>
              <button
                onClick={() => onOpenChange(false)}
                className="mt-4 w-full bg-[var(--primary-brand)] hover:bg-[var(--primary-brand-hover)] text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Got it!
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

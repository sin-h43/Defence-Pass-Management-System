// components/DetailModal.tsx
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  widthClassName?: string; // Just pass any Tailwind width class
}

export default function DetailModal({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children,
  widthClassName = 'max-w-5xl' // default value
}: DetailModalProps) {
  
  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Center Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`w-full ${widthClassName} bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              {subtitle && (
                <p className="text-xs text-slate-400">{subtitle}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[calc(85vh-70px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
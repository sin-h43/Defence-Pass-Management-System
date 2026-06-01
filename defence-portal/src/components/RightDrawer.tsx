import { X } from "lucide-react";
import { useEffect} from "react";

interface RightDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function RightDrawer({ isOpen, onClose, title, children }: RightDrawerProps) {
    //prevent background scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/*Dark Overlay Backdrop */}
            <div 
            onClick={onClose}
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
              isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`} 
            />
            {/* Sliding Sliding Panel Container */}
      <div className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-gray-900 border-l border-gray-800 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
            
            {/* Drawer Header Row */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-950/20">
          <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Inner Content Body Slot */}
        <div className="flex-1 overflow-y-auto p-5 text-xs text-gray-300">
          {children}
        </div>
        </div>
        </>
    );
}

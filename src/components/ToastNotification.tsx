import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useSupport } from '../context/SupportContext';

export const ToastNotification: React.FC = () => {
  const { toast } = useSupport();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200 pointer-events-none">
      <div className="bg-black text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-semibold border border-neutral-800 pointer-events-auto">
        {getIcon()}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

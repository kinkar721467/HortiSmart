import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastItem = ({ toast, onRemove }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / toast.duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [toast.duration]);

  const getBarColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-rose-500';
      case 'warning':
        return 'bg-amber-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-100 bg-white/95 shadow-emerald-100/20';
      case 'error':
        return 'border-rose-100 bg-white/95 shadow-rose-100/20';
      case 'warning':
        return 'border-amber-100 bg-white/95 shadow-amber-100/20';
      case 'info':
      default:
        return 'border-blue-100 bg-white/95 shadow-blue-100/20';
    }
  };

  return (
    <div
      className={`pointer-events-auto relative flex items-start gap-3 p-4 pr-10 rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300 animate-in slide-in-from-right-10 fade-in overflow-hidden ${getToastStyles(
        toast.type
      )}`}
      role="alert"
    >
      {getToastIcon(toast.type)}

      <div className="flex-1 text-sm font-semibold text-gray-800 break-words mt-0.5 leading-relaxed">
        {toast.message}
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-xl hover:bg-gray-100/50"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100/80">
        <div
          className={`h-full transition-all duration-[30ms] ease-linear ${getBarColor(toast.type)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Portal Container */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

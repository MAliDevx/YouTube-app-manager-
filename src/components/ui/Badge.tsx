import React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-slate-900 text-slate-50 hover:bg-slate-900/80",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80",
      destructive: "bg-red-100 text-red-700 border-red-200",
      outline: "text-slate-950 border border-slate-200",
      success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };

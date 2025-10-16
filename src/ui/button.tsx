import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "px-3 py-2 rounded-lg bg-stone-600 text-white hover:bg-stone-700 active:bg-stone-800",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

import { forwardRef } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className = "", ...props }, ref) {
    return (
      <input
        ref={ref}
        className={`h-9 w-full rounded-md border border-line bg-background px-3 text-sm text-ink placeholder:text-ink-disabled focus:outline-none focus:ring-1 focus:ring-accent ${className}`}
        {...props}
      />
    );
  }
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className = "", ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`w-full rounded-md border border-line bg-background px-3 py-2 text-sm text-ink placeholder:text-ink-disabled focus:outline-none focus:ring-1 focus:ring-accent resize-y ${className}`}
      {...props}
    />
  );
});

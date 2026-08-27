"use client";

import type { ReactNode } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm rounded-md border border-line bg-background p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] max-h-[calc(100vh-2rem)] overflow-y-auto">
        <h2 className="text-base font-medium text-ink mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

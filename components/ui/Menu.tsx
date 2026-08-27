"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

export interface MenuItem {
  label: string;
  onSelect: () => void;
  danger?: boolean;
}

const MENU_WIDTH = 160;

export default function Menu({ items, trigger }: { items: MenuItem[]; trigger?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function updatePosition() {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const left = Math.max(8, Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8));
      setPosition({ top: rect.bottom + 4, left });
    }

    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    updatePosition();
    window.addEventListener("mousedown", onClickOutside);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="h-7 w-7 inline-flex items-center justify-center rounded-md text-ink-muted hover:bg-surface hover:text-ink cursor-pointer"
        aria-label="Row actions"
      >
        {trigger ?? <MoreHorizontal size={16} />}
      </button>
      {open &&
        position &&
        createPortal(
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "fixed", top: position.top, left: position.left, width: MENU_WIDTH }}
            className="z-50 rounded-md border border-line bg-background py-1 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onSelect();
                  setOpen(false);
                }}
                className={`block w-full text-left px-3 py-1.5 text-sm hover:bg-surface cursor-pointer ${
                  item.danger ? "text-status-red" : "text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

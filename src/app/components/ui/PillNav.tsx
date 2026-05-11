"use client";

import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

export interface PillNavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  ariaLabel?: string;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  inactiveItemClassName?: string;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

const hashFromHref = (href: string) => {
  const hashIndex = href.indexOf("#");

  return hashIndex >= 0 ? href.slice(hashIndex) : "";
};

export default function PillNav({
  items,
  activeHref,
  ariaLabel = "Navegação principal",
  className,
  listClassName,
  itemClassName,
  activeItemClassName,
  inactiveItemClassName,
  orientation = "horizontal",
  onNavigate,
}: PillNavProps) {
  const [clickedHref, setClickedHref] = useState(items[0]?.href ?? "");
  const [hashActiveHref, setHashActiveHref] = useState("");

  const itemSignature = useMemo(
    () => items.map((item) => `${item.label}:${item.href}`).join("|"),
    [items],
  );

  useEffect(() => {
    const syncHash = () => {
      const currentHash = window.location.hash;

      if (!currentHash) {
        setHashActiveHref("");
        return;
      }

      const matchingItem = items.find(
        (item) => hashFromHref(item.href) === currentHash,
      );

      setHashActiveHref(matchingItem?.href ?? "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, [items, itemSignature]);

  useEffect(() => {
    if (activeHref) {
      setClickedHref(activeHref);
      return;
    }

    if (!items.some((item) => item.href === clickedHref)) {
      setClickedHref(items[0]?.href ?? "");
    }
  }, [activeHref, clickedHref, items]);

  const currentHref = activeHref || hashActiveHref || clickedHref;
  const isVertical = orientation === "vertical";

  return (
    <nav
      aria-label={ariaLabel}
      className={clsx(
        "PillNav rounded-full bg-white/10 p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]",
        isVertical && "w-full rounded-[24px] bg-transparent p-0 shadow-none",
        className,
      )}
    >
      <ul
        className={clsx(
          "flex list-none items-center gap-1",
          isVertical ? "w-full flex-col items-stretch gap-2" : "flex-row",
          listClassName,
        )}
      >
        {items.map((item) => {
          const isActive = item.href === currentHref;

          return (
            <li
              key={`${item.label}-${item.href}`}
              className={isVertical ? "w-full" : undefined}
            >
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                onClick={() => {
                  setClickedHref(item.href);
                  onNavigate?.();
                }}
                className={clsx(
                  "inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2",
                  isVertical && "min-h-12 w-full px-4 py-3",
                  itemClassName,
                  isActive
                    ? activeItemClassName ??
                        "bg-white text-secondary-700 shadow-sm"
                    : inactiveItemClassName ??
                        "text-white/80 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

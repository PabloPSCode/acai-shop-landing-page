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
        "PillNav bg-transparent p-0",
        isVertical && "w-full",
        className,
      )}
    >
      <ul
        className={clsx(
          "flex list-none items-center gap-1",
          isVertical ? "w-full flex-col items-stretch gap-1" : "flex-row",
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
                  "inline-flex min-h-8 items-center justify-center rounded-control px-4 py-1 text-nav font-medium tracking-normal transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  isVertical && "min-h-11 w-full justify-start px-4 py-3",
                  itemClassName,
                  isActive
                    ? activeItemClassName ?? "bg-surface-alt text-carbon"
                    : inactiveItemClassName ??
                        "text-carbon hover:bg-surface-alt",
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

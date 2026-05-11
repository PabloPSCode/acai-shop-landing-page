"use client";

import type { ReactNode } from "react";
import LandingHeader from "../../../libs/react-ultimate-components/src/components/elements/LandingHeader";

interface MobilePanelProps {
  open: boolean;
  children: ReactNode;
}

export default function MobilePanel({
  open,
  children,
}: MobilePanelProps) {
  return <LandingHeader.MobileMenuPanel open={open}>{children}</LandingHeader.MobileMenuPanel>;
}

"use client";
import "@/utils/i18n";
import type { ReactNode } from "react";

export default function I18nProvider({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GuideStore {
	isSeen: boolean;
	setIsSeen: () => void;
}

export const useGuide = create<GuideStore>()(
	persist(
		(set) => ({
			isSeen: false,
			setIsSeen: () => {
				set({ isSeen: true });
			},
		}),
		{
			name: "theme-store",
		},
	),
);

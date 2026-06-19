import type { FC, ReactNode } from "react";

interface FrameContentProps {
	children: ReactNode;
	/** Extra classes for the content wrapper (e.g. override justify/align). */
	className?: string;
}

/**
 * Shared safe-area for the content of every colored "frame" (section).
 *
 * The white frame's chrome — the logo bar (top) and the footer (bottom) — is
 * overlaid on top of the sliding colored frames. This wrapper reserves a
 * consistent top/bottom inset so a section's content never collides with that
 * chrome, while decorations (canvas, waves, grids…) stay full-bleed behind it.
 *
 * Insets are calibrated to the real chrome size: the logo occupies ~108px from
 * the top of a slide, the footer ~48px from the bottom.
 *
 * On mobile the content is top-aligned (it starts below the logo bar) — tall
 * sections were otherwise centered and overflowed UP behind the header. On md+
 * it centers as before.
 */
const FrameContent: FC<FrameContentProps> = ({ children, className = "" }) => (
	<div
		className={`relative z-20 flex h-full w-full flex-col justify-start px-6 pt-32 pb-16 md:justify-center md:pt-32 md:pb-20 ${className}`}
	>
		{children}
	</div>
);

export default FrameContent;

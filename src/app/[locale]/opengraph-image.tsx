import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Matteo Poli — Front-end Developer";

export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				padding: "80px",
				background:
					"linear-gradient(135deg, #1e1e1e 0%, #2a1530 55%, #3a1020 100%)",
				color: "#ffffff",
				fontFamily: "sans-serif",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 14,
					fontSize: 24,
					letterSpacing: 4,
					textTransform: "uppercase",
					color: "#ff8a8a",
					fontWeight: 700,
				}}
			>
				<div
					style={{
						width: 14,
						height: 14,
						borderRadius: 999,
						background: "#4ade80",
					}}
				/>
				Disponibile per nuove opportunità
			</div>

			<div
				style={{
					display: "flex",
					fontSize: 124,
					fontWeight: 800,
					lineHeight: 1.05,
					marginTop: 28,
				}}
			>
				Matteo Poli
			</div>

			<div
				style={{
					display: "flex",
					fontSize: 46,
					marginTop: 8,
					color: "#e5e5e5",
				}}
			>
				Front-end Developer
			</div>

			<div
				style={{
					display: "flex",
					fontSize: 26,
					marginTop: 40,
					color: "#cfcfcf",
				}}
			>
				React · Next.js · TypeScript · animazioni · accessibilità
			</div>

			<div
				style={{
					display: "flex",
					fontSize: 24,
					marginTop: 22,
					letterSpacing: 2,
					color: "#ffd000",
					fontWeight: 700,
				}}
			>
				CSS DESIGN AWARDS — BEST UI · BEST UX · BEST INNOVATION
			</div>
		</div>,
		{ ...size },
	);
}

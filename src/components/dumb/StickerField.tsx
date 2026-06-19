"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";

// CC0 3D icons from 3dicons.co (realvjy), turned into die-cut vinyl stickers
// (white outline + drop shadow) floating in a zero-gravity playground.
const SOURCES = [
	"rocket",
	"heart",
	"star",
	"trophy",
	"fire",
	"flash",
	"magic-trick",
	"bulb",
	"thumb-up",
	"chat-bubble",
	"music",
	"headphone",
	"target",
	"color-palette",
	"gift",
];
const COUNT = 9;

type Item = {
	img: HTMLImageElement;
	white: HTMLCanvasElement;
	w: number;
	h: number;
	phase: number;
	body: Matter.Body;
};

const loadImage = (name: string) =>
	new Promise<HTMLImageElement>((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => resolve(img);
		img.src = `/images/stickers/${name}.png`;
	});

// White silhouette of a transparent PNG — drawn slightly larger behind the
// artwork it becomes the die-cut sticker border.
const makeWhite = (img: HTMLImageElement) => {
	const c = document.createElement("canvas");
	c.width = img.naturalWidth || 100;
	c.height = img.naturalHeight || 100;
	const cx = c.getContext("2d");
	if (cx) {
		cx.drawImage(img, 0, 0);
		cx.globalCompositeOperation = "source-in";
		cx.fillStyle = "#fff";
		cx.fillRect(0, 0, c.width, c.height);
	}
	return c;
};

const StickerField = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = Math.min(2, window.devicePixelRatio || 1);
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const fine = window.matchMedia("(pointer: fine)").matches;

		let cancelled = false;
		let raf = 0;
		let engine: Matter.Engine | null = null;
		let walls: Matter.Body[] = [];
		let cleanupResize = () => {};

		(async () => {
			const imgs = await Promise.all(SOURCES.map(loadImage));
			if (cancelled) return;
			const whites = imgs.map(makeWhite);

			let W = container.clientWidth * dpr;
			let H = container.clientHeight * dpr;
			canvas.width = W;
			canvas.height = H;

			engine = Matter.Engine.create();
			engine.gravity.x = 0;
			engine.gravity.y = 0; // float & scatter, no bottom pile
			const world = engine.world;

			// fewer stickers on small screens — 9 pile up and cover the content
			const count = container.clientWidth < 640 ? 5 : COUNT;
			const items: Item[] = Array.from({ length: count }, (_, i) => {
				const idx = i % imgs.length;
				const img = imgs[idx];
				const target = (96 + Math.random() * 46) * dpr;
				const ratio = img.naturalWidth / img.naturalHeight || 1;
				const w = ratio >= 1 ? target : target * ratio;
				const h = ratio >= 1 ? target / ratio : target;
				const x = Math.random() * (W - w) + w / 2;
				const y = Math.random() * (H - h) + h / 2;
				const body = Matter.Bodies.circle(x, y, Math.min(w, h) * 0.52, {
					restitution: 0.6,
					friction: 0,
					frictionAir: 0.025,
				});
				Matter.Body.setVelocity(body, {
					x: (Math.random() - 0.5) * 1.6,
					y: (Math.random() - 0.5) * 1.6,
				});
				Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.7);
				Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.012);
				return {
					img,
					white: whites[idx],
					w,
					h,
					phase: Math.random() * Math.PI * 2,
					body,
				};
			});
			Matter.Composite.add(
				world,
				items.map((it) => it.body),
			);

			const buildWalls = () => {
				if (walls.length) Matter.Composite.remove(world, walls);
				const t = 300;
				walls = [
					Matter.Bodies.rectangle(W / 2, -t / 2, W + t * 2, t, {
						isStatic: true,
					}),
					Matter.Bodies.rectangle(W / 2, H + t / 2, W + t * 2, t, {
						isStatic: true,
					}),
					Matter.Bodies.rectangle(-t / 2, H / 2, t, H + t * 2, {
						isStatic: true,
					}),
					Matter.Bodies.rectangle(W + t / 2, H / 2, t, H + t * 2, {
						isStatic: true,
					}),
				];
				Matter.Composite.add(world, walls);
			};
			buildWalls();

			if (fine) {
				const mouse = Matter.Mouse.create(canvas);
				const mc = Matter.MouseConstraint.create(engine, {
					mouse,
					constraint: { stiffness: 0.2, render: { visible: false } },
				});
				Matter.Composite.add(world, mc);
			}

			const BORDER = 1.16; // white die-cut outline scale
			const render = () => {
				ctx.clearRect(0, 0, W, H);
				for (const it of items) {
					const { x, y } = it.body.position;
					ctx.save();
					ctx.translate(x, y);
					ctx.rotate(it.body.angle);
					// die-cut white border (silhouette) + soft shadow
					ctx.shadowColor = "rgba(8,20,40,0.32)";
					ctx.shadowBlur = 14 * dpr;
					ctx.shadowOffsetY = 8 * dpr;
					ctx.drawImage(
						it.white,
						(-it.w * BORDER) / 2,
						(-it.h * BORDER) / 2,
						it.w * BORDER,
						it.h * BORDER,
					);
					ctx.shadowColor = "transparent";
					// artwork on top
					ctx.drawImage(it.img, -it.w / 2, -it.h / 2, it.w, it.h);
					ctx.restore();
				}
			};

			let t = 0;
			const frame = () => {
				t += 1000 / 60;
				// gentle wandering current so the stickers keep drifting calmly
				for (const it of items) {
					const m = it.body.mass;
					const ax = Math.sin(t * 0.0004 + it.phase) * 0.0045 * dpr;
					const ay = Math.cos(t * 0.00034 + it.phase * 1.7) * 0.0045 * dpr;
					Matter.Body.applyForce(it.body, it.body.position, {
						x: m * ax,
						y: m * ay,
					});
				}
				if (engine) Matter.Engine.update(engine, 1000 / 60);
				render();
				raf = requestAnimationFrame(frame);
			};

			if (reduce) render();
			else frame();

			const handleResize = () => {
				W = container.clientWidth * dpr;
				H = container.clientHeight * dpr;
				canvas.width = W;
				canvas.height = H;
				buildWalls();
			};
			window.addEventListener("resize", handleResize);
			cleanupResize = () => window.removeEventListener("resize", handleResize);
		})();

		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			cleanupResize();
			if (engine) {
				Matter.Composite.clear(engine.world, false);
				Matter.Engine.clear(engine);
			}
		};
	}, []);

	return (
		<div ref={containerRef} className="absolute inset-0 z-[1]">
			<canvas ref={canvasRef} className="w-full h-full" />
		</div>
	);
};

export default StickerField;

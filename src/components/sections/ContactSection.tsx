import { useMemo, useState, useEffect, type FC } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Input from "../dumb/Input";
import Textarea from "../dumb/Textarea";
import Button from "../dumb/Button";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const ContactSection: FC = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);
	const { isDesktop } = useDeviceDetection();

	const initialValues = { name: "", email: "", message: "" };
	const validationSchema = yup.object().shape({
		name: yup.string().required("Required"),
		email: yup.string().email("Invalid email").required("Required"),
		message: yup.string().required("Required"),
	});

	const sendEmail = async (name: string, email: string, message: string) => {
		try {
			setLoading(true);
			await emailjs.send(
				"service_8c0pmqx",
				"template_p1s2o3v",
				{
					name: name,
					email: email,
					message: message,
				},
				"qbspO0cIvvnJZOjVk",
			);
			setLoading(false);
			setSuccess(true);
			setTimeout(() => setSuccess(false), 3000);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!isDark) {
			const canvas = document.getElementById("bg-rings") as HTMLCanvasElement;
			if (canvas) {
				const ctx = canvas.getContext("2d");
				if (!ctx) return;
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;

				const drops = Array.from({ length: 25 }, () => ({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					r: 0,
					opacity: 0,
					delay: Math.random() * 200,
				}));

				const fishCount = 5;
				const fishes = Array.from({ length: fishCount }, () => ({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					vx: (Math.random() - 0.5) * 2.4,
					vy: (Math.random() - 0.5) * 2.4,
					color: `hsl(${Math.random() * 360}, 90%, 60%)`,
				}));

				const draw = () => {
					ctx.clearRect(0, 0, canvas.width, canvas.height);

					for (const drop of drops) {
						if (drop.delay > 0) {
							drop.delay--;
							continue;
						}
						ctx.beginPath();
						ctx.arc(drop.x, drop.y, drop.r, 0, 2 * Math.PI);
						ctx.strokeStyle = `rgba(255, 255, 255, ${drop.opacity})`;
						ctx.lineWidth = 1;
						ctx.stroke();
						drop.r += 0.3;
						drop.opacity -= 0.007;
						if (drop.opacity <= 0) {
							drop.r = 0;
							drop.opacity = 1;
							drop.x = Math.random() * canvas.width;
							drop.y = Math.random() * canvas.height;
							drop.delay = Math.random() * 200;
						}
					}

					for (const fish of fishes) {
						const angle = Math.atan2(fish.vy, fish.vx);

						ctx.save();
						ctx.translate(fish.x, fish.y);
						ctx.rotate(angle);

						ctx.beginPath();
						ctx.ellipse(0, 0, 6, 3, 0, 0, 2 * Math.PI);
						ctx.fillStyle = fish.color;
						ctx.fill();

						ctx.restore();

						fish.x += fish.vx;
						fish.y += fish.vy;

						if (Math.random() < 0.02) {
							fish.vx += (Math.random() - 0.5) * 0.5;
							fish.vy += (Math.random() - 0.5) * 0.5;
							const maxSpeed = 1.5;
							fish.vx = Math.max(-maxSpeed, Math.min(maxSpeed, fish.vx));
							fish.vy = Math.max(-maxSpeed, Math.min(maxSpeed, fish.vy));
						}

						const margin = -30;
						if (fish.x < margin || fish.x > canvas.width - margin)
							fish.vx *= -1;
						if (fish.y < margin || fish.y > canvas.height - margin)
							fish.vy *= -1;
					}

					requestAnimationFrame(draw);
				};
				draw();
			}
		}
	}, [isDark]);

	return (
		<section className="relative w-full min-h-screen px-6 py-24 overflow-hidden bg-gradient-to-b from-sky-700 to-blue-500 dark:from-dark-bg-1 dark:to-dark-bg-1">
			{isDesktop && !isDark && (
				<>
					<div className="absolute bottom-40 left-20 w-32 h-32 rotate-180 z-[15]">
						<Image
							src="/images/loto.png"
							alt="loto"
							layout="fill"
							className="w-full h-auto object-cover"
						/>
					</div>
					<div className="absolute bottom-32 left-42 w-32 h-32 rotate-[240deg] z-[15]">
						<Image
							src="/images/loto.png"
							alt="loto"
							layout="fill"
							className="w-full h-auto object-cover"
						/>
					</div>
					<div className="absolute bottom-20 left-18 w-32 h-32 rotate-[240deg] z-[15]">
						<Image
							src="/images/loto.png"
							alt="loto"
							layout="fill"
							className="w-full h-auto object-cover"
						/>
					</div>
					<div className="absolute bottom-28 left-26 w-32 h-32 z-[15]">
						<Image
							src="/images/flower.png"
							alt="loto"
							layout="fill"
							className="w-full h-auto object-cover"
						/>
					</div>
				</>
			)}
			{!isDark && (
				<canvas
					id="bg-rings"
					className="absolute top-0 left-0 w-full h-full z-0"
				/>
			)}
			<div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-[1px] z-0" />
			<div className="relative z-10 w-full md:max-w-screen-xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-center gap-12">
				<div className="flex-1 space-y-6">
					<span className="flex items-center gap-4">
						<h2 className="text-gray-50 text-4xl font-bold">
							{t("contacts.title")}
						</h2>
					</span>
					<div className="w-full h-[2px] bg-gray-50 my-6 md:my-8" />
					<div className="flex items-center gap-4">
						<Mail className="w-6 h-6 text-gray-50" />
						<button
							onClick={() => {
								navigator.clipboard.writeText(t("contacts.email"));
								toast(t("contacts.copied"));
							}}
							type="button"
							className="underline text-gray-50 text-base cursor-pointer"
						>
							{t("contacts.email")}
						</button>
					</div>
					<div className="flex items-center gap-4 mt-4">
						<Phone className="w-6 h-6 text-gray-50" />
						<button
							onClick={() => {
								navigator.clipboard.writeText(t("contacts.phone"));
								toast(t("contacts.copied"));
							}}
							type="button"
							className="underline text-gray-50 text-base cursor-pointer"
						>
							{t("contacts.phone")}
						</button>
					</div>
					<div className="flex items-center gap-4 mt-4">
						<MapPin className="w-6 h-6 text-gray-50" />
						<h4 className="text-gray-50 text-base">{t("contacts.location")}</h4>
					</div>
				</div>
				<div className="w-full flex-1">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						validateOnChange={false}
						validateOnBlur
						validateOnMount={false}
						onSubmit={({ name, email, message }) =>
							sendEmail(name, email, message)
						}
					>
						{({ values, setFieldValue, handleSubmit, errors }) => (
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div>
									<Input
										placeholder={t("contacts.placeholderName") || "Il tuo nome"}
										value={values.name}
										onChange={(e) => setFieldValue("name", e.target.value)}
										error={errors.name}
									/>
								</div>
								<div>
									<Input
										placeholder={
											t("contacts.placeholderEmail") || "La tua email"
										}
										value={values.email}
										onChange={(e) => setFieldValue("email", e.target.value)}
										error={errors.email}
									/>
								</div>
								<div>
									<Textarea
										placeholder={
											t("contacts.placeholderMessage") || "Il tuo messaggio"
										}
										rows={6}
										value={values.message}
										onChange={(e) => setFieldValue("message", e.target.value)}
										error={errors.message}
									/>
								</div>
								<Button disabled={loading} type="submit">
									{t("contacts.sendButton") || "Invia"}
								</Button>
							</form>
						)}
					</Formik>
					{success && (
						<div className="flex justify-center items-center mt-4">
							<div className="bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fade-in">
								{t("contacts.success") || "Messaggio inviato con successo!"}
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default ContactSection;

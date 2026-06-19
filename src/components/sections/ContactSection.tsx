import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useTheme } from "@/hooks/useTheme";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import { type FC, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Button from "../dumb/Button";
import FrameContent from "../dumb/FrameContent";
import Input from "../dumb/Input";
import Textarea from "../dumb/Textarea";

// matter.js is heavy — load it only when the contact section is reached
const StickerField = dynamic(() => import("../dumb/StickerField"), {
	ssr: false,
});

const ContactSection: FC<{ active?: boolean }> = ({ active }) => {
	const { t, i18n } = useTranslation();
	const [loading, setLoading] = useState(false);

	const { theme } = useTheme();
	const isDark = useMemo(() => theme === "dark", [theme]);
	const { isMobile } = useDeviceDetection();

	const cvHref = i18n.language?.toLowerCase().startsWith("en")
		? "/cv/Matteo_Poli_CV_EN.pdf"
		: "/cv/Matteo_Poli_CV_IT.pdf";

	// ponytail: HTML5 validation (required + type=email) over a schema lib.
	// add yup/zod back only when rules outgrow what the browser enforces.
	const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		try {
			setLoading(true);
			const emailjs = (await import("@emailjs/browser")).default;
			await emailjs.send(
				"service_8c0pmqx",
				"template_p1s2o3v",
				{
					name: data.get("name"),
					email: data.get("email"),
					message: data.get("message"),
				},
				"qbspO0cIvvnJZOjVk",
			);
			toast(t("contacts.success") || "Message sent successfully!");
			form.reset();
		} catch (error) {
			console.error(error);
			toast.error(t("contacts.error") || "Invio non riuscito. Riprova.");
		} finally {
			setLoading(false);
		}
	};

	const copy = (value: string) => {
		navigator.clipboard.writeText(value);
		toast(t("contacts.copied"));
	};

	return (
		<section className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-700 to-blue-500 dark:from-dark-bg-1 dark:to-dark-bg-2">
			{/* Playful physics stickers (light + desktop only, lazy-loaded) —
			    matter.js + canvas shadows are too heavy for mobile GPUs */}
			{!isDark && !isMobile && active && <StickerField />}

			<FrameContent className="max-w-screen-xl mx-auto pointer-events-none">
				<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center">
					{/* Left: headline + contact channels */}
					<div className="space-y-3 md:space-y-6">
						<div>
							<h2 className="font-display text-gray-50 text-3xl md:text-6xl font-extrabold leading-none">
								{t("contacts.title")}
							</h2>
							<p className="text-white/80 text-base md:text-lg mt-3 md:mt-4 max-w-[26rem]">
								{t("contacts.description")}
							</p>
						</div>

						<div className="pointer-events-auto space-y-3 w-fit">
							<button
								onClick={() => copy(t("contacts.email"))}
								type="button"
								className="flex items-center gap-3 text-gray-50 text-base hover:text-white transition-colors cursor-pointer"
							>
								<Mail className="w-5 h-5 shrink-0" />
								<span className="underline underline-offset-4">
									{t("contacts.email")}
								</span>
							</button>
							<button
								onClick={() => copy(t("contacts.phone"))}
								type="button"
								className="flex items-center gap-3 text-gray-50 text-base hover:text-white transition-colors cursor-pointer"
							>
								<Phone className="w-5 h-5 shrink-0" />
								<span className="underline underline-offset-4">
									{t("contacts.phone")}
								</span>
							</button>
							<div className="flex items-center gap-3 text-gray-50 text-base">
								<MapPin className="w-5 h-5 shrink-0" />
								<span>{t("contacts.location")}</span>
							</div>
						</div>

						<div className="pointer-events-auto flex flex-wrap items-center gap-3 pt-1">
							<a
								href="https://www.linkedin.com/in/urion"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold text-sm px-4 py-2 shadow-lg cursor-pointer transition-transform hover:scale-105"
							>
								<Linkedin className="w-4 h-4" fill="currentColor" />
								LinkedIn
							</a>
							<a
								href={cvHref}
								download
								className="inline-flex items-center gap-2 rounded-full border border-white/60 text-white font-semibold text-sm px-4 py-2 cursor-pointer transition-colors hover:bg-white hover:text-black"
							>
								{t("actions.cv")}
							</a>
						</div>
					</div>

					{/* Right: form in a solid panel (works in light + dark) */}
					<div className="pointer-events-auto relative z-10 rounded-3xl p-5 md:p-8 bg-sky-800 dark:bg-dark-surface border border-white/15 dark:border-white/10 shadow-2xl">
						<form className="space-y-4 md:space-y-5" onSubmit={sendEmail}>
							<Input
								name="name"
								required
								placeholder={t("contacts.placeholderName") || "Il tuo nome"}
							/>
							<Input
								name="email"
								type="email"
								required
								placeholder={t("contacts.placeholderEmail") || "La tua email"}
							/>
							<Textarea
								name="message"
								required
								rows={3}
								className="md:min-h-32"
								placeholder={
									t("contacts.placeholderMessage") || "Il tuo messaggio"
								}
							/>
							<Button disabled={loading} type="submit">
								{loading
									? t("contacts.sending") || "Invio…"
									: t("contacts.sendButton") || "Invia"}
							</Button>
						</form>
					</div>
				</div>
			</FrameContent>
		</section>
	);
};

export default ContactSection;

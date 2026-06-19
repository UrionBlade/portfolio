import { useTheme } from "@/hooks/useTheme";
import emailjs from "@emailjs/browser";
import { Formik } from "formik";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import { type FC, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
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

	const cvHref = i18n.language?.toLowerCase().startsWith("en")
		? "/cv/Matteo_Poli_CV_EN.pdf"
		: "/cv/Matteo_Poli_CV_IT.pdf";

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
				{ name, email, message },
				"qbspO0cIvvnJZOjVk",
			);
			setLoading(false);
			toast(t("contacts.success") || "Message sent successfully!");
		} catch (error) {
			console.error(error);
			setLoading(false);
			toast.error(t("contacts.error") || "Invio non riuscito. Riprova.");
		}
	};

	const copy = (value: string) => {
		navigator.clipboard.writeText(value);
		toast(t("contacts.copied"));
	};

	return (
		<section className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-700 to-blue-500 dark:from-dark-bg-1 dark:to-dark-bg-2">
			{/* Playful physics stickers (light mode only, lazy-loaded) */}
			{!isDark && active && <StickerField />}

			<FrameContent className="max-w-screen-xl mx-auto pointer-events-none">
				<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
					{/* Left: headline + contact channels */}
					<div className="space-y-6">
						<div>
							<h2 className="text-gray-50 text-5xl md:text-6xl font-extrabold leading-none">
								{t("contacts.title")}
							</h2>
							<p className="text-white/80 text-base md:text-lg mt-4 max-w-[26rem]">
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
								className="inline-flex items-center gap-2 rounded-full bg-white text-black font-semibold text-sm px-4 py-2 shadow-lg transition-transform hover:scale-105"
							>
								<Linkedin className="w-4 h-4" fill="currentColor" />
								LinkedIn
							</a>
							<a
								href={cvHref}
								download
								className="inline-flex items-center gap-2 rounded-full border border-white/60 text-white font-semibold text-sm px-4 py-2 transition-colors hover:bg-white hover:text-black"
							>
								{t("actions.cv")}
							</a>
						</div>
					</div>

					{/* Right: form in a glass card (works in light + dark) */}
					<div className="pointer-events-auto relative z-10 rounded-3xl p-6 md:p-8 bg-white/15 dark:bg-white/[0.04] backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl">
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
								<form className="space-y-5" onSubmit={handleSubmit}>
									<Input
										placeholder={t("contacts.placeholderName") || "Il tuo nome"}
										value={values.name}
										onChange={(e) => setFieldValue("name", e.target.value)}
										error={errors.name}
									/>
									<Input
										placeholder={
											t("contacts.placeholderEmail") || "La tua email"
										}
										value={values.email}
										onChange={(e) => setFieldValue("email", e.target.value)}
										error={errors.email}
									/>
									<Textarea
										placeholder={
											t("contacts.placeholderMessage") || "Il tuo messaggio"
										}
										rows={5}
										value={values.message}
										onChange={(e) => setFieldValue("message", e.target.value)}
										error={errors.message}
									/>
									<Button disabled={loading} type="submit">
										{loading
											? t("contacts.sending") || "Invio…"
											: t("contacts.sendButton") || "Invia"}
									</Button>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</FrameContent>
		</section>
	);
};

export default ContactSection;

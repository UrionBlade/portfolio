"use client";
import { useGuide } from "@/hooks/useGuide";
import { useTranslation } from "react-i18next";
import Button from "../dumb/Button";

const SiteGuide = () => {
	const { isSeen, setIsSeen } = useGuide();
	const { t } = useTranslation();

	if (!window) return null;

	if (isSeen) return null;

	return (
		<div className="fixed inset-0 z-50 pointer-events-none">
			<div
				className="absolute inset-0 bg-dark-bg-1/97"
				style={{
					WebkitMaskImage:
						"radial-gradient(circle 5rem at top 3rem right 4rem, transparent 100%, black 100%)",
					maskImage:
						"radial-gradient(circle 5rem at top 3rem right 4rem, transparent 100%, black 100%)",
					WebkitMaskRepeat: "no-repeat",
					maskRepeat: "no-repeat",
					WebkitMaskSize: "100% 100%",
					maskSize: "100% 100%",
				}}
			/>
			<div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
				<div className="text-white text-center px-6">
					<h2 className="text-2xl font-bold mb-2">{t("guide.title")}</h2>
					<p className="text-base mb-4">{t("guide.description")}</p>
					<Button onClick={() => setIsSeen()}>{t("guide.cta")}</Button>
				</div>
			</div>
		</div>
	);
};

export default SiteGuide;

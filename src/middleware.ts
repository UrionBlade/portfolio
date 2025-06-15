import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["it", "en"];
const defaultLocale = "it";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Ignora file statici o già localizzati
	if (
		PUBLIC_FILE.test(pathname) ||
		locales.some((locale) => pathname.startsWith(`/${locale}`))
	) {
		return;
	}

	// Detect browser language
	const acceptLang = request.headers.get("accept-language");
	const preferredLocale =
		locales.find((locale) => acceptLang?.startsWith(locale)) || defaultLocale;

	const url = request.nextUrl.clone();
	url.pathname = `/${preferredLocale}${pathname}`;
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};

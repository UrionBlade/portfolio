import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["it", "en"];
const defaultLocale = "it";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Se già localizzato (es. /it/about), lascia passare
	if (locales.some((locale) => pathname.startsWith(`/${locale}`))) {
		return NextResponse.next();
	}

	// Solo su `/` o path non localizzati: redirect a lingua
	if (pathname === "/" || pathname === "") {
		const acceptLang = request.headers.get("accept-language");
		const preferredLocale =
			locales.find((locale) => acceptLang?.startsWith(locale)) || defaultLocale;

		const url = request.nextUrl.clone();
		url.pathname = `/${preferredLocale}`;
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};

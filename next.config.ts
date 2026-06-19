import type { NextConfig } from "next";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	// Render metadata synchronously into <head> instead of streaming it —
	// the page bails to client rendering (ssr:false), and streamed metadata
	// gets injected too late for SEO crawlers/Lighthouse.
	htmlLimitedBots: /.*/,
	modularizeImports: {
		uuid: {
			transform: "uuid/{{member}}",
		},
		yup: {
			transform: "yup/{{member}}",
		},
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `
							default-src 'self';
							script-src 'self' 'unsafe-inline';
							style-src 'self' 'unsafe-inline';
							img-src 'self' data:;
							font-src 'self' data:;
							connect-src 'self' https://api.emailjs.com;
						`
							.replace(/\s{2,}/g, " ")
							.trim(),
					},
				],
			},
		];
	},
};

export default withBundleAnalyzer(nextConfig);

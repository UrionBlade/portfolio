import { Poppins } from 'next/font/google';
import './globals.scss';
import 'swiper/css';
import 'swiper/less/mousewheel';
import 'swiper/css/effect-creative';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next/types';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Matteo Poli',
  description:
    "I'm the sorcerer behind the pixels and the architect of seamless user experiences.",
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  width: 'device-width',
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

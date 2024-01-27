import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import 'swiper/css';
import 'swiper/less/mousewheel';
import 'swiper/css/effect-creative';

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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

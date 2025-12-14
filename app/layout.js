import './globals.css';
import { Inter } from 'next/font/google';

/**
 * MIGRATION NOTE: Root layout component
 * - Replaces the traditional HTML structure from CRA's public/index.html
 * - Uses Next.js App Router layout system
 * - Includes metadata for SEO and social sharing
 * - Loads global styles
 */

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Battlefield Hexagons 3D',
  description: 'A 3D hexagon-based board game built with React, Next.js, and Three.js',
  keywords: '3D, board game, hexagons, Three.js, React, Next.js, WebGL',
  authors: [{ name: 'ElliotMtb' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

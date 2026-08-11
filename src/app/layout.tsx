import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Script from 'next/script';

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-tajawal",
});

import { getIdentity } from '@/app/actions/dashboard/settings';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getIdentity();
  return {
    title: data?.title || "Pharaoh Code | صرح البرمجيات",
    description: data?.desc || "Pharaoh Code - Premium Software House",
    keywords: data?.keywords || "software, house",
    icons: {
      icon: data?.favicon || '/favicon.ico',
    }
  };
}

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;500;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      </head>
      <body
        className={`${tajawal.variable} font-sans antialiased bg-[#0A192F]`}
      >
        <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

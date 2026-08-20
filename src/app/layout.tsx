import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Script from 'next/script';

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "500", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${tajawal.className} ${tajawal.variable} font-sans antialiased`}
      >
        <Script src="https://code.jquery.com/jquery-3.7.1.min.js" strategy="afterInteractive" />
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharaoh Code | خدمات تصميم الهوية البصرية والعلامات التجارية",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

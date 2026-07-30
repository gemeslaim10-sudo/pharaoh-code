import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharaoh Code | لوحة التحكم",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharaoh Code | صرح البرمجيات",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Orca Core | أوركا كور",
  description: "نبني البنية التحتية الرقمية للمؤسسات. أنظمة ERP متطورة، منصات تجارة إلكترونية، وحلول سحابية متكاملة مصممة للحيتان.",
  openGraph: {
    title: "Orca Core | أوركا كور",
    description: "نبني البنية التحتية الرقمية للمؤسسات. أنظمة ERP متطورة، منصات تجارة إلكترونية، وحلول سحابية متكاملة.",
    url: "https://orca-core.vercel.app", 
    siteName: "Orca Core",
    images: [
      {
        url: "/assets/orcacore-logo.png",
        width: 1200,
        height: 630,
        alt: "Orca Core Logo",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} antialiased dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-cairo selection:bg-purple-500/30">
        {children}
      </body>
    </html>
  );
}
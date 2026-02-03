import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Savora | Share Your Culinary Creations",
  description:
    "A beautiful recipe sharing platform where home cooks share their favorite dishes with the world.",
  openGraph: {
    title: "Savora | Share Your Culinary Creations",
    description:
      "A beautiful recipe sharing platform where home cooks share their favorite dishes with the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream-50 antialiased">{children}</body>
    </html>
  );
}

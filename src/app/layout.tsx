import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VJ Car Rental — Pune",
  description: "Premium self-drive car rentals built for Pune's youth. Hit the expressway in style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="midnight">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Oxanium:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

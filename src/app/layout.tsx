import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Best Tutor | Academy",
  description: "Premium educational institute providing high-quality learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

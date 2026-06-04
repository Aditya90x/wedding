import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxury Wedding Invitation",
  description: "A cinematic wedding experience.",
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

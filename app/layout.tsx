import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMINA THEME PARK | Cinematic Adventure Journey",
  description: "Experience four legendary rides through an interactive cinematic scroll-driven journey.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#07090e] text-[#f1f3f9] selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}

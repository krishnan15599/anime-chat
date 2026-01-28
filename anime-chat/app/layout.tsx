import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Character.ai Clone",
  description: "An anime chat application inspired by character.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-300">
        <Providers>
          <div className="relative min-h-screen">
            <Sidebar />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 pt-16 sm:pl-20">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

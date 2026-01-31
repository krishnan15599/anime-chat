import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Animora",
  description: "An anime chat application inspired by Animora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased transition-none overflow-hidden">
        <Providers>
          <div className="flex h-screen w-screen bg-[var(--background)]">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
              <Header />
              <main className="flex-1 overflow-y-auto sm:pl-20 pt-16">
                <div className="flex h-full">
                  <div className="flex-1 min-w-0">
                    {children}
                  </div>
                  <RightSidebar />
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

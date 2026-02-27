import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import { Providers } from "@/components/Providers";
import { ClerkProvider } from "@clerk/nextjs";

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  console.error("********************************************************************************");
  console.error("CRITICAL ERROR: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing!");
  console.error("Please add this key to your Vercel Project Settings > Environment Variables.");
  console.error("********************************************************************************");
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("********************************************************************************");
  console.error("CRITICAL ERROR: Supabase Keys are missing from environment variables!");
  console.error("Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to Vercel.");
  console.error("********************************************************************************");
}

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
    <ClerkProvider>
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
    </ClerkProvider>
  );
}

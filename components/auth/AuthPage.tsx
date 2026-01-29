"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthPageProps {
    mode: "login" | "signup";
}

const BANNER_IMAGES = [
    "https://api.dicebear.com/7.x/open-peeps/svg?seed=Elias",
    "https://api.dicebear.com/7.x/open-peeps/svg?seed=Kafka",
    "https://api.dicebear.com/7.x/open-peeps/svg?seed=AdaLeon",
    "https://api.dicebear.com/7.x/open-peeps/svg?seed=Bambietta",
    "https://api.dicebear.com/7.x/open-peeps/svg?seed=Marin"
];

export default function AuthPage({ mode }: AuthPageProps) {
    const router = useRouter();
    const isLogin = mode === "login";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-[480px] bg-[var(--background)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--border-color)]">

                {/* Close Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors cursor-pointer backdrop-blur-md"
                >
                    <X size={20} />
                </button>

                {/* Logo */}
                <div className="absolute top-4 left-6 z-20 text-white font-black text-xl italic drop-shadow-md">
                    talkie
                </div>

                {/* Hero Images Banner */}
                <div className="h-48 grid grid-cols-5 gap-0 relative">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-[var(--background)]" />

                    {BANNER_IMAGES.map((img, i) => (
                        <div key={i} className="h-full relative group overflow-hidden">
                            <img
                                src={img}
                                alt="Character"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="px-8 pb-10 pt-2 text-center">
                    <h1 className="text-3xl font-black mb-3">
                        {isLogin ? "Welcome back." : "Create an account."}
                    </h1>
                    <p className="text-[var(--text-muted)] text-sm mb-8 px-4 leading-relaxed">
                        {isLogin
                            ? "Log in to continue your conversations with any character!"
                            : "Create an account to unlock free chats with any Talkie!"
                        }
                    </p>

                    <div className="space-y-3">
                        <SocialButton
                            icon="G"
                            label="Continue with Google"
                            bgColor="bg-[#2b2b2b] hover:bg-[#383838] dark:bg-zinc-800 dark:hover:bg-zinc-700"
                            textColor="text-white"
                        />
                        <SocialButton
                            icon=""
                            label="Continue with Apple"
                            bgColor="bg-[#2b2b2b] hover:bg-[#383838] dark:bg-zinc-800 dark:hover:bg-zinc-700"
                            textColor="text-white"
                        />
                        <SocialButton
                            icon="♪"
                            label="Continue with TikTok"
                            bgColor="bg-[#2b2b2b] hover:bg-[#383838] dark:bg-zinc-800 dark:hover:bg-zinc-700"
                            textColor="text-white"
                        />
                    </div>

                    <div className="mt-8 text-[10px] text-[var(--text-muted)] px-8 leading-normal">
                        By continuing, you agree to Talkie's{" "}
                        <Link href="#" className="underline hover:text-[var(--foreground)] cursor-pointer">Terms of Service</Link>
                        {" "}and{" "}
                        <Link href="#" className="underline hover:text-[var(--foreground)] cursor-pointer">Privacy Policy</Link>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                        <div className="text-xs text-[var(--text-muted)]">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <Link
                                href={isLogin ? "/signup" : "/login"}
                                className="font-bold text-[var(--foreground)] hover:underline cursor-pointer"
                            >
                                {isLogin ? "Sign up" : "Log in"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SocialButton({ icon, label, bgColor, textColor }: { icon: string, label: string, bgColor: string, textColor: string }) {
    return (
        <button className={`w-full h-12 rounded-full font-bold text-sm flex items-center justify-center relative transition-transform active:scale-[0.98] cursor-pointer ${bgColor} ${textColor}`}>
            <span className="absolute left-4 text-lg font-serif">{icon}</span>
            {label}
        </button>
    );
}

"use client";

import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSignIn, useSignUp } from "@clerk/nextjs";

interface AuthPageProps {
    mode: "login" | "signup";
}

export default function AuthPage({ mode }: AuthPageProps) {
    const router = useRouter();
    const isLogin = mode === "login";
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");

    // Clerk Hooks
    const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
    const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();

    // Handle Google Login
    const handleGoogleLogin = async () => {
        if (!isSignInLoaded || !isSignUpLoaded) return;
        try {
            // Depending on mode, we can use signIn or signUp, but signIn usually handles both for OAuth if configured.
            // Using signIn.authenticateWithRedirect is common for social auth.
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/"
            });
        } catch (err: any) {
            console.error("Google Login Error:", err);
            setError(err.errors?.[0]?.message || "An error occurred with Google login");
        }
    };

    // Handle Email/Password Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignInLoaded) return;
        setError("");

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setSignInActive({ session: result.createdSessionId });
                router.push("/");
            } else {
                console.log(result);
                setError("Login incomplete. Please checking your credentials.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.errors?.[0]?.message || "Invalid email or password");
        }
    };

    // Handle Email/Password Signup
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignUpLoaded) return;
        setError("");

        try {
            await signUp.create({
                emailAddress: email,
                password,
            });

            // Prepare email verification
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true);
        } catch (err: any) {
            console.error(err);
            setError(err.errors?.[0]?.message || "Error creating account");
        }
    };

    // Handle Verification Code Submit
    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignUpLoaded) return;
        setError("");

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setSignUpActive({ session: completeSignUp.createdSessionId });
                router.push("/");
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                setError("Verification failed");
            }
        } catch (err: any) {
            console.error(err);
            setError(err.errors?.[0]?.message || "Invalid code");
        }
    };

    // Handle Resend Code
    const handleResend = async () => {
        if (!isSignUpLoaded) return;
        setError("");

        try {
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            // Optional: Show a "Sent!" toast or message
        } catch (err: any) {
            console.error(err);
            setError(err.errors?.[0]?.message || "Error resending code");
        }
    };

    const handleSubmit = isLogin ? handleLogin : handleSignup;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-[480px] bg-[var(--background)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--border-color)]">

                {/* Close Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors cursor-pointer backdrop-blur-md"
                >
                    <X size={20} />
                </button>

                {/* Hero Banner (Single Local Image) */}
                <div className="h-48 relative flex items-center justify-center bg-black">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-[var(--background)]" />

                    <Image
                        src="/assets/logo/logo.png"
                        alt="Animora Logo"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="px-8 pb-10 pt-2 text-center">
                    <h1 className="text-3xl font-black mb-3">
                        {pendingVerification
                            ? "Verify your email"
                            : (isLogin ? "Welcome back." : "Create an account.")}
                    </h1>

                    <p className="text-[var(--text-muted)] text-sm mb-8 px-4 leading-relaxed">
                        {pendingVerification
                            ? "We sent a code to your email. Enter it below."
                            : (isLogin
                                ? "Log in to continue your conversations with any character!"
                                : "Create an account to unlock free chats with any character!"
                            )
                        }
                    </p>

                    {pendingVerification ? (
                        <form onSubmit={handleVerification} className="space-y-3">
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Verification Code"
                                className="w-full h-12 rounded-xl border border-[var(--border-color)] bg-transparent px-4 text-sm outline-none focus:border-[var(--foreground)] transition-colors placeholder:text-[var(--text-muted)]"
                            />
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 h-12 rounded-full font-bold text-sm bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
                                >
                                    Verify
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="px-6 h-12 rounded-full font-bold text-sm border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors"
                                >
                                    Resend
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-3 mb-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="w-full h-12 rounded-xl border border-[var(--border-color)] bg-transparent px-4 text-sm outline-none focus:border-[var(--foreground)] transition-colors placeholder:text-[var(--text-muted)]"
                                    required
                                />
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full h-12 rounded-xl border border-[var(--border-color)] bg-transparent px-4 text-sm outline-none focus:border-[var(--foreground)] transition-colors placeholder:text-[var(--text-muted)] pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button for Email/Pass */}
                            <button
                                type="submit"
                                className="w-full h-12 rounded-full font-bold text-sm bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity"
                            >
                                {isLogin ? "Log In" : "Sign Up"}
                            </button>

                            {error && (
                                <p className="text-red-500 text-xs px-2">{error}</p>
                            )}

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[var(--border-color)]"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[var(--background)] px-2 text-[var(--text-muted)]">Or continue with</span>
                                </div>
                            </div>

                            <SocialButton
                                icon="G"
                                label="Continue with Google"
                                bgColor="bg-[#2b2b2b] hover:bg-[#383838] dark:bg-zinc-800 dark:hover:bg-zinc-700"
                                textColor="text-white"
                                onClick={handleGoogleLogin}
                            />
                            <div id="clerk-captcha"></div>
                        </form>
                    )}

                    {!pendingVerification && (
                        <>
                            <div className="mt-8 text-[10px] text-[var(--text-muted)] px-8 leading-normal">
                                By continuing, you agree to Animora&apos;s{" "}
                                <Link href="#" className="underline hover:text-[var(--foreground)] cursor-pointer">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="underline hover:text-[var(--foreground)] cursor-pointer">
                                    Privacy Policy
                                </Link>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function SocialButton({
    icon,
    label,
    bgColor,
    textColor,
    onClick,
}: {
    icon: string;
    label: string;
    bgColor: string;
    textColor: string;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full h-12 rounded-full font-bold text-sm flex items-center justify-center relative transition-transform active:scale-[0.98] cursor-pointer ${bgColor} ${textColor}`}
        >
            <span className="absolute left-4 text-lg font-serif">{icon}</span>
            {label}
        </button>
    );
}

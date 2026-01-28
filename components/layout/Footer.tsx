import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-[var(--card-bg)] border-t border-[var(--border-color)] py-12 px-6 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Logo and Social Links */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <MessageCircle size={32} className="text-[var(--foreground)]" />
                            <span className="text-2xl font-black text-[var(--foreground)]">talkie</span>
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] hover:bg-[var(--hover-bg)] flex items-center justify-center text-[var(--foreground)] transition-colors" aria-label="Discord">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] hover:bg-[var(--hover-bg)] flex items-center justify-center text-[var(--foreground)] transition-colors" aria-label="Reddit">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547l-.8 3.747c1.824.07 3.48.632 4.674 1.488c.308-.309.73-.491 1.207-.491c.968 0 1.754.786 1.754 1.754c0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87c-3.874 0-7.004-2.176-7.004-4.87c0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754c.463 0 .898.196 1.207.49c1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197a.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248c.687 0 1.248-.561 1.248-1.249c0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25c0 .687.561 1.248 1.249 1.248c.688 0 1.249-.561 1.249-1.249c0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094a.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913c.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463a.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73c-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] hover:bg-[var(--hover-bg)] flex items-center justify-center text-[var(--foreground)] transition-colors" aria-label="TikTok">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] hover:bg-[var(--hover-bg)] flex items-center justify-center text-[var(--foreground)] transition-colors" aria-label="X">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26l8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] hover:bg-[var(--hover-bg)] flex items-center justify-center text-[var(--foreground)] transition-colors" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07c3.252.148 4.771 1.691 4.919 4.919c.058 1.265.069 1.645.069 4.849c0 3.205-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919c-1.266.058-1.644.07-4.85.07c-3.204 0-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92c-.058-1.265-.07-1.644-.07-4.849c0-3.204.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919c1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072c-4.358.2-6.78 2.618-6.98 6.98c-.059 1.281-.073 1.689-.073 4.948c0 3.259.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98c1.281.058 1.689.072 4.948.072c3.259 0 3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98c.059-1.28.073-1.689.073-4.948c0-3.259-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98c-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163s6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">Copyright © 2026 Talkie. All rights reserved</p>
                    </div>

                    {/* Features Column */}
                    <div>
                        <h3 className="font-black text-sm text-[var(--foreground)] mb-4">Features</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Get App</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Create a Talkie</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Your Privacy Choices</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Delete Account</Link></li>
                        </ul>
                    </div>

                    {/* Explore Column */}
                    <div>
                        <h3 className="font-black text-sm text-[var(--foreground)] mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Events & Tags</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Multilingual</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">More AI Characters</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Feeling Curious</Link></li>
                        </ul>
                    </div>

                    {/* Overview Column */}
                    <div className="lg:col-span-2">
                        <h3 className="font-black text-sm text-[var(--foreground)] mb-4">Overview</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Talkie Blog</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Contact & Support</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Community Guidelines</Link></li>
                            <li><Link href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Powered by MiniMax</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

import { Home, Compass, Plus, MessageSquare, Users, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Discover", href: "/discover" },
    { icon: Plus, label: "Create", href: "/create" },
    { icon: MessageSquare, label: "Chats", href: "/chats" },
    { icon: Users, label: "Community", href: "/community" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-20 flex-col items-center border-r border-[var(--border-color)] bg-[var(--sidebar-bg)] py-8 hidden sm:flex transition-colors duration-300">
            <div className="mb-8 p-2">
                <div className="h-10 w-10 rounded-xl bg-sky-500 flex items-center justify-center font-bold text-white italic shadow-lg shadow-sky-500/20">
                    ai
                </div>
            </div>

            <nav className="flex flex-1 flex-col gap-6">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`group relative flex flex-col items-center gap-1 transition-colors ${isActive ? "text-[var(--foreground)]" : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                                }`}
                        >
                            <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-black/5 dark:bg-white/10" : "group-hover:bg-black/5 dark:group-hover:bg-white/5"
                                }`}>
                                <Icon size={24} />
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <button className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5">
                    <Settings size={22} />
                </button>
            </div>
        </aside>
    );
}

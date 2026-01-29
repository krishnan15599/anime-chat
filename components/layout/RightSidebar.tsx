import RecentChats from "@/components/ui/RecentChats";
import TrendingList from "@/components/ui/TrendingList";

export default function RightSidebar() {
    return (
        <aside className="w-80 h-full hidden lg:flex flex-col gap-8 p-6 bg-[var(--card-bg)] border-l border-[var(--border-color)]">
            <RecentChats />
            <TrendingList />
        </aside>
    );
}

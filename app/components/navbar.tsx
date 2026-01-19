/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { UserDetail } from "./user-detail";
import { FaBolt } from "react-icons/fa6";
import Link from "next/link";
import { Trophy, Target } from "lucide-react";


export const Navbar = () => {
    return (
        <div className=" bg-gradient-to-br from-purple-400 to-indigo-400 h-full px-3 bg-white sticky top-0 z-90 " >
            <div className=" flex items-center lg:justify-between">
                {/* <MobileSidebar />
                 */}
                <div className="  min-h-[56px] flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-1">
                        <FaBolt />
                        <span className="text-lg font-bold">Trip48</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/quests" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">
                            <Target className="w-4 h-4" />
                            Quests
                        </Link>
                        <Link href="/stats" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">
                            <Trophy className="w-4 h-4" />
                            Stats
                        </Link>
                    </div>
                </div>
                <div className="lg:ml-0 ml-auto ">
                    <UserDetail />
                </div>
            </div>
        </div>
    )
}